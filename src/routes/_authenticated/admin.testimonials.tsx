import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/testimonials")({
  component: TestimonialsAdmin,
});

type Row = {
  id: string;
  author_name: string;
  author_role: string | null;
  location: string | null;
  content: string;
  rating: number;
  project_type: string | null;
  visible: boolean;
  sort_order: number;
};

const empty: Omit<Row, "id"> = {
  author_name: "",
  author_role: "",
  location: "",
  content: "",
  rating: 5,
  project_type: "",
  visible: true,
  sort_order: 0,
};

function TestimonialsAdmin() {
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-testimonials"],
    queryFn: async () => {
      const { data, error } = await supabase.from("testimonials").select("*").order("sort_order").order("created_at", { ascending: false });
      if (error) throw error;
      return data as Row[];
    },
  });

  const [editing, setEditing] = useState<Row | (Omit<Row, "id"> & { id?: string }) | null>(null);

  const save = useMutation({
    mutationFn: async (row: any) => {
      if (row.id) {
        const { error } = await supabase.from("testimonials").update(row).eq("id", row.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from("testimonials").insert(row);
        if (error) throw error;
      }
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-testimonials"] });
      setEditing(null);
    },
  });

  const del = useMutation({
    mutationFn: async (id: string) => {
      const { error } = await supabase.from("testimonials").delete().eq("id", id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });

  const toggle = useMutation({
    mutationFn: async (r: Row) => {
      const { error } = await supabase.from("testimonials").update({ visible: !r.visible }).eq("id", r.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-testimonials"] }),
  });

  return (
    <AdminShell title="Testimonials">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data?.length ?? 0} reviews</p>
        <button
          onClick={() => setEditing({ ...empty, sort_order: (data?.length ?? 0) })}
          className="rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
        >
          + Add review
        </button>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {data && data.length > 0 && (
        <div className="overflow-hidden rounded-md border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-3">Author</th>
                <th className="px-3 py-3">Review</th>
                <th className="px-3 py-3">Rating</th>
                <th className="px-3 py-3">Order</th>
                <th className="px-3 py-3">Visible</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((r) => (
                <tr key={r.id} className="border-b border-border last:border-0">
                  <td className="px-3 py-3 align-top">
                    <div className="font-medium">{r.author_name}</div>
                    <div className="text-xs text-muted-foreground">{r.author_role} {r.location ? `· ${r.location}` : ""}</div>
                  </td>
                  <td className="px-3 py-3 align-top text-foreground/80">
                    <div className="line-clamp-2 max-w-md">{r.content}</div>
                    {r.project_type && <div className="mt-1 text-xs text-primary">{r.project_type}</div>}
                  </td>
                  <td className="px-3 py-3 align-top">{"★".repeat(r.rating)}</td>
                  <td className="px-3 py-3 align-top text-muted-foreground">{r.sort_order}</td>
                  <td className="px-3 py-3 align-top">
                    <button onClick={() => toggle.mutate(r)} className={`relative inline-flex h-5 w-9 items-center rounded-full ${r.visible ? "bg-[#16a34a]" : "bg-muted-foreground/30"}`} aria-label="Toggle visible">
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${r.visible ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-3 py-3 text-right align-top">
                    <button onClick={() => setEditing(r)} className="mr-3 text-xs font-bold uppercase tracking-wider text-primary hover:underline">Edit</button>
                    <button onClick={() => confirm(`Delete review by ${r.author_name}?`) && del.mutate(r.id)} className="text-xs font-bold uppercase tracking-wider text-destructive hover:underline">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onClick={() => setEditing(null)}>
          <div className="max-h-[90vh] w-full max-w-2xl overflow-auto rounded-md bg-background p-6 shadow-xl" onClick={(e) => e.stopPropagation()}>
            <h2 className="font-display text-xl font-bold uppercase">{(editing as any).id ? "Edit" : "Add"} review</h2>
            <form
              className="mt-6 space-y-4"
              onSubmit={(e) => {
                e.preventDefault();
                save.mutate(editing);
              }}
            >
              <div className="grid gap-4 sm:grid-cols-2">
                <Field label="Author name">
                  <input required value={editing.author_name} onChange={(e) => setEditing({ ...editing, author_name: e.target.value })} className="input" />
                </Field>
                <Field label="Role">
                  <input value={editing.author_role ?? ""} onChange={(e) => setEditing({ ...editing, author_role: e.target.value })} className="input" />
                </Field>
                <Field label="Location">
                  <input value={editing.location ?? ""} onChange={(e) => setEditing({ ...editing, location: e.target.value })} className="input" />
                </Field>
                <Field label="Project type">
                  <input value={editing.project_type ?? ""} onChange={(e) => setEditing({ ...editing, project_type: e.target.value })} className="input" />
                </Field>
              </div>
              <Field label="Review">
                <textarea required rows={5} value={editing.content} onChange={(e) => setEditing({ ...editing, content: e.target.value })} className="input" />
              </Field>
              <div className="grid gap-4 sm:grid-cols-3">
                <Field label="Rating (1–5)">
                  <input type="number" min={1} max={5} value={editing.rating} onChange={(e) => setEditing({ ...editing, rating: Number(e.target.value) })} className="input" />
                </Field>
                <Field label="Sort order">
                  <input type="number" value={editing.sort_order} onChange={(e) => setEditing({ ...editing, sort_order: Number(e.target.value) })} className="input" />
                </Field>
                <Field label="Visible">
                  <label className="flex items-center gap-2 pt-2"><input type="checkbox" checked={editing.visible} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} /> show on site</label>
                </Field>
              </div>
              {save.error && <p className="text-sm text-destructive">{(save.error as Error).message}</p>}
              <div className="mt-6 flex justify-end gap-3">
                <button type="button" onClick={() => setEditing(null)} className="rounded-sm border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider">Cancel</button>
                <button type="submit" disabled={save.isPending} className="rounded-sm bg-primary px-5 py-2 text-xs font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-60">
                  {save.isPending ? "Saving…" : "Save"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      <style>{`.input { width:100%; border:1px solid hsl(var(--border)); border-radius:4px; padding:8px 10px; background:#fff; font-size:14px; }`}</style>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-display text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
