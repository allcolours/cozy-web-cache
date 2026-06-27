import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

type Study = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  location: string | null;
  category: string | null;
  client_type: string | null;
  cover_image_url: string | null;
  intro: string | null;
  challenge: string | null;
  approach: string | null;
  result: string | null;
  materials: string | null;
  duration: string | null;
};

type Img = { id: string; image_url: string; sort_order: number | null };

export const Route = createFileRoute("/case-studies_/$slug")({
  loader: async ({ params }) => {
    const { data: study } = await supabase
      .from("case_studies")
      .select("id, slug, title, subtitle, location, category, client_type, cover_image_url, intro, challenge, approach, result, materials, duration")
      .eq("slug", params.slug)
      .eq("visible", true)
      .maybeSingle();
    if (!study) throw notFound();
    const { data: images } = await supabase
      .from("case_study_images")
      .select("id, image_url, sort_order")
      .eq("case_study_id", study.id)
      .order("sort_order", { ascending: true });
    return { study: study as Study, images: (images ?? []) as Img[] };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    if (!s) return {};
    const url = `https://allcolourspainter.com/case-studies/${s.slug}`;
    const desc = s.subtitle ?? s.intro ?? `${s.title} — painting case study in ${s.location ?? "Dublin"}.`;
    const img = s.cover_image_url
      ? (s.cover_image_url.startsWith("http") ? s.cover_image_url : `https://allcolourspainter.com${s.cover_image_url}`)
      : undefined;
    return {
      meta: [
        { title: `${s.title} | Case Study | All Colours Painting` },
        { name: "description", content: desc },
        { property: "og:title", content: s.title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(img ? [
          { property: "og:image", content: img },
          { name: "twitter:image", content: img },
        ] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "CreativeWork",
            headline: s.title,
            description: desc,
            ...(img ? { image: img } : {}),
            author: { "@type": "Organization", name: "All Colours Painting Contractor Limited", url: "https://allcolourspainter.com" },
            ...(s.location ? { contentLocation: { "@type": "Place", name: s.location } } : {}),
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

function splitLines(s: string | null): string[] {
  if (!s) return [];
  return s.split(/\r?\n/).map((l) => l.replace(/^\s*[•\-*]\s*/, "").trim()).filter(Boolean);
}

function CaseStudyPage() {
  const { study: s, images } = Route.useLoaderData();
  const approach = splitLines(s.approach);
  const materials = splitLines(s.materials);
  return (
    <SiteLayout>
      <article>
        <section className="relative isolate overflow-hidden">
          {s.cover_image_url && <img src={s.cover_image_url} alt={s.title} loading="lazy" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />}
          <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
          <div className="mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32">
            <Link to="/case-studies" className="font-display text-xs font-bold uppercase tracking-wider text-accent hover:text-white">← Back to case studies</Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-accent">
              {s.category && <span className="bg-accent/15 px-2 py-1">{s.category}</span>}
              {s.location && <span className="text-white/80">{s.location}</span>}
              {s.client_type && <span className="text-white/70">· {s.client_type}</span>}
              {s.duration && <span className="text-white/70">· {s.duration}</span>}
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-5xl">{s.title}</h1>
            {s.subtitle && <p className="mt-4 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">{s.subtitle}</p>}
            <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24 space-y-12">
            {s.intro && <p className="text-lg leading-relaxed text-[oklch(0.25_0_0)] md:text-xl">{s.intro}</p>}

            {s.challenge && (
              <div>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] md:text-2xl">The challenge</h2>
                <div className="mt-4 space-y-4">
                  {s.challenge.split(/\n\n+/).filter(Boolean).map((p: string, i: number) => (
                    <p key={i} className="text-base leading-relaxed text-foreground md:text-lg">{p}</p>
                  ))}
                </div>
              </div>
            )}

            {approach.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] md:text-2xl">Our approach</h2>
                <ul className="mt-4 space-y-2 text-base leading-relaxed text-foreground md:text-lg">
                  {approach.map((l, i) => (
                    <li key={i} className="flex gap-3"><span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary" /><span>{l}</span></li>
                  ))}
                </ul>
              </div>
            )}

            {s.result && (
              <div>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] md:text-2xl">The result</h2>
                <div className="mt-4 space-y-4">
                  {s.result.split(/\n\n+/).filter(Boolean).map((p: string, i: number) => (
                    <p key={i} className="text-base leading-relaxed text-foreground md:text-lg">{p}</p>
                  ))}
                </div>
              </div>
            )}

            {materials.length > 0 && (
              <div>
                <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] md:text-2xl">Materials used</h2>
                <ul className="mt-4 space-y-2 text-base leading-relaxed text-foreground md:text-lg">
                  {materials.map((l, i) => (
                    <li key={i} className="flex gap-3"><span className="mt-2 inline-block h-1.5 w-1.5 flex-none rounded-full bg-primary" /><span>{l}</span></li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </section>

        {images.length > 0 && (
          <section className="bg-secondary">
            <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
              <span className="eyebrow">From the job</span>
              <h2 className="section-title mt-3 text-2xl md:text-3xl">Photo gallery</h2>
              <hr className="section-rule" />
              <div className="mt-10 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((im: Img) => (
                  <a key={im.id} href={im.image_url} target="_blank" rel="noopener noreferrer" className="group block aspect-[4/3] overflow-hidden bg-card">
                    <img src={im.image_url} alt={s.title} loading="lazy" className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </a>
                ))}
              </div>
            </div>
          </section>
        )}

        <section className="bg-background">
          <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-20">
            <h2 className="font-display text-2xl font-extrabold uppercase tracking-tight md:text-3xl">Have a similar project in mind?</h2>
            <p className="mx-auto mt-4 max-w-xl text-base text-foreground">Tell us about the space and we'll come back with a written quote.</p>
            <Link to="/contact" className="mt-6 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">Talk to us about your project</Link>
          </div>
        </section>
      </article>
    </SiteLayout>
  );
}
