import * as React from 'react'
import { render } from '@react-email/components'
import { createFileRoute } from '@tanstack/react-router'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'All Colours Painting'
const SENDER_DOMAIN = 'notify.allcolourspainter.com'
const FROM_DOMAIN = 'notify.allcolourspainter.com'

const THRESHOLD = 10
const THRESHOLD_COOLDOWN_HOURS = 24

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function enqueueAlert(
  supabase: any,
  templateData: Record<string, any>,
) {
  const template = TEMPLATES['asset-error-alert']
  if (!template) throw new Error('asset-error-alert template missing')
  const recipient = template.to as string
  const messageId = crypto.randomUUID()

  const { data: suppressed } = await supabase
    .from('suppressed_emails')
    .select('id')
    .eq('email', recipient.toLowerCase())
    .maybeSingle()
  if (suppressed) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: 'asset-error-alert',
      recipient_email: recipient,
      status: 'suppressed',
    })
    return { skipped: 'suppressed' as const }
  }

  const normalized = recipient.toLowerCase()
  let unsubscribeToken: string
  const { data: existingToken } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalized)
    .maybeSingle()
  if (existingToken && !existingToken.used_at) {
    unsubscribeToken = existingToken.token as string
  } else {
    unsubscribeToken = generateToken()
    await supabase
      .from('email_unsubscribe_tokens')
      .upsert(
        { token: unsubscribeToken, email: normalized },
        { onConflict: 'email', ignoreDuplicates: true },
      )
    const { data: stored } = await supabase
      .from('email_unsubscribe_tokens')
      .select('token')
      .eq('email', normalized)
      .maybeSingle()
    if (stored?.token) unsubscribeToken = stored.token as string
  }

  const element = React.createElement(template.component, templateData)
  const html = await render(element)
  const text = await render(element, { plainText: true })
  const subject =
    typeof template.subject === 'function'
      ? template.subject(templateData)
      : template.subject

  await supabase.from('email_send_log').insert({
    message_id: messageId,
    template_name: 'asset-error-alert',
    recipient_email: recipient,
    status: 'pending',
  })

  const { error } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: messageId,
      to: recipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      sender_domain: SENDER_DOMAIN,
      subject,
      html,
      text,
      purpose: 'transactional',
      label: 'asset-error-alert',
      idempotency_key: `asset-error-${templateData.alertType}-${messageId}`,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })
  if (error) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: 'asset-error-alert',
      recipient_email: recipient,
      status: 'failed',
      error_message: 'enqueue failed',
    })
    throw error
  }
  return { messageId }
}

export const Route = createFileRoute('/api/public/hooks/check-asset-errors')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const startedAt = Date.now()
        const anonKey =
          process.env.SUPABASE_PUBLISHABLE_KEY ||
          process.env.SUPABASE_ANON_KEY ||
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

        const apiKey = request.headers.get('apikey')
        if (!apiKey || (anonKey && apiKey !== anonKey)) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
        const supabase: any = supabaseAdmin

        const since24 = new Date(Date.now() - 24 * 3600 * 1000).toISOString()

        const { data: rows, error: rowsErr } = await supabase
          .from('asset_errors')
          .select('asset_url, created_at')
          .gte('created_at', since24)
        if (rowsErr) {
          console.error('[check-asset-errors] read failed', rowsErr)
          return Response.json({ error: 'read failed' }, { status: 500 })
        }
        const errors = (rows as Array<{ asset_url: string; created_at: string }>) || []
        const totalLast24h = errors.length

        const counts = new Map<string, number>()
        for (const r of errors) counts.set(r.asset_url, (counts.get(r.asset_url) ?? 0) + 1)
        const topBroken = [...counts.entries()]
          .map(([url, count]) => ({ url, count }))
          .sort((a, b) => b.count - a.count)
          .slice(0, 10)

        const distinctUrls = [...counts.keys()]
        const newUrls: string[] = []
        if (distinctUrls.length > 0) {
          const keys = distinctUrls.map((u) => `new_url:${u}`)
          const { data: alerted } = await supabase
            .from('asset_error_alerts')
            .select('alert_key')
            .in('alert_key', keys)
          const alertedSet = new Set(
            ((alerted as Array<{ alert_key: string }>) || []).map((a) => a.alert_key),
          )
          for (const u of distinctUrls) {
            if (!alertedSet.has(`new_url:${u}`)) newUrls.push(u)
          }
        }

        const alertsSent: string[] = []

        if (newUrls.length > 0) {
          try {
            await enqueueAlert(supabase, {
              alertType: 'new_url',
              newUrls,
              totalLast24h,
              threshold: THRESHOLD,
              topBroken,
              dashboardUrl: 'https://allcolourspainter.com/admin/asset-errors',
              generatedAt: new Date().toISOString(),
            })
            const inserts = newUrls.map((u) => ({
              alert_key: `new_url:${u}`,
              alert_type: 'new_url',
              asset_url: u,
            }))
            await supabase.from('asset_error_alerts').insert(inserts)
            alertsSent.push('new_url')
          } catch (e) {
            console.error('[check-asset-errors] new_url enqueue failed', e)
          }
        }

        if (totalLast24h >= THRESHOLD) {
          const cooldownSince = new Date(
            Date.now() - THRESHOLD_COOLDOWN_HOURS * 3600 * 1000,
          ).toISOString()
          const { data: recentThreshold } = await supabase
            .from('asset_error_alerts')
            .select('id')
            .eq('alert_type', 'threshold')
            .gte('notified_at', cooldownSince)
            .limit(1)
          if (!recentThreshold || (recentThreshold as unknown[]).length === 0) {
            try {
              await enqueueAlert(supabase, {
                alertType: 'threshold',
                newUrls: [],
                totalLast24h,
                threshold: THRESHOLD,
                topBroken,
                dashboardUrl: 'https://allcolourspainter.com/admin/asset-errors',
                generatedAt: new Date().toISOString(),
              })
              await supabase.from('asset_error_alerts').insert({
                alert_key: `threshold:${new Date().toISOString()}`,
                alert_type: 'threshold',
                asset_url: null,
              })
              alertsSent.push('threshold')
            } catch (e) {
              console.error('[check-asset-errors] threshold enqueue failed', e)
            }
          }
        }

        return Response.json({
          ok: true,
          totalLast24h,
          newUrlsCount: newUrls.length,
          alertsSent,
        })
      },
    },
  },
})
