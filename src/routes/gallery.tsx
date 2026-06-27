import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "../components/SiteLayout";
import { cn } from "../lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { resolveGalleryUrl } from "@/lib/galleryUrl";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.webp.asset.json";
import { SITE } from "@/lib/site";

type CategoryValue = "interior" | "exterior" | "commercial" | "epoxy" | "bespoke";

const CATEGORIES: { value: "all" | CategoryValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "commercial", label: "Commercial" },
  { value: "epoxy", label: "Floor Coatings" },
  { value: "bespoke", label: "Bespoke" },
];

const CATEGORY_LABEL: Record<CategoryValue, string> = {
  interior: "Interior",
  exterior: "Exterior",
  commercial: "Commercial",
  epoxy: "Floor Coatings",
  bespoke: "Bespoke",
};

type Photo = {
  id: string;
  image_url: string;
  is_cover: boolean;
  sort_order: number;
  alt_text: string | null;
};

type Album = {
  id: string;
  title: string;
  location: string;
  category: CategoryValue;
  sort_order: number;
  photos: Photo[];
  cover_url: string;
};

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Painting Portfolio Dublin | All Colours Painting Gallery" },
      { name: "description", content: "Browse our portfolio of completed painting projects across Dublin. Interior repaints, exterior work, commercial fit-outs, floor coatings and bespoke finishes." },
      { property: "og:title", content: "Painting Portfolio Dublin | All Colours Painting Gallery" },
      { property: "og:description", content: "Browse our portfolio of completed painting projects across Dublin. Interior repaints, exterior work, commercial fit-outs, floor coatings and bespoke finishes." },
      { property: "og:url", content: "https://allcolourspainter.com/gallery" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/gallery" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://allcolourspainter.com/"},{"@type":"ListItem","position":2,"name":"Gallery","item":"https://allcolourspainter.com/gallery"}]}),
      },
    ],
  }),
  component: Gallery,
});

async function fetchAlbums(): Promise<Album[]> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, project_id, image_url, storage_path, alt_text, is_cover, sort_order, gallery_projects!inner(id, title, location, category, sort_order, visible)")
    .eq("gallery_projects.visible", true)
    .order("sort_order", { foreignTable: "gallery_projects", ascending: true })
    .order("is_cover", { ascending: false })
    .order("sort_order", { ascending: true });
  if (error) throw error;

  const rows = await Promise.all(
    (data ?? []).map(async (row: any) => ({
      project_id: row.project_id as string,
      project: row.gallery_projects,
      photo: {
        id: row.id as string,
        image_url: await resolveGalleryUrl(row.image_url, row.storage_path),
        is_cover: !!row.is_cover,
        sort_order: row.sort_order as number,
        alt_text: row.alt_text as string | null,
      } as Photo,
    })),
  );

  const map = new Map<string, Album>();
  for (const r of rows) {
    let album = map.get(r.project_id);
    if (!album) {
      album = {
        id: r.project_id,
        title: r.project.title,
        location: r.project.location ?? "Dublin",
        category: r.project.category as CategoryValue,
        sort_order: r.project.sort_order ?? 0,
        photos: [],
        cover_url: "",
      };
      map.set(r.project_id, album);
    }
    album.photos.push(r.photo);
  }

  const albums = Array.from(map.values());
  for (const a of albums) {
    a.photos.sort((x, y) => {
      if (x.is_cover !== y.is_cover) return x.is_cover ? -1 : 1;
      return x.sort_order - y.sort_order;
    });
    a.cover_url = a.photos[0]?.image_url ?? "";
  }
  albums.sort((a, b) => a.sort_order - b.sort_order);
  return albums;
}

