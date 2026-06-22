import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { cn } from "../lib/utils";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.jpg.asset.json";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "residential", label: "Residential" },
  { value: "commercial", label: "Commercial" },
  { value: "industrial", label: "Industrial" },
  { value: "floors", label: "Floors" },
  { value: "before-after", label: "Before & After" },
];

function getCategory(index: number) {
  if (index < 20) return "residential";
  if (index < 35) return "commercial";
  if (index < 50) return "industrial";
  if (index < 65) return "floors";
  return "before-after";
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
      { title: "Gallery | All Colours Painting Contractor Limited" },
      { name: "description", content: "Recent painting and decorating projects — interior, exterior, commercial and industrial." },
      { property: "og:title", content: "Project Gallery" },
      { property: "og:description", content: "A selection of our recent painting & decorating work." },
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
          <div className="grid gap-3 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 md:gap-4">
            {projects.map((p) => (
              <figure key={p.id} className="group relative overflow-hidden bg-card">
                <div className="aspect-square overflow-hidden">
                  <img src={p.image_url} alt={p.title ?? "Painting project"} loading="lazy" width={1200} height={1200} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
                <div className="pointer-events-none absolute inset-0 border-b-[3px] border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

