import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.jpg";

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Gallery | All Colours Painting Contractor Limited" },
      { name: "description", content: "Recent painting and decorating projects across London — interior, exterior and commercial." },
      { property: "og:title", content: "Project Gallery" },
      { property: "og:description", content: "A selection of our recent painting & decorating work." },
      { property: "og:image", content: g1 },
    ],
  }),
  component: Gallery,
});

const projects = [
  { src: g1, title: "Sage Living Room", tag: "Interior · Chelsea" },
  { src: g2, title: "Period Townhouse Facade", tag: "Exterior · Notting Hill" },
  { src: g3, title: "Open-Plan Office Repaint", tag: "Commercial · Shoreditch" },
  { src: g1, title: "Family Home Refresh", tag: "Interior · Richmond" },
  { src: g2, title: "Sash Windows & Door", tag: "Exterior · Islington" },
  { src: g3, title: "Boutique Hotel Suite", tag: "Hospitality · Soho" },
];

function Gallery() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Our work</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">Recent projects</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">A snapshot of homes, offices and storefronts we've recently transformed.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {projects.map((p, i) => (
            <figure key={i} className="group overflow-hidden rounded-xl border border-border bg-card">
              <div className="aspect-[4/3] overflow-hidden">
                <img src={p.src} alt={p.title} loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
              <figcaption className="p-5">
                <h3 className="font-semibold text-primary">{p.title}</h3>
                <p className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{p.tag}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
