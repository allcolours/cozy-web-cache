import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { getAssetErrorCheckRuns } from "@/lib/asset-errors.functions";
import { useState, useMemo } from "react";

type Range = "24h" | "7d" | "30d" | "all";
type SortBy = "ran_at" | "status";
type SortOrder = "asc" | "desc";

const RANGES: { id: Range; label: string }[] = [
  { id: "24h", label: "24 hours" },
  { id: "7d", label: "7 days" },
  { id: "30d", label: "30 days" },
  { id: "all", label: "All" },
];

const PER_PAGE_OPTIONS = [10, 20, 50];

export const Route = createFileRoute("/_authenticated/admin/asset-error-runs")({
  component: CheckRunsPage,
});

function CheckRunsPage() {
  const fetchRuns = useServerFn(getAssetErrorCheckRuns);
  const [range, setRange] = useState<Range>("7d");
  const [sortBy, setSortBy] = useState<SortBy>("ran_at");
  const [sortOrder, setSortOrder] = useState<SortOrder>("desc");
  const [page, setPage] = useState(1);
  const [perPage, setPerPage] = useState(20);

  const params = useMemo(
    () => ({ range, page, perPage, sortBy, sortOrder }),
    [range, page, perPage, sortBy, sortOrder],
  );

  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-asset-error-runs", params],
    queryFn: () => fetchRuns({ data: params }),
    refetchInterval: 60_000,
  });

  const setSort = (column: SortBy) => {
    if (sortBy === column) {
      setSortOrder((o) => (o === "asc" ? "desc" : "asc"));
    } else {
      setSortBy(column);
      setSortOrder(column === "ran_at" ? "desc" : "asc");
    }
    setPage(1);
  };

  const sortIndicator = (column: SortBy) => {
    if (sortBy !== column) return <span className="text-muted-foreground/50">↕</span>;
    return <span className="text-primary">{sortOrder === "asc" ? "↑" : "↓"}</span>;
  };

  const goToPage = (p: number) => {
    if (!data) return;
    setPage(Math.max(1, Math.min(p, data.totalPages)));
  };

  return (
    <AdminShell title="Asset 404 — Check Runs">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <span className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
            Time range
          </span>
          {RANGES.map((r) => (
            <button
              key={r.id}
              onClick={() => {
                setRange(r.id);
                setPage(1);
              }}
              className={`rounded-md px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                range === r.id
                  ? "bg-primary text-primary-foreground"
                  : "border border-border bg-background hover:bg-muted"
              }`}
            >
              {r.label}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-center gap-3">
          <div className="flex items-center gap-2">
            <label
              htmlFor="perPage"
              className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground"
            >
              Per page
            </label>
            <select
              id="perPage"
              value={perPage}
              onChange={(e) => {
                setPerPage(Number(e.target.value));
                setPage(1);
              }}
              className="rounded-md border border-border bg-background px-2 py-1.5 text-xs font-medium focus:outline-none focus:ring-1 focus:ring-ring"
            >
              {PER_PAGE_OPTIONS.map((n) => (
                <option key={n} value={n}>
                  {n}
                </option>
              ))}
            </select>
          </div>

          <div className="flex items-center gap-2">
            <label className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              Sort by
            </label>
            <button
              onClick={() => setSort("ran_at")}
              className={`rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                sortBy === "ran_at"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              Date {sortIndicator("ran_at")}
            </button>
            <button
              onClick={() => setSort("status")}
              className={`rounded-md border px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                sortBy === "status"
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-background hover:bg-muted"
              }`}
            >
              Status {sortIndicator("status")}
            </button>
          </div>
        </div>
      </div>

      {isLoading && <p className="mt-6 text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="mt-6 text-sm text-destructive">{(error as Error).message}</p>}

      {data && (
        <>
          <div className="mt-6 grid gap-4 sm:grid-cols-4">
            {[
              { label: "Runs", value: data.summary.total },
              { label: "Runs with alerts", value: data.summary.withAlerts },
              { label: "New URLs found", value: data.summary.totalNewUrls },
              {
                label: "Last run",
                value: data.summary.lastRunAt
                  ? new Date(data.summary.lastRunAt).toLocaleString()
                  : "—",
              },
            ].map((t) => (
              <div key={t.label} className="border-t-[3px] border-primary bg-background p-5">
                <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
                  {t.label}
                </div>
                <div className="mt-2 font-display text-xl font-extrabold">{String(t.value)}</div>
              </div>
            ))}
          </div>

          <section className="mt-8 overflow-x-auto bg-background">
            {data.runs.length === 0 ? (
              <p className="p-6 text-sm text-muted-foreground">No runs in this range.</p>
            ) : (
              <>
                <table className="w-full min-w-[820px] text-left text-xs">
                  <thead className="border-b border-border bg-muted/40">
                    <tr className="font-display uppercase tracking-wider">
                      <th className="px-4 py-3">
                        <button
                          onClick={() => setSort("ran_at")}
                          className="flex items-center gap-1 font-display uppercase tracking-wider hover:text-primary"
                        >
                          When {sortIndicator("ran_at")}
                        </button>
                      </th>
                      <th className="px-4 py-3">Trigger</th>
                      <th className="px-4 py-3 text-right">404s (24h)</th>
                      <th className="px-4 py-3 text-right">New URLs</th>
                      <th className="px-4 py-3">Alerts</th>
                      <th className="px-4 py-3">URLs found</th>
                      <th className="px-4 py-3 text-right">Duration</th>
                      <th className="px-4 py-3">
                        <button
                          onClick={() => setSort("status")}
                          className="flex items-center gap-1 font-display uppercase tracking-wider hover:text-primary"
                        >
                          Status {sortIndicator("status")}
                        </button>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.runs.map((r: any) => {
                      const urls = Array.isArray(r.new_urls) ? (r.new_urls as string[]) : [];
                      const alerts = (r.alerts_sent ?? []) as string[];
                      return (
                        <tr key={r.id} className="border-b border-border align-top">
                          <td className="px-4 py-3 font-mono text-muted-foreground">
                            {new Date(r.ran_at).toLocaleString()}
                          </td>
                          <td className="px-4 py-3">
                            <span className="rounded bg-muted px-1.5 py-0.5 font-bold">
                              {r.triggered_by}
                            </span>
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums">{r.total_last_24h}</td>
                          <td className="px-4 py-3 text-right tabular-nums">
                            {r.new_urls_count > 0 ? (
                              <span className="font-bold text-destructive">{r.new_urls_count}</span>
                            ) : (
                              <span className="text-muted-foreground">0</span>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {alerts.length === 0 ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              <div className="flex flex-wrap gap-1">
                                {alerts.map((a) => (
                                  <span
                                    key={a}
                                    className="rounded bg-destructive/10 px-1.5 py-0.5 text-[10px] font-bold uppercase text-destructive"
                                  >
                                    {a}
                                  </span>
                                ))}
                              </div>
                            )}
                          </td>
                          <td className="px-4 py-3">
                            {urls.length === 0 ? (
                              <span className="text-muted-foreground">—</span>
                            ) : (
                              <details>
                                <summary className="cursor-pointer text-foreground">
                                  {urls.length} URL{urls.length === 1 ? "" : "s"}
                                </summary>
                                <ul className="mt-2 space-y-1">
                                  {urls.slice(0, 25).map((u) => (
                                    <li
                                      key={u}
                                      className="truncate font-mono text-[11px]"
                                      title={u}
                                    >
                                      {u}
                                    </li>
                                  ))}
                                  {urls.length > 25 && (
                                    <li className="text-muted-foreground">
                                      +{urls.length - 25} more
                                    </li>
                                  )}
                                </ul>
                              </details>
                            )}
                          </td>
                          <td className="px-4 py-3 text-right tabular-nums text-muted-foreground">
                            {r.duration_ms != null ? `${r.duration_ms} ms` : "—"}
                          </td>
                          <td className="px-4 py-3">
                            {r.status === "ok" ? (
                              <span className="rounded bg-emerald-500/10 px-1.5 py-0.5 font-bold text-emerald-700">
                                ok
                              </span>
                            ) : (
                              <span
                                className="rounded bg-destructive/10 px-1.5 py-0.5 font-bold text-destructive"
                                title={r.error_message ?? ""}
                              >
                                {r.status}
                              </span>
                            )}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>

                <div className="flex flex-col items-center justify-between gap-3 border-t border-border p-4 sm:flex-row">
                  <p className="text-xs text-muted-foreground">
                    Showing {data.runs.length} of {data.total} runs · Page {data.page} of{" "}
                    {data.totalPages}
                  </p>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => goToPage(data.page - 1)}
                      disabled={data.page <= 1}
                      className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Previous
                    </button>
                    {Array.from({ length: data.totalPages }, (_, i) => i + 1)
                      .filter(
                        (p) => p === 1 || p === data.totalPages || Math.abs(p - data.page) <= 1,
                      )
                      .reduce<(number | string)[]>((acc, p, idx, arr) => {
                        if (
                          idx > 0 &&
                          typeof arr[idx - 1] === "number" &&
                          p - (arr[idx - 1] as number) > 1
                        ) {
                          acc.push("…");
                        }
                        acc.push(p);
                        return acc;
                      }, [])
                      .map((p) =>
                        typeof p === "string" ? (
                          <span
                            key={`gap-${p}-${Math.random()}`}
                            className="px-1 text-xs text-muted-foreground"
                          >
                            {p}
                          </span>
                        ) : (
                          <button
                            key={p}
                            onClick={() => goToPage(p)}
                            className={`min-w-[2rem] rounded-md px-3 py-1.5 text-xs font-bold transition-colors ${
                              p === data.page
                                ? "bg-primary text-primary-foreground"
                                : "border border-border bg-background hover:bg-muted"
                            }`}
                          >
                            {p}
                          </button>
                        ),
                      )}
                    <button
                      onClick={() => goToPage(data.page + 1)}
                      disabled={data.page >= data.totalPages}
                      className="rounded-md border border-border bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors hover:bg-muted disabled:cursor-not-allowed disabled:opacity-50"
                    >
                      Next
                    </button>
                  </div>
                </div>
              </>
            )}
          </section>
        </>
      )}
    </AdminShell>
  );
}
