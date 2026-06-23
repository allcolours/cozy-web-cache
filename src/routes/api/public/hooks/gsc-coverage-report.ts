import * as React from 'react'
import { render } from '@react-email/components'
import { createFileRoute } from '@tanstack/react-router'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_URL = 'https://allcolourspainter.com/'
const SITE_NAME = 'All Colours Painting'
const SENDER_DOMAIN = 'notify.allcolourspainter.com'
const FROM_DOMAIN = 'notify.allcolourspainter.com'
const GATEWAY_BASE = 'https://connector-gateway.lovable.dev/google_search_console'

interface GscSitemap {
  path: string
  lastSubmitted?: string
  isPending?: boolean
  lastDownloaded?: string
  warnings?: string | number
  errors?: string | number
  contents?: Array<{ type?: string; submitted?: string | number; indexed?: string | number }>
}

function toNum(v: unknown): number {
  if (typeof v === 'number') return v
  if (typeof v === 'string') {
    const n = parseInt(v, 10)
    return isNaN(n) ? 0 : n
  }
  return 0
}

function generateToken(): string {
  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  return Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
}

async function fetchCoverage() {
  const lovableKey = process.env.LOVABLE_API_KEY
  const gscKey = process.env.GOOGLE_SEARCH_CONSOLE_API_KEY
  if (!lovableKey || !gscKey) {
    throw new Error('Google Search Console connector not configured')
  }
  const encodedSite = encodeURIComponent(SITE_URL)
  const res = await fetch(`${GATEWAY_BASE}/webmasters/v3/sites/${encodedSite}/sitemaps`, {
    headers: {
      Authorization: `Bearer ${lovableKey}`,
      'X-Connection-Api-Key': gscKey,
    },
  })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`GSC sitemaps fetch failed [${res.status}]: ${body.slice(0, 200)}`)
  }
  const data = (await res.json()) as { sitemap?: GscSitemap[] }
  const sitemaps = data.sitemap || []
  const rows = sitemaps.map((s) => {
    const submitted = (s.contents || []).reduce((a, c) => a + toNum(c.submitted), 0)
    const indexed = (s.contents || []).reduce((a, c) => a + toNum(c.indexed), 0)
    return {
      path: s.path,
      submitted,
      indexed,
      warnings: toNum(s.warnings),
      errors: toNum(s.errors),
      lastDownloaded: s.lastDownloaded,
      isPending: !!s.isPending,
    }
  })
  const totals = rows.reduce(
    (acc, r) => ({
      submitted: acc.submitted + r.submitted,
      indexed: acc.indexed + r.indexed,
      warnings: acc.warnings + r.warnings,
      errors: acc.errors + r.errors,
      sitemaps: acc.sitemaps + 1,
    }),
    { submitted: 0, indexed: 0, warnings: 0, errors: 0, sitemaps: 0 },
  )
  return { rows, totals }
}

async function enqueueReport(supabase: any, templateData: Record<string, any>) {
  const template = TEMPLATES['gsc-coverage-report']
  if (!template) throw new Error('gsc-coverage-report template missing')
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
      template_name: 'gsc-coverage-report',
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
    template_name: 'gsc-coverage-report',
    recipient_email: recipient,
    status: 'pending',
  })

  const weekKey = new Date().toISOString().slice(0, 10)
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
      label: 'gsc-coverage-report',
      idempotency_key: `gsc-coverage-${weekKey}`,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })
  if (error) {
    await supabase.from('email_send_log').insert({
      message_id: messageId,
      template_name: 'gsc-coverage-report',
      recipient_email: recipient,
      status: 'failed',
      error_message: 'enqueue failed',
    })
    throw error
  }
  return { messageId }
}

export const Route = createFileRoute('/api/public/hooks/gsc-coverage-report')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        const anonKey =
          process.env.SUPABASE_PUBLISHABLE_KEY ||
          process.env.SUPABASE_ANON_KEY ||
          import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY

        const apiKey = request.headers.get('apikey')
        if (!apiKey || (anonKey && apiKey !== anonKey)) {
          return Response.json({ error: 'Unauthorized' }, { status: 401 })
        }

        try {
          const { rows, totals } = await fetchCoverage()
          const { supabaseAdmin } = await import('@/integrations/supabase/client.server')
          const result = await enqueueReport(supabaseAdmin as any, {
            siteUrl: SITE_URL,
            totals,
            sitemaps: rows,
            generatedAt: new Date().toLocaleString('en-IE', { timeZone: 'UTC' }) + ' UTC',
            consoleUrl: 'https://search.google.com/search-console',
          })
          return Response.json({ ok: true, totals, sitemaps: rows.length, ...result })
        } catch (e: any) {
          console.error('[gsc-coverage-report] failed', e)
          return Response.json({ error: e?.message || 'failed' }, { status: 500 })
        }
      },
    },
  },
})
