import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import heroAsset from "../assets/portfolio/about-architecture.jpg.asset.json";

type ListItem = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  location: string | null;
  category: string | null;
  duration: string | null;
  cover_image_url: string | null;
};

export const Route = createFileRoute("/case-studies")({
  loader: async () => {
    const { data } = await supabase
      .from("case_studies")
      .select("id, slug, title, subtitle, location, category, duration, cover_image_url")
      .eq("visible", true)
      .order("sort_order")
      .order("created_at", { ascending: false });
    return { studies: (data ?? []) as ListItem[] };
  },
  head: () => ({
    meta: [
      { title: "Painting Case Studies Dublin | All Colours" },
      { name: "description", content: "Real painting projects: the brief, the prep, the materials and the result. Honest case studies from residential and commercial jobs across Dublin." },
      { property: "og:title", content: "Painting Case Studies Dublin | All Colours" },
      { property: "og:description", content: "Real painting projects from residential and commercial jobs across Dublin." },
      { property: "og:url", content: "https://allcolourspainter.com/case-studies" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/case-studies" }],
  }),
  errorComponent: ({ error }) => (
    <SiteLayout><div className="mx-auto max-w-3xl px-4 py-32 text-center"><h1 className="font-display text-3xl font-bold uppercase">Couldn't load case studies</h1><p className="mt-4 text-sm text-muted-foreground">{error.message}</p></div></SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout><div className="mx-auto max-w-3xl px-4 py-32 text-center"><h1 className="font-display text-3xl font-bold uppercase">No case studies yet</h1></div></SiteLayout>
  ),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  const { studies } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img src={heroAsset.url} alt="Repainted Dublin house exterior — All Colours Painting case study" loading="lazy" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
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
          {studies.length === 0 ? (
            <p className="text-sm text-muted-foreground">No case studies published yet.</p>
          ) : (
            <div className="grid gap-10 lg:grid-cols-2">
              {studies.map((c: ListItem) => (
                <Link
                  key={c.id}
                  to="/case-studies/$slug"
                  params={{ slug: c.slug }}
                  className="group flex flex-col overflow-hidden bg-card transition-transform hover:-translate-y-1"
                >
                  {c.cover_image_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={c.cover_image_url} alt={c.title} loading="lazy" width={1200} height={750} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="border-b-[3px] border-primary p-7 md:p-8">
                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-primary">
                      {c.category && <span className="bg-primary/10 px-2 py-1">{c.category}</span>}
                      {c.location && <span className="text-foreground/70">{c.location}</span>}
                      {c.duration && <span className="text-foreground/70">· {c.duration}</span>}
                    </div>
                    <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-wide text-[oklch(0.2_0_0)]">{c.title}</h2>
                    {c.subtitle && <p className="mt-3 text-sm leading-relaxed text-foreground">{c.subtitle}</p>}
                    <span className="mt-5 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary group-hover:text-[oklch(0.2_0_0)]">
                      Read the full story →
                    </span>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </SiteLayout>
  );
}
