import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/leads")({
  component: LeadsAdmin,
});

type Lead = {
  id: string;
  name: string | null;
  phone: string | null;
  email: string | null;
  service_type: string | null;
  message: string | null;
  source: string | null;
  status: "new" | "contacted" | "quoted" | "won" | "lost";
  notes: string | null;
  created_at: string;
};

const STATUSES: Lead["status"][] = ["new", "contacted", "quoted", "won", "lost"];

const STATUS_STYLES: Record<Lead["status"], string> = {
  new: "bg-blue-100 text-blue-800",
  contacted: "bg-yellow-100 text-yellow-800",
  quoted: "bg-orange-100 text-orange-800",
  won: "bg-green-100 text-green-800",
  lost: "bg-gray-200 text-gray-700",
};

function LeadsAdmin() {
  const qc = useQueryClient();
  const [expanded, setExpanded] = useState<string | null>(null);

  const { data: leads = [], isLoading } = useQuery({
    queryKey: ["admin-leads"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("leads")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return (data ?? []) as Lead[];
    },
  });

  function invalidate() {
    qc.invalidateQueries({ queryKey: ["admin-leads"] });
    qc.invalidateQueries({ queryKey: ["admin-new-leads-count"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
  }

  async function updateStatus(id: string, status: Lead["status"]) {
    await supabase.from("leads").update({ status }).eq("id", id);
    invalidate();
  }

  async function updateNotes(id: string, notes: string) {
    await supabase.from("leads").update({ notes }).eq("id", id);
    invalidate();
  }

  async function remove(id: string) {
    if (!confirm("Delete this lead? This cannot be undone.")) return;
    await supabase.from("leads").delete().eq("id", id);
    if (expanded === id) setExpanded(null);
    invalidate();
  }

  return (
    <AdminShell title="Leads">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : leads.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No leads yet. Submissions from the homepage quote form and contact form will appear here.
        </p>
      ) : (
        <div className="overflow-hidden rounded-sm border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary text-left text-[11px] uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-4 py-3">Name</th>
                <th className="px-4 py-3">Phone</th>
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Received</th>
                <th className="px-4 py-3">Status</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            {leads.map((lead) => {
              const isOpen = expanded === lead.id;
              return (
                <tbody key={lead.id}>
                  <tr
                    onClick={() => setExpanded(isOpen ? null : lead.id)}
                    className={`cursor-pointer border-b border-border transition-colors hover:bg-secondary/50 ${isOpen ? "bg-secondary/50" : ""}`}
                  >
                    <td className="px-4 py-3 font-medium">
                      {lead.name || <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3">
                      {lead.phone ? (
                        <a
                          href={`tel:${lead.phone}`}
                          onClick={(e) => e.stopPropagation()}
                          className="hover:text-primary"
                        >
                          {lead.phone}
                        </a>
                      ) : (
                        <span className="text-muted-foreground">—</span>
                      )}
                    </td>
                    <td className="px-4 py-3">
                      {lead.service_type || <span className="text-muted-foreground">—</span>}
                    </td>
                    <td className="px-4 py-3 text-muted-foreground">
                      {new Date(lead.created_at).toLocaleDateString("en-IE", {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td className="px-4 py-3">
                      <span
                        className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wider ${STATUS_STYLES[lead.status]}`}
                      >
                        {lead.status}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-right text-xs text-muted-foreground">
                      {isOpen ? "▴" : "▾"}
                    </td>
                  </tr>
                  {isOpen && (
                    <tr className="border-b border-border bg-secondary/30">
                      <td colSpan={6} className="px-4 py-5">
                        <div className="grid gap-5 md:grid-cols-2">
                          <div className="space-y-3 text-sm">
                            <DetailRow
                              label="Email"
                              value={
                                lead.email && (
                                  <a href={`mailto:${lead.email}`} className="hover:text-primary">
                                    {lead.email}
                                  </a>
                                )
                              }
                            />
                            <DetailRow
                              label="Phone"
                              value={
                                lead.phone && (
                                  <a href={`tel:${lead.phone}`} className="hover:text-primary">
                                    {lead.phone}
                                  </a>
                                )
                              }
                            />
                            <DetailRow label="Service" value={lead.service_type} />
                            <DetailRow label="Source" value={lead.source} />
                            <DetailRow
                              label="Received"
                              value={new Date(lead.created_at).toLocaleString("en-IE")}
                            />
                            {lead.message && (
                              <div>
                                <div className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                  Message
                                </div>
                                <p className="mt-1 whitespace-pre-wrap text-sm">{lead.message}</p>
                              </div>
                            )}
                          </div>
                          <div className="space-y-4">
                            <div>
                              <label className="block font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Status
                              </label>
                              <select
                                value={lead.status}
                                onChange={(e) =>
                                  updateStatus(lead.id, e.target.value as Lead["status"])
                                }
                                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              >
                                {STATUSES.map((s) => (
                                  <option key={s} value={s}>
                                    {s}
                                  </option>
                                ))}
                              </select>
                            </div>
                            <div>
                              <label className="block font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
                                Notes
                              </label>
                              <textarea
                                defaultValue={lead.notes ?? ""}
                                onBlur={(e) => {
                                  if ((e.target.value || "") !== (lead.notes ?? "")) {
                                    updateNotes(lead.id, e.target.value);
                                  }
                                }}
                                rows={5}
                                placeholder="Add internal notes (saves on blur)…"
                                className="mt-1 w-full rounded-sm border border-border bg-background px-3 py-2 text-sm focus:border-primary focus:outline-none"
                              />
                            </div>
                            <button
                              onClick={() => remove(lead.id)}
                              className="rounded-sm border border-red-300 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-red-700 hover:bg-red-50"
                            >
                              Delete lead
                            </button>
                          </div>
                        </div>
                      </td>
                    </tr>
                  )}
                </tbody>
              );
            })}
          </table>
        </div>
      )}
    </AdminShell>
  );
}

function DetailRow({ label, value }: { label: string; value: React.ReactNode }) {
  if (!value) return null;
  return (
    <div>
      <div className="font-display text-[10px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </div>
      <div className="mt-1">{value}</div>
    </div>
  );
}
