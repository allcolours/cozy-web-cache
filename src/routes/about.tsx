import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About | All Colours Painting Contractor Limited" },
      { name: "description", content: "London painters & decorators with over 20 years of experience. Family-run, fully insured, and committed to quality finishes." },
      { property: "og:title", content: "About All Colours Painting" },
      { property: "og:description", content: "Family-run London painting & decorating company with 20+ years of experience." },
    ],
  }),
  component: About,
});

const values = [
  { t: "Quality first", d: "We use trade-grade paints from Dulux, Farrow & Ball, Little Greene and Sandtex — properly prepared, properly applied." },
  { t: "Tidy on site", d: "Daily clean-down, full dust sheeting and respect for your home or workplace from the moment we arrive." },
  { t: "Honest pricing", d: "Detailed written quotes with no surprises — what you're quoted is what you pay." },
  { t: "Fully insured", d: "£5m public liability cover and a written workmanship guarantee on every job." },
];

function About() {
  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">About us</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">Two decades of brushes, rollers and craftsmanship</h1>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-2">
          <div>
            <h2 className="text-2xl font-bold text-primary">Our story</h2>
            <div className="mt-4 space-y-4 text-muted-foreground">
              <p>{COMPANY.name} is a family-run painting and decorating company serving {COMPANY.area} for over 20 years. We've grown by word of mouth — most of our work comes from clients who've used us before, or from architects and interior designers who trust us to finish their projects properly.</p>
              <p>From a single feature wall in a Chelsea flat to full repaints of period townhouses and commercial fit-outs, we treat every job the same: prepare meticulously, paint cleanly, leave the site spotless.</p>
              <p>If you're after a contractor who takes pride in straight lines, sharp cut-ins and a finish that lasts, you're in the right place.</p>
            </div>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {values.map((v) => (
              <div key={v.t} className="rounded-xl border border-border bg-card p-6">
                <h3 className="font-semibold text-primary">{v.t}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="mt-16 rounded-xl bg-primary p-8 text-primary-foreground md:p-12">
          <h2 className="text-2xl font-bold md:text-3xl">Let's talk about your project</h2>
          <p className="mt-2 max-w-2xl text-primary-foreground/80">Free quotes, honest advice, no pressure.</p>
          <Link to="/contact" className="mt-6 inline-flex items-center rounded-md bg-accent px-6 py-3 text-sm font-semibold text-accent-foreground">Get in touch</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
