import * as React from 'react'
import { render } from '@react-email/components'
import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { TEMPLATES } from '@/lib/email-templates/registry'

const SITE_NAME = 'All Colours Painting'
const SENDER_DOMAIN = 'notify.allcolourspainter.com'
const FROM_DOMAIN = 'notify.allcolourspainter.com'

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(100),
  email: z.string().trim().email().max(255),
  phone: z.string().trim().max(50).optional().nullable(),
  postcode: z.string().trim().max(50).optional().nullable(),
  message: z.string().trim().min(1).max(4000),
  source: z.enum(['contact_form', 'commercial_form', 'website']).optional(),
  service_type: z.string().trim().max(100).optional().nullable(),
})

export const Route = createFileRoute('/api/public/contact')({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown
        try {
          body = await request.json()
        } catch {
          return Response.json({ error: 'Invalid JSON' }, { status: 400 })
        }

        const parsed = ContactSchema.safeParse(body)
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

        // 1. Save inquiry to admin inbox
        const { data: inserted, error: insertError } = await supabase
          .from('contact_submissions')
          .insert({
            name: data.name,
            email: data.email,
            phone: data.phone || null,
            postcode: data.postcode || null,
            message: data.message,
          })
          .select('id, created_at')
          .single()

        if (insertError) {
          console.error('Failed to insert contact submission', insertError)
          return Response.json({ error: 'Failed to save inquiry' }, { status: 500 })
        }

        // 2. Build & enqueue admin notification email (best-effort — inquiry already saved)
        try {
          const template = TEMPLATES['contact-inquiry']
          if (!template) throw new Error('contact-inquiry template not registered')

          const submittedAt = new Date(inserted.created_at).toLocaleString('en-IE', {
            timeZone: 'Europe/Dublin',
          })
          const templateData = {
            name: data.name,
            email: data.email,
            phone: data.phone,
            postcode: data.postcode,
            message: data.message,
            submittedAt,
          }

          const element = React.createElement(template.component, templateData)
          const html = await render(element)
          const text = await render(element, { plainText: true })
          const subject =
            typeof template.subject === 'function'
              ? template.subject(templateData)
              : template.subject

          const recipients = [template.to!, 'dubdsltd@gmail.com', 'info@painterdublin.eu']

          for (const recipient of recipients) {
            const normalizedRecipient = recipient.toLowerCase()
            const messageId = `contact-${inserted.id}-${normalizedRecipient}`

            // Get or create unsubscribe token (required by email API)
            let unsubscribeToken: string
            const { data: existingToken } = await supabase
              .from('email_unsubscribe_tokens')
              .select('token, used_at')
              .eq('email', normalizedRecipient)
              .maybeSingle()

            if (existingToken && !existingToken.used_at) {
              unsubscribeToken = existingToken.token
            } else {
              const bytes = new Uint8Array(32)
              crypto.getRandomValues(bytes)
              const newToken = Array.from(bytes)
                .map((b) => b.toString(16).padStart(2, '0'))
                .join('')
              await supabase
                .from('email_unsubscribe_tokens')
                .upsert(
                  { token: newToken, email: normalizedRecipient },
                  { onConflict: 'email', ignoreDuplicates: true },
                )
              const { data: storedToken } = await supabase
                .from('email_unsubscribe_tokens')
                .select('token')
                .eq('email', normalizedRecipient)
                .maybeSingle()
              unsubscribeToken = storedToken?.token ?? newToken
            }

            await supabase.from('email_send_log').insert({
              message_id: messageId,
              template_name: 'contact-inquiry',
              recipient_email: recipient,
              status: 'pending',
            })

            const { error: enqueueError } = await supabase.rpc('enqueue_email', {
              queue_name: 'transactional_emails',
              payload: {
                message_id: messageId,
                to: recipient,
                from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
                reply_to: data.email,
                sender_domain: SENDER_DOMAIN,
                subject,
                html,
                text,
                purpose: 'transactional',
                label: 'contact-inquiry',
                idempotency_key: messageId,
                unsubscribe_token: unsubscribeToken,
                queued_at: new Date().toISOString(),
              },
            })

            if (enqueueError) {
              console.error('Failed to enqueue contact email', enqueueError)
              await supabase.from('email_send_log').insert({
                message_id: messageId,
                template_name: 'contact-inquiry',
                recipient_email: recipient,
                status: 'failed',
                error_message: 'Failed to enqueue: ' + enqueueError.message,
              })
            }
          }

        } catch (e) {
          console.error('Contact email send failed (inquiry was saved)', e)
        }

        return Response.json({ success: true })
      },
    },
  },
})
