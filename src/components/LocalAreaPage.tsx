import { Link } from "@tanstack/react-router";
import { SiteLayout } from "./SiteLayout";
import { TESTIMONIALS } from "../data/testimonials";
import { TestimonialCard } from "./Testimonials";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

const STATS = [
  { value: "30+", label: "Skilled painters" },
  { value: "1,200+", label: "Projects completed" },
  { value: "10+", label: "Years in Dublin" },
  { value: "5★", label: "Client rating" },
  { value: "100%", label: "Fully insured" },
  { value: "Free", label: "Written quotes" },
];

const SERVICES = [
  { title: "Interior Painting", desc: "Walls, ceilings, woodwork and trim — flawless finishes for occupied homes." },
  { title: "Exterior Painting", desc: "Render, masonry, timber and metalwork prepared and painted to last." },
  { title: "Residential Repaints", desc: "Full-house repaints, single rooms or tenancy turnarounds." },
  { title: "Commercial Painting", desc: "Offices, retail and hospitality — out-of-hours where required." },
  { title: "Epoxy Floors", desc: "Hard-wearing resin floors for garages, workshops and commercial units." },
  { title: "Bespoke Finishes", desc: "Spray finishing, feature walls and hand-painted kitchens." },
];

const WHY = [
  "Professional crews with 10+ years on Dublin sites",
  "Reliable scheduling and tidy daily handover",
  "Fully insured with public liability cover",
  "12-month written workmanship guarantee",
];

export interface LocalAreaPageProps {
  area: string;
  postcode?: string;
  intro?: string;
}

export function LocalAreaPage({ area, postcode, intro }: LocalAreaPageProps) {
  const reviews = TESTIMONIALS.slice(0, 3);
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative overflow-hidden bg-[var(--color-surface-dark)] text-white">
        <div
          className="absolute inset-0 opacity-30"
          style={{ backgroundImage: `url(${heroAsset.url})`, backgroundSize: "cover", backgroundPosition: "center" }}
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <span className="eyebrow text-primary">{postcode ?? "Dublin"}</span>
          <h1 className="mt-3 font-display text-4xl font-bold uppercase tracking-tight md:text-6xl">
            Painter &amp; Decorator in {area}
          </h1>
          <p className="mt-5 max-w-2xl text-lg text-white/80">
            Serving {area} and surrounding Dublin neighbourhoods.{" "}
            {intro ?? "Interior, exterior and commercial painting delivered to a professional standard — fully insured with a 12-month workmanship guarantee."}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="tel:0858211870" className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">
              Call 085 821 1870
            </a>
            <a href="https://wa.me/353858211870?text=Hi%20All%20Colours%2C%20I%27d%20like%20a%20quote.%20Here%20are%20photos%20of%20the%20job%3A" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-sm border-2 border-white px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-white hover:text-[var(--color-surface-dark)]">
              Send photos on WhatsApp
            </a>
          </div>
        </div>
      </section>

      {/* Trust bar */}
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
          <span className="eyebrow">What we do in {area}</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">Painting services for {area} homes &amp; businesses</h2>
          <hr className="section-rule" />
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <article key={s.title} className="border-t-[3px] border-primary bg-card p-6">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{s.desc}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Why choose us */}
      <section className="bg-card">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <span className="eyebrow">Why {area} chooses us</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">Reliable painters, properly insured</h2>
          <hr className="section-rule" />
          <ul className="mt-10 grid gap-4 md:grid-cols-2">
            {WHY.map((w) => (
              <li key={w} className="flex items-start gap-3 border-l-[3px] border-primary bg-background p-5">
                <span className="mt-0.5 text-primary">✓</span>
                <span className="text-sm leading-relaxed text-foreground/85">{w}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <span className="eyebrow">Reviews</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">What clients say</h2>
          <hr className="section-rule" />
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((t) => <TestimonialCard key={t.name} t={t} />)}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-[var(--color-surface-dark)] text-white">
        <div className="mx-auto max-w-4xl px-4 py-20 text-center md:px-8 md:py-24">
          <h2 className="font-display text-3xl font-bold uppercase tracking-tight md:text-5xl">
            Get a Free Quote in {area}
          </h2>
          <p className="mt-5 text-lg text-white/75">
            Tell us about your project — we'll visit, measure up and send a written quote within 48 hours.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-3">
            <a href="tel:0858211870" className="inline-flex items-center rounded-sm bg-primary px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">
              📞 Call 085 821 1870
            </a>
            <a href="https://wa.me/353858211870?text=Hi%20All%20Colours%2C%20I%27d%20like%20a%20quote.%20Here%20are%20photos%20of%20the%20job%3A" target="_blank" rel="noopener noreferrer" className="inline-flex items-center rounded-sm bg-[#25D366] px-7 py-4 font-display text-sm font-bold uppercase tracking-wider text-white hover:opacity-90">
              💬 Send photos on WhatsApp
            </a>
          </div>
          <div className="mt-10">
            <Link to="/" className="text-sm text-white/70 underline hover:text-primary">
              ← Back to All Colours Painting
            </Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
