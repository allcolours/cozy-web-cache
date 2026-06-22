import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import { TestimonialsSection } from "../components/Testimonials";
import aboutAsset from "../assets/portfolio/about-architecture.jpg.asset.json";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Us | All Colours Painting Contractor Dublin" },
      { name: "description", content: "Meet the team behind All Colours Painting. 10+ years experience, 1,200+ projects completed, fully insured with 12-month workmanship guarantee across Dublin." },
      { property: "og:title", content: "About Us | All Colours Painting Contractor Dublin" },
      { property: "og:description", content: "Meet the team behind All Colours Painting. 10+ years experience, 1,200+ projects completed, fully insured with 12-month workmanship guarantee across Dublin." },
      { property: "og:url", content: "https://allcolourspainter.com/about" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${aboutAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${aboutAsset.url}` },
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
        <img src={aboutAsset.url} alt="Georgian Dublin architecture — All Colours Painting heritage and restoration work" loading="lazy" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">About us</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-6xl">
            A decade of brushes, rollers & craftsmanship
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
              <p>{COMPANY.name} is a painting and decorating company serving {COMPANY.area} for over 10 years. We've grown almost entirely by word of mouth — most of our work comes from clients who've used us before, or from architects and interior designers who trust us to finish their projects properly.</p>
              <p>From a single feature wall in a city flat to full repaints of period townhouses and commercial fit-outs, we treat every job the same: prepare meticulously, paint cleanly, leave the site spotless.</p>
              <p>If you're after a contractor who takes pride in straight lines, sharp cut-ins and a finish that lasts, you're in the right place.</p>
            </div>
          </div>
          <div className="relative">
            <img src={heroAsset.url} alt="Painted country home" loading="lazy" width={1200} height={800} className="aspect-[4/5] w-full object-cover" />
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

      {/* Timeline */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Our story so far</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Ten years, one ladder at a time</h2>
            <hr className="section-rule" />
          </div>
          <ol className="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { y: "2015", t: "First brush", d: "Started out painting family homes around south Dublin — most of those first clients are still on the books today." },
              { y: "2018", t: "Going commercial", d: "Trusted by our first hotel and office clients, learning to schedule jobs around live businesses without shutting them down." },
              { y: "2021", t: "Large-scale sites", d: "Joined major Dublin construction projects as a specialist painting subcontractor — apartments, student housing, hotels and healthcare." },
              { y: "2025", t: "A decade on", d: "Still answering our own phone, still treating every job the way we'd want our own home painted." },
            ].map((s) => (
              <li key={s.y} className="border-t-[3px] border-primary bg-card p-7">
                <div className="font-display text-3xl font-extrabold text-primary">{s.y}</div>
                <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{s.t}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{s.d}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Notable projects */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="max-w-2xl">
            <span className="eyebrow">Notable projects</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Large-scale Dublin sites we've worked on</h2>
            <hr className="section-rule" />
            <p className="mt-6 text-base text-foreground">
              We've delivered painting and decorating works as a specialist subcontractor on a number of major Dublin developments for some of Ireland's leading main contractors and developers.
            </p>
          </div>
          <ul className="mt-12 grid gap-4 md:grid-cols-2">
            {[
              { p: "Walkers Gate", c: "Walls Construction" },
              { p: "Hawkins Wood", c: "Cairn Homes" },
              { p: "Premier Inn, North Wall", c: "Collen Construction" },
              { p: "Adamstown Apartments", c: "Elliott Group" },
              { p: "Marshall's Yard", c: "Bennett Construction" },
              { p: "Student Co-Living, 118 Cork Street", c: "Elliott Group" },
              { p: "Ronald McDonald House, St James's Hospital", c: "Clancy Construction" },
              { p: "Cooper Square, Seven Mills", c: "Cairn Homes" },
            ].map((x) => (
              <li key={x.p} className="flex items-start gap-4 border-l-[3px] border-primary bg-card p-5">
                <div>
                  <div className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{x.p}</div>
                  <div className="mt-1 text-sm text-foreground/80">with {x.c}</div>
                </div>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm text-foreground/70">…and many more across residential, hospitality, healthcare and commercial sectors. <Link to="/projects" className="font-semibold text-primary underline-offset-4 hover:underline">See the full project list →</Link></p>
        </div>
      </section>

      {/* A note from the team */}
      <section className="bg-secondary">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-[1fr_1.2fr] md:gap-16 md:px-8 md:py-28">
          <div className="relative">
            <img src={heroAsset.url} alt="All Colours Painting team member preparing a residential interior for painting" loading="lazy" width={900} height={1100} className="aspect-[4/5] w-full object-cover" />
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border-[6px] border-accent md:block" />
          </div>
          <div>
            <span className="eyebrow">A note from us</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">It's still personal</h2>
            <hr className="section-rule" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground md:text-lg">
              <p>We're a small team. The person who quotes the job is on site for the job. The phone is answered by someone who's actually been up a ladder this week. That's not marketing — it's just how a small trade business works when it cares about its reputation.</p>
              <p>Every client we've ever had has come through word of mouth or repeat business. We've never paid for a single advert. The day that changes is the day we've stopped doing the job properly.</p>
              <p>If you're trusting us with your home or your premises, you should know who's coming through the door. That's why every quote we send includes the name of the lead painter who'll be on your job — and you'll meet them at the site visit, not on day one.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <TestimonialsSection limit={6} title="What clients say about working with us" eyebrow="In their own words" />



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
