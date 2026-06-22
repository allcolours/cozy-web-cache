import { createFileRoute, Link } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { SiteLayout } from "../components/SiteLayout";
import { cn } from "../lib/utils";
import { supabase } from "@/integrations/supabase/client";
import { resolveGalleryUrl } from "@/lib/galleryUrl";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.jpg.asset.json";

type CategoryValue = "interior" | "exterior" | "commercial" | "epoxy" | "bespoke";

const CATEGORIES: { value: "all" | CategoryValue; label: string }[] = [
  { value: "all", label: "All" },
  { value: "interior", label: "Interior" },
  { value: "exterior", label: "Exterior" },
  { value: "commercial", label: "Commercial" },
  { value: "epoxy", label: "Epoxy Floors" },
  { value: "bespoke", label: "Bespoke" },
];

const CATEGORY_LABEL: Record<CategoryValue, string> = {
  interior: "Interior",
  exterior: "Exterior",
  commercial: "Commercial",
  epoxy: "Epoxy Floors",
  bespoke: "Bespoke",
};

type Photo = {
  id: string;
  project_id: string;
  image_url: string;
  title: string;
  location: string;
  category: CategoryValue;
};

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Painting Portfolio Dublin | All Colours Painting Gallery" },
      { name: "description", content: "Browse our portfolio of completed painting projects across Dublin. Interior repaints, exterior work, commercial fit-outs, epoxy floors and bespoke finishes." },
      { property: "og:title", content: "Painting Portfolio Dublin | All Colours Painting Gallery" },
      { property: "og:description", content: "Browse our portfolio of completed painting projects across Dublin. Interior repaints, exterior work, commercial fit-outs, epoxy floors and bespoke finishes." },
      { property: "og:url", content: "https://allcolourspainter.com/gallery" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/gallery" }],
  }),
  component: Gallery,
});

async function fetchGallery(): Promise<Photo[]> {
  const { data, error } = await supabase
    .from("gallery_images")
    .select("id, project_id, image_url, storage_path, alt_text, is_cover, sort_order, gallery_projects!inner(id, title, location, category, sort_order, visible)")
    .eq("gallery_projects.visible", true)
    .order("sort_order", { foreignTable: "gallery_projects", ascending: true })
    .order("is_cover", { ascending: false })
    .order("sort_order", { ascending: true });
  if (error) throw error;
  const resolved = await Promise.all(
    (data ?? []).map(async (row: any) => ({
      id: row.id as string,
      project_id: row.project_id as string,
      image_url: await resolveGalleryUrl(row.image_url, row.storage_path),
      title: row.gallery_projects.title as string,
      location: (row.gallery_projects.location ?? "Dublin") as string,
      category: row.gallery_projects.category as CategoryValue,
    })),
  );
  return resolved;
}

function Gallery() {
  const { data: projects, isLoading, isError } = useQuery({ queryKey: ["public-gallery"], queryFn: fetchGallery });
  const [activeFilter, setActiveFilter] = useState<"all" | CategoryValue>("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const all = projects ?? [];
  const filteredProjects = useMemo(
    () => (activeFilter === "all" ? all : all.filter((p) => p.category === activeFilter)),
    [all, activeFilter],
  );
  const counts = CATEGORIES.map((cat) => ({
    ...cat,
    count: cat.value === "all" ? all.length : all.filter((p) => p.category === cat.value).length,
  }));

  const closeLightbox = useCallback(() => setLightboxIndex(null), []);
  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex + 1) % filteredProjects.length);
  }, [lightboxIndex, filteredProjects.length]);
  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxIndex((lightboxIndex - 1 + filteredProjects.length) % filteredProjects.length);
  }, [lightboxIndex, filteredProjects.length]);

  useEffect(() => {
    if (lightboxIndex === null) return;
    if (lightboxIndex >= filteredProjects.length) setLightboxIndex(null);
  }, [filteredProjects.length, lightboxIndex]);

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

  const activePhoto = lightboxIndex !== null ? filteredProjects[lightboxIndex] : null;

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img
          src={exteriorAsset.url}
          alt="Gallery of painting & decorating projects completed across Dublin"
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
            A selection of recent projects across Dublin — residential, commercial, industrial and bespoke.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="-mx-4 mb-10 flex gap-2 overflow-x-auto px-4 pb-2 scrollbar-hide md:mx-0 md:flex-wrap md:overflow-visible md:px-0">
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

          <h2 className="sr-only">Recent painting & decorating projects</h2>


          {isLoading ? (
            <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
              {Array.from({ length: 9 }).map((_, i) => (
                <div
                  key={i}
                  className="mb-4 break-inside-avoid animate-pulse bg-muted"
                  style={{ height: 200 + ((i * 53) % 220) }}
                />
              ))}
            </div>
          ) : isError ? (
            <div className="rounded-md border border-border bg-card p-8 text-center">
              <p className="text-sm text-muted-foreground">
                We couldn't load the gallery right now. Call us on{" "}
                <a href="tel:0858211870" className="font-semibold text-primary">085 821 1870</a> and we'll send photos by WhatsApp.
              </p>
            </div>
          ) : filteredProjects.length === 0 ? (
            <p className="text-sm text-muted-foreground">No projects in this category yet.</p>
          ) : (
            <div className="columns-1 gap-4 md:columns-2 lg:columns-3">
              {filteredProjects.map((p, idx) => (
                <figure
                  key={p.id}
                  className="group relative mb-4 block cursor-pointer overflow-hidden bg-card break-inside-avoid"
                  onClick={() => setLightboxIndex(idx)}
                  role="button"
                  tabIndex={0}
                  aria-label={`Open ${p.title} in ${p.location} in lightbox`}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      setLightboxIndex(idx);
                    }
                  }}
                >
                  <img
                    src={p.image_url}
                    alt={`${p.title} — ${p.location} — All Colours Painting Dublin`}
                    loading="lazy"
                    className="block h-auto w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 translate-y-full bg-gradient-to-t from-black/95 via-black/80 to-transparent p-4 pt-12 transition-transform duration-300 group-hover:translate-y-0">
                    <span className="inline-block bg-primary px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                      {CATEGORY_LABEL[p.category]}
                    </span>
                    <p className="mt-2 font-display text-sm font-bold uppercase tracking-wide text-white">{p.title}</p>
                    <p className="mt-0.5 text-xs text-white/75">{p.location}</p>
                  </div>
                </figure>
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
            <a href="tel:0858211870" className="inline-flex items-center rounded-sm border border-white/30 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary">
              📞 Call 085 821 1870
            </a>
          </div>
        </div>
      </section>

      {activePhoto && (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-black/95 p-4" onClick={closeLightbox} role="dialog" aria-modal="true" aria-label="Image lightbox">
          <button type="button" onClick={closeLightbox} className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20" aria-label="Close lightbox">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>

          {filteredProjects.length > 1 && (
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
            <img src={activePhoto.image_url} alt={`${activePhoto.title} — ${activePhoto.location} — All Colours Painting Dublin`} className="max-h-[75vh] max-w-full rounded-sm object-contain shadow-2xl" />
            <div className="mt-4 text-center">
              <span className="inline-block bg-primary px-2 py-0.5 font-display text-[10px] font-bold uppercase tracking-wider text-primary-foreground">
                {CATEGORY_LABEL[activePhoto.category]}
              </span>
              <p className="mt-2 font-display text-lg font-bold uppercase tracking-wide text-white">{activePhoto.title}</p>
              <p className="mt-0.5 text-sm text-white/70">{activePhoto.location}</p>
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
