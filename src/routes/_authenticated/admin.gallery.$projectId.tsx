import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { resolveGalleryUrl } from "@/lib/galleryUrl";
import { useEffect, useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/gallery/$projectId")({
  component: EditProject,
});

const CATEGORIES = ["interior", "exterior", "commercial", "epoxy", "bespoke"] as const;

type ImageRow = {
  id: string;
  image_url: string;
  storage_path: string | null;
  alt_text: string | null;
  is_cover: boolean;
  sort_order: number;
  resolved_url: string;
};

function EditProject() {
  const { projectId } = Route.useParams();
  const navigate = useNavigate();
  const qc = useQueryClient();

  const projectQuery = useQuery({
    queryKey: ["admin-project", projectId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_projects")
        .select("id, title, location, category, description, visible, sort_order")
        .eq("id", projectId)
        .maybeSingle();
      if (error) throw error;
      return data;
    },
  });

  const imagesQuery = useQuery({
    queryKey: ["admin-project-images", projectId],
    queryFn: async (): Promise<ImageRow[]> => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, storage_path, alt_text, is_cover, sort_order")
        .eq("project_id", projectId)
        .order("is_cover", { ascending: false })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return Promise.all(
        (data ?? []).map(async (r) => ({ ...r, resolved_url: await resolveGalleryUrl(r.image_url, r.storage_path) })),
      );
    },
  });

  const project = projectQuery.data;
  const [title, setTitle] = useState("");
  const [location, setLocation] = useState("");
  const [category, setCategory] = useState<(typeof CATEGORIES)[number]>("interior");
  const [description, setDescription] = useState("");
  const [visible, setVisible] = useState(true);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!project) return;
    setTitle(project.title);
    setLocation(project.location ?? "");
    setCategory((project.category as typeof category) ?? "interior");
    setDescription(project.description ?? "");
    setVisible(project.visible);
  }, [project]);

  const [uploads, setUploads] = useState<{ name: string; progress: number; error?: string }[]>([]);

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    setError(null);
    const initial = Array.from(files).map((f) => ({ name: f.name, progress: 0 }));
    setUploads(initial);
    let i = 0;
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `projects/${projectId}/${crypto.randomUUID()}.${ext}`;
      try {
        const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, { cacheControl: "31536000", upsert: false });
        if (upErr) throw upErr;
        setUploads((u) => u.map((x, idx) => (idx === i ? { ...x, progress: 70 } : x)));
        const { error: insErr } = await supabase.from("gallery_images").insert({
          project_id: projectId,
          image_url: path,
          storage_path: path,
          alt_text: file.name.replace(/\.[^.]+$/, ""),
          is_cover: false,
          sort_order: 100 + i,
        });
        if (insErr) throw insErr;
        setUploads((u) => u.map((x, idx) => (idx === i ? { ...x, progress: 100 } : x)));
      } catch (e) {
        setUploads((u) => u.map((x, idx) => (idx === i ? { ...x, error: e instanceof Error ? e.message : "Upload failed" } : x)));
      }
      i++;
    }
    qc.invalidateQueries({ queryKey: ["admin-project-images", projectId] });
    setTimeout(() => setUploads([]), 2500);
  }

  async function setCover(img: ImageRow) {
    await supabase.from("gallery_images").update({ is_cover: false }).eq("project_id", projectId);
    await supabase.from("gallery_images").update({ is_cover: true }).eq("id", img.id);
    qc.invalidateQueries({ queryKey: ["admin-project-images", projectId] });
    qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
  }

  async function deleteImage(img: ImageRow) {
    if (!confirm("Delete this image?")) return;
    if (img.storage_path) await supabase.storage.from("gallery").remove([img.storage_path]);
    await supabase.from("gallery_images").delete().eq("id", img.id);
    qc.invalidateQueries({ queryKey: ["admin-project-images", projectId] });
    qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
  }

  async function moveImage(img: ImageRow, dir: -1 | 1) {
    const list = (imagesQuery.data ?? []).slice().sort((a, b) => a.sort_order - b.sort_order);
    const idx = list.findIndex((x) => x.id === img.id);
    const swap = list[idx + dir];
    if (!swap) return;
    await Promise.all([
      supabase.from("gallery_images").update({ sort_order: swap.sort_order }).eq("id", img.id),
      supabase.from("gallery_images").update({ sort_order: img.sort_order }).eq("id", swap.id),
    ]);
    qc.invalidateQueries({ queryKey: ["admin-project-images", projectId] });
  }

  async function saveProject(e: React.FormEvent) {
    e.preventDefault();
    setSaving(true);
    setError(null);
    setSavedMsg(null);
    const { error: upErr } = await supabase
      .from("gallery_projects")
      .update({ title: title.trim(), location: location.trim() || null, category, description: description.trim() || null, visible })
      .eq("id", projectId);
    setSaving(false);
    if (upErr) {
      console.error("[admin.gallery saveProject] update failed:", upErr);
      setError(`${upErr.message}${upErr.code ? ` (code: ${upErr.code})` : ""}${upErr.details ? ` — ${upErr.details}` : ""}${upErr.hint ? ` — hint: ${upErr.hint}` : ""}`);
    } else {
      setSavedMsg("Saved");
      qc.invalidateQueries({ queryKey: ["admin-project", projectId] });
      qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
      setTimeout(() => setSavedMsg(null), 2000);
    }
  }

  if (projectQuery.isLoading) return <AdminShell title="Edit project"><p className="text-sm text-muted-foreground">Loading…</p></AdminShell>;
  if (!project) {
    return (
      <AdminShell title="Edit project">
        <p className="text-sm text-destructive">Project not found.</p>
        <Link to="/admin/gallery" className="mt-3 inline-block text-xs font-bold uppercase tracking-wider text-primary hover:underline">← Back to projects</Link>
      </AdminShell>
    );
  }

  return (
    <AdminShell title={`Edit · ${project.title}`}>
      <div className="mb-6 flex items-center justify-between">
        <Link to="/admin/gallery" className="text-xs font-bold uppercase tracking-wider text-muted-foreground hover:text-foreground">← Back to projects</Link>
      </div>

      {error && (
        <div role="alert" className="mb-6 rounded-md border-2 border-destructive bg-destructive/10 p-4 text-sm text-destructive">
          <p className="font-bold uppercase tracking-wider">Error saving project</p>
          <p className="mt-2 whitespace-pre-wrap break-words">{error}</p>
          <p className="mt-2 text-xs opacity-75">If this mentions "row-level security" or permissions, your user account is missing the admin role.</p>
        </div>
      )}

      <div className="grid gap-6 lg:grid-cols-[minmax(0,320px)_1fr]">
        <form onSubmit={saveProject} className="space-y-5 rounded-md border border-border bg-background p-6">
          <Field label="Title">
            <input value={title} onChange={(e) => setTitle(e.target.value)} required className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </Field>
          <Field label="Location">
            <input value={location} onChange={(e) => setLocation(e.target.value)} className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
          </Field>
          <Field label="Category">
            <select value={category} onChange={(e) => setCategory(e.target.value as typeof category)} className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary capitalize">
              {CATEGORIES.map((c) => <option key={c} value={c} className="capitalize">{c}</option>)}
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
          {savedMsg && <p className="text-sm text-[#16a34a]">{savedMsg}</p>}
          <button type="submit" disabled={saving} className="w-full rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)] disabled:opacity-50">
            {saving ? "Saving…" : "Save changes"}
          </button>
          <button
            type="button"
            onClick={async () => {
              if (!confirm("Delete this project and all its images?")) return;
              const { data: imgs } = await supabase.from("gallery_images").select("storage_path").eq("project_id", projectId);
              const paths = (imgs ?? []).map((i) => i.storage_path).filter((x): x is string => !!x);
              if (paths.length) await supabase.storage.from("gallery").remove(paths);
              await supabase.from("gallery_projects").delete().eq("id", projectId);
              qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
              navigate({ to: "/admin/gallery" });
            }}
            className="w-full rounded-sm border border-destructive/40 px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-destructive hover:bg-destructive hover:text-destructive-foreground"
          >
            Delete project
          </button>
        </form>

        <div className="space-y-4">
          <div className="rounded-md border border-dashed border-border bg-background p-5">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div>
                <h3 className="font-display text-sm font-bold uppercase tracking-wider">Upload images</h3>
                <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or WEBP. Multiple files supported.</p>
              </div>
              <label className="cursor-pointer rounded-sm bg-[#16a34a] px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-[#15803d]">
                Choose files
                <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => { handleUpload(e.target.files); e.target.value = ""; }} />
              </label>
            </div>
            {uploads.length > 0 && (
              <ul className="mt-4 space-y-2">
                {uploads.map((u, idx) => (
                  <li key={idx} className="text-xs">
                    <div className="flex items-center justify-between gap-3">
                      <span className="truncate">{u.name}</span>
                      <span className={u.error ? "text-destructive" : "text-muted-foreground"}>{u.error ?? `${u.progress}%`}</span>
                    </div>
                    <div className="mt-1 h-1 overflow-hidden rounded bg-muted">
                      <div className={`h-full ${u.error ? "bg-destructive" : "bg-[#16a34a]"}`} style={{ width: `${u.progress}%`, transition: "width 250ms ease" }} />
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>

          {imagesQuery.isLoading ? (
            <p className="text-sm text-muted-foreground">Loading images…</p>
          ) : (imagesQuery.data?.length ?? 0) === 0 ? (
            <div className="rounded-md border border-border bg-background p-8 text-center">
              <p className="text-sm text-muted-foreground">No images yet. Upload some to populate this project.</p>
            </div>
          ) : (
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
              {imagesQuery.data!.map((img) => (
                <div key={img.id} className="overflow-hidden rounded-md border border-border bg-background">
                  <div className="relative">
                    <img src={img.resolved_url} alt={img.alt_text ?? ""} className="block aspect-[4/3] w-full object-cover" />
                    {img.is_cover && (
                      <span className="absolute left-2 top-2 rounded bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                        Cover
                      </span>
                    )}
                  </div>
                  <div className="flex items-center justify-between gap-2 p-2">
                    <div className="flex gap-1">
                      <button onClick={() => moveImage(img, -1)} className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary" aria-label="Move up">←</button>
                      <button onClick={() => moveImage(img, 1)} className="rounded px-2 py-1 text-xs text-muted-foreground hover:bg-secondary" aria-label="Move down">→</button>
                    </div>
                    <div className="flex gap-2">
                      {!img.is_cover && (
                        <button onClick={() => setCover(img)} className="text-xs font-bold uppercase tracking-wider text-primary hover:underline" title="Set as cover image">
                          ★ Cover
                        </button>
                      )}
                      <button onClick={() => deleteImage(img)} className="text-xs font-bold uppercase tracking-wider text-destructive hover:underline">
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
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
