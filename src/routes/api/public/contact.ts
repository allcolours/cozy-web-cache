import * as React from "react";
import { render } from "@react-email/components";
import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";
import { TEMPLATES } from "@/lib/email-templates/registry";

const SITE_NAME = "All Colours Painting";
const SENDER_DOMAIN = "notify.allcolourspainter.com";
const FROM_DOMAIN = "notify.allcolourspainter.com";

const ContactSchema = z
  .object({
    name: z.string().trim().min(1).max(100),
    // Email is optional — some landing-page forms (e.g. /house-painting-dublin)
    // only collect phone + address. Accept missing, null, "", or a valid email.
    email: z
      .union([z.string().trim().email().max(255), z.literal("")])
      .optional()
      .nullable(),
    phone: z.string().trim().max(50).optional().nullable(),
    postcode: z.string().trim().max(100).optional().nullable(),
    message: z.string().trim().min(1).max(4000),
    source: z.string().trim().max(64).optional().nullable(),
    service_type: z.string().trim().max(100).optional().nullable(),
    // Anti-spam (optional; tolerated when absent for backwards compat)
    company_website: z.string().max(500).optional().nullable(),
    form_rendered_at: z.number().int().optional().nullable(),
  })
  .passthrough();

function getClientIp(request: Request): string {
  const h = request.headers;
  const fwd = h.get("cf-connecting-ip") || h.get("x-forwarded-for") || h.get("x-real-ip") || "";
  return (fwd.split(",")[0] || "unknown").trim();
}

