import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { CASE_STUDIES } from "../data/caseStudies";
import heroAsset from "../assets/portfolio/about-architecture.jpg.asset.json";

export const Route = createFileRoute("/case-studies")({
  head: () => ({
    meta: [
      { title: "Case Studies | All Colours Painting Contractor Limited" },
      { name: "description", content: "Before-and-after painting & decorating projects across Dublin — residential, commercial, industrial and heritage." },
      { property: "og:title", content: "Painting & Decorating Case Studies — Dublin" },
      { property: "og:description", content: "Real projects, real materials, real timelines. See how we approach residential, commercial, industrial and heritage painting jobs." },
      { property: "og:url", content: "https://allcolourspainter.com/case-studies" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/case-studies" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "CollectionPage",
          name: "Case Studies",
          description: "Before-and-after painting & decorating projects across Dublin.",
          url: "https://allcolourspainter.com/case-studies",
          hasPart: CASE_STUDIES.map((c) => ({
            "@type": "Article",
            headline: c.title,
            url: `https://allcolourspainter.com/case-studies/${c.slug}`,
            image: c.cover,
            description: c.summary,
          })),
        }),
      },
    ],
  }),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img src={heroAsset.url} alt="Repainted Dublin house exterior — All Colours Painting case study" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">Recent projects</span>
          <h1 className="mt-3 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            Case studies — how we actually work
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            Full project breakdowns — the brief, the challenges, the exact materials, what we'd do differently next time. The honest version.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-10 lg:grid-cols-2">
            {CASE_STUDIES.map((c) => (
              <Link
                key={c.slug}
                to="/case-studies/$slug"
                params={{ slug: c.slug }}
                className="group flex flex-col overflow-hidden bg-card transition-transform hover:-translate-y-1"
              >
                <div className="aspect-[16/10] overflow-hidden">
                  <img src={c.cover} alt={c.title} loading="lazy" width={1200} height={750} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
                <div className="border-b-[3px] border-primary p-7 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-primary">
                    <span className="bg-primary/10 px-2 py-1">{c.sector}</span>
                    <span className="text-foreground/70">{c.location}</span>
                    <span className="text-foreground/70">· {c.duration}</span>
                  </div>
                  <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-wide text-[oklch(0.2_0_0)]">
                    {c.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{c.summary}</p>
                  <span className="mt-5 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary group-hover:text-[oklch(0.2_0_0)]">
                    Read the full story →
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
