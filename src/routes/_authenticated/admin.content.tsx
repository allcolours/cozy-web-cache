import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { SETTING_DEFAULTS } from "@/hooks/useSiteSettings";

export const Route = createFileRoute("/_authenticated/admin/content")({
  component: ContentAdmin,
});

const FIELDS: { key: string; label: string; multiline?: boolean }[] = [
  { key: "phone", label: "Phone number" },
  { key: "email", label: "Email address" },
  { key: "area", label: "Service area" },
  { key: "hours", label: "Opening hours" },
  { key: "tagline", label: "Tagline" },
  { key: "hero_title", label: "Home hero title", multiline: true },
  { key: "hero_subtitle", label: "Home hero subtitle", multiline: true },
  { key: "about_text", label: "About blurb", multiline: true },
];

function ContentAdmin() {
  const qc = useQueryClient();
  const [values, setValues] = useState<Record<string, string>>({});
  const [savedAt, setSavedAt] = useState<string | null>(null);
  const [err, setErr] = useState<string | null>(null);

  const { data } = useQuery({
    queryKey: ["admin-settings"],
    queryFn: async () => {
      const { data } = await supabase.from("site_settings").select("key, value");
      const map: Record<string, string> = {};
      for (const r of data ?? []) map[r.key] = r.value;
      return map;
    },
  });

  useEffect(() => {
    if (!data) return;
    const merged: Record<string, string> = {};
    for (const f of FIELDS) merged[f.key] = data[f.key] ?? SETTING_DEFAULTS[f.key] ?? "";
    setValues(merged);
  }, [data]);

  async function save(e: React.FormEvent) {
    e.preventDefault();
    setErr(null);
    try {
      const rows = FIELDS.map((f) => ({ key: f.key, value: values[f.key] ?? "" }));
      const { error } = await supabase.from("site_settings").upsert(rows, { onConflict: "key" });
      if (error) throw error;
      setSavedAt(new Date().toLocaleTimeString());
      qc.invalidateQueries({ queryKey: ["site-settings"] });
      qc.invalidateQueries({ queryKey: ["admin-settings"] });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Save failed");
    }
  }

  return (
    <AdminShell title="Site content">
      <form onSubmit={save} className="max-w-2xl space-y-5 bg-background p-6">
        {FIELDS.map((f) => (
          <div key={f.key}>
            <label className="font-display text-xs font-bold uppercase tracking-wider">{f.label}</label>
            {f.multiline ? (
              <textarea
                rows={3}
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            ) : (
              <input
                value={values[f.key] ?? ""}
                onChange={(e) => setValues({ ...values, [f.key]: e.target.value })}
                className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            )}
          </div>
        ))}
        {err && <p className="text-sm text-destructive">{err}</p>}
        {savedAt && <p className="text-sm text-primary">Saved at {savedAt}</p>}
        <button type="submit" className="rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">
          Save changes
        </button>
      </form>
    </AdminShell>
  );
}
