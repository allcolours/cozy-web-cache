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

export const Route = createFileRoute("/case-studies_/$slug")({
  loader: async ({ params }) => {
    const { data: study } = await supabase
      .from("case_studies")
      .select("id, slug, title, subtitle, location, category, client_type, cover_image_url, intro, challenge, approach, result, materials, duration")
      .eq("slug", params.slug)
      .eq("visible", true)
      .maybeSingle();
    if (!study) throw notFound();
    const [{ data: images }, { data: others }] = await Promise.all([
      supabase.from("case_study_images").select("id, image_url, caption").eq("case_study_id", study.id).order("sort_order"),
      supabase.from("case_studies").select("id, slug, title, category, cover_image_url").eq("visible", true).neq("id", study.id).limit(3),
    ]);
    return { study: study as Study, images: images ?? [], others: others ?? [] };
  },
  head: ({ loaderData }) => {
    const s = loaderData?.study;
    if (!s) return {};
    const url = `https://allcolourspainter.com/case-studies/${s.slug}`;
    const desc = s.subtitle ?? s.intro ?? "";
    return {
      meta: [
        { title: `${s.title} | Case Study | All Colours Painting` },
        { name: "description", content: desc },
        { property: "og:title", content: s.title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(s.cover_image_url ? [
          { property: "og:image", content: s.cover_image_url.startsWith("http") ? s.cover_image_url : `https://allcolourspainter.com${s.cover_image_url}` },
          { name: "twitter:image", content: s.cover_image_url.startsWith("http") ? s.cover_image_url : `https://allcolourspainter.com${s.cover_image_url}` },
        ] : []),
      ],
      links: [{ rel: "canonical", href: url }],
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

function lines(s: string | null): string[] {
  return (s ?? "").split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
}

function CaseStudyPage() {
  const { study: s, images, others } = Route.useLoaderData();
  const approachItems = lines(s.approach).map((l) => l.replace(/^•\s*/, ""));
  const materialItems = lines(s.materials);

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        {s.cover_image_url && <img src={s.cover_image_url} alt={`${s.title} — case study`} width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />}
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <Link to="/case-studies" className="font-display text-xs font-bold uppercase tracking-wider text-accent hover:text-white">← All case studies</Link>
          <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-accent">
            {s.category && <span className="bg-accent/15 px-2 py-1 text-accent">{s.category}</span>}
            {s.location && <span className="text-white/70">{s.location}</span>}
          </div>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">{s.title}</h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          {s.subtitle && <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">{s.subtitle}</p>}
        </div>
      </section>

      <section className="border-b border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-8">
          {[
            { k: "Category", v: s.category },
            { k: "Location", v: s.location },
            { k: "Duration", v: s.duration },
            { k: "Team", v: s.client_type },
          ].filter((m) => m.v).map((m) => (
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
            {s.intro && (
              <div>
                <span className="eyebrow">The brief</span>
                <h2 className="section-title mt-3 text-2xl md:text-3xl">What the client wanted</h2>
                <hr className="section-rule" />
                <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">{s.intro}</p>
              </div>
            )}

            {s.challenge && (
              <div>
                <span className="eyebrow">The challenge</span>
                <h2 className="section-title mt-3 text-2xl md:text-3xl">What made it tricky</h2>
                <hr className="section-rule" />
                <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">{s.challenge}</p>
              </div>
            )}

            {approachItems.length > 0 && (
              <div>
                <span className="eyebrow">Our approach</span>
                <h2 className="section-title mt-3 text-2xl md:text-3xl">How we did it</h2>
                <hr className="section-rule" />
                <ol className="mt-6 space-y-4">
                  {approachItems.map((a, i) => (
                    <li key={i} className="flex gap-4">
                      <span className="flex-shrink-0 font-display text-xl font-extrabold text-primary">0{i + 1}</span>
                      <span className="text-base leading-relaxed text-foreground">{a}</span>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {materialItems.length > 0 && (
              <div>
                <span className="eyebrow">Materials used</span>
                <h2 className="section-title mt-3 text-2xl md:text-3xl">Exact paint & coatings</h2>
                <hr className="section-rule" />
                <ul className="mt-6 divide-y divide-border border-y border-border">
                  {materialItems.map((m, i) => (
                    <li key={i} className="py-4 text-base text-foreground">{m}</li>
                  ))}
                </ul>
              </div>
            )}

            {s.result && (
              <div>
                <span className="eyebrow">The result</span>
                <h2 className="section-title mt-3 text-2xl md:text-3xl">How it turned out</h2>
                <hr className="section-rule" />
                <p className="mt-6 text-base leading-relaxed text-foreground md:text-lg">{s.result}</p>
              </div>
            )}
          </div>
        </div>
      </section>

      {images.length > 0 && (
        <section className="bg-secondary">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
            <span className="eyebrow">From the job</span>
            <h2 className="section-title mt-3 text-2xl md:text-3xl">On site</h2>
            <hr className="section-rule" />
            <div className="mt-10 grid gap-4 md:grid-cols-3">
              {images.map((g: any, i: number) => (
                <img key={g.id} src={g.image_url} alt={g.caption ?? `${s.title} image ${i + 1}`} loading="lazy" width={800} height={600} className="aspect-[4/3] w-full object-cover" />
              ))}
            </div>
          </div>
        </section>
      )}

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

      {others.length > 0 && (
        <section className="bg-background">
          <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
            <span className="eyebrow">More projects</span>
            <h2 className="section-title mt-3 text-2xl md:text-3xl">Other recent jobs</h2>
            <hr className="section-rule" />
            <div className="mt-10 grid gap-6 md:grid-cols-3">
              {others.map((c: any) => (
                <Link key={c.id} to="/case-studies/$slug" params={{ slug: c.slug }} className="group block bg-card">
                  {c.cover_image_url && (
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={c.cover_image_url} alt={c.title} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="border-b-[3px] border-primary p-5">
                    {c.category && <div className="text-[11px] uppercase tracking-[0.16em] text-primary">{c.category}</div>}
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
