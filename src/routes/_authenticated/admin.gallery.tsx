import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState, useEffect } from "react";
import { resolveGalleryUrl } from "@/lib/galleryUrl";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

const CATEGORIES = ["interior", "exterior", "commercial", "epoxy", "bespoke"] as const;

type Project = {
  id: string;
  title: string;
  location: string | null;
  category: string;
  sort_order: number;
  visible: boolean;
};

type GalleryImage = {
  id: string;
  image_url: string;
  storage_path: string | null;
  alt_text: string | null;
  is_cover: boolean;
  sort_order: number;
  resolved_url?: string;
};

function GalleryAdmin() {
  const qc = useQueryClient();
  const [openId, setOpenId] = useState<string | null>(null);
  const [creating, setCreating] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  const [newCategory, setNewCategory] = useState<string>("interior");

  const { data: projects = [], isLoading } = useQuery({
    queryKey: ["admin-gallery-projects"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("gallery_projects")
        .select("id, title, location, category, sort_order, visible")
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return data as Project[];
    },
  });

  async function createProject() {
    if (!newTitle.trim()) return;
    const { data, error } = await supabase
      .from("gallery_projects")
      .insert({ title: newTitle.trim(), category: newCategory, sort_order: projects.length, visible: true })
      .select("id")
      .single();
    if (!error && data) {
      qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
      setCreating(false);
      setNewTitle("");
      setOpenId(data.id);
    }
  }

  return (
    <AdminShell title="Gallery">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{projects.length} projects</p>
        <button
          onClick={() => setCreating(true)}
          className="rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
        >
          + New project
        </button>
      </div>

      {creating && (
        <div className="mb-4 rounded-md border border-primary bg-background p-4">
          <p className="mb-3 font-display text-sm font-bold uppercase tracking-wider">New project</p>
          <div className="flex gap-3">
            <input
              autoFocus
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && createProject()}
              placeholder="Project title (e.g. Living room repaint, Foxrock)"
              className="flex-1 rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            />
            <select
              value={newCategory}
              onChange={(e) => setNewCategory(e.target.value)}
              className="rounded border border-input bg-background px-3 py-2 text-sm capitalize outline-none focus:border-primary"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>
            <button onClick={createProject} className="rounded-sm bg-primary px-4 py-2 text-xs font-bold uppercase tracking-wider text-white">
              Create
            </button>
            <button onClick={() => setCreating(false)} className="rounded-sm border border-border px-4 py-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Cancel
            </button>
          </div>
        </div>
      )}

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      <div className="space-y-2">
        {projects.map((p) => (
          <ProjectRow
            key={p.id}
            project={p}
            isOpen={openId === p.id}
            onToggle={() => setOpenId(openId === p.id ? null : p.id)}
            onRefresh={() => qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] })}
          />
        ))}
      </div>
    </AdminShell>
  );
}

