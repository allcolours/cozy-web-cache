import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
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
      { name: "description", content: "Interior, exterior, commercial painting, wallpapering, plastering, spray finishing and industrial floor coatings." },
      { property: "og:title", content: "Painting & Decorating Services" },
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
              "Wallpapering",
              "Spray finishing",
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
  { title: "Industrial", img: industrialAsset.url, desc: "Warehouse floors, line-marking, plant-room repaints and heavy-traffic protective coatings.", bullets: ["Epoxy floor coatings", "Line marking", "Warehouse repaints", "Anti-slip systems"] },
];

const more = [
  { title: "Interior Painting", img: heroAsset.url, desc: "Walls, ceilings, woodwork and skirting in premium emulsion, eggshell and satin finishes." },
  { title: "Exterior Painting", img: exteriorAsset.url, desc: "Render, masonry, brick, soffits and fascias with weatherproof Sandtex and Dulux Weathershield systems." },
  { title: "Wallpapering", img: hospitalityAsset.url, desc: "Lining paper, standard wallcoverings, hand-printed and feature wall installs with mitre-perfect seams." },
  { title: "Spray Finishing", img: floorAsset.url, desc: "Airless and HVLP spray finishing for kitchens, doors, joinery and ceilings — factory-grade on site." },
  { title: "Plastering & Repairs", img: commercialAsset.url, desc: "Skim, patch and full re-plasters, crack stitching and surface prep so every finish has a flawless base." },
  { title: "Property Maintenance", img: industrialAsset.url, desc: "Annual repaint contracts for landlords, letting agents and managed property portfolios." },
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
            From a single feature wall to a full commercial fit-out, we deliver clean lines and durable finishes — first time.
          </p>
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
                  <img src={s.img} alt={s.title} loading="lazy" width={1000} height={750} className="h-full w-full object-cover transition-transform duration-700 hover:scale-105" />
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
                  <img src={s.img} alt={s.title} loading="lazy" width={800} height={500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
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
    </SiteLayout>
  );
}