export const Route = createFileRoute("/api/public/contact")({
  server: {
    handlers: {
      POST: async ({ request }) => {
        let body: unknown;
        try {
          body = await request.json();
        } catch {
          return Response.json({ error: "Invalid JSON" }, { status: 400 });
        }

        const parsed = ContactSchema.safeParse(body);
        if (!parsed.success) {
          console.error("contact: zod validation failed", parsed.error.flatten());
          return Response.json(
            { error: "Invalid input", details: parsed.error.flatten() },
            { status: 400 },
          );
        }
        const data = parsed.data;
        // Normalize email — schema permits null/undefined/"", DB column on
        // contact_submissions is NOT NULL so coerce to "".
        const emailValue = (data.email ?? "").trim();

        try {
          // --- Bot trap: honeypot ---
          if (data.company_website && data.company_website.trim() !== "") {
            return Response.json({ success: true });
          }
          // --- Bot trap: too-fast submission (< 2s) ---
          if (data.form_rendered_at && Date.now() - data.form_rendered_at < 2000) {
            return Response.json({ success: true });
          }

          const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
          const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
          if (!supabaseUrl || !supabaseServiceKey) {
            console.error("contact: missing supabase server env");
            return Response.json({ error: "Server configuration error" }, { status: 500 });
          }

          const { createClient } = await import("@supabase/supabase-js");
          const supabase = createClient(supabaseUrl, supabaseServiceKey);

          // --- Rate limit: max 5 submissions / IP / 10 minutes ---
          const ip = getClientIp(request);
          const windowStart = new Date(Date.now() - 10 * 60 * 1000).toISOString();
          const { count: recent } = await supabase
            .from("rate_limits")
            .select("id", { count: "exact", head: true })
            .eq("bucket", "contact")
            .eq("ip", ip)
            .gte("created_at", windowStart);
          if ((recent ?? 0) >= 5) {
            return Response.json(
              { error: "Too many requests. Please try again in a few minutes or call us." },
              { status: 429 },
            );
          }
          await supabase.from("rate_limits").insert({ bucket: "contact", ip });

          // 1. Save inquiry to admin inbox
          const { data: inserted, error: insertError } = await supabase
            .from("contact_submissions")
            .insert({
              name: data.name,
              email: emailValue,
              phone: data.phone || null,
              postcode: data.postcode || null,
              message: data.message,
            })
            .select("id, created_at")
            .single();

          if (insertError || !inserted) {
            console.error("contact: failed to insert contact_submissions", insertError);
            // Still try to record as a lead so we don't lose the customer.
            try {
              await supabase.from("leads").insert({
                name: data.name,
                email: emailValue || null,
                phone: data.phone || null,
                message: data.message,
                service_type: data.service_type || null,
                source: data.source || "contact_form",
                status: "new",
              });
            } catch (e) {
              console.error("contact: leads fallback insert failed", e);
            }
            return Response.json({ error: "Failed to save inquiry" }, { status: 500 });
          }


          // Also record as a lead in the CRM (best-effort)
          try {
            const { error: leadErr } = await supabase.from("leads").insert({
              name: data.name,
              email: emailValue || null,
              phone: data.phone || null,
              message: data.message,
              service_type: data.service_type || null,
              source: data.source || "contact_form",
              status: "new",
            });
            if (leadErr) console.error("contact: leads insert returned error", leadErr);
          } catch (e) {
            console.error("contact: leads insert threw", e);
          }

        // 2. Build & enqueue admin notification email (best-effort — inquiry already saved)
        try {
          const template = TEMPLATES["contact-inquiry"];
          if (!template) throw new Error("contact-inquiry template not registered");

          const submittedAt = new Date(inserted.created_at).toLocaleString("en-IE", {
            timeZone: "Europe/Dublin",
          });
          const leadSource = data.source || "contact_form";
          const templateData = {
            name: data.name,
            email: emailValue,
            phone: data.phone,
            postcode: data.postcode,
            message: data.message,
            submittedAt,
            source: leadSource,
            serviceType: data.service_type ?? null,
          };

          const element = React.createElement(template.component, templateData);
          const html = await render(element);
          const text = await render(element, { plainText: true });
          const subject =
            typeof template.subject === "function"
              ? template.subject(templateData)
              : template.subject;

          const recipients = [template.to!, "dubdsltd@gmail.com", "info@painterdublin.eu"];

          for (const recipient of recipients) {
            const normalizedRecipient = recipient.toLowerCase();
            const messageId = `contact-${inserted.id}-${normalizedRecipient}`;

            // Get or create unsubscribe token (required by email API)
            let unsubscribeToken: string;
            const { data: existingToken } = await supabase
              .from("email_unsubscribe_tokens")
              .select("token, used_at")
              .eq("email", normalizedRecipient)
              .maybeSingle();

            if (existingToken && !existingToken.used_at) {
              unsubscribeToken = existingToken.token;
            } else {
              const bytes = new Uint8Array(32);
              crypto.getRandomValues(bytes);
              const newToken = Array.from(bytes)
                .map((b) => b.toString(16).padStart(2, "0"))
                .join("");
              await supabase
                .from("email_unsubscribe_tokens")
                .upsert(
                  { token: newToken, email: normalizedRecipient },
                  { onConflict: "email", ignoreDuplicates: true },
                );
              const { data: storedToken } = await supabase
                .from("email_unsubscribe_tokens")
                .select("token")
                .eq("email", normalizedRecipient)
                .maybeSingle();
              unsubscribeToken = storedToken?.token ?? newToken;
            }

            await supabase.from("email_send_log").insert({
              message_id: messageId,
              template_name: "contact-inquiry",
              recipient_email: recipient,
              status: "pending",
            });

            const { error: enqueueError } = await supabase.rpc("enqueue_email", {
              queue_name: "transactional_emails",
              payload: {
                message_id: messageId,
                to: recipient,
                from: `${SITE_NAME} <noreply@${FROM_DOMAIN}>`,
                ...(emailValue ? { reply_to: emailValue } : {}),
                sender_domain: SENDER_DOMAIN,
                subject,
                html,
                text,
                purpose: "transactional",
                label: "contact-inquiry",
                idempotency_key: messageId,
                unsubscribe_token: unsubscribeToken,
                queued_at: new Date().toISOString(),
              },
            });

            if (enqueueError) {
              console.error("Failed to enqueue contact email", enqueueError);
              await supabase.from("email_send_log").insert({
                message_id: messageId,
                template_name: "contact-inquiry",
                recipient_email: recipient,
                status: "failed",
                error_message: "Failed to enqueue: " + enqueueError.message,
              });
            }
          }
        } catch (e) {
          console.error("Contact email send failed (inquiry was saved)", e);
        }

          return Response.json({ success: true });
        } catch (e) {
          console.error("contact: unhandled error in POST handler", e);
          return Response.json({ error: "Internal error" }, { status: 500 });
        }
      },
    },
  },
});