function ProjectRow({ project, isOpen, onToggle, onRefresh }: {
  project: Project;
  isOpen: boolean;
  onToggle: () => void;
  onRefresh: () => void;
}) {
  const [title, setTitle] = useState(project.title);
  const [location, setLocation] = useState(project.location ?? "");
  const [category, setCategory] = useState(project.category);
  const [visible, setVisible] = useState(project.visible);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [uploads, setUploads] = useState<{name: string; progress: number; error?: string}[]>([]);

  useEffect(() => {
    setTitle(project.title);
    setLocation(project.location ?? "");
    setCategory(project.category);
    setVisible(project.visible);
  }, [project]);

  const { data: images = [], refetch: refetchImages } = useQuery({
    queryKey: ["admin-project-images", project.id],
    enabled: isOpen,
    queryFn: async (): Promise<GalleryImage[]> => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("id, image_url, storage_path, alt_text, is_cover, sort_order")
        .eq("project_id", project.id)
        .order("is_cover", { ascending: false })
        .order("sort_order", { ascending: true });
      if (error) throw error;
      return Promise.all(
        (data ?? []).map(async (r) => ({
          ...r,
          resolved_url: await resolveGalleryUrl(r.image_url, r.storage_path),
        }))
      );
    },
  });

  async function save() {
    setSaving(true);
    const { error } = await supabase
      .from("gallery_projects")
      .update({ title: title.trim(), location: location.trim() || null, category, visible })
      .eq("id", project.id);
    setSaving(false);
    if (!error) {
      setSavedMsg("Saved ✓");
      onRefresh();
      setTimeout(() => setSavedMsg(""), 2000);
    }
  }

  async function deleteProject() {
    if (!confirm(`Delete "${project.title}" and all its images?`)) return;
    const { data: imgs } = await supabase.from("gallery_images").select("storage_path").eq("project_id", project.id);
    const paths = (imgs ?? []).map((i) => i.storage_path).filter((x): x is string => !!x);
    if (paths.length) await supabase.storage.from("gallery").remove(paths);
    await supabase.from("gallery_projects").delete().eq("id", project.id);
    onRefresh();
  }

  async function handleUpload(files: FileList | null) {
    if (!files?.length) return;
    const arr = Array.from(files).map((f) => ({ name: f.name, progress: 0 }));
    setUploads(arr);
    let i = 0;
    for (const file of Array.from(files)) {
      const ext = file.name.split(".").pop() || "jpg";
      const path = `projects/${project.id}/${crypto.randomUUID()}.${ext}`;
      try {
        const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, { cacheControl: "31536000", upsert: false });
        if (upErr) throw upErr;
        setUploads((u) => u.map((x, idx) => idx === i ? { ...x, progress: 70 } : x));
        await supabase.from("gallery_images").insert({
          project_id: project.id,
          image_url: path,
          storage_path: path,
          alt_text: file.name.replace(/\.[^.]+$/, ""),
          is_cover: images.length === 0 && i === 0,
          sort_order: images.length + i,
        });
        setUploads((u) => u.map((x, idx) => idx === i ? { ...x, progress: 100 } : x));
      } catch {
        setUploads((u) => u.map((x, idx) => idx === i ? { ...x, error: "Failed" } : x));
      }
      i++;
    }
    refetchImages();
    setTimeout(() => setUploads([]), 3000);
  }

  async function deleteImage(img: GalleryImage) {
    if (!confirm("Delete this image?")) return;
    if (img.storage_path) await supabase.storage.from("gallery").remove([img.storage_path]);
    await supabase.from("gallery_images").delete().eq("id", img.id);
    refetchImages();
    onRefresh();
  }

  async function setCover(img: GalleryImage) {
    await supabase.from("gallery_images").update({ is_cover: false }).eq("project_id", project.id);
    await supabase.from("gallery_images").update({ is_cover: true }).eq("id", img.id);
    refetchImages();
    onRefresh();
  }

  const BADGE: Record<string, string> = {
    interior: "bg-blue-100 text-blue-800",
    exterior: "bg-amber-100 text-amber-800",
    commercial: "bg-purple-100 text-purple-800",
    epoxy: "bg-slate-200 text-slate-800",
    bespoke: "bg-pink-100 text-pink-800",
  };

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-center gap-4 px-4 py-3 text-left hover:bg-secondary/50"
      >
        <span className="text-lg text-muted-foreground">{isOpen ? "▾" : "▸"}</span>
        <span className="flex-1 font-medium">{project.title}</span>
        {project.location && <span className="text-sm text-muted-foreground">{project.location}</span>}
        <span className={`rounded px-2 py-0.5 text-[11px] font-semibold capitalize ${BADGE[project.category] ?? "bg-muted text-foreground"}`}>
          {project.category}
        </span>
        <span className={`text-xs font-bold ${project.visible ? "text-green-600" : "text-muted-foreground"}`}>
          {project.visible ? "Visible" : "Hidden"}
        </span>
      </button>

      {isOpen && (
        <div className="border-t border-border p-4">
          <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
            <div className="space-y-4">
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Title</label>
                <input value={title} onChange={(e) => setTitle(e.target.value)} className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Location</label>
                <input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="e.g. Dublin 6" className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary" />
              </div>
              <div>
                <label className="mb-1 block text-xs font-bold uppercase tracking-wider text-muted-foreground">Category</label>
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border border-input bg-background px-3 py-2 text-sm capitalize outline-none focus:border-primary">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <label className="flex items-center gap-2 text-sm">
                <input type="checkbox" checked={visible} onChange={(e) => setVisible(e.target.checked)} />
                Visible on public gallery
              </label>
              <div className="flex gap-2">
                <button onClick={save} disabled={saving} className="flex-1 rounded-sm bg-primary py-2 text-xs font-bold uppercase tracking-wider text-white disabled:opacity-50">
                  {saving ? "Saving…" : "Save"}
                </button>
                <button onClick={deleteProject} className="rounded-sm border border-destructive/40 px-3 py-2 text-xs font-bold uppercase tracking-wider text-destructive hover:bg-destructive hover:text-white">
                  Delete
                </button>
              </div>
              {savedMsg && <p className="text-sm font-medium text-green-600">{savedMsg}</p>}

              <div className="border-t border-border pt-4">
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-muted-foreground">Upload photos</p>
                <label className="cursor-pointer rounded-sm bg-[#16a34a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#15803d]">
                  Choose files
                  <input type="file" multiple accept="image/*" className="hidden" onChange={(e) => { handleUpload(e.target.files); e.target.value = ""; }} />
                </label>
                {uploads.length > 0 && (
                  <ul className="mt-3 space-y-1">
                    {uploads.map((u, i) => (
                      <li key={i} className="text-xs">
                        <div className="flex justify-between">
                          <span className="truncate">{u.name}</span>
                          <span className={u.error ? "text-destructive" : "text-muted-foreground"}>{u.error ?? `${u.progress}%`}</span>
                        </div>
                        <div className="mt-0.5 h-1 overflow-hidden rounded bg-muted">
                          <div className={`h-full ${u.error ? "bg-destructive" : "bg-[#16a34a]"}`} style={{ width: `${u.progress}%` }} />
                        </div>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </div>

            <div>
              {images.length === 0 ? (
                <div className="flex h-32 items-center justify-center rounded-md border border-dashed border-border text-sm text-muted-foreground">
                  No photos yet — upload some on the left
                </div>
              ) : (
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
                  {images.map((img) => (
                    <div key={img.id} className="group relative overflow-hidden rounded-md border border-border">
                      <img src={img.resolved_url} alt={img.alt_text ?? ""} className="aspect-[4/3] w-full object-cover" />
                      {img.is_cover && (
                        <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                          Cover
                        </span>
                      )}
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 bg-black/60 opacity-0 transition-opacity group-hover:opacity-100">
                        {!img.is_cover && (
                          <button onClick={() => setCover(img)} className="rounded bg-white px-2 py-1 text-[10px] font-bold uppercase text-black hover:bg-primary hover:text-white">
                            Set cover
                          </button>
                        )}
                        <button onClick={() => deleteImage(img)} className="rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white hover:bg-red-700">
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
