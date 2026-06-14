import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { SERVICES } from "../data/services";
import { ProcessSteps } from "../components/ProcessSteps";
import { FaqAccordion } from "../components/FaqAccordion";
import { FAQS } from "../data/faqs";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import commercialAsset from "../assets/portfolio/service-commercial.jpg.asset.json";
import industrialAsset from "../assets/portfolio/service-industrial.jpg.asset.json";
import hospitalityAsset from "../assets/portfolio/service-hospitality.jpg.asset.json";
import floorAsset from "../assets/portfolio/portfolio-commercial-floor.jpg.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.jpg.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services | All Colours Painting Contractor Limited" },
      { name: "description", content: "Interior, exterior, kitchen & floor painting, epoxy floors, spray painting, wallpapering and plastering for homes and businesses in Dublin." },
      { name: "keywords", content: "painter dublin, floor painting, two-pack floor paints, twopack paints, epoxy floors, epoxy floor painting, epoxy painting, water based paint, oil based paint, railings painting, furniture painting, kitchen painting, spray finish, spray painting, varnish painting, interior painting, exterior painting" },
      { property: "og:title", content: "Painting & Decorating Services Dublin" },
      { property: "og:description", content: "Full painting & decorating service for homes and businesses." },
      { property: "og:url", content: "https://allcolourspainter.com/services" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: commercialAsset.url },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/services" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Painting & Decorating",
          provider: {
            "@type": "LocalBusiness",
            name: "All Colours Painting Contractor Limited",
            url: "https://allcolourspainter.com/",
            telephone: "+353 85 821 1870",
          },
          areaServed: "Dublin & surrounding areas",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Painting & Decorating Services",
            itemListElement: [
              "Residential interior & exterior painting",
              "Commercial fit-out painting",
              "Industrial floor coatings & line-marking",
              "Epoxy floor painting",
              "Kitchen painting & cabinet refinishing",
              "Spray painting & spray finish",
              "Furniture painting & varnish painting",
              "Railings painting",
              "Wallpapering",
              "Plastering & repairs",
            ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
          },
        }),
      },
    ],
  }),
  component: Services,
});

const headline = [
  { title: "Residential", img: heroAsset.url, desc: "Period townhouses, family homes and apartments — interior, exterior, sash windows and feature walls.", bullets: ["Interior repaints", "Exterior render & masonry", "Sash window restoration", "Feature walls & wallpapering"] },
  { title: "Commercial", img: commercialAsset.url, desc: "Offices, retail, hospitality and education — scheduled out of hours so your business never stops.", bullets: ["Office repaints", "Retail & hospitality fit-out", "Out-of-hours scheduling", "Insurance & compliance"] },
  { title: "Industrial", img: industrialAsset.url, desc: "Warehouse floors, epoxy floors, line-marking, plant-room repaints and heavy-traffic protective coatings with twopack paints.", bullets: ["Epoxy floor coatings", "Line marking", "Warehouse repaints", "Anti-slip systems"] },
];

const more = [
  { title: "Interior Painting", img: heroAsset.url, desc: "Walls, ceilings, woodwork and skirting in premium emulsion, eggshell and satin finishes. Water based and oil based paint systems available." },
  { title: "Exterior Painting", img: exteriorAsset.url, desc: "Render, masonry, brick, soffits and fascias with weatherproof Sandtex and Dulux Weathershield systems." },
  { title: "Kitchen Painting", img: commercialAsset.url, desc: "Cabinet refinishing, kitchen spraying and hand-painting with durable kitchen-grade finishes." },
  { title: "Spray Painting", img: floorAsset.url, desc: "Airless and HVLP spray painting for kitchens, doors, joinery and ceilings — factory-grade spray finish on site." },
  { title: "Floor Painting", img: industrialAsset.url, desc: "Epoxy floor painting, two-pack floor paints and industrial floor coatings for warehouses, garages and commercial spaces." },
  { title: "Furniture Painting", img: hospitalityAsset.url, desc: "Bespoke furniture painting and varnish painting for tables, chairs, built-ins and cabinetry." },
  { title: "Railings Painting", img: exteriorAsset.url, desc: "Metal railings, gates and wrought-iron painting with rust-inhibiting primers and long-life top coats." },
  { title: "Wallpapering", img: hospitalityAsset.url, desc: "Lining paper, standard wallcoverings, hand-printed and feature wall installs with mitre-perfect seams." },
  { title: "Plastering & Repairs", img: commercialAsset.url, desc: "Skim, patch and full re-plasters, crack stitching and surface prep so every finish has a flawless base." },
  { title: "Property Maintenance", img: industrialAsset.url, desc: "Annual repaint contracts for landlords, letting agents and managed property portfolios." },
  { title: "Apartment Painting", img: heroAsset.url, desc: "Full apartment repaints across Dublin city and South Dublin — fast turnaround for owners, tenants and lettings." },
  { title: "Ceiling & Hallway Painting", img: commercialAsset.url, desc: "Ceiling painting, hallway and staircase repaints — covered, dust-controlled and finished without splatter." },
  { title: "Period & Georgian Homes", img: exteriorAsset.url, desc: "Georgian house painting, sash windows, cornicing and heritage colour systems for period properties in Dublin." },
];

