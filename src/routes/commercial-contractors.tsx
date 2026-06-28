import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import commercialAsset from "../assets/portfolio/service-commercial.webp.asset.json";

export const Route = createFileRoute("/commercial-contractors")({
  head: () => ({
    meta: [
      { title: "Commercial Painting Contractor Dublin | All Colours" },
      {
        name: "description",
        content:
          "Painting subcontractor for property management & facilities management companies in Dublin. Tax Clearance, fully insured, RAMS, Safe Pass. Free tender — 085 821 1870.",
      },
      {
        property: "og:title",
        content: "Commercial Painting Contractor Dublin | All Colours",
      },
      {
        property: "og:description",
        content:
          "Painting subcontractor for property management & facilities management companies in Dublin. Tax Clearance, fully insured, RAMS, Safe Pass. Free tender — 085 821 1870.",
      },
      { property: "og:url", content: "https://allcolourspainter.com/commercial-contractors" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${commercialAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${commercialAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/commercial-contractors" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Commercial Painting & Decorating",
          provider: {
            "@type": "LocalBusiness",
            name: "All Colours Painting Contractor Limited",
            url: "https://allcolourspainter.com/",
            telephone: "+353 85 821 1870",
          },
          areaServed: "Dublin & surrounding areas",
          hasOfferCatalog: {
            "@type": "OfferCatalog",
            name: "Commercial Painting Services",
            itemListElement: [
              "Planned Maintenance Repaints",
              "New-Build Fit-Outs",
              "Reactive Works",
              "Out-of-Hours Commercial",
              "Epoxy & Specialist Floors",
              "Large-Scale Residential",
            ].map((n) => ({ "@type": "Offer", itemOffered: { "@type": "Service", name: n } })),
          },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://allcolourspainter.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Commercial Painting Contractor Dublin",
              item: "https://allcolourspainter.com/commercial-contractors",
            },
          ],
        }),
      },
    ],
  }),
  component: CommercialContractors,
});

const COMPLIANCE = [
  "Tax Clearance Certificate",
  "Fully Insured",
  "Safe Pass & Manual Handling",
  "RAMS on request",
  "RCT Compliant",
];

const CLIENTS = [
  {
    title: "Property Management Companies",
    body: "Planned maintenance, common area repaints and responsive void works across managed portfolios.",
  },
  {
    title: "Facilities Management",
    body: "Scheduled and reactive redecoration for offices, retail, healthcare and education estates.",
  },
  {
    title: "Construction Developers",
    body: "Reliable painting packages for new-build residential and commercial developments on programme.",
  },
  {
    title: "Landlords & Letting Agents",
    body: "Fast turnaround between tenancies, block exteriors and shared area refreshes.",
  },
];

const SERVICES = [
  {
    title: "Planned Maintenance Repaints",
    desc: "Scheduled repaints for managed buildings on agreed timelines and service level agreements.",
  },
  {
    title: "New-Build Fit-Outs",
    desc: "Full painting packages for residential and commercial developments, from show apartments to common areas.",
  },
  {
    title: "Reactive Works",
    desc: "Fast-response touch-ups, void repaints and damage repairs with minimal disruption.",
  },
  {
    title: "Out-of-Hours Commercial",
    desc: "Work scheduled around your tenants and occupants — evenings, weekends and phased access.",
  },
  {
    title: "Epoxy & Specialist Floors",
    desc: "Car parks, warehouses, plant rooms, line marking and heavy-duty protective coatings.",
  },
  {
    title: "Large-Scale Residential",
    desc: "Apartment blocks, housing estates and mixed-use schemes completed efficiently and cleanly.",
  },
];

const WHY = [
  "We show up on time and finish on schedule — no chasing",
  "Crews of 15–30 painters — we scale to your project size",
  "Compliant with all standard FM procurement requirements",
  "Painting works delivered on Cairn Homes, Bennett Construction and RCSI projects",
  "Single point of contact from first call to final sign-off",
];

