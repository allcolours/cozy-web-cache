import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import hero from "../assets/hero.jpg";
import g1 from "../assets/gallery-1.jpg";
import g2 from "../assets/gallery-2.jpg";
import g3 from "../assets/gallery-3.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All Colours Painting Contractor Limited | London Painters & Decorators" },
      { name: "description", content: "Professional interior, exterior and commercial painting & decorating across London. Quality finishes, tidy workmanship, fully insured. Free quotes." },
      { property: "og:title", content: "All Colours Painting Contractor Limited" },
      { property: "og:description", content: "Professional painters & decorators in London. Interior, exterior, commercial." },
    ],
  }),
  component: Home,
});

const services = [
  { title: "Interior Painting", desc: "Walls, ceilings, woodwork, and feature finishes for homes and apartments." },
  { title: "Exterior Painting", desc: "Facades, render, masonry, sash windows and doors — weatherproof and built to last." },
  { title: "Commercial & Office", desc: "Offices, retail and hospitality, scheduled out of hours to keep you trading." },
  { title: "Wallpapering", desc: "Specialist hanging of lining, standard and high-end designer papers." },
  { title: "Plastering & Repairs", desc: "Skim coats, crack filling and surface prep so every finish lasts." },
  { title: "Spray Finishing", desc: "Factory-quality spray finishes on doors, kitchens, joinery and ceilings." },
];

const stats = [
  { k: "20+", v: "Years experience" },
  { k: "1,200+", v: "Projects completed" },
  { k: "100%", v: "Insured & guaranteed" },
  { k: "5★", v: "Average client rating" },
];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={hero} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-primary/85 via-primary/60 to-transparent" />
        <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-40">
          <div className="max-w-2xl text-primary-foreground">
            <span className="inline-flex items-center rounded-full border border-white/30 bg-white/10 px-3 py-1 text-xs font-medium uppercase tracking-wider backdrop-blur">
              {COMPANY.area}
            </span>
            <h1 className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight md:text-6xl">
              Painting & decorating done <span className="text-accent">beautifully.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg text-primary-foreground/85">
              {COMPANY.name} delivers precise, long-lasting finishes for homes, landlords and businesses — on time and on budget.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground transition-transform hover:scale-[1.02]">
                Get a free quote
              </Link>
              <Link to="/gallery" className="inline-flex items-center rounded-md border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-primary-foreground backdrop-blur hover:bg-white/20">
                View our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-4 md:px-8">
          {stats.map((s) => (
            <div key={s.v} className="text-center">
              <div className="text-3xl font-bold text-primary md:text-4xl">{s.k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-accent">What we do</p>
            <h2 className="mt-2 text-3xl font-bold tracking-tight text-primary md:text-4xl">A full painting & decorating service</h2>
          </div>
          <Link to="/services" className="text-sm font-semibold text-primary hover:text-accent">All services →</Link>
        </div>
        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <div key={s.title} className="group rounded-xl border border-border bg-card p-6 transition-shadow hover:shadow-lg">
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-md bg-accent/10 text-accent">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M4 7h16M4 12h16M4 17h10" /></svg>
              </div>
              <h3 className="text-lg font-semibold text-primary">{s.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Gallery preview */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <h2 className="text-3xl font-bold tracking-tight text-primary md:text-4xl">Recent projects</h2>
            <Link to="/gallery" className="text-sm font-semibold text-primary hover:text-accent">See gallery →</Link>
          </div>
          <div className="mt-10 grid gap-4 md:grid-cols-3">
            {[g1, g2, g3].map((src, i) => (
              <div key={i} className="group relative aspect-[4/3] overflow-hidden rounded-xl">
                <img src={src} alt="" loading="lazy" width={1200} height={900} className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary text-primary-foreground">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:px-8">
          <div>
            <h2 className="text-3xl font-bold tracking-tight md:text-4xl">Ready to transform your space?</h2>
            <p className="mt-2 text-primary-foreground/75">Free, no-obligation quotes across {COMPANY.area}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">Request a quote</Link>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="inline-flex items-center rounded-md border border-white/30 bg-white/10 px-6 py-3 text-sm font-semibold">{COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