function Gallery() {
  const { data: albums, isLoading, isError } = useQuery({ queryKey: ["public-gallery-albums"], queryFn: fetchAlbums });
  const [activeFilter, setActiveFilter] = useState<"all" | CategoryValue>("all");
  const [openAlbumId, setOpenAlbumId] = useState<string | null>(null);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const all = albums ?? [];
  const filteredAlbums = useMemo(
    () => (activeFilter === "all" ? all : all.filter((p) => p.category === activeFilter)),
    [all, activeFilter],
  );
  const counts = CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.value === "all" ? all.length : all.filter((p) => p.category === cat.value).length,
  }));

  const openAlbum = useMemo(
    () => (openAlbumId ? all.find((a) => a.id === openAlbumId) ?? null : null),
    [openAlbumId, all],
  );

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    if (lightboxIndex === null || !openAlbum) return;
    setLightboxIndex((lightboxIndex + 1) % openAlbum.photos.length);
  }, [lightboxIndex, openAlbum]);
  const goPrev = useCallback(() => {
    if (lightboxIndex === null || !openAlbum) return;
    setLightboxIndex((lightboxIndex - 1 + openAlbum.photos.length) % openAlbum.photos.length);
  }, [lightboxIndex, openAlbum]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") closeLightbox();
      if (e.key === "ArrowRight") goNext();
      if (e.key === "ArrowLeft") goPrev();
    };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [lightboxIndex, closeLightbox, goNext, goPrev]);

  // Lock scroll when album modal open
  useEffect(() => {
    if (!openAlbum || lightboxIndex !== null) return;
    document.body.style.overflow = "hidden";
    return () => { document.body.style.overflow = ""; };
  }, [openAlbum, lightboxIndex]);

  const activePhoto = openAlbum && lightboxIndex !== null ? openAlbum.photos[lightboxIndex] : null;

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img
          src={exteriorAsset.url}
          alt="Gallery of painting & decorating projects completed across Dublin"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">Our portfolio</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-6xl">
            Our Work
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            A selection of recent projects across Dublin — residential, commercial, industrial and bespoke. Browse by album.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="mb-10 flex gap-2 overflow-x-auto pb-2 scrollbar-hide md:flex-wrap md:overflow-visible">
            {counts.map((cat) => (
              <button
                key={cat.value}
                type="button"
                onClick={() => setActiveFilter(cat.value)}
                className={cn(
                  "inline-flex flex-shrink-0 items-center gap-2 rounded-full px-4 py-2.5 font-display text-[11px] font-bold uppercase tracking-wider transition-colors duration-200",
                  activeFilter === cat.value
                    ? "bg-primary text-primary-foreground"
                    : "bg-card text-foreground ring-1 ring-border hover:bg-primary hover:text-primary-foreground",
                )}
              >
                {cat.label}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    activeFilter === cat.value ? "bg-white/20 text-white" : "bg-muted text-muted-foreground",
                  )}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <h2 className="sr-only">Recent painting & decorating project albums</h2>

          {isLoading ? (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {Array.from({ length: 6 }).map((_, i) => (
                <div key={i} className="aspect-[4/3] animate-pulse bg-muted" />
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-md border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                We couldn't load the gallery right now. Call us on{" "}
                <a href={`tel:${SITE.phoneTel}`} className="font-semibold text-primary">085 821 1870</a> and we'll send photos by WhatsApp.
              </p>
            </div>
          ) : filteredAlbums.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects in this category yet.</p>
          ) : (
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filteredAlbums.map((album) => (
                <button
                  key={album.id}
                  type="button"
                  onClick={() => { setOpenAlbumId(album.id); setLightboxIndex(null); }}
                  className="group relative block overflow-hidden bg-card text-left"
                  aria-label={`Open ${album.title} album (${album.photos.length} photos)`}
                >
                  <div className="relative aspect-[4/3] overflow-hidden bg-muted">
                    {album.cover_url && (
                      <img
                        src={album.cover_url}
                        alt={`${album.title} — ${album.location} — All Colours Painting Dublin`}
                        loading="lazy"
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    )}
                    <div className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-black/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
                      <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect width="18" height="18" x="3" y="3" rx="2" ry="2"/><circle cx="9" cy="9" r="2"/><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"/></svg>
                      {album.photos.length} {album.photos.length === 1 ? "photo" : "photos"}
                    </div>
                  </div>
                  <div className="border-t border-border p-4">
                    <span className="inline-block bg-primary px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      {CATEGORY_LABEL[album.category]}
                    </span>
                    <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide text-foreground">{album.title}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground">{album.location}</p>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="bg-[var(--color-surface-dark)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-4 py-16 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <h2 className="font-display text-2xl font-bold uppercase tracking-tight md:text-3xl">Like what you see?</h2>
            <p className="mt-2 text-white/75">Every project starts with a free site visit.</p>
          </div>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/contact" className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">
              Request a Free Quote
            </Link>
            <a href={`tel:${SITE.phoneTel}`} className="inline-flex items-center rounded-sm border border-white/30 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary`>
              📞 Call ${SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Album view (modal overlay) */}
      {openAlbum && (
        <div className=`fixed inset-0 z-[60] overflow-y-auto bg-background" role="dialog" aria-modal="true" aria-label={`${openAlbum.title} album`}>
          <div className="sticky top-0 z-10 flex items-center justify-between gap-4 border-b border-border bg-background/95 px-4 py-4 backdrop-blur md:px-8">
            <button
              type="button"
              onClick={() => { setOpenAlbumId(null); setLightboxIndex(null); }}
              className="inline-flex items-center gap-2 rounded-sm border border-border bg-card px-4 py-2 font-display text-[11px] font-bold uppercase tracking-wider text-foreground hover:bg-primary hover:text-primary-foreground"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6"/></svg>
              Back to albums
            </button>
            <div className="min-w-0 flex-1 text-right">
              <p className="truncate font-display text-sm font-bold uppercase tracking-wide text-foreground md:text-base">{openAlbum.title}</p>
              <p className="truncate text-xs text-muted-foreground">
                <span className="inline-block">{CATEGORY_LABEL[openAlbum.category]}</span>
                <span className="mx-1.5">·</span>
                <span>{openAlbum.location}</span>
                <span className="mx-1.5">·</span>
                <span>{openAlbum.photos.length} {openAlbum.photos.length === 1 ? "photo" : "photos"}</span>
              </p>
            </div>
          </div>

          <div className="mx-auto max-w-7xl px-4 py-8 md:px-8 md:py-12">
            <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
              {openAlbum.photos.map((p, idx) => (
                <figure
                  key={p.id}
                  className="group relative mb-4 block cursor-pointer overflow-hidden bg-card break-inside-avoid"
                  onClick={() => setLightboxIndex(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open photo ${idx + 1} of ${openAlbum.photos.length}`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxIndex(idx);
                    }
                  }}
                >
                  <img
                    src={p.image_url}
                    alt={p.alt_text || `${openAlbum.title} — ${openAlbum.location} — All Colours Painting Dublin`}
                    loading="lazy"
                    className="block h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </figure>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Lightbox */}
      {activePhoto && openAlbum && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <button type="button" onClick={closeLightbox} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20" aria-label="Close lightbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>

          {openAlbum.photos.length > 1 && (
            <>
              <button type="button" onClick={(e) => { e.stopPropagation(); goPrev(); }} className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-6" aria-label="Previous image">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button type="button" onClick={(e) => { e.stopPropagation(); goNext(); }} className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-6" aria-label="Next image">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </>
          )}

          <div className="flex max-h-full max-w-5xl flex-col items-center" onClick={(e) => e.stopPropagation()}>
            <img src={activePhoto.image_url} alt={activePhoto.alt_text || `${openAlbum.title} — ${openAlbum.location} — All Colours Painting Dublin`} className="max-h-[75vh] max-w-full rounded-sm object-contain shadow-2xl" />
            <div className="mt-4 text-center">
              <span className="inline-block bg-primary px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                {CATEGORY_LABEL[openAlbum.category]}
              </span>
              <p className="mt-2 font-display text-lg font-bold uppercase tracking-wide text-white">{openAlbum.title}</p>
              <p className="mt-0.5 text-sm text-white/70">
                {openAlbum.location} · {(lightboxIndex ?? 0) + 1} / {openAlbum.photos.length}
              </p>
              <Link to="/contact" onClick={closeLightbox} className="mt-5 inline-flex items-center rounded-sm bg-[#16a34a] px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-[#15803d]">
                Get a similar quote →
              </Link>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