const SELECTED_PROJECTS = [
  "Coláiste Íosagáin, Booterstown",
  "St Attracta's National School, Dundrum",
  "Dergvale Hotel, Dublin 1",
  "ICS Mortgages",
  "Olive's Room, St Anne's Park",
];

function CommercialContractors() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={commercialAsset.url}
          alt="Commercial painting contractor working in a Dublin office building"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.18_0_0)]/85" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">Property &amp; Facilities Management</span>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            A painting contractor you can actually rely on
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            All Colours Painting works with property managers, FM companies and developers across
            Dublin. Fully compliant, properly insured, and used to working within managed buildings
            and occupied sites.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)]"
            >
              Request a Tender
            </Link>
            <a
              href="tel:0858211870"
              className="inline-flex items-center rounded-sm border border-white/30 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary"
            >
              Call 085 821 1870
            </a>
          </div>
        </div>
      </section>

      {/* Compliance strip */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-6 md:px-8">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-6">
            {COMPLIANCE.map((item) => (
              <div key={item} className="flex items-center gap-2 text-sm text-foreground">
                <span className="text-primary">✓</span>
                <span className="font-medium leading-snug">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Who we work with */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <span className="eyebrow text-primary">Who we work with</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Painting partners for Dublin property and construction teams
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((c) => (
            <div key={c.title} className="rounded-sm border border-border bg-background p-6">
              <h3 className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                {c.title}
              </h3>
              <div className="mt-3 h-[2px] w-10 bg-primary" />
              <p className="mt-4 text-sm leading-relaxed text-[oklch(0.35_0_0)]">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* What we deliver */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow text-primary">What we deliver</span>
            <h2 className="section-title text-3xl md:text-4xl">
              Commercial painting services that scale
            </h2>
            <hr className="section-rule" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article key={s.title} className="border-t-[3px] border-primary bg-background p-6">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  {s.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Selected commercial projects */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <span className="eyebrow text-primary">Selected projects</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Selected commercial &amp; institutional projects
        </h2>
        <p className="mt-4 max-w-2xl text-sm leading-relaxed text-foreground/80">
          Commercial and institutional projects have included work for:
        </p>
        <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {SELECTED_PROJECTS.map((project) => (
            <div
              key={project}
              className="flex items-center rounded-sm border border-border bg-background p-4"
            >
              <span className="text-sm font-medium text-[oklch(0.2_0_0)]">{project}</span>
            </div>
          ))}
        </div>
      </section>

      {/* Why contractors choose us */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <span className="eyebrow text-primary">Why contractors choose us</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          The reliable choice for painting subcontracting in Dublin
        </h2>
        <ul className="mt-10 grid gap-4 md:grid-cols-2">
          {WHY.map((w) => (
            <li
              key={w}
              className="flex items-start gap-3 border-l-[3px] border-primary bg-card p-5"
            >
              <span className="mt-0.5 text-primary">✓</span>
              <span className="text-sm leading-relaxed text-foreground/85">{w}</span>
            </li>
          ))}
        </ul>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface-dark)] text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
            Request a tender or framework discussion
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Send us the scope and we'll respond with a written tender within 48 hours. No
            obligation.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a
              href="mailto:info@allcolourspainter.com"
              className="inline-flex items-center rounded-sm bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
            >
              ✉️ info@allcolourspainter.com
            </a>
            <a
              href="tel:0858211870"
              className="inline-flex items-center rounded-sm border border-white/30 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary"
            >
              📞 085 821 1870
            </a>
            <a
              href="https://wa.me/353858211870?text=Hi%20All%20Colours%2C%20I%27d%20like%20a%20quote.%20Here%20are%20photos%20of%20the%20job%3A"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm bg-[#25D366] px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white hover:opacity-90"
            >
              💬 Send photos on WhatsApp
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
