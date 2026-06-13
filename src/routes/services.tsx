import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | All Colours Painting Contractor Limited" },
      { name: "description", content: "Interior, exterior, commercial painting, wallpapering, plastering and spray finishing across London." },
      { property: "og:title", content: "Painting & Decorating Services" },
      { property: "og:description", content: "Full painting & decorating service for homes and businesses in London." },
    ],
  }),
  component: Services,
});

const items = [
  { title: "Interior Painting", desc: "Walls, ceilings, woodwork and skirting. Premium emulsion, eggshell and satin finishes with full dust sheeting and tidy daily clean-down." },
  { title: "Exterior Painting", desc: "Render, masonry, brick, soffits and fascias. Weatherproof Sandtex and Dulux Weathershield systems with proper preparation." },
  { title: "Commercial & Office", desc: "Out-of-hours and weekend work to keep your business running. Compliant, insured and CSCS-carded teams." },
  { title: "Wallpapering", desc: "Lining paper, standard wallcoverings, hand-printed and feature wall installations with mitre-perfect seams." },
  { title: "Plastering & Repairs", desc: "Skim, patch and full re-plasters, crack stitching and surface preparation to give every finish a flawless base." },
  { title: "Spray Finishing", desc: "Airless and HVLP spray finishing for kitchens, doors, joinery and ceilings — a factory-grade finish on site." },
  { title: "Sash Windows & Doors", desc: "Sanding, filling, draught-stripping and repainting period sash windows and front doors." },
  { title: "Property Maintenance", desc: "Annual repaint contracts for landlords, letting agents and managed properties." },
];

function Services() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Services</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">Painting & decorating, done properly</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">From a single feature wall to a full commercial fit-out, we deliver clean lines and durable finishes — first time.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-6 md:grid-cols-2">
          {items.map((s) => (
            <div key={s.title} className="rounded-xl border border-border bg-card p-8 transition-shadow hover:shadow-lg">
              <h2 className="text-xl font-semibold text-primary">{s.title}</h2>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
        <div className="mt-12 rounded-xl bg-primary p-8 text-primary-foreground md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Not sure what you need?</h2>
          <p className="mt-2 max-w-2xl text-primary-foreground/80">We'll visit, advise and quote — free of charge.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">Get a free quote</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
