import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

type ListStudy = {
  id: string;
  slug: string;
  title: string;
  subtitle: string | null;
  location: string | null;
  category: string | null;
  cover_image_url: string | null;
};

export const Route = createFileRoute("/case-studies")({
  loader: async () => {
    const { data } = await supabase
      .from("case_studies")
      .select(
        "id, slug, title, subtitle, location, category, cover_image_url, sort_order, created_at",
      )
      .eq("visible", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: false });
    return { studies: (data ?? []) as ListStudy[] };
  },
  head: () => ({
    meta: [
      { title: "Painting Case Studies Dublin | All Colours Painting" },
      {
        name: "description",
        content:
          "Real painting and decorating projects across Dublin — interior, exterior, commercial and heritage. See the brief, approach and finish on each job.",
      },
      { property: "og:title", content: "Painting Case Studies Dublin | All Colours Painting" },
      {
        property: "og:description",
        content:
          "Real painting and decorating projects across Dublin — interior, exterior, commercial and heritage.",
      },
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
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://allcolourspainter.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Case Studies",
              item: "https://allcolourspainter.com/case-studies",
            },
          ],
        }),
      },
    ],
  }),
  errorComponent: ({ error }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center">
        <h1 className="font-display text-3xl font-bold uppercase">Couldn't load case studies</h1>
        <p className="mt-4 text-sm text-muted-foreground">{error.message}</p>
      </div>
    </SiteLayout>
  ),
  component: CaseStudiesIndex,
});

function CaseStudiesIndex() {
  const { studies } = Route.useLoaderData();
  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <span className="eyebrow">Project archive</span>
          <h1 className="section-title mt-3 text-3xl md:text-5xl">Case studies</h1>
          <hr className="section-rule" />
          <p className="mt-6 max-w-2xl text-base text-foreground md:text-lg">
            A close look at recent painting and decorating jobs across Dublin — the brief, the
            approach, the finish, and what the client cared about.
          </p>

          {studies.length === 0 ? (
            <div className="mt-16 rounded-md border border-dashed border-border p-10 text-center">
              <h2 className="font-display text-xl font-bold uppercase">Case studies coming soon</h2>
              <p className="mx-auto mt-3 max-w-md text-sm text-muted-foreground">
                We're writing up recent projects. In the meantime, see real photos in the gallery or
                get in touch about your own job.
              </p>
              <div className="mt-6 flex flex-wrap justify-center gap-3">
                <Link
                  to="/gallery"
                  className="rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground"
                >
                  View gallery
                </Link>
                <Link
                  to="/contact"
                  className="rounded-sm border border-border bg-background px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider hover:bg-secondary"
                >
                  Contact us
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-14 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
              {studies.map((s: ListStudy) => (
                <Link
                  key={s.id}
                  to="/case-studies/$slug"
                  params={{ slug: s.slug }}
                  className="group flex flex-col bg-card"
                >
                  {s.cover_image_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img
                        src={s.cover_image_url}
                        alt={s.title}
                        loading="lazy"
                        width={800}
                        height={500}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col border-b-[3px] border-primary p-6">
                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-primary">
                      {s.category && <span>{s.category}</span>}
                      {s.location && <span className="text-foreground/70">· {s.location}</span>}
                    </div>
                    <h2 className="mt-3 font-display text-lg font-bold uppercase leading-snug tracking-wide text-[oklch(0.2_0_0)]">
                      {s.title}
                    </h2>
                    {s.subtitle && (
                      <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground">
                        {s.subtitle}
                      </p>
                    )}
                    <span className="mt-4 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary group-hover:text-[oklch(0.2_0_0)]">
                      Read case study →
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
