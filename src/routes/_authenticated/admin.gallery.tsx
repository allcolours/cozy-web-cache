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
const CATEGORY_LABEL: Record<string, string> = {
  interior: "Interior",
  exterior: "Exterior",
  commercial: "Commercial",
  epoxy: "Floor Coatings",
  bespoke: "Bespoke",
};

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

// ---- Client-side image conversion ----
async function convertToWebp(file: File): Promise<Blob> {
  let bitmap: ImageBitmap;
  let e1: any;
  try {
    bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
  } catch (err) {
    e1 = err;
    try {
      const mod = await import("heic2any");
      const heic2any = (mod as any).default ?? mod;
      const out = await heic2any({ blob: file, toType: "image/jpeg", quality: 0.9 });
      const jpegBlob: Blob = Array.isArray(out) ? out[0] : out;
      bitmap = await createImageBitmap(jpegBlob, { imageOrientation: "from-image" });
    } catch (e2: any) {
      throw new Error("HEIC convert failed: " + (e2?.message || e1?.message || "unknown"));
    }
  }

  const MAX = 1600;
  const longest = Math.max(bitmap.width, bitmap.height);
  const scale = longest > MAX ? MAX / longest : 1;
  const w = Math.round(bitmap.width * scale);
  const h = Math.round(bitmap.height * scale);

  const canvas = document.createElement("canvas");
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext("2d");
  if (!ctx) throw new Error("canvas ctx unavailable");
  ctx.drawImage(bitmap, 0, 0, w, h);
  bitmap.close?.();

  return await new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (b) => (b ? resolve(b) : reject(new Error("WebP encode failed"))),
      "image/webp",
      0.82,
    );
  });
}

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
    const maxOrder = projects.reduce((m, p) => Math.max(m, p.sort_order ?? 0), 0);
    const { data, error } = await supabase
      .from("gallery_projects")
      .insert({ title: newTitle.trim(), category: newCategory, sort_order: maxOrder + 10, visible: true })
      .select("id")
      .single();
    if (!error && data) {
      qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
      setCreating(false);
      setNewTitle("");
      setOpenId(data.id);
    }
  }

  async function swapAlbumOrder(idx: number, dir: -1 | 1) {
    const a = projects[idx];
    const b = projects[idx + dir];
    if (!a || !b) return;
    await supabase.from("gallery_projects").update({ sort_order: b.sort_order }).eq("id", a.id);
    await supabase.from("gallery_projects").update({ sort_order: a.sort_order }).eq("id", b.id);
    qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
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
              className="rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
            >
              {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>)}
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
        {projects.map((p, idx) => (
          <ProjectRow
            key={p.id}
            project={p}
            allProjects={projects}
            canMoveUp={idx > 0}
            canMoveDown={idx < projects.length - 1}
            onMoveUp={() => swapAlbumOrder(idx, -1)}
            onMoveDown={() => swapAlbumOrder(idx, 1)}
            isOpen={openId === p.id}
            onToggle={() => setOpenId(openId === p.id ? null : p.id)}
            onRefresh={() => qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] })}
          />
        ))}
      </div>
    </AdminShell>
  );
}

