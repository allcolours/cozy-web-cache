import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import aboutAsset from "../assets/portfolio/about-architecture.jpg.asset.json";
import sCommercialAsset from "../assets/portfolio/service-commercial.jpg.asset.json";
import sIndustrialAsset from "../assets/portfolio/service-industrial.jpg.asset.json";
import sHospitalityAsset from "../assets/portfolio/service-hospitality.jpg.asset.json";
import pExteriorAsset from "../assets/portfolio/portfolio-exterior-1.jpg.asset.json";
import pCommercialFloorAsset from "../assets/portfolio/portfolio-commercial-floor.jpg.asset.json";
import ctaAsset from "../assets/portfolio/cta-bg.jpg.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "All Colours Painting Contractor Limited | Painters & Decorators" },
      { name: "description", content: "Professional interior, exterior and commercial painting & decorating across London. Quality finishes, tidy workmanship, fully insured. Free quotes." },
      { property: "og:title", content: "All Colours Painting Contractor Limited" },
      { property: "og:description", content: "Professional painters & decorators. Interior, exterior, commercial." },
      { property: "og:image", content: heroAsset.url },
      { property: "twitter:image", content: heroAsset.url },
    ],
  }),
  component: Home,
});

const services = [
  {
    title: "Residential",
    desc: "Interior and exterior repaints, period homes, feature walls, woodwork and ceilings — finished to a standard you'll notice.",
    img: heroAsset.url,
  },
  {
    title: "Commercial",
    desc: "Offices, retail and hospitality fit-outs delivered out of hours so your business never stops trading.",
    img: sCommercialAsset.url,
  },
  {
    title: "Industrial",
    desc: "Floor coatings, line-marking, warehouse repaints and heavy-traffic protective systems.",
    img: sIndustrialAsset.url,
  },
  {
    title: "Bespoke Finishes",
    desc: "Spray-finished joinery, wallpapering, plaster repairs and specialist coatings on request.",
    img: sHospitalityAsset.url,
  },
];

const portfolio = [
  { img: heroAsset.url, title: "Sage Country Home", tag: "Exterior · Residential" },
  { img: pExteriorAsset.url, title: "Modern Family Villa", tag: "Exterior · Residential" },
  { img: pCommercialFloorAsset.url, title: "Warehouse Floor Coating", tag: "Industrial · Commercial" },
  { img: sCommercialAsset.url, title: "Open-Plan Office Repaint", tag: "Commercial · Offices" },
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
        <img src={heroAsset.url} alt="" width={1920} height={1280} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />
        <div className="mx-auto max-w-7xl px-4 py-28 md:px-8 md:py-44">
          <div className="max-w-2xl text-white">
            <span className="eyebrow text-accent">{COMPANY.area}</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
              Painting & decorating, <br />done <span className="text-primary">properly.</span>
            </h1>
            <div className="mt-6 h-[3px] w-[170px] bg-primary" />
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
              {COMPANY.name} delivers precise, long-lasting finishes for homes, landlords and businesses — on time and on budget. Free quotes, no pressure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact" className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)]">
                Request a free quote
              </Link>
              <Link to="/gallery" className="inline-flex items-center rounded-sm border border-white/40 bg-white/10 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/20">
                View our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Welcome to All Colours Painting</h2>
            <hr className="section-rule" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground">
              <p>All Colours Painting Contractor Limited has become synonymous with exceptional quality and customer satisfaction throughout {COMPANY.area}. Our reputation is built on strong relationships with both commercial and residential clients — and on consistently delivering stunning results.</p>
              <p>What sets us apart is an unwavering commitment to perfection in every aspect of our work. We focus relentlessly on the three core stages of any decorating project: <span className="font-semibold text-[oklch(0.2_0_0)]">Protection, Preparation and the Finish</span>.</p>
              <p>From a single feature wall to a full commercial fit-out, we treat every job the same: prepare meticulously, paint cleanly, leave the site spotless.</p>
            </div>
            <Link to="/about" className="mt-8 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]">
              Read more about us →
            </Link>
          </div>
          <div className="relative">
            <img src={aboutAsset.url} alt="Architectural project" width={1200} height={800} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border-[6px] border-accent md:block" />
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-4 md:px-8">
          {stats.map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-display text-3xl font-extrabold text-primary md:text-5xl">{s.k}</div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground">{s.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">What we do</span>
            <h2 className="section-title text-3xl md:text-4xl">What we offer</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-2xl text-base text-foreground">
              An experienced team of painters and decorators specialising in a wide range of commercial, residential and bespoke projects.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="group overflow-hidden bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img src={s.img} alt="" loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="border-b-[3px] border-primary p-6">
                  <h3 className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{s.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link to="/services" className="inline-flex items-center rounded-sm border-[2px] border-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground">
              All services →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent projects */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Our work</span>
              <h2 className="section-title mt-3 text-3xl md:text-4xl">Recent projects</h2>
              <hr className="section-rule" />
            </div>
            <Link to="/gallery" className="font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]">See full gallery →</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {portfolio.map((p) => (
              <figure key={p.title} className="group relative overflow-hidden bg-card">
                <div className="aspect-[16/11] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={1200} height={825} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <figcaption className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">{p.tag}</p>
                  <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-wide">{p.title}</h3>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA band */}
      <section className="relative isolate overflow-hidden">
        <img src={ctaAsset.url} alt="" width={1920} height={600} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/85" />
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-20 md:flex-row md:items-center md:px-8">
          <div className="text-white">
            <span className="eyebrow text-accent">Free quotes</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">Ready to transform your space?</h2>
            <p className="mt-3 max-w-2xl text-white/80">No-obligation site visits and detailed written quotes across {COMPANY.area}.</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <Link to="/contact" className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">Request a quote</Link>
            <a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="inline-flex items-center rounded-sm border border-white/40 bg-white/10 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/20">{COMPANY.phone}</a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
