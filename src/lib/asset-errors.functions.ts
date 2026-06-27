import { createServerFn } from "@tanstack/react-start";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

export const getAssetErrors = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
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
      supabaseAdmin
        .from("asset_errors")
        .select("*", { count: "exact", head: true })
        .gte("created_at", since24),
      supabaseAdmin
        .from("asset_errors")
        .select("*", { count: "exact", head: true })
        .gte("created_at", since7),
      supabaseAdmin.from("asset_errors").select("asset_url").gte("created_at", since7),
    ]);

    const urlCounts = new Map<string, number>();
    for (const r of distinctUrls.data ?? [])
      urlCounts.set(r.asset_url, (urlCounts.get(r.asset_url) ?? 0) + 1);
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
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const { error } = await supabaseAdmin.from("asset_errors").delete().not("id", "is", null);
    if (error) throw error;
    return { ok: true };
  });

export const runAssetErrorCheck = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((input: { seedTest?: boolean } | undefined) => input ?? {})
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    let seededUrl: string | null = null;

    if (data.seedTest) {
      seededUrl = `https://allcolourspainter.com/test/manual-check-${Date.now()}.jpg`;
      const { error: insErr } = await supabaseAdmin.from("asset_errors").insert({
        asset_url: seededUrl,
        page_url: "https://allcolourspainter.com/admin/asset-errors",
        user_agent: "manual-admin-trigger/1.0",
        status: 404,
        referrer: null,
      });
      if (insErr) throw insErr;
    }

    const hookToken = process.env.HOOK_AUTH_TOKEN || "";
    const base = process.env.PUBLIC_SITE_URL || "https://allcolourspainter.com";
    const res = await fetch(`${base}/api/public/hooks/check-asset-errors`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-hook-token": hookToken,
        "x-triggered-by": data.seedTest ? "admin-test" : "admin-manual",
      },
    });
    const text = await res.text();
    let body: any = text;
    try {
      body = JSON.parse(text);
    } catch {}
    if (!res.ok) throw new Error(`Check failed (${res.status}): ${text}`);
    return { ok: true, seededUrl, result: body };
  });

export const getAssetErrorCheckRuns = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .inputValidator(
    (
      input:
        | {
            range?: "24h" | "7d" | "30d" | "all";
            page?: number;
            perPage?: number;
            sortBy?: "ran_at" | "status";
            sortOrder?: "asc" | "desc";
          }
        | undefined,
    ) => input ?? {},
  )
  .handler(async ({ data, context }) => {
    const isAdmin = await context.supabase.rpc("has_role", {
      _user_id: context.userId,
      _role: "admin",
    });
    if (!isAdmin.data) throw new Error("Forbidden");

    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const range = data.range ?? "7d";
    const page = Math.max(1, data.page ?? 1);
    const perPage = Math.max(5, Math.min(100, data.perPage ?? 20));
    const sortBy = data.sortBy ?? "ran_at";
    const sortOrder = data.sortOrder ?? "desc";

    const hours: Record<string, number | null> = {
      "24h": 24,
      "7d": 24 * 7,
      "30d": 24 * 30,
      all: null,
    };
    const h = hours[range];

    let q = supabaseAdmin
      .from("asset_error_check_runs")
      .select(
        "id, ran_at, total_last_24h, new_urls_count, new_urls, alerts_sent, triggered_by, duration_ms, status, error_message",
      )
      .order("ran_at", { ascending: false });
    if (h !== null) {
      q = q.gte("ran_at", new Date(Date.now() - h * 3600_000).toISOString());
    }
    const { data: rows, error } = await q;
    if (error) throw error;

    const allRuns = (rows ?? []) as any[];

    const sortedRuns = [...allRuns].sort((a, b) => {
      let cmp = 0;
      if (sortBy === "status") {
        cmp = String(a.status ?? "").localeCompare(String(b.status ?? ""));
      }
      // ran_at tie-break for status sort; primary for date sort
      const aDate = new Date(a.ran_at).getTime();
      const bDate = new Date(b.ran_at).getTime();
      if (cmp === 0) cmp = aDate - bDate;
      return sortOrder === "asc" ? cmp : -cmp;
    });

    const total = sortedRuns.length;
    const totalPages = Math.max(1, Math.ceil(total / perPage));
    const safePage = Math.min(page, totalPages);
    const start = (safePage - 1) * perPage;
    const runs = sortedRuns.slice(start, start + perPage);

    const summary = {
      total,
      withAlerts: allRuns.filter((r: any) => (r.alerts_sent ?? []).length > 0).length,
      totalNewUrls: allRuns.reduce((s: number, r: any) => s + (r.new_urls_count ?? 0), 0),
      lastRunAt: allRuns[0]?.ran_at ?? null,
    };

    return {
      range,
      page: safePage,
      perPage,
      totalPages,
      total,
      runs,
      summary,
    };
  });
