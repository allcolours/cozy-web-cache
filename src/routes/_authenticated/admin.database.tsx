import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/database")({
  component: DatabasePage,
});

type TopTable = {
  schema_name: string;
  table_name: string;
  size_bytes: number;
  size_pretty: string;
  row_est: number;
};

type CronJob = {
  jobid: number;
  jobname: string | null;
  schedule: string;
  active: boolean;
  command: string;
  last_start: string | null;
  last_end: string | null;
  last_status: string | null;
  runs_24h: number;
  failures_24h: number;
};

function fmt(ts: string | null) {
  if (!ts) return "—";
  return new Date(ts).toLocaleString();
}

function DatabasePage() {
  const sizeQ = useQuery({
    queryKey: ["admin-db-size"],
    refetchInterval: 15000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_db_size");
      if (error) throw error;
      return data?.[0] as { size_bytes: number; size_pretty: string } | undefined;
    },
  });

  const tablesQ = useQuery({
    queryKey: ["admin-top-tables"],
    refetchInterval: 30000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_top_tables", { limit_count: 15 });
      if (error) throw error;
      return (data ?? []) as TopTable[];
    },
  });

  const cronQ = useQuery({
    queryKey: ["admin-cron-jobs"],
    refetchInterval: 15000,
    queryFn: async () => {
      const { data, error } = await supabase.rpc("admin_cron_jobs");
      if (error) throw error;
      return (data ?? []) as CronJob[];
    },
  });

  const totalBytes = sizeQ.data?.size_bytes ?? 0;

  return (
    <AdminShell title="Database">
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="border-t-[3px] border-border bg-background p-6">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Database size
          </div>
          <div className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            {sizeQ.isLoading ? "…" : (sizeQ.data?.size_pretty ?? "—")}
          </div>
          {sizeQ.error ? <div className="mt-2 text-xs text-destructive">{(sizeQ.error as Error).message}</div> : null}
        </div>
        <div className="border-t-[3px] border-border bg-background p-6">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Tables tracked
          </div>
          <div className="mt-3 font-display text-3xl font-extrabold tracking-tight">{tablesQ.data?.length ?? "—"}</div>
        </div>
        <div className="border-t-[3px] border-border bg-background p-6">
          <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Cron jobs
          </div>
          <div className="mt-3 font-display text-3xl font-extrabold tracking-tight">
            {cronQ.data?.length ?? "—"}
            <span className="ml-2 text-sm font-normal text-muted-foreground">
              ({cronQ.data?.filter((j) => j.active).length ?? 0} active)
            </span>
          </div>
        </div>
      </div>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-lg font-bold uppercase tracking-wider">Top tables by size</h2>
          <span className="text-xs text-muted-foreground">refreshes every 30s</span>
        </div>
        <div className="overflow-x-auto border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2">Table</th>
                <th className="px-3 py-2 text-right">Size</th>
                <th className="px-3 py-2 text-right">% of DB</th>
                <th className="px-3 py-2 text-right">Row estimate</th>
              </tr>
            </thead>
            <tbody>
              {tablesQ.data?.map((t) => {
                const pct = totalBytes > 0 ? (t.size_bytes / totalBytes) * 100 : 0;
                return (
                  <tr key={`${t.schema_name}.${t.table_name}`} className="border-t border-border">
                    <td className="px-3 py-2 font-mono text-xs">
                      <span className="text-muted-foreground">{t.schema_name}.</span>
                      {t.table_name}
                    </td>
                    <td className="px-3 py-2 text-right tabular-nums">{t.size_pretty}</td>
                    <td className="px-3 py-2 text-right tabular-nums">{pct.toFixed(1)}%</td>
                    <td className="px-3 py-2 text-right tabular-nums">{t.row_est.toLocaleString()}</td>
                  </tr>
                );
              })}
              {!tablesQ.isLoading && (tablesQ.data?.length ?? 0) === 0 ? (
                <tr><td className="px-3 py-4 text-muted-foreground" colSpan={4}>No data</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>

      <section className="mt-8">
        <div className="mb-3 flex items-baseline justify-between">
          <h2 className="font-display text-lg font-bold uppercase tracking-wider">pg_cron jobs</h2>
          <span className="text-xs text-muted-foreground">refreshes every 15s</span>
        </div>
        <div className="overflow-x-auto border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="bg-secondary/50 text-left text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-2">#</th>
                <th className="px-3 py-2">Name</th>
                <th className="px-3 py-2">Schedule</th>
                <th className="px-3 py-2">Active</th>
                <th className="px-3 py-2">Last run</th>
                <th className="px-3 py-2">Last status</th>
                <th className="px-3 py-2 text-right">24h runs</th>
                <th className="px-3 py-2 text-right">24h fails</th>
              </tr>
            </thead>
            <tbody>
              {cronQ.data?.map((j) => (
                <tr key={j.jobid} className="border-t border-border align-top">
                  <td className="px-3 py-2 tabular-nums text-muted-foreground">{j.jobid}</td>
                  <td className="px-3 py-2">
                    <div className="font-medium">{j.jobname ?? <span className="text-muted-foreground">—</span>}</div>
                    <details className="mt-1">
                      <summary className="cursor-pointer text-xs text-muted-foreground hover:text-foreground">command</summary>
                      <pre className="mt-1 max-w-xl overflow-x-auto whitespace-pre-wrap break-all rounded-sm bg-secondary/50 p-2 text-[11px] leading-snug">{j.command}</pre>
                    </details>
                  </td>
                  <td className="px-3 py-2 font-mono text-xs">{j.schedule}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${j.active ? "bg-emerald-100 text-emerald-900" : "bg-muted text-muted-foreground"}`}>
                      {j.active ? "yes" : "no"}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-xs text-muted-foreground">{fmt(j.last_start)}</td>
                  <td className="px-3 py-2">
                    {j.last_status ? (
                      <span className={`inline-block rounded-sm px-2 py-0.5 text-[11px] font-bold uppercase tracking-wider ${j.last_status === "succeeded" ? "bg-emerald-100 text-emerald-900" : "bg-destructive/10 text-destructive"}`}>
                        {j.last_status}
                      </span>
                    ) : <span className="text-muted-foreground">—</span>}
                  </td>
                  <td className="px-3 py-2 text-right tabular-nums">{j.runs_24h}</td>
                  <td className={`px-3 py-2 text-right tabular-nums ${j.failures_24h > 0 ? "text-destructive font-semibold" : ""}`}>{j.failures_24h}</td>
                </tr>
              ))}
              {!cronQ.isLoading && (cronQ.data?.length ?? 0) === 0 ? (
                <tr><td className="px-3 py-4 text-muted-foreground" colSpan={8}>No cron jobs scheduled</td></tr>
              ) : null}
            </tbody>
          </table>
        </div>
      </section>
    </AdminShell>
  );
}
