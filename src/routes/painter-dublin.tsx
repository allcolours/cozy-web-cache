import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { TestimonialCard } from "../components/Testimonials";
import { TESTIMONIALS } from "../data/testimonials";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

const TITLE = "Painter Dublin | All Colours Painting & Decorating";
const DESC =
  "Top-rated painter and decorator in Dublin. Interior, exterior, residential & commercial painting across all Dublin areas. Free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-dublin";

export const Route = createFileRoute("/painter-dublin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: PainterDublinPage,
});

const STATS = [
  { value: "30+", label: "Skilled painters" },
  { value: "1,200+", label: "Projects completed" },
  { value: "10+", label: "Years in Dublin" },
  { value: "5★", label: "Client rating" },
  { value: "100%", label: "Fully insured" },
  { value: "Free", label: "Written quotes" },
];

const SERVICES = [
  {
    title: "Residential",
    desc: "Full-house repaints, single rooms, hallways and tenancy turnarounds — clean, on schedule and lived-in friendly.",
  },
  {
    title: "Commercial",
    desc: "Offices, retail, hospitality and managed buildings. Out-of-hours and phased programmes when needed.",
  },
  {
    title: "Industrial & Epoxy",
    desc: "Warehouses, plant rooms, car parks and workshops. Resin floors, line marking and protective coatings.",
  },
  {
    title: "Bespoke Finishes",
    desc: "Hand-painted kitchens, spray finishing, feature walls and specialist period-property decoration.",
  },
];

const AREAS = [
  { name: "Ranelagh", to: "/painter-ranelagh" },
  { name: "Sandyford", to: "/painter-sandyford" },
  { name: "Dún Laoghaire", to: "/painter-dun-laoghaire" },
  { name: "Stillorgan", to: "/painter-stillorgan" },
  { name: "Rathfarnham", to: "/painter-rathfarnham" },
  { name: "Clondalkin", to: "/painter-clondalkin" },
  { name: "Blackrock", to: "/painter-blackrock" },
  { name: "Dundrum", to: "/contact" },
  { name: "Cabinteely", to: "/contact" },
  { name: "Foxrock", to: "/contact" },
  { name: "Dalkey", to: "/contact" },
  { name: "Killiney", to: "/contact" },
] as const;

const WHY = [
  "Professional crews with 10+ years on Dublin sites",
  "Tax Clearance compliant and fully insured (€6.5m+ public liability)",
  "12-month written workmanship guarantee on every job",
  "Tidy daily handover — vacuum sanding, dust control, furniture protected",
  "Honest written quotes — line-by-line, no surprises",
  "Single point of contact from first call to final sign-off",
];

const FAQS = [
  {
    q: "How much does it cost to paint a house in Dublin?",
    a: "Interior house repaint typically ranges from €1,500–€4,000 depending on size and condition. Exterior from €2,000–€6,000. We provide free written quotes after a site visit.",
  },
  {
    q: "How long does a full house repaint take?",
    a: "Most 3-bed semi-detached interiors take 3–5 days. We work room by room so you can stay in the house throughout.",
  },
  {
    q: "Are you fully insured?",
    a: "Yes — public liability €6.5m+, employers liability €13m+, fully Tax Clearance compliant.",
  },
  {
    q: "Do you paint while we're living in the house?",
    a: "Yes, this is our standard approach. We protect furniture, contain dust with vacuum sanding, and hand back rooms daily.",
  },
  {
    q: "Do you offer a guarantee?",
    a: "Every job comes with a 12-month written workmanship guarantee. If anything isn't right, we come back and fix it.",
  },
];

function PainterDublinPage() {
  const reviews = TESTIMONIALS.slice(0, 3);
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-surface-dark)] text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${heroAsset.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="eyebrow text-primary">Dublin's Trusted Painting Contractor</span>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight md:text-6xl">
            Painter Dublin — done properly
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-white/80">
            All Colours Painting delivers precise, long-lasting finishes for homes, landlords and businesses across Dublin. Free quotes, no pressure.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)]"
            >
              Get a Free Quote
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

      {/* Trust stats */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-10 md:grid-cols-6 md:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center">
              <div className="font-display text-2xl font-bold text-primary md:text-3xl">{s.value}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-foreground/70">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <span className="eyebrow text-primary">What we do</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">Painting services across Dublin</h2>
          <hr className="section-rule" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {SERVICES.map((s) => (
              <article key={s.title} className="border-t-[3px] border-primary bg-card p-6">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <span className="eyebrow text-primary">Where we work</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">Painting across all Dublin areas</h2>
          <hr className="section-rule" />
          <div className="mt-10 grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {AREAS.map((a) => (
              <Link
                key={a.name}
                to={a.to}
                className="rounded-sm border border-border bg-background px-4 py-3 text-center font-display text-sm font-semibold uppercase tracking-wider text-[oklch(0.25_0_0)] transition-colors hover:border-primary hover:text-primary"
              >
                {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <span className="eyebrow text-primary">Why All Colours</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">Our work comes with a promise</h2>
          <hr className="section-rule" />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {WHY.map((w) => (
              <li key={w} className="flex items-start gap-3 border-l-[3px] border-primary bg-card p-5">
                <span className="mt-0.5 text-primary">✓</span>
                <span className="text-sm leading-relaxed text-foreground/85">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <span className="eyebrow text-primary">What clients say</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">Reviews from Dublin homes & businesses</h2>
          <hr className="section-rule" />
          <div className="mt-10 grid gap-6 md:grid-cols-3">
            {reviews.map((t) => (
              <TestimonialCard key={t.name} testimonial={t} />
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-20 md:px-8 md:py-24">
          <span className="eyebrow text-primary">Frequently asked</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">Painter Dublin — your questions answered</h2>
          <hr className="section-rule" />
          <div className="mt-10 divide-y divide-border border-y border-border bg-card">
            {FAQS.map((f, i) => {
              const isOpen = openFaq === i;
              return (
                <div key={f.q}>
                  <button
                    type="button"
                    onClick={() => setOpenFaq(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-8 md:py-6"
                    aria-expanded={isOpen}
                  >
                    <span className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] md:text-lg">
                      {f.q}
                    </span>
                    <span
                      aria-hidden
                      className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center border border-primary text-primary transition-transform ${isOpen ? "rotate-45" : ""}`}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                        <path d="M12 5v14M5 12h14" />
                      </svg>
                    </span>
                  </button>
                  {isOpen && (
                    <div className="px-5 pb-6 text-sm leading-relaxed text-foreground md:px-8 md:pb-8 md:text-base">
                      <p>{f.a}</p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="bg-[var(--color-surface-dark)] text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
            Get your free quote today
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Tell us about your project — we'll visit, measure up and send a written quote within 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-sm bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
            >
              Get a Free Quote
            </Link>
            <a
              href="tel:0858211870"
              className="inline-flex items-center rounded-sm border border-white/30 px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary"
            >
              📞 085 821 1870
            </a>
            <a
              href="https://wa.me/353858211870"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center rounded-sm bg-[#25D366] px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white hover:opacity-90"
            >
              💬 WhatsApp
            </a>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
