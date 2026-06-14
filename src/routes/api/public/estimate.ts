import * as React from 'react'
import { render } from '@react-email/components'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'All Colours Painting'
const SENDER_DOMAIN = 'notify.allcolourspainter.com'
const FROM_DOMAIN = 'notify.allcolourspainter.com'

const ADMIN_RECIPIENTS = [
  'info@allcolourspainter.com',
  'info@painterdublin.eu',
  'dubdsltd@gmail.com',
]

const LineItemSchema = z.object({
  label: z.string().min(1).max(200),
  min: z.number().int().min(0).max(1_000_000),
  max: z.number().int().min(0).max(1_000_000),
})

const EstimateSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().min(3).max(50),
  address: z.string().trim().min(3).max(255),
  description: z.string().trim().min(1).max(4000),
  estimateMin: z.number().int().min(0).max(10_000_000),
  estimateMax: z.number().int().min(0).max(10_000_000),
  condition: z.string().trim().min(1).max(50),
  mode: z.string().trim().min(1).max(50),
  lineItems: z.array(LineItemSchema).max(50),
})

async function getOrCreateUnsubscribeToken(supabase: any, email: string): Promise<string> {
  const normalized = email.toLowerCase()
  const { data: existing } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token, used_at')
    .eq('email', normalized)
    .maybeSingle()
  if (existing && !existing.used_at) return existing.token

  const bytes = new Uint8Array(32)
  crypto.getRandomValues(bytes)
  const newToken = Array.from(bytes).map((b) => b.toString(16).padStart(2, '0')).join('')
  await supabase
    .from('email_unsubscribe_tokens')
    .upsert({ token: newToken, email: normalized }, { onConflict: 'email', ignoreDuplicates: true })
  const { data: stored } = await supabase
    .from('email_unsubscribe_tokens')
    .select('token')
    .eq('email', normalized)
    .maybeSingle()
  return stored?.token ?? newToken
}

async function enqueueEmail(
  supabase: any,
  args: {
    templateName: string
    recipient: string
    messageId: string
    subject: string
    html: string
    text: string
    replyTo?: string
  }
) {
  const unsubscribeToken = await getOrCreateUnsubscribeToken(supabase, args.recipient)
  await supabase.from('email_send_log').insert({
    message_id: args.messageId,
    template_name: args.templateName,
    recipient_email: args.recipient,
    status: 'pending',
  })
  const { error } = await supabase.rpc('enqueue_email', {
    queue_name: 'transactional_emails',
    payload: {
      message_id: args.messageId,
      to: args.recipient,
      from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
      reply_to: args.replyTo,
      sender_domain: SENDER_DOMAIN,
      subject: args.subject,
      html: args.html,
      text: args.text,
      purpose: 'transactional',
      label: args.templateName,
      idempotency_key: args.messageId,
      unsubscribe_token: unsubscribeToken,
      queued_at: new Date().toISOString(),
    },
  })
  if (error) {
    console.error('Failed to enqueue email', error)
    await supabase.from('email_send_log').insert({
      message_id: args.messageId,
      template_name: args.templateName,
      recipient_email: args.recipient,
      status: 'failed',
      error_message: 'Failed to enqueue: ' + error.message,
    })
  }
}

export const Route = createFileRoute('/api/public/estimate')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try { body = await request.json() } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }
        const parsed = EstimateSchema.safeParse(body)
        if (!parsed.success) {
          return Response.json(
            { error: 'Invalid input', details: parsed.error.flatten() },
            { status: 400 },
          )
        }
        const data = parsed.data

        const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
        const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY
        if (!supabaseUrl || !supabaseServiceKey) {
          return Response.json({ error: 'Server configuration error' }, { status: 500 })
        }
        const { createClient } = await import('@supabase/supabase-js')
        const supabase = createClient(supabaseUrl, supabaseServiceKey)

        const { data: inserted, error: insertError } = await supabase
          .from('estimate_requests')
          .insert({
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            description: data.description,
            estimate_min: data.estimateMin,
            estimate_max: data.estimateMax,
            condition: data.condition,
            mode: data.mode,
            line_items: data.lineItems,
          })
          .select('id, created_at')
          .single()

        if (insertError) {
          console.error('Failed to insert estimate request', insertError)
          return Response.json({ error: 'Failed to save request' }, { status: 500 })
        }

        try {
          const submittedAt = new Date(inserted.created_at).toLocaleString('en-IE', {
            timeZone: 'Europe/Dublin',
          })

          // 1. Admin notification (to all 3 recipients)
          const adminTemplate = TEMPLATES['estimate-request']
          if (!adminTemplate) throw new Error('estimate-request template not registered')
          const adminTemplateData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            address: data.address,
            description: data.description,
            estimateMin: data.estimateMin,
            estimateMax: data.estimateMax,
            condition: data.condition,
            mode: data.mode,
            lineItems: data.lineItems,
            submittedAt,
          }
          const adminElement = React.createElement(adminTemplate.component, adminTemplateData)
          const adminHtml = await render(adminElement)
          const adminText = await render(adminElement, { plainText: true })
          const adminSubject = typeof adminTemplate.subject === 'function'
            ? adminTemplate.subject(adminTemplateData)
            : adminTemplate.subject

          for (const recipient of ADMIN_RECIPIENTS) {
            await enqueueEmail(supabase, {
              templateName: 'estimate-request',
              recipient,
              messageId: `estimate-${inserted.id}-${recipient.toLowerCase()}`,
              subject: adminSubject,
              html: adminHtml,
              text: adminText,
              replyTo: data.email,
            })
          }

          // 2. Client confirmation
          const clientTemplate = TEMPLATES['estimate-confirmation']
          if (clientTemplate) {
            const clientTemplateData = {
              name: data.name,
              estimateMin: data.estimateMin,
              estimateMax: data.estimateMax,
              description: data.description,
            }
            const clientElement = React.createElement(clientTemplate.component, clientTemplateData)
            const clientHtml = await render(clientElement)
            const clientText = await render(clientElement, { plainText: true })
            const clientSubject = typeof clientTemplate.subject === 'function'
              ? clientTemplate.subject(clientTemplateData)
              : clientTemplate.subject

            await enqueueEmail(supabase, {
              templateName: 'estimate-confirmation',
              recipient: data.email,
              messageId: `estimate-confirm-${inserted.id}`,
              subject: clientSubject,
              html: clientHtml,
              text: clientText,
              replyTo: 'info@allcolourspainter.com',
            })
          }
        } catch (e) {
          console.error('Estimate emails failed (request was saved)', e)
        }

        return Response.json({ success: true })
      },
    },
  },
})