function Services() {
  return (
    <SiteLayout>
      {/* Hero band */}
      <section className="relative isolate overflow-hidden">
        <img src={commercialAsset.url} alt="" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">What we offer</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-6xl">
            Painting & decorating, done properly
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/80 md:text-lg">
            From kitchen painting and furniture painting to epoxy floor painting and spray painting — we deliver clean lines and durable finishes, first time.
          </p>
        </div>
      </section>

      {/* Specialist landing pages — SEO + internal linking */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-10 md:px-8 md:py-12">
          <h2 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
            Specialist service pages
          </h2>
          <div className="mt-4 flex flex-wrap gap-2">
            {SERVICES.map((s) => (
              <Link
                key={s.slug}
                to="/services/$service"
                params={{ service: s.slug }}
                className="rounded-sm border border-border bg-card px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Headline services with images */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Core services</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">A specialist team for every sector</h2>
            <hr className="section-rule" />
          </div>

          <div className="mt-12 grid gap-8 lg:grid-cols-3">
            {headline.map((s) => (
              <article key={s.title} className="flex flex-col bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt={`${s.title} painting services`} loading="lazy" width={1000} height={750} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
                </div>
                <div className="flex flex-1 flex-col border-b-[3px] border-primary p-8">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{s.desc}</p>
                  <ul className="mt-5 space-y-2 text-sm">
                    {s.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3">
                        <span className="mt-1 inline-block h-[6px] w-[6px] flex-shrink-0 bg-primary" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Specialist services grid */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Specialist services</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Everything we paint</h2>
            <hr className="section-rule" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {more.map((s) => (
              <div key={s.title} className="group overflow-hidden bg-card">
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={s.img} alt={`${s.title} — ${s.desc.split(".")[0]}`} loading="lazy" width={800} height={500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="p-6">
                  <h3 className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{s.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[var(--color-surface-dark)] p-10 text-white md:p-14">
            <span className="eyebrow text-accent">Free site visit</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Not sure what you need?</h2>
            <p className="mt-3 max-w-2xl text-white/75">We'll visit, advise and quote — free of charge and with no obligation.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">Get a free quote</Link>
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSteps background="background" />

      {/* Materials & finishes */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">What we paint with</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Trade-grade materials, picked for the job</h2>
            <hr className="section-rule" />
            <p className="mt-6 text-base text-foreground">
              We don't pick paint by the colour on the lid. Every job gets the system that's right for the surface, the use, and the conditions.
            </p>
          </div>
          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              { brand: "Farrow & Ball", use: "Premium interior walls and woodwork — pigment-rich colour, beautiful matt depth." },
              { brand: "Little Greene", use: "Period and heritage colours, intelligent durable matt and eggshell ranges." },
              { brand: "Dulux Trade", use: "Workhorse trade emulsions, scrubbable diamond matt, kitchen & bathroom systems." },
              { brand: "Sandtex / Weathershield", use: "Long-life exterior masonry and woodwork systems for Irish weather." },
              { brand: "Tikkurila Helmi", use: "Water-based satin and eggshell for skirting, doors and joinery — non-yellowing." },
              { brand: "Sikafloor Epoxy", use: "Industrial floor coatings — anti-slip, chemical-resistant, fast-cure." },
              { brand: "Allback Linseed", use: "Heritage and conservation work — traditional linseed paints and putty." },
              { brand: "Zinsser Primers", use: "Stain block, BIN, Bullseye — primer for every problem surface we meet." },
            ].map((m) => (
              <div key={m.brand} className="border-t-[3px] border-primary bg-card p-6">
                <div className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{m.brand}</div>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{m.use}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services FAQ */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Common questions</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Before you book a painter</h2>
            <hr className="section-rule" />
          </div>
          <div className="mt-10">
            <FaqAccordion items={FAQS.filter((f) => f.category === "Process" || f.category === "Pricing").slice(0, 6)} />
          </div>
          <div className="mt-10">
            <Link to="/faq" className="font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]">All FAQs →</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
