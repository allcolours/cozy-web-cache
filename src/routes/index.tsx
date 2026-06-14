import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import { TestimonialsSection } from "../components/Testimonials";
import { ProcessSteps } from "../components/ProcessSteps";
import { FaqAccordion } from "../components/FaqAccordion";
import { FAQS } from "../data/faqs";
import { CASE_STUDIES } from "../data/caseStudies";
import { TESTIMONIALS } from "../data/testimonials";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import aboutAsset from "../assets/portfolio/about-architecture.jpg.asset.json";
import sCommercialAsset from "../assets/portfolio/service-commercial.jpg.asset.json";
import sIndustrialAsset from "../assets/portfolio/service-industrial.jpg.asset.json";
import sHospitalityAsset from "../assets/portfolio/service-hospitality.jpg.asset.json";
import ctaAsset from "../assets/portfolio/cta-bg.jpg.asset.json";
import serviceAreaMap from "../assets/service-area-map.png.asset.json";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painter Dublin | Interior & Exterior Painting & Decorating" },
      { name: "description", content: "Painter and decorator in Dublin. Interior, exterior, kitchen & floor painting, epoxy floors, spray painting for houses & apartments across South Dublin. Free quotes." },
      { name: "keywords", content: "painter dublin, painter and decorator dublin, painter near me, painter company near me, painting contractors dublin, master painters, painting and decorating dublin, interior painter near me, interior painting dublin, exterior painting dublin, apartment painting dublin, house painting, renovation painting, ceiling painting, hallway painting, staircase painting, stairs painting, bedroom painting, bathroom painting, living room painting, nursery painters near me, georgian house painting, period property painting, office painters dublin, commercial painting contractors, industrial premises painting, painting dash, painting pebbledash, floor painting, two-pack floor paints, twopack paints, epoxy floors, epoxy floor painting, epoxy painting, water based paint, oil based paint, railings painting, furniture painting, kitchen painting, kitchen cabinet painting, repainting kitchen cabinets, hand-painted kitchen, kitchen respraying, spray finish, spray painting, varnish painting, wallpapering dublin, wallpaper hanging, wall decorating, dust-free sanding, vacuum sanding, painter ballsbridge, painter donnybrook, painter stillorgan, painter dun laoghaire, painter rathfarnham, painter sandyford, painter rathmines, painter milltown, painter dundrum, painter roebuck, painter goatstown, painter ballinteer, painter leopardstown, painter harolds cross, painter cabinteely, painter foxrock, painter glenageary, painter dalkey, painter monkstown, painter sandymount, painter mount merrion, painter blackrock, painter ranelagh" },
      { property: "og:title", content: "Painter Dublin — All Colours Painting & Decorating" },
      { property: "og:description", content: "Professional painter & decorator in Dublin. Interior, exterior, apartments & houses across South Dublin." },
      { property: "og:url", content: "https://allcolourspainter.com/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroAsset.url },
      { property: "twitter:image", content: heroAsset.url },
      { name: "google-site-verification", content: "TpNVR-l0heZM7pJ-asHG3AOc33fsISO-tctP4ns_Z5w" },
    ],
    links: [
      { rel: "canonical", href: "https://allcolourspainter.com/" },
      { rel: "preload", as: "image", href: heroAsset.url, fetchpriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": ["Organization", "LocalBusiness", "Painter"],
          "@id": "https://allcolourspainter.com/#business",
          name: "All Colours Painting Contractor Limited",
          alternateName: "All Colours Painting",
          url: "https://allcolourspainter.com/",
          telephone: "+353 85 821 1870",
          email: "info@allcolourspainter.com",
          description: "Professional painters & decorators in Dublin. Interior, exterior, kitchen painting, floor painting, epoxy floors, spray painting, furniture painting, railings painting, varnish painting, commercial & industrial painting.",
          image: heroAsset.url,
          logo: heroAsset.url,
          priceRange: "€€",
          address: {
            "@type": "PostalAddress",
            addressLocality: "Dublin",
            addressRegion: "Leinster",
            addressCountry: "IE",
          },
          areaServed: [
            { "@type": "City", name: "Dublin" },
            { "@type": "AdministrativeArea", name: "Wicklow" },
            { "@type": "AdministrativeArea", name: "Kildare" },
            { "@type": "AdministrativeArea", name: "Meath" },
          ],
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "08:00",
              closes: "18:00",
            },
          ],
          sameAs: ["https://www.facebook.com/profile.php?id=61561664309105"],
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: "5.0",
            reviewCount: String(TESTIMONIALS.length),
            bestRating: "5",
            worstRating: "1",
          },
          review: TESTIMONIALS.map((t) => ({
            "@type": "Review",
            author: { "@type": "Person", name: t.name },
            reviewRating: {
              "@type": "Rating",
              ratingValue: String(t.rating),
              bestRating: "5",
              worstRating: "1",
            },
            reviewBody: t.quote,
            itemReviewed: {
              "@type": "LocalBusiness",
              name: "All Colours Painting Contractor Limited",
            },
          })),
        }),
      },
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
    desc: "Epoxy floor painting, floor coatings, line-marking, warehouse repaints and heavy-traffic protective systems using twopack paints.",
    img: sIndustrialAsset.url,
  },
  {
    title: "Bespoke Finishes",
    desc: "Kitchen painting, furniture painting, railings painting, spray-finished joinery, varnish painting, wallpapering and specialist coatings on request.",
    img: sHospitalityAsset.url,
  },
];

