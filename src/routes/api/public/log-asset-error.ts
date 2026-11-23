import { createFileRoute } from "@tanstack/react-router";
import { AssetErrorPayloadSchema, ASSET_ERROR_WINDOW_MS, assetErrorLimitReached } from "@/lib/asset-error-validation";

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
          const parsed = AssetErrorPayloadSchema.safeParse(body);
          if (!parsed.success) {
            return new Response(JSON.stringify({ error: "invalid payload" }), {
              status: 400,
              headers: { "content-type": "application/json", ...corsHeaders },
            });
          }
          const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
          const forwarded = request.headers.get("cf-connecting-ip") || request.headers.get("x-forwarded-for") || request.headers.get("x-real-ip") || "unknown";
          const ip = (forwarded.split(",")[0] || "unknown").trim();
          const { count, error: limitError } = await supabaseAdmin.from("rate_limits")
            .select("id", { count: "exact", head: true })
            .eq("bucket", "asset_error").eq("ip", ip)
            .gte("created_at", new Date(Date.now() - ASSET_ERROR_WINDOW_MS).toISOString());
          if (limitError) return Response.json({ error: "Unable to check request limit" }, { status: 503, headers: corsHeaders });
          if (assetErrorLimitReached(count ?? 0)) return Response.json({ error: "Too many requests" }, { status: 429, headers: corsHeaders });
          const { error: recordError } = await supabaseAdmin.from("rate_limits").insert({ bucket: "asset_error", ip });
          if (recordError) return Response.json({ error: "Unable to record request limit" }, { status: 503, headers: corsHeaders });
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
