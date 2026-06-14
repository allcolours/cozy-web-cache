import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { FAQS } from "../data/faqs";
import { FaqAccordion } from "../components/FaqAccordion";
import heroAsset from "../assets/portfolio/service-commercial.jpg.asset.json";

const CATEGORIES = ["Booking", "Pricing", "Process", "Materials", "Aftercare"] as const;

export const Route = createFileRoute("/faq")({
  head: () => ({
    meta: [
      { title: "FAQ | All Colours Painting Contractor Limited" },
      { name: "description", content: "Honest answers to questions Dublin homeowners ask before hiring painters & decorators — quotes, timelines, materials, guarantees." },
      { property: "og:title", content: "Painting & Decorating FAQ — Dublin" },
      { property: "og:description", content: "Everything you wanted to know before booking a painter — answered straight." },
      { property: "og:url", content: "https://allcolourspainter.com/faq" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/faq" }],
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
  component: FaqPage,
});

function FaqPage() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img src={heroAsset.url} alt="Interior painting and decorating by All Colours Painting Dublin" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-32">
          <span className="eyebrow text-accent">Straight answers</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            Questions, asked honestly. Answered honestly.
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            Everything we get asked before, during and after a job — written the way we'd actually answer over a cup of tea.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-20 md:px-8 md:py-28">
          {CATEGORIES.map((cat) => {
            const items = FAQS.filter((f) => f.category === cat);
            if (items.length === 0) return null;
            return (
              <div key={cat} className="mb-16 last:mb-0">
                <span className="eyebrow">{cat}</span>
                <h2 className="section-title mt-3 text-2xl md:text-3xl">{cat} questions</h2>
                <hr className="section-rule" />
                <div className="mt-8">
                  <FaqAccordion items={items} />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      <section className="bg-[var(--color-surface-dark)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:px-8 md:py-20">
          <div>
            <span className="eyebrow text-accent">Didn't find your answer?</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Just ring us — we don't bite.</h2>
          </div>
          <Link to="/contact" className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">Ask a question</Link>
        </div>
      </section>
    </SiteLayout>
  );
}
