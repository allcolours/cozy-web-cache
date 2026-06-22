import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/gallery/new")({
  component: NewProject,
});

const CATEGORIES = ["interior", "exterior", "commercial", "epoxy", "bespoke"] as const;

function NewProject() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("interior");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setError("Title is required");
      return;
    }
    setSaving(true);
    setError(null);
    try {
      const { data: maxRow } = await supabase
        .from("gallery_projects")
        .select("sort_order")
        .order("sort_order", { ascending: false })
        .limit(1)
        .maybeSingle();
      const nextSort = (maxRow?.sort_order ?? 0) + 1;

      const { data, error: insErr } = await supabase
        .from("gallery_projects")
        .insert({ title: title.trim(), location: location.trim() || null, category, description: description.trim() || null, visible, sort_order: nextSort })
        .select("id")
        .single();
      if (insErr) throw insErr;
      navigate({ to: "/admin/gallery/$projectId", params: { projectId: data.id } });
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to create project");
      setSaving(false);
    }
  }

  return (
    <AdminShell title="New project">
      <div className="mb-6">
        <Link to="/admin/gallery" className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground">
          ← Back to projects
        </Link>
      </div>
      <form onSubmit={save} className="max-w-xl space-y-5 rounded-md border border-border bg-background p-6">
        <Field label="Title">
          <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
        </Field>
        <Field label="Location">
          <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Dublin 6" className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
        </Field>
        <Field label="Category">
          <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary">
            {CATEGORIES.map((c) => (
              <option key={c} value={c} className="capitalize">{c}</option>
            ))}
          </select>
        </Field>
        <Field label="Description">
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={3} className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
        </Field>
        <label className="flex items-center gap-3 text-sm">
          <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
          <span>Visible on public gallery</span>
        </label>
        {error && <p className="text-sm text-destructive">{error}</p>}
        <div className="flex justify-end gap-3 pt-2">
          <Link to="/admin/gallery" className="rounded-sm border border-input px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary">Cancel</Link>
          <button type="submit" disabled={saving} className="rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)] disabled:opacity-50">
            {saving ? "Creating…" : "Create & add images"}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}
