import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.jpg.asset.json";
import floorAsset from "../assets/portfolio/portfolio-commercial-floor.jpg.asset.json";
import commercialAsset from "../assets/portfolio/service-commercial.jpg.asset.json";
import industrialAsset from "../assets/portfolio/service-industrial.jpg.asset.json";
import hospitalityAsset from "../assets/portfolio/service-hospitality.jpg.asset.json";
import aboutAsset from "../assets/portfolio/about-architecture.jpg.asset.json";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | All Colours Painting Contractor Limited" },
      { name: "description", content: "Recent painting and decorating projects — interior, exterior, commercial and industrial." },
      { property: "og:title", content: "Project Gallery" },
      { property: "og:description", content: "A selection of our recent painting & decorating work." },
      { property: "og:image", content: heroAsset.url },
    ],
  }),
  component: Gallery,
});

const projects = [
  { src: heroAsset.url, title: "Sage Country House", tag: "Exterior · Residential" },
  { src: exteriorAsset.url, title: "Modern Family Villa", tag: "Exterior · Residential" },
  { src: floorAsset.url, title: "Warehouse Floor Coating", tag: "Industrial · Floor systems" },
  { src: commercialAsset.url, title: "Open-Plan Office Repaint", tag: "Commercial · Offices" },
  { src: hospitalityAsset.url, title: "Restaurant & Bar Fit-Out", tag: "Hospitality · Interiors" },
  { src: industrialAsset.url, title: "Distribution Centre", tag: "Industrial · Repaint" },
  { src: aboutAsset.url, title: "Architectural Detail", tag: "Bespoke · Exterior" },
  { src: heroAsset.url, title: "Period Townhouse", tag: "Exterior · Heritage" },
];

function Gallery() {
  return (
    <SiteLayout>
      {/* Hero band */}
      <section className="relative isolate overflow-hidden">
        <img src={exteriorAsset.url} alt="" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
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

      {/* Grid */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {projects.map((p, i) => (
              <figure key={`${p.title}-${i}`} className="group relative overflow-hidden bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={p.src} alt={p.title} loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 translate-y-2 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white opacity-95 transition-all duration-300 group-hover:translate-y-0 group-hover:opacity-100">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">{p.tag}</p>
                  <h3 className="mt-1 font-display text-base font-bold uppercase tracking-wide">{p.title}</h3>
                </figcaption>
                <div className="pointer-events-none absolute inset-0 border-b-[3px] border-primary opacity-0 transition-opacity duration-300 group-hover:opacity-100" />
              </figure>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
