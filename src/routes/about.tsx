import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import aboutAsset from "../assets/portfolio/about-architecture.jpg.asset.json";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | All Colours Painting Contractor Limited" },
      { name: "description", content: "Painters & decorators with over 20 years of experience. Family-run, fully insured, and committed to quality finishes." },
      { property: "og:title", content: "About All Colours Painting" },
      { property: "og:description", content: "Family-run painting & decorating company with 20+ years of experience." },
      { property: "og:url", content: "https://allcolourspainter.com/about" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: aboutAsset.url },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/about" }],
  }),
  component: About,
});

const pillars = [
  { t: "Protection", d: "Everything we don't paint is protected. Floors covered, fixtures masked, furniture sheeted — your home or premises is left exactly as we found it." },
  { t: "Preparation", d: "The finish is only as good as what's underneath. We sand, fill, prime and prep meticulously so paint adheres, lasts and looks right." },
  { t: "The Finish", d: "Trade-grade paints, sharp cut-ins and clean lines. We leave only when the job genuinely looks finished to a professional standard." },
];

const values = [
  { t: "Quality first", d: "Dulux, Farrow & Ball, Little Greene and Sandtex — properly prepared, properly applied." },
  { t: "Tidy on site", d: "Daily clean-down, full dust sheeting and respect for your home or workplace." },
  { t: "Honest pricing", d: "Detailed written quotes with no surprises — what you're quoted is what you pay." },
  { t: "Fully insured", d: "€5m public liability cover and a written workmanship guarantee on every job." },
];

function About() {
  return (
    <SiteLayout>
      {/* Hero band */}
      <section className="relative isolate overflow-hidden">
        <img src={aboutAsset.url} alt="" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">About us</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-6xl">
            Two decades of brushes, rollers & craftsmanship
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
        </div>
      </section>

      {/* Story */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div>
            <span className="eyebrow">Our story</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">A craft built on detail</h2>
            <hr className="section-rule" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground">
              <p>{COMPANY.name} is a family-run painting and decorating company serving {COMPANY.area} for over 20 years. We've grown almost entirely by word of mouth — most of our work comes from clients who've used us before, or from architects and interior designers who trust us to finish their projects properly.</p>
              <p>From a single feature wall in a city flat to full repaints of period townhouses and commercial fit-outs, we treat every job the same: prepare meticulously, paint cleanly, leave the site spotless.</p>
              <p>If you're after a contractor who takes pride in straight lines, sharp cut-ins and a finish that lasts, you're in the right place.</p>
            </div>
          </div>
          <div className="relative">
            <img src={heroAsset.url} alt="Painted country home" width={1200} height={800} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute -bottom-6 -right-6 hidden h-32 w-32 border-[6px] border-primary md:block" />
          </div>
        </div>
      </section>

      {/* Three pillars */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Our approach</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Protection. Preparation. Finish.</h2>
            <hr className="section-rule" />
            <p className="mt-6 text-base text-foreground">
              Every job goes through the same three stages — relentlessly. It's how we guarantee a faultless, long-lasting finish.
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-3">
            {pillars.map((p, i) => (
              <div key={p.t} className="border-t-[3px] border-primary bg-card p-8">
                <div className="font-display text-5xl font-extrabold text-primary/30">0{i + 1}</div>
                <h3 className="mt-2 font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{p.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{p.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Why clients choose us</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">What you can count on</h2>
            <hr className="section-rule" />
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {values.map((v) => (
              <div key={v.t} className="bg-card p-6">
                <div className="inline-flex h-10 w-10 items-center justify-center bg-primary text-primary-foreground">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3"><path d="M5 13l4 4L19 7" /></svg>
                </div>
                <h3 className="mt-4 font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{v.t}</h3>
                <p className="mt-2 text-sm leading-relaxed text-foreground">{v.d}</p>
              </div>
            ))}
          </div>

          <div className="mt-16 bg-[var(--color-surface-dark)] p-10 text-white md:p-14">
            <span className="eyebrow text-accent">Get in touch</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Let's talk about your project</h2>
            <p className="mt-3 max-w-2xl text-white/75">Free quotes, honest advice, no pressure.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">Contact us</Link>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
