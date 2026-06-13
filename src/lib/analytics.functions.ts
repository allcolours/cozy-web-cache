import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getAnalytics = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await context.supabase
      .rpc("has_role", { _user_id: context.userId, _role: "admin" });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const since30 = new Date(Date.now() - 30 * 86400_000).toISOString();
    const since7 = new Date(Date.now() - 7 * 86400_000).toISOString();
    const since1 = new Date(Date.now() - 86400_000).toISOString();

    const [total, last30, last7, last1, byPath, recent, inquiries, unread] = await Promise.all([
      supabaseAdmin.from("page_views").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", since30),
      supabaseAdmin.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", since7),
      supabaseAdmin.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", since1),
      supabaseAdmin.from("page_views").select("path").gte("created_at", since30),
      supabaseAdmin.from("page_views").select("path, created_at, referrer").order("created_at", { ascending: false }).limit(20),
      supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }),
      supabaseAdmin.from("contact_submissions").select("*", { count: "exact", head: true }).eq("is_read", false),
    ]);

    const pathCounts = new Map<string, number>();
    for (const r of byPath.data ?? []) pathCounts.set(r.path, (pathCounts.get(r.path) ?? 0) + 1);
    const topPaths = [...pathCounts.entries()]
      .map(([path, count]) => ({ path, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      views: {
        total: total.count ?? 0,
        last30: last30.count ?? 0,
        last7: last7.count ?? 0,
        last24h: last1.count ?? 0,
      },
      inquiries: {
        total: inquiries.count ?? 0,
        unread: unread.count ?? 0,
      },
      topPaths,
      recent: recent.data ?? [],
    };
  });