const portfolio = CASE_STUDIES.slice(0, 4).map((c) => ({ img: c.cover, title: c.title, tag: `${c.sector} · ${c.location}`, slug: c.slug }));

const stats = [
  { k: "30+", v: "Painters available" },
  { k: "1,200+", v: "Projects completed" },
  { k: "10+", v: "Years experience" },
  { k: "5★", v: "Average client rating" },
  { k: "Commercial & Residential", v: "All property types" },
  { k: "New-Build Specialists", v: "Developers welcome" },
  { k: "Dublin Based", v: "Fully insured" },
  { k: "Large Developments", v: "Managed across Dublin" },
  { k: "Free Quotes", v: "No obligation" },
];

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img src={heroAsset.url} alt="" width={1920} height={1280} fetchPriority="high" decoding="async" className="absolute inset-0 -z-10 h-full w-full object-cover" />
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
            <img src={aboutAsset.url} alt="Close-up of clean architectural painting detail on interior moulding" width={1200} height={800} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border-[6px] border-accent md:block" />
          </div>
        </div>
      </section>

      {/* Our promise — 4 values */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-20 md:px-8 md:pb-8 md:pt-28">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">Why we're worth it</span>
            <h2 className="section-title text-3xl md:text-4xl">Our work comes with a promise</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-2xl text-base text-foreground">
              Four things every client gets from us — every single job, no exceptions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { t: "Professional", d: "We don't cut corners. We listen to what you need and deliver it on time, every time." },
              { t: "Fast & Efficient", d: "Modern techniques, the best tools on the market. We're in, the job is done, and we're gone." },
              { t: "Reliable", d: "We say what we'll do — and we do what we say. Honest quotes, honest timelines." },
              { t: "Clean & Dust-Free", d: "Floors, furniture and belongings fully protected. Vacuum sanding keeps dust out of your home." },
              { t: "Fully Insured", d: "Public liability insured and tax-compliant. Every job covered from first prep to final coat." },
              { t: "12-Month Warranty", d: "If anything's not right within 12 months of completion, we come back and put it right — no quibble." },
            ].map((v, i) => (
              <div key={v.t} className="border-t-[3px] border-primary bg-card p-7">
                <div className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary">0{i + 1}</div>
                <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{v.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-3 md:px-8">
          {stats.map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-display text-2xl font-extrabold text-primary md:text-3xl">{s.k}</div>
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

      {/* Recent case studies */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Our work</span>
              <h2 className="section-title mt-3 text-3xl md:text-4xl">Recent case studies</h2>
              <hr className="section-rule" />
              <p className="mt-6 max-w-2xl text-base text-foreground">The brief, the prep, the materials, the result. The honest version of how each job actually went.</p>
            </div>
            <Link to="/case-studies" className="font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]">All case studies →</Link>
          </div>
          <div className="mt-12 grid gap-6 sm:grid-cols-2">
            {portfolio.map((p) => (
              <Link key={p.slug} to="/case-studies/$slug" params={{ slug: p.slug }} className="group relative block overflow-hidden bg-card">
                <div className="aspect-[16/11] overflow-hidden">
                  <img src={p.img} alt={p.title} loading="lazy" width={1200} height={825} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
                  <p className="text-[11px] uppercase tracking-[0.18em] text-accent">{p.tag}</p>
                  <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-wide">{p.title}</h3>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <ProcessSteps background="background" />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ teaser */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Questions, answered</span>
              <h2 className="section-title mt-3 text-3xl md:text-4xl">Before you book</h2>
              <hr className="section-rule" />
            </div>
            <Link to="/faq" className="font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]">Read all FAQs →</Link>
          </div>
          <div className="mt-10">
            <FaqAccordion items={FAQS.slice(0, 5)} />
          </div>
        </div>
      </section>

      {/* Rooms & specialities — SEO long-tail */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">Rooms & specialities</span>
            <h2 className="section-title text-3xl md:text-4xl">Every room, every surface</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-3xl text-base text-foreground">
              From a single <strong>bedroom painting</strong> refresh to full <strong>apartment painting</strong>, <strong>kitchen cabinet painting</strong>, <strong>hallway and staircase painting</strong>, <strong>ceiling painting</strong>, <strong>wallpapering</strong> and <strong>Georgian house painting</strong> — we cover it all across Dublin.
            </p>
          </div>

          <ul className="mt-10 grid grid-cols-2 gap-3 text-sm sm:grid-cols-3 lg:grid-cols-4">
            {[
              "Kitchen painting","Kitchen cabinet respraying","Hand-painted kitchens",
              "Bedroom painting","Bathroom painting","Living room painting",
              "Nursery painting","Hallway & staircase painting","Ceiling painting",
              "Apartment painting","House painting","Renovation repaints",
              "Wallpapering & wall decorating","Furniture painting","Varnish painting",
              "Spray painting & spray finish","Railings & gates painting","Exterior render & masonry",
              "Dash & pebbledash painting","Epoxy floor painting","Two-pack floor paints",
              "Georgian & period homes","Office & commercial painting","Industrial premises painting",
            ].map((s) => (
              <li key={s} className="border-l-2 border-primary/70 bg-card px-3 py-2 font-medium text-[oklch(0.2_0_0)]">
                {s}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Areas we cover */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">Where we work</span>
            <h2 className="section-title text-3xl md:text-4xl">Painter & decorator across Dublin</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-3xl text-base text-foreground">
              Looking for a <strong>painter near me</strong> in Dublin? We cover interior painting, exterior painting, dash and pebbledash repaints for houses and apartments across South Dublin and surrounding areas.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-5 md:gap-12">
            <div className="md:col-span-3">
              <img
                src={serviceAreaMap.url}
                alt="Map of South Dublin service area covered by All Colours Painting — Ballsbridge, Donnybrook, Rathmines, Dundrum, Sandyford, Dún Laoghaire, Blackrock and surrounding areas"
                width={920}
                height={680}
                loading="lazy"
                className="w-full border border-border bg-secondary"
              />
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                Our primary service area — South Dublin
              </p>
            </div>

            <ul className="grid grid-cols-2 gap-x-4 gap-y-3 self-start text-sm text-foreground md:col-span-2">
              {[
                "Painter Ballsbridge","Painter Donnybrook","Painter Stillorgan","Painter Dún Laoghaire",
                "Painter Rathfarnham","Painter Sandyford","Painter Rathmines","Painter Milltown",
                "Painter Dundrum","Painter Roebuck","Painter Goatstown","Painter Ballinteer",
                "Painter Leopardstown","Painter Harold's Cross","Painter Cabinteely","Painter Foxrock",
                "Painter Glenageary","Painter Dalkey","Painter Monkstown","Painter Sandymount",
                "Painter Mount Merrion","Painter Blackrock","Painter Ranelagh",
              ].map((a) => (
                <li key={a} className="flex items-center gap-2 border-l-2 border-primary/70 pl-3">
                  <span className="font-medium text-[oklch(0.2_0_0)]">{a}</span>
                </li>
              ))}
            </ul>
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
