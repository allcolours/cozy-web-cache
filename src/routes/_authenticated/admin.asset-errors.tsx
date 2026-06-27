import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import {
  getAssetErrors,
  clearAssetErrors,
  runAssetErrorCheck,
} from "@/lib/asset-errors.functions";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/asset-errors")({
  component: AssetErrorsPage,
});

function AssetErrorsPage() {
  const fetchErrors = useServerFn(getAssetErrors);
  const clearAll = useServerFn(clearAssetErrors);
  const runCheck = useServerFn(runAssetErrorCheck);
  const qc = useQueryClient();
  const [lastRun, setLastRun] = useState<string | null>(null);

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-asset-errors"],
    queryFn: () => fetchErrors(),
    refetchInterval: 30_000,
  });

  const clearMutation = useMutation({
    mutationFn: () => clearAll(),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-asset-errors"] }),
  });

  const checkMutation = useMutation({
    mutationFn: (seedTest: boolean) => runCheck({ data: { seedTest } }),
    onSuccess: (res: any) => {
      const r = res?.result ?? res;
      setLastRun(
        `✓ ran at ${new Date().toLocaleTimeString()} · ${r?.totalLast24h ?? 0} in 24h · ${r?.newUrlsCount ?? 0} new · alerts: ${(r?.alertsSent ?? []).join(", ") || "none"}`,
      );
      qc.invalidateQueries({ queryKey: ["admin-asset-errors"] });
    },
    onError: (e) => setLastRun(`✗ ${(e as Error).message}`),
  });

  return (
    <AdminShell title="Asset 404 Monitor">
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-destructive">{(error as Error).message}</p>}
      {data && (
        <>
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { label: "Last 24 hours", value: data.counts.last24h },
              { label: "Last 7 days", value: data.counts.last7d },
              { label: "Unique URLs (7d)", value: data.counts.uniqueUrls7d },
            ].map((t) => (
              <div key={t.label} className="border-t-[3px] border-primary bg-background p-6">
                <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {t.label}
                </div>
                <div className="mt-3 font-display text-3xl font-extrabold">{t.value}</div>
              </div>
            ))}
          </div>

          <section className="mt-6 flex flex-wrap items-center gap-3 border border-border bg-background p-4">
            <button
              onClick={() => checkMutation.mutate(false)}
              disabled={checkMutation.isPending}
              className="rounded-md bg-primary px-3 py-1.5 text-xs font-bold text-primary-foreground hover:opacity-90 disabled:opacity-50"
            >
              {checkMutation.isPending ? "Running…" : "Run check now"}
            </button>
            <button
              onClick={() => checkMutation.mutate(true)}
              disabled={checkMutation.isPending}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50"
              title="Inserts a synthetic 404 then triggers the check — sends a real test email"
            >
              Send test email
            </button>
            {lastRun && <span className="text-xs text-muted-foreground">{lastRun}</span>}
          </section>

          <div className="mt-8 flex items-center justify-between">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider">
              Top broken assets (7 days)
            </h3>
            <button
              onClick={() => clearMutation.mutate()}
              disabled={clearMutation.isPending}
              className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-medium hover:bg-muted disabled:opacity-50"
            >
              {clearMutation.isPending ? "Clearing…" : "Clear all"}
            </button>
          </div>


          <section className="mt-3 bg-background p-6">
            {data.topBroken.length === 0 && (
              <p className="text-sm text-muted-foreground">
                ✓ No broken assets detected. Monitor is active.
              </p>
            )}
            <ul className="space-y-2 text-sm">
              {data.topBroken.map((b) => (
                <li
                  key={b.url}
                  className="flex items-center justify-between gap-4 border-b border-border py-2"
                >
                  <a
                    href={b.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="truncate text-foreground underline-offset-2 hover:underline"
                    title={b.url}
                  >
                    {b.url}
                  </a>
                  <span className="shrink-0 rounded bg-destructive/10 px-2 py-0.5 text-xs font-bold text-destructive">
                    {b.count}×
                  </span>
                </li>
              ))}
            </ul>
          </section>

          <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-wider">
            Recent events
          </h3>
          <section className="mt-3 bg-background p-6">
            {data.recent.length === 0 && (
              <p className="text-sm text-muted-foreground">No events logged yet.</p>
            )}
            <div className="space-y-2 text-xs">
              {data.recent.map((r) => (
                <div key={r.id} className="border-b border-border py-2">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-mono text-muted-foreground">
                      {new Date(r.created_at).toLocaleString()}
                    </span>
                    {r.status != null && (
                      <span className="rounded bg-muted px-1.5 py-0.5 font-bold">
                        {r.status}
                      </span>
                    )}
                  </div>
                  <div className="mt-1 truncate text-foreground" title={r.asset_url}>
                    {r.asset_url}
                  </div>
                  {r.page_url && (
                    <div className="truncate text-muted-foreground" title={r.page_url}>
                      on {r.page_url}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </section>
        </>
      )}
    </AdminShell>
  );
}
