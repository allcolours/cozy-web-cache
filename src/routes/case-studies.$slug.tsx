import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { CASE_STUDIES, getCaseStudy } from "../data/caseStudies";

export const Route = createFileRoute("/case-studies/$slug")({
  loader: ({ params }) => {
    const study = getCaseStudy(params.slug);
    if (!study) throw notFound();
    return { study };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    if (!s) return {};
    const url = `https://allcolourspainter.com/case-studies/${s.slug}`;
    return {
      meta: [
        { title: `${s.title} | Case Study | All Colours Painting` },
        { name: "description", content: s.summary },
        { property: "og:title", content: s.title },
        { property: "og:description", content: s.summary },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: s.cover?.startsWith("http") ? s.cover : `https://allcolourspainter.com${s.cover}` },
        { name: "twitter:image", content: s.cover?.startsWith("http") ? s.cover : `https://allcolourspainter.com${s.cover}` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: s.title,
            description: s.summary,
            image: s.cover,
            author: { "@type": "Organization", name: "All Colours Painting Contractor Limited" },
            publisher: {
              "@type": "Organization",
              name: "All Colours Painting Contractor Limited",
              logo: { "@type": "ImageObject", url: "https://allcolourspainter.com/favicon.ico" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://allcolourspainter.com/" },
              { "@type": "ListItem", position: 2, name: "Case Studies", item: "https://allcolourspainter.com/case-studies" },
              { "@type": "ListItem", position: 3, name: s.title, item: url },
            ],
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center md:px-8">
        <h1 className="font-display text-3xl font-extrabold uppercase">Case study not found</h1>
        <p className="mt-4 text-foreground">The project you're looking for has moved or doesn't exist.</p>
        <Link to="/case-studies" className="mt-6 inline-flex font-display text-xs font-bold uppercase tracking-wider text-primary">← Back to case studies</Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center md:px-8">
        <h1 className="font-display text-3xl font-extrabold uppercase">Something went wrong</h1>
        <p className="mt-4 text-foreground">{error.message}</p>
        <button onClick={reset} className="mt-6 inline-flex font-display text-xs font-bold uppercase tracking-wider text-primary">Try again</button>
      </div>
    </SiteLayout>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { study: s } = Route.useLoaderData() as { study: (typeof CASE_STUDIES)[number] };
  const others = CASE_STUDIES.filter((c) => c.slug !== s.slug).slice(0, 3);

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img src={s.cover} alt="" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <Link to="/case-studies" className="font-display text-xs font-bold uppercase tracking-wider text-accent hover:text-white">← All case studies</Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-accent">
            <span className="bg-accent/15 px-2 py-1 text-accent">{s.sector}</span>
            <span className="text-white/70">{s.location}</span>
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            {s.title}
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">{s.summary}</p>
        </div>
      </section>

      {/* Meta strip */}
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-8">
          {[
            { k: "Sector", v: s.sector },
            { k: "Location", v: s.location },
            { k: "Duration", v: s.duration },
            { k: "Team on site", v: s.team },
          ].map((m) => (
            <div key={m.k}>
              <div className="text-[11px] uppercase tracking-[0.16em] text-foreground/70">{m.k}</div>
              <div className="mt-1 font-display text-base font-bold text-[oklch(0.2_0_0)]">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-4xl px-4 py-20 md:px-8 md:py-28">
          <div className="space-y-12">
            <div>
              <span className="eyebrow">The brief</span>
              <h2 className="section-title mt-3 text-2xl md:text-3xl">What the client wanted</h2>
              <hr className="section-rule" />
              <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">{s.brief}</p>
            </div>

            <div>
              <span className="eyebrow">The challenge</span>
              <h2 className="section-title mt-3 text-2xl md:text-3xl">What made it tricky</h2>
              <hr className="section-rule" />
              <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">{s.challenge}</p>
            </div>

            <div>
              <span className="eyebrow">Our approach</span>
              <h2 className="section-title mt-3 text-2xl md:text-3xl">How we did it</h2>
              <hr className="section-rule" />
              <ol className="mt-6 space-y-4">
                {s.approach.map((a, i) => (
                  <li key={i} className="flex gap-4">
                    <span className="flex-shrink-0 font-display text-xl font-extrabold text-primary">0{i + 1}</span>
                    <span className="text-base leading-relaxed text-foreground">{a}</span>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <span className="eyebrow">Materials used</span>
              <h2 className="section-title mt-3 text-2xl md:text-3xl">Exact paint & coatings</h2>
              <hr className="section-rule" />
              <div className="mt-6 divide-y divide-border border-y border-border">
                {s.materials.map((m) => (
                  <div key={m.name} className="grid gap-2 py-4 md:grid-cols-[2fr_1fr] md:items-center">
                    <div className="font-display text-sm font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{m.name}</div>
                    <div className="text-sm text-foreground">{m.use}</div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <span className="eyebrow">The result</span>
              <h2 className="section-title mt-3 text-2xl md:text-3xl">How it turned out</h2>
              <hr className="section-rule" />
              <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">{s.result}</p>
            </div>

            {s.testimonial && (
              <figure className="border-l-4 border-primary bg-secondary p-8 md:p-10">
                <blockquote className="font-display text-xl italic leading-relaxed text-[oklch(0.2_0_0)] md:text-2xl">
                  “{s.testimonial.quote}”
                </blockquote>
                <figcaption className="mt-4 text-sm uppercase tracking-[0.14em] text-foreground/70">— {s.testimonial.author}</figcaption>
              </figure>
            )}
          </div>
        </div>
      </section>

      {/* Gallery */}
      {s.gallery.length > 0 && (
        <section className="bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
            <span className="eyebrow">From the job</span>
            <h2 className="section-title mt-3 text-2xl md:text-3xl">On site</h2>
            <hr className="section-rule" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {s.gallery.map((g, i) => (
                <img key={i} src={g} alt={`${s.title} image ${i + 1}`} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full object-cover" />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* CTA */}
      <section className="bg-[var(--color-surface-dark)] text-white">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-4 py-16 md:flex-row md:items-center md:px-8 md:py-20">
          <div>
            <span className="eyebrow text-accent">Your project</span>
            <h2 className="mt-2 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">Got something similar in mind?</h2>
            <p className="mt-3 max-w-2xl text-white/75">Free site visit, detailed written quote, no pressure.</p>
          </div>
          <Link to="/contact" className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">Request a free quote</Link>
        </div>
      </section>

      {/* Other case studies */}
      {others.length > 0 && (
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
            <span className="eyebrow">More projects</span>
            <h2 className="section-title mt-3 text-2xl md:text-3xl">Other recent jobs</h2>
            <hr className="section-rule" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((c) => (
                <Link key={c.slug} to="/case-studies/$slug" params={{ slug: c.slug }} className="group block bg-card">
                  <div className="aspect-[4/3] overflow-hidden">
                    <img src={c.cover} alt={c.title} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="border-b-[3px] border-primary p-5">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-primary">{c.sector}</div>
                    <h3 className="mt-2 font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{c.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </SiteLayout>
  );
}
