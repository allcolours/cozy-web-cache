import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { cn } from "../lib/utils";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.jpg.asset.json";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "bespoke", label: "Bespoke" },
];

function getCategory(index: number) {
  if (index < 20) return "residential";
  if (index < 40) return "commercial";
  if (index < 55) return "industrial";
  return "bespoke";
}

// Auto-generated gallery imports
const galleryModules = import.meta.glob<{ default: { url: string } }>(
  "../assets/gallery/*.webp.asset.json",
  { eager: true },
);
const GALLERY_PHOTOS = Object.entries(galleryModules)
  .sort(([a], [b]) => a.localeCompare(b))
  .map(([path, mod], i) => ({
    id: path,
    image_url: mod.default.url,
    title: `Project ${String(i + 1).padStart(2, "0")}`,
    category: getCategory(i),
  }));

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

function Gallery() {
  const projects = GALLERY_PHOTOS;
  const [activeFilter, setActiveFilter] = useState("all");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const filteredProjects =
    activeFilter === "all"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  const counts = CATEGORIES.map((cat) => ({
    ...cat,
    count:
      cat.value === "all"
        ? projects.length
        : projects.filter((p) => p.category === cat.value).length,
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
    if (lightboxIndex >= filteredProjects.length) {
      setLightboxIndex(null);
    }
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
        <img src={exteriorAsset.url} alt="Gallery of painting & decorating projects completed across Dublin" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">Our work</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-6xl">
            Recent projects
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            A snapshot of homes, offices, hospitality spaces and industrial environments we've recently transformed.
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
                    : "bg-card text-foreground ring-1 ring-border hover:bg-primary hover:text-primary-foreground"
                )}
              >
                {cat.label}
                <span
                  className={cn(
                    "rounded-full px-2 py-0.5 text-[10px] font-semibold",
                    activeFilter === cat.value
                      ? "bg-white/20 text-white"
                      : "bg-muted text-muted-foreground"
                  )}
                >
                  {cat.count}
                </span>
              </button>
            ))}
          </div>

          <div key={activeFilter} className="animate-fade-in grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {filteredProjects.map((p, i) => (
              <figure
                key={p.id}
                className="group relative cursor-pointer overflow-hidden bg-card"
                onClick={() => setLightboxIndex(i)}
                role="button"
                tabIndex={0}
                aria-label={`Open ${p.title} in lightbox`}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    setLightboxIndex(i);
                  }
                }}
              >
                <div className="aspect-square overflow-hidden">
                  <img src={p.image_url} alt={p.title} loading="lazy" width={1200} height={1200} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 border-b-[3px] border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute bottom-0 left-0 right-0 p-4 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                  <p className="font-display text-sm font-bold text-white">{p.title}</p>
                  <p className="text-xs uppercase tracking-wider text-white/80">{CATEGORIES.find((c) => c.value === p.category)?.label}</p>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {activePhoto && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/95 p-4"
          onClick={closeLightbox}
          role="dialog"
          aria-modal="true"
          aria-label="Image lightbox"
        >
          <button
            type="button"
            onClick={closeLightbox}
            className="absolute right-4 top-4 rounded-full bg-white/10 p-2 text-white backdrop-blur-sm transition-colors hover:bg-white/20"
            aria-label="Close lightbox"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M18 6 6 18" /><path d="m6 6 12 12" /></svg>
          </button>

          {filteredProjects.length > 1 && (
            <>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goPrev(); }}
                className="absolute left-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:left-6"
                aria-label="Previous image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m15 18-6-6 6-6" /></svg>
              </button>
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); goNext(); }}
                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-white/10 p-3 text-white backdrop-blur-sm transition-colors hover:bg-white/20 md:right-6"
                aria-label="Next image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="m9 18 6-6-6-6" /></svg>
              </button>
            </>
          )}

          <div className="max-h-full max-w-full" onClick={(e) => e.stopPropagation()}>
            <img
              src={activePhoto.image_url}
              alt={activePhoto.title}
              className="max-h-[85vh] max-w-full rounded-sm object-contain shadow-2xl"
            />
            <div className="mt-3 text-center">
              <p className="font-display text-lg font-bold text-white">{activePhoto.title}</p>
              <p className="text-sm uppercase tracking-wider text-white/70">{CATEGORIES.find((c) => c.value === activePhoto.category)?.label}</p>
            </div>
          </div>
        </div>
      )}
    </SiteLayout>
  );
}