function ProjectRow({ project, allProjects, isOpen, onToggle, onRefresh, canMoveUp, canMoveDown, onMoveUp, onMoveDown }: {
  project: Project;
  allProjects: Project[];
  isOpen: boolean;
  onToggle: () => void;
  onRefresh: () => void;
  canMoveUp: boolean;
  canMoveDown: boolean;
  onMoveUp: () => void;
  onMoveDown: () => void;
}) {
  const qc = useQueryClient();
  const [title, setTitle] = useState(project.title);
  const [location, setLocation] = useState(project.location ?? "");
  const [category, setCategory] = useState(project.category);
  const [visible, setVisible] = useState(project.visible);
  const [saving, setSaving] = useState(false);
  const [savedMsg, setSavedMsg] = useState("");
  const [uploads, setUploads] = useState<{name: string; progress: number; error?: string}[]>([]);
  const [lightboxUrl, setLightboxUrl] = useState<string | null>(null);

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
      try {
        setUploads((u) => u.map((x, idx) => idx === i ? { ...x, progress: 10 } : x));
        const webp = await convertToWebp(file);
        setUploads((u) => u.map((x, idx) => idx === i ? { ...x, progress: 50 } : x));
        const path = `projects/${project.id}/${crypto.randomUUID()}.webp`;
        const { error: upErr } = await supabase.storage
          .from("gallery")
          .upload(path, webp, { cacheControl: "31536000", upsert: false, contentType: "image/webp" });
        if (upErr) throw upErr;
        setUploads((u) => u.map((x, idx) => idx === i ? { ...x, progress: 80 } : x));
        await supabase.from("gallery_images").insert({
          project_id: project.id,
          image_url: path,
          storage_path: path,
          alt_text: file.name.replace(/\.[^.]+$/, ""),
          is_cover: images.length === 0 && i === 0,
          sort_order: images.length + i,
        });
        setUploads((u) => u.map((x, idx) => idx === i ? { ...x, progress: 100 } : x));
      } catch (err) {
        console.error("upload failed", file.name, err);
        setUploads((u) => u.map((x, idx) => idx === i ? { ...x, error: (err as Error)?.message?.slice(0,80) || "Failed" } : x));
      }
      i++;
    }
    refetchImages();
    setTimeout(() => setUploads((u) => u.filter((x) => x.error)), 4000);
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

  async function moveImageToProject(img: GalleryImage, targetProjectId: string) {
    const { count } = await supabase
      .from("gallery_images")
      .select("id", { count: "exact", head: true })
      .eq("project_id", targetProjectId);
    await supabase
      .from("gallery_images")
      .update({ project_id: targetProjectId, is_cover: false, sort_order: count ?? 0 })
      .eq("id", img.id);
    refetchImages();
    qc.invalidateQueries({ queryKey: ["admin-project-images", targetProjectId] });
    onRefresh();
  }

  async function swapImageOrder(idx: number, dir: -1 | 1) {
    const a = images[idx];
    const b = images[idx + dir];
    if (!a || !b) return;
    await supabase.from("gallery_images").update({ sort_order: b.sort_order }).eq("id", a.id);
    await supabase.from("gallery_images").update({ sort_order: a.sort_order }).eq("id", b.id);
    refetchImages();
  }

  const BADGE: Record<string, string> = {
    interior: "bg-blue-100 text-blue-800",
    exterior: "bg-amber-100 text-amber-800",
    commercial: "bg-purple-100 text-purple-800",
    epoxy: "bg-slate-200 text-slate-800",
    bespoke: "bg-pink-100 text-pink-800",
  };

  const otherProjects = allProjects.filter((p) => p.id !== project.id);

  return (
    <div className="overflow-hidden rounded-md border border-border bg-background">
      <div className="flex w-full items-center gap-2 px-2 py-3 hover:bg-secondary/50">
        <div className="flex flex-col">
          <button
            type="button"
            onClick={onMoveUp}
            disabled={!canMoveUp}
            aria-label="Move album up"
            className="px-1 text-xs text-muted-foreground hover:text-primary disabled:opacity-30"
          >▲</button>
          <button
            type="button"
            onClick={onMoveDown}
            disabled={!canMoveDown}
            aria-label="Move album down"
            className="px-1 text-xs text-muted-foreground hover:text-primary disabled:opacity-30"
          >▼</button>
        </div>
        <button
          type="button"
          onClick={onToggle}
          className="flex flex-1 items-center gap-4 px-2 py-1 text-left"
        >
          <span className="text-lg text-muted-foreground">{isOpen ? "▾" : "▸"}</span>
          <span className="flex-1 font-medium">{project.title}</span>
          {project.location && <span className="text-sm text-muted-foreground">{project.location}</span>}
          <span className={`rounded px-2 py-0.5 text-[11px] font-semibold ${BADGE[project.category] ?? "bg-muted text-foreground"}`}>
            {CATEGORY_LABEL[project.category] ?? project.category}
          </span>
          <span className={`text-xs font-bold ${project.visible ? "text-green-600" : "text-muted-foreground"}`}>
            {project.visible ? "Visible" : "Hidden"}
          </span>
        </button>
      </div>

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
                <select value={category} onChange={(e) => setCategory(e.target.value)} className="w-full rounded border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary">
                  {CATEGORIES.map((c) => <option key={c} value={c}>{CATEGORY_LABEL[c]}</option>)}
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
                <p className="mb-1 text-xs font-bold uppercase tracking-wider text-muted-foreground">Upload photos</p>
                <p className="mb-2 text-[11px] text-muted-foreground">HEIC, JPG, PNG, WebP — auto-converted to WebP, max 1600px wide.</p>
                <label className="cursor-pointer rounded-sm bg-[#16a34a] px-4 py-2 text-xs font-bold uppercase tracking-wider text-white hover:bg-[#15803d]">
                  Choose files
                  <input type="file" multiple accept="image/*,.heic,.heif" className="hidden" onChange={(e) => { handleUpload(e.target.files); e.target.value = ""; }} />
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
                  {images.map((img, idx) => (
                    <div key={img.id} className="group relative overflow-hidden rounded-md border border-border">
                      <button
                        type="button"
                        onClick={() => img.resolved_url && setLightboxUrl(img.resolved_url)}
                        className="block w-full"
                        aria-label="Enlarge image"
                      >
                        <img src={img.resolved_url} alt={img.alt_text ?? ""} className="aspect-[4/3] w-full object-cover" />
                      </button>
                      {img.is_cover && (
                        <span className="absolute left-1 top-1 rounded bg-primary px-1.5 py-0.5 text-[10px] font-bold uppercase text-white">
                          Cover
                        </span>
                      )}
                      <div className="absolute right-1 top-1 flex flex-col gap-1">
                        <button
                          type="button"
                          onClick={() => swapImageOrder(idx, -1)}
                          disabled={idx === 0}
                          className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white hover:bg-black/80 disabled:opacity-30"
                          aria-label="Move image up"
                        >▲</button>
                        <button
                          type="button"
                          onClick={() => swapImageOrder(idx, 1)}
                          disabled={idx === images.length - 1}
                          className="rounded bg-black/60 px-1.5 py-0.5 text-[10px] font-bold text-white hover:bg-black/80 disabled:opacity-30"
                          aria-label="Move image down"
                        >▼</button>
                      </div>
                      <div className="absolute inset-x-0 bottom-0 flex flex-col gap-1 bg-gradient-to-t from-black/85 to-transparent p-2 opacity-0 transition-opacity group-hover:opacity-100">
                        <div className="flex gap-1">
                          {!img.is_cover && (
                            <button onClick={() => setCover(img)} className="rounded bg-white px-2 py-1 text-[10px] font-bold uppercase text-black hover:bg-primary hover:text-white">
                              Cover
                            </button>
                          )}
                          <button onClick={() => deleteImage(img)} className="rounded bg-red-600 px-2 py-1 text-[10px] font-bold uppercase text-white hover:bg-red-700">
                            Delete
                          </button>
                        </div>
                        {otherProjects.length > 0 && (
                          <select
                            defaultValue=""
                            onChange={(e) => {
                              const v = e.target.value;
                              e.target.value = "";
                              if (v) moveImageToProject(img, v);
                            }}
                            className="rounded bg-white px-1 py-1 text-[10px] text-black"
                            aria-label="Move to another album"
                          >
                            <option value="">Move to…</option>
                            {otherProjects.map((p) => (
                              <option key={p.id} value={p.id}>{p.title}</option>
                            ))}
                          </select>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {lightboxUrl && (
        <div
          className="fixed inset-0 z-[80] flex items-center justify-center bg-black/95 p-4"
          onClick={() => setLightboxUrl(null)}
          role="dialog"
          aria-modal="true"
          aria-label="Image preview"
        >
          <button
            type="button"
            onClick={(e) => { e.stopPropagation(); setLightboxUrl(null); }}
            className="absolute right-4 top-4 rounded-full bg-white/15 px-3 py-1.5 text-sm font-bold text-white backdrop-blur-sm hover:bg-white/25"
            aria-label="Close"
          >
            ✕ Close
          </button>
          <img
            src={lightboxUrl}
            alt=""
            onClick={(e) => e.stopPropagation()}
            className="max-h-[90vh] max-w-full rounded-sm object-contain shadow-2xl"
          />
        </div>
      )}
    </div>
  );
}
