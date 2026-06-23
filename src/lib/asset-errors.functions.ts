import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getAssetErrors = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await context.supabase
      .rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since24 = new Date(Date.now() - 86400_000).toISOString();
    const since7 = new Date(Date.now() - 7 * 86400_000).toISOString();

    const [recent, total24, total7, distinctUrls] = await Promise.all([
      supabaseAdmin
        .from("asset_errors")
        .select("id, asset_url, page_url, status, created_at")
        .order("created_at", { ascending: false })
        .limit(200),
      supabaseAdmin.from("asset_errors").select("*", { count: "exact", head: true }).gte("created_at", since24),
      supabaseAdmin.from("asset_errors").select("*", { count: "exact", head: true }).gte("created_at", since7),
      supabaseAdmin.from("asset_errors").select("asset_url").gte("created_at", since7),
    ]);

    const urlCounts = new Map<string, number>();
    for (const r of distinctUrls.data ?? []) urlCounts.set(r.asset_url, (urlCounts.get(r.asset_url) ?? 0) + 1);
    const topBroken = [...urlCounts.entries()]
      .map(([url, count]) => ({ url, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 20);

    return {
      counts: {
        last24h: total24.count ?? 0,
        last7d: total7.count ?? 0,
        uniqueUrls7d: urlCounts.size,
      },
      topBroken,
      recent: recent.data ?? [],
    };
  });

export const clearAssetErrors = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await context.supabase
      .rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin.data) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("asset_errors").delete().not("id", "is", null);
    if (error) throw error;
    return { ok: true };
  });
