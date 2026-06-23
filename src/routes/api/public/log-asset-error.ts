import { createFileRoute } from "@tanstack/react-router";
import { z } from "zod";

const PayloadSchema = z.object({
  asset_url: z.string().min(1).max(2048),
  page_url: z.string().max(2048).optional().nullable(),
  user_agent: z.string().max(500).optional().nullable(),
  status: z.number().int().optional().nullable(),
  referrer: z.string().max(2048).optional().nullable(),
});

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "POST, OPTIONS",
  "Access-Control-Allow-Headers": "content-type",
};

export const Route = createFileRoute("/api/public/log-asset-error")({
  server: {
    handlers: {
      OPTIONS: async () => new Response(null, { status: 204, headers: corsHeaders }),
      POST: async ({ request }) => {
        try {
          const body = await request.json();
          const parsed = PayloadSchema.safeParse(body);
          if (!parsed.success) {
            return new Response(JSON.stringify({ error: "invalid payload" }), {
              status: 400,
              headers: { "content-type": "application/json", ...corsHeaders },
            });
          }
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const { error } = await supabaseAdmin.from("asset_errors").insert({
            asset_url: parsed.data.asset_url,
            page_url: parsed.data.page_url ?? null,
            user_agent: parsed.data.user_agent ?? null,
            status: parsed.data.status ?? null,
            referrer: parsed.data.referrer ?? null,
          });
          if (error) {
            console.error("[log-asset-error] insert failed", error);
            return new Response(JSON.stringify({ error: "insert failed" }), {
              status: 500,
              headers: { "content-type": "application/json", ...corsHeaders },
            });
          }
          return new Response(JSON.stringify({ ok: true }), {
            status: 200,
            headers: { "content-type": "application/json", ...corsHeaders },
          });
        } catch (err) {
          console.error("[log-asset-error] error", err);
          return new Response(JSON.stringify({ error: "bad request" }), {
            status: 400,
            headers: { "content-type": "application/json", ...corsHeaders },
          });
        }
      },
    },
  },
});
