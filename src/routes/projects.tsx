import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import heroAsset from "../assets/portfolio/service-commercial.jpg.asset.json";

const PROJECTS = [
  {
    name: "Walkers Gate",
    contractor: "Walls Construction",
    sector: "Residential development",
    location: "Dublin",
    blurb: "Specialist painting & decorating works delivered across a multi-unit residential development for one of Ireland's leading main contractors.",
  },
  {
    name: "Hawkins Wood",
    contractor: "Cairn Homes",
    sector: "New build housing",
    location: "Dublin",
    blurb: "Full interior and exterior painting on a large new-build residential scheme — handed over to Cairn's developer finish standard.",
  },
  {
    name: "Premier Inn — North Wall",
    contractor: "Collen Construction",
    sector: "Hospitality / hotel",
    location: "Dublin Docklands",
    blurb: "Bedrooms, corridors, public areas and back-of-house finished to brand specification on a live city-centre hotel build.",
  },
  {
    name: "Adamstown Apartments",
    contractor: "Elliott Group",
    sector: "Apartment scheme",
    location: "Adamstown, Dublin",
    blurb: "Repeat-block apartment painting at scale — programmed around fit-out trades to keep handovers on schedule.",
  },
  {
    name: "Marshall's Yard",
    contractor: "Bennett Construction",
    sector: "Mixed-use development",
    location: "Dublin",
    blurb: "Painting and decorating package delivered alongside fit-out trades on a complex mixed-use site.",
  },
  {
    name: "Student Co-Living — 118 Cork Street",
    contractor: "Elliott Group",
    sector: "Student / co-living",
    location: "Cork Street, Dublin 8",
    blurb: "High-traffic spec painting across studios, shared kitchens and amenity areas — durable, hard-wearing finishes throughout.",
  },
  {
    name: "Ronald McDonald House — St James's Hospital",
    contractor: "Clancy Construction",
    sector: "Healthcare / charity",
    location: "St James's Hospital, Dublin 8",
    blurb: "Sensitive, low-VOC finishes for family accommodation attached to a working hospital campus.",
  },
  {
    name: "Cooper Square — Seven Mills",
    contractor: "Cairn Homes",
    sector: "Residential masterplan",
    location: "Seven Mills, Dublin",
    blurb: "Painting works as part of Cairn's flagship Seven Mills neighbourhood — apartments delivered to developer handover standard.",
  },
];

const SECTORS = [
  { t: "Hotels & hospitality", d: "Premier Inn-grade brand standards on live hotel sites." },
  { t: "Apartments & co-living", d: "Repeat-unit programmes for Cairn, Elliott and others." },
  { t: "Healthcare", d: "Low-VOC, sensitive finishes around active hospital settings." },
  { t: "Commercial fit-out", d: "Office, retail and mixed-use — sequenced around other trades." },
];

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Major Projects | All Colours Painting Contractor Limited" },
      { name: "description", content: "Notable Dublin construction projects we've delivered painting & decorating works on as a specialist subcontractor — including Premier Inn North Wall, Cairn Homes, Elliott Group and more." },
      { property: "og:title", content: "Major Dublin Projects — All Colours Painting" },
      { property: "og:description", content: "Specialist painting subcontractor on hotel, residential, student and healthcare projects across Dublin." },
      { property: "og:url", content: "https://allcolourspainter.com/projects" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:title", content: "Major Dublin Projects — All Colours Painting" },
      { name: "twitter:description", content: "Hotel, residential, student & healthcare painting projects across Dublin." },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/projects" }],
  }),
  component: ProjectsPage,
});

function ProjectsPage() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={heroAsset.url} alt="" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/78" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">Major projects</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            Large-scale Dublin sites we've painted
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            A selection of major construction projects where we've delivered the painting & decorating package as a specialist subcontractor — alongside some of Ireland's leading main contractors and developers.
          </p>
        </div>
      </section>

      {/* Intro */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
          <span className="eyebrow">How we work on large sites</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">Trade-grade, on programme, snagged properly</h2>
          <hr className="section-rule" />
          <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">
            On major Dublin developments we work as a painting subcontractor under main contractors including Walls Construction, Collen Construction, Cairn Homes, Elliott Group, Bennett Construction and Clancy Construction. The same team that paints a private home in Ranelagh paints a 200-unit apartment block in Adamstown — the standard doesn't change, only the scale.
          </p>
        </div>
      </section>

      {/* Projects grid */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Selected projects</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Recent & notable works</h2>
            <hr className="section-rule" />
          </div>
          <ul className="mt-12 grid gap-6 md:grid-cols-2">
            {PROJECTS.map((p) => (
              <li key={p.name} className="border-t-[3px] border-primary bg-card p-7">
                <div className="text-xs font-semibold uppercase tracking-wider text-primary">{p.sector}</div>
                <h3 className="mt-2 font-display text-xl font-bold uppercase leading-tight tracking-wide text-[oklch(0.2_0_0)]">{p.name}</h3>
                <div className="mt-1 text-sm text-foreground/70">{p.location} · with {p.contractor}</div>
                <p className="mt-4 text-sm leading-relaxed text-foreground">{p.blurb}</p>
              </li>
            ))}
          </ul>
          <p className="mt-10 text-sm text-foreground/70">…and many more across residential, hospitality, healthcare and commercial sectors.</p>
        </div>
      </section>

      {/* Sectors */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Sectors we work in</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Built for the brief</h2>
            <hr className="section-rule" />
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SECTORS.map((s) => (
              <div key={s.t} className="bg-card p-6">
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{s.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{s.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface-dark)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:px-8 md:py-20">
          <div>
            <span className="eyebrow text-accent">Main contractors & developers</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Need a painting subcontractor for your next Dublin project?</h2>
            <p className="mt-3 max-w-2xl text-white/75">{COMPANY.shortName} works across {COMPANY.area} — talk to us about programme, scope and rates.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">Request a quote</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
