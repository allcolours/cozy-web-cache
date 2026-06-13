import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/inquiries")({
  component: InquiriesAdmin,
});

function InquiriesAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-inquiries"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("contact_submissions")
        .select("*")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data ?? [];
    },
  });

  async function toggleRead(id: string, is_read: boolean) {
    await supabase.from("contact_submissions").update({ is_read: !is_read }).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-inquiries"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
  }
  async function remove(id: string) {
    if (!confirm("Delete this inquiry?")) return;
    await supabase.from("contact_submissions").delete().eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-inquiries"] });
    qc.invalidateQueries({ queryKey: ["admin-dashboard"] });
  }

  return (
    <AdminShell title="Inquiries">
      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !data?.length ? (
        <p className="text-sm text-muted-foreground">No inquiries yet. Messages from the contact form will appear here.</p>
      ) : (
        <div className="space-y-4">
          {data.map((row) => (
            <article key={row.id} className={`border-l-[3px] bg-background p-5 ${row.is_read ? "border-border" : "border-primary"}`}>
              <header className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <h3 className="font-display text-base font-bold uppercase tracking-wide">{row.name}</h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    <a className="hover:text-primary" href={`mailto:${row.email}`}>{row.email}</a>
                    {row.phone && <> · <a className="hover:text-primary" href={`tel:${row.phone.replace(/\s/g, "")}`}>{row.phone}</a></>}
                    {row.postcode && <> · {row.postcode}</>}
                  </p>
                </div>
                <div className="text-right text-xs text-muted-foreground">
                  {new Date(row.created_at).toLocaleString()}
                  <div className="mt-2 flex gap-3">
                    <button onClick={() => toggleRead(row.id, row.is_read)} className="font-bold uppercase tracking-wider hover:text-primary">
                      Mark {row.is_read ? "unread" : "read"}
                    </button>
                    <button onClick={() => remove(row.id)} className="font-bold uppercase tracking-wider text-destructive hover:underline">
                      Delete
                    </button>
                  </div>
                </div>
              </header>
              <p className="mt-4 whitespace-pre-wrap text-sm text-foreground">{row.message}</p>
            </article>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
