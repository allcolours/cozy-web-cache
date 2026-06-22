import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useEffect, useState } from "react";
import { resolveGalleryUrl } from "@/lib/galleryUrl";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

type ProjectRow = {
  id: string;
  title: string;
  location: string | null;
  category: string;
  sort_order: number;
  visible: boolean;
  image_count: number;
  cover_url: string | null;
};

async function fetchProjects(): Promise<ProjectRow[]> {
  const { data: projects, error } = await supabase
    .from("gallery_projects")
    .select("id, title, location, category, sort_order, visible")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;

  const { data: images } = await supabase
    .from("gallery_images")
    .select("project_id, image_url, storage_path, is_cover, sort_order");

  const byProject = new Map<string, { count: number; cover?: { image_url: string; storage_path: string | null } }>();
  for (const im of images ?? []) {
    if (!im.project_id) continue;
    const entry = byProject.get(im.project_id) ?? { count: 0 };
    entry.count += 1;
    if (im.is_cover || !entry.cover) entry.cover = { image_url: im.image_url, storage_path: im.storage_path };
    byProject.set(im.project_id, entry);
  }

  return Promise.all(
    (projects ?? []).map(async (p) => {
      const info = byProject.get(p.id);
      return {
        id: p.id,
        title: p.title,
        location: p.location,
        category: p.category,
        sort_order: p.sort_order,
        visible: p.visible,
        image_count: info?.count ?? 0,
        cover_url: info?.cover ? await resolveGalleryUrl(info.cover.image_url, info.cover.storage_path) : null,
      };
    }),
  );
}

const CATEGORY_BADGE: Record<string, string> = {
  interior: "bg-blue-100 text-blue-800",
  exterior: "bg-amber-100 text-amber-800",
  commercial: "bg-purple-100 text-purple-800",
  epoxy: "bg-slate-200 text-slate-800",
  bespoke: "bg-pink-100 text-pink-800",
};

function GalleryAdmin() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isLoading, isError, error } = useQuery({ queryKey: ["admin-gallery-projects"], queryFn: fetchProjects });
  const [busy, setBusy] = useState<string | null>(null);

  async function toggleVisible(p: ProjectRow, e: React.MouseEvent) {
    e.stopPropagation();
    setBusy(p.id);
    await supabase.from("gallery_projects").update({ visible: !p.visible }).eq("id", p.id);
    setBusy(null);
    qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
  }

  async function deleteProject(p: ProjectRow) {
    if (!confirm(`Delete "${p.title}" and all its images? This cannot be undone.`)) return;
    setBusy(p.id);
    // Remove storage objects for images that live in the bucket
    const { data: imgs } = await supabase.from("gallery_images").select("storage_path").eq("project_id", p.id);
    const paths = (imgs ?? []).map((i) => i.storage_path).filter((x): x is string => !!x);
    if (paths.length) await supabase.storage.from("gallery").remove(paths);
    await supabase.from("gallery_projects").delete().eq("id", p.id);
    setBusy(null);
    qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
  }

  async function moveProject(p: ProjectRow, dir: -1 | 1, e: React.MouseEvent) {
    e.stopPropagation();
    const list = (data ?? []).slice().sort((a, b) => a.sort_order - b.sort_order);
    const idx = list.findIndex((x) => x.id === p.id);
    const swap = list[idx + dir];
    if (!swap) return;
    setBusy(p.id);
    await Promise.all([
      supabase.from("gallery_projects").update({ sort_order: swap.sort_order }).eq("id", p.id),
      supabase.from("gallery_projects").update({ sort_order: p.sort_order }).eq("id", swap.id),
    ]);
    setBusy(null);
    qc.invalidateQueries({ queryKey: ["admin-gallery-projects"] });
  }

  return (
    <AdminShell title="Gallery">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data?.length ?? 0} projects</p>
        <Link to="/admin/gallery/new" className="rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">
          + Add project
        </Link>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading projects…</p>}
      {isError && <p className="text-sm text-destructive">Failed to load projects: {(error as Error).message}</p>}

      {data && data.length === 0 && (
        <div className="rounded-md border border-dashed border-border bg-background p-10 text-center">
          <p className="text-sm text-muted-foreground">No projects yet. Click "Add project" to create your first one.</p>
        </div>
      )}

      {data && data.length > 0 && (
        <div className="overflow-hidden rounded-md border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="w-8 px-3 py-3"></th>
                <th className="px-3 py-3">Cover</th>
                <th className="px-3 py-3">Title</th>
                <th className="px-3 py-3">Location</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Images</th>
                <th className="px-3 py-3">Visible</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.slice().sort((a, b) => a.sort_order - b.sort_order).map((p) => (
                <tr
                  key={p.id}
                  onClick={() => navigate({ to: "/admin/gallery/$projectId", params: { projectId: p.id } })}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-secondary/50"
                >
                  <td className="px-3 py-2">
                    <div className="flex flex-col gap-0.5">
                      <button onClick={(e) => moveProject(p, -1, e)} className="text-muted-foreground hover:text-foreground" aria-label="Move up">▲</button>
                      <button onClick={(e) => moveProject(p, 1, e)} className="text-muted-foreground hover:text-foreground" aria-label="Move down">▼</button>
                    </div>
                  </td>
                  <td className="px-3 py-2">
                    {p.cover_url ? (
                      <img src={p.cover_url} alt="" className="h-10 w-14 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-14 rounded bg-muted" />
                    )}
                  </td>
                  <td className="px-3 py-2 font-medium">{p.title}</td>
                  <td className="px-3 py-2 text-muted-foreground">{p.location ?? "—"}</td>
                  <td className="px-3 py-2">
                    <span className={`inline-block rounded px-2 py-0.5 text-[11px] font-semibold capitalize ${CATEGORY_BADGE[p.category] ?? "bg-muted text-foreground"}`}>
                      {p.category}
                    </span>
                  </td>
                  <td className="px-3 py-2 text-muted-foreground">{p.image_count}</td>
                  <td className="px-3 py-2">
                    <button
                      onClick={(e) => toggleVisible(p, e)}
                      disabled={busy === p.id}
                      className={`relative inline-flex h-5 w-9 items-center rounded-full transition-colors ${p.visible ? "bg-[#16a34a]" : "bg-muted-foreground/30"}`}
                      aria-label={p.visible ? "Hide project" : "Show project"}
                    >
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${p.visible ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-3 py-2 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate({ to: "/admin/gallery/$projectId", params: { projectId: p.id } }); }}
                      className="mr-3 text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                    >
                      Edit
                    </button>
                    <button onClick={(e) => { e.stopPropagation(); deleteProject(p); }} disabled={busy === p.id} className="text-xs font-bold uppercase tracking-wider text-destructive hover:underline">
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
