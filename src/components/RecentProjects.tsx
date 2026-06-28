import { useQuery } from "@tanstack/react-query";
import { Link } from "@tanstack/react-router";
import { supabase } from "@/integrations/supabase/client";
import { resolveGalleryUrl } from "@/lib/galleryUrl";

type HomeAlbum = {
  id: string;
  title: string;
  location: string;
  category: string;
  cover_url: string;
  photo_count: number;
};

const CATEGORY_LABEL: Record<string, string> = {
  interior: "Interior",
  exterior: "Exterior",
  commercial: "Commercial",
  epoxy: "Floor Coatings",
  bespoke: "Bespoke",
};

async function fetchHomeAlbums(): Promise<HomeAlbum[]> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select(
      "id, project_id, image_url, storage_path, is_cover, sort_order, gallery_projects!inner(id, title, location, category, sort_order, visible)",
    )
    .eq("gallery_projects.visible", true)
    .order("sort_order", { foreignTable: "gallery_projects", ascending: true })
    .order("is_cover", { ascending: false })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  const map = new Map<string, { project: any; rows: any[] }>();
  for (const row of (data ?? []) as any[]) {
    const pid = row.project_id as string;
    if (!map.has(pid)) map.set(pid, { project: row.gallery_projects, rows: [] });
    map.get(pid)!.rows.push(row);
  }
  const albums = await Promise.all(
    Array.from(map.entries()).map(async ([pid, { project, rows }]) => {
      const cover = rows.find((r) => r.is_cover) ?? rows[0];
      return {
        id: pid,
        title: project.title as string,
        location: (project.location as string) ?? "Dublin",
        category: project.category as string,
        cover_url: await resolveGalleryUrl(cover.image_url, cover.storage_path),
        photo_count: rows.length,
      } as HomeAlbum;
    }),
  );
  albums.sort(
    (a, b) =>
      ((map.get(a.id)!.project.sort_order ?? 0) as number) -
      ((map.get(b.id)!.project.sort_order ?? 0) as number),
  );
  return albums.slice(0, 6);
}

export default function RecentProjects() {
  const { data: albums } = useQuery({
    queryKey: ["home-recent-albums"],
    queryFn: fetchHomeAlbums,
  });
  const items = albums ?? [];
  if (items.length === 0) return null;
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Our work</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Recent projects</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-2xl text-base text-foreground">
              A selection of recent Dublin jobs from our gallery — interiors, exteriors, floor
              coatings and commercial fit-outs.
            </p>
          </div>
          <Link
            to="/projects"
            className="font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]"
          >
            See more projects →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link key={p.id} to="/projects" className="group relative block overflow-hidden bg-card">
              <div className="aspect-[16/11] overflow-hidden">
                {p.cover_url ? (
                  <img
                    src={p.cover_url}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={825}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
                  {CATEGORY_LABEL[p.category] ?? p.category} · {p.location}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-wide">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs text-white/80">
                  {p.photo_count} photo{p.photo_count === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
