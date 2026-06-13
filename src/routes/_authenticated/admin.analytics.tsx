import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAnalytics } from "@/lib/analytics.functions";

export const Route = createFileRoute("/_authenticated/admin/analytics")({
  component: AnalyticsPage,
});

function AnalyticsPage() {
  const fetchAnalytics = useServerFn(getAnalytics);
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-analytics"],
    queryFn: () => fetchAnalytics(),
  });

  return (
    <AdminShell title="Analytics">
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-destructive">{(error as Error).message}</p>}
      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { label: "Last 24 hours", value: data.views.last24h },
              { label: "Last 7 days", value: data.views.last7 },
              { label: "Last 30 days", value: data.views.last30 },
              { label: "All time", value: data.views.total },
            ].map((t) => (
              <div key={t.label} className="border-t-[3px] border-primary bg-background p-6">
                <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{t.label}</div>
                <div className="mt-3 font-display text-3xl font-extrabold">{t.value}</div>
              </div>
            ))}
          </div>

          <div className="mt-8 grid gap-6 md:grid-cols-2">
            <section className="bg-background p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Top pages (30 days)</h3>
              <div className="mt-3 h-[2px] w-10 bg-primary" />
              <ul className="mt-4 space-y-2 text-sm">
                {data.topPaths.length === 0 && <li className="text-muted-foreground">No data yet.</li>}
                {data.topPaths.map((p) => (
                  <li key={p.path} className="flex items-center justify-between border-b border-border py-1">
                    <span className="truncate">{p.path}</span>
                    <span className="font-bold">{p.count}</span>
                  </li>
                ))}
              </ul>
            </section>

            <section className="bg-background p-6">
              <h3 className="font-display text-sm font-bold uppercase tracking-wider">Inquiries</h3>
              <div className="mt-3 h-[2px] w-10 bg-primary" />
              <div className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between"><span>Total received</span><span className="font-bold">{data.inquiries.total}</span></div>
                <div className="flex justify-between"><span>Unread</span><span className="font-bold text-primary">{data.inquiries.unread}</span></div>
              </div>
            </section>
          </div>

          <section className="mt-8 bg-background p-6">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">Recent visits</h3>
            <div className="mt-3 h-[2px] w-10 bg-primary" />
            <ul className="mt-4 space-y-1 text-xs">
              {data.recent.map((r, i) => (
                <li key={i} className="flex flex-wrap gap-x-4 border-b border-border py-1">
                  <span className="text-muted-foreground">{new Date(r.created_at).toLocaleString()}</span>
                  <span className="font-semibold">{r.path}</span>
                  {r.referrer && <span className="truncate text-muted-foreground">← {r.referrer}</span>}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </AdminShell>
  );
}
