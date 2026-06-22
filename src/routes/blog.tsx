import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

type ListPost = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  intro: string | null;
  cover_image_url: string | null;
  category: string | null;
  read_time: string | null;
  published_at: string | null;
};

export const Route = createFileRoute("/blog")({
  loader: async () => {
    const { data } = await supabase
      .from("blog_posts")
      .select("id, slug, title, excerpt, intro, cover_image_url, category, read_time, published_at")
      .eq("published", true)
      .order("published_at", { ascending: false });
    return { posts: (data ?? []) as ListPost[] };
  },
  head: () => ({
    meta: [
      { title: "Painting Tips & Advice Blog | All Colours Dublin" },
      { name: "description", content: "Practical painting and decorating tips for Dublin homeowners and businesses. Colour advice, prep guides, maintenance tips from professional painters." },
      { property: "og:title", content: "Painting Tips & Advice Blog | All Colours Dublin" },
      { property: "og:description", content: "Practical painting and decorating tips for Dublin homeowners and businesses." },
      { property: "og:url", content: "https://allcolourspainter.com/blog" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/blog" }],
  }),
  errorComponent: ({ error }) => (
    <SiteLayout><div className="mx-auto max-w-3xl px-4 py-32 text-center"><h1 className="font-display text-3xl font-bold uppercase">Couldn't load blog</h1><p className="mt-4 text-sm text-muted-foreground">{error.message}</p></div></SiteLayout>
  ),
  notFoundComponent: () => (
    <SiteLayout><div className="mx-auto max-w-3xl px-4 py-32 text-center"><h1 className="font-display text-3xl font-bold uppercase">No posts yet</h1></div></SiteLayout>
  ),
  component: BlogIndex,
});

function BlogIndex() {
  const { posts } = Route.useLoaderData();
  const [first, ...rest] = posts;
  const formatDate = (iso: string) =>
    new Date(iso).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" });
  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <span className="eyebrow">Our journal</span>
          <h1 className="section-title mt-3 text-3xl md:text-5xl">The painters' notebook</h1>
          <hr className="section-rule" />
          <p className="mt-6 max-w-2xl text-base text-foreground md:text-lg">
            Honest, hands-on writing about painting and decorating Dublin homes — finishes, prep, colour, weather and the small details that make a job last.
          </p>

          {first && (
            <Link to="/blog/$slug" params={{ slug: first.slug }} className="group mt-14 grid gap-10 bg-card lg:grid-cols-[1.4fr_1fr]">
              {first.cover_image_url && (
                <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
                  <img src={first.cover_image_url} alt={first.title} loading="lazy" width={1400} height={900} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                </div>
              )}
              <div className="flex flex-col justify-center border-b-[3px] border-primary p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-primary">
                  <span className="bg-primary/10 px-2 py-1">Featured</span>
                  {first.category && <span>{first.category}</span>}
                  {first.read_time && <span className="text-foreground/70">· {first.read_time}</span>}
                  {first.published_at && <span className="text-foreground/60">· {formatDate(first.published_at)}</span>}
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-wide text-[oklch(0.2_0_0)] md:text-3xl">{first.title}</h2>
                <p className="mt-4 text-base leading-relaxed text-foreground">{first.excerpt ?? first.intro}</p>
                <span className="mt-6 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary group-hover:text-[oklch(0.2_0_0)]">Read article →</span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {rest.map((p: ListPost) => (
                <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col bg-card">
                  {p.cover_image_url && (
                    <div className="aspect-[16/10] overflow-hidden">
                      <img src={p.cover_image_url} alt={p.title} loading="lazy" width={800} height={500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                  )}
                  <div className="flex flex-1 flex-col border-b-[3px] border-primary p-6">
                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-primary">
                      {p.category && <span>{p.category}</span>}
                      {p.read_time && <span className="text-foreground/70">· {p.read_time}</span>}
                      {p.published_at && <span className="text-foreground/60">· {formatDate(p.published_at)}</span>}
                    </div>
                    <h3 className="mt-3 flex-1 font-display text-lg font-bold uppercase leading-snug tracking-wide text-[oklch(0.2_0_0)]">{p.title}</h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground">{p.excerpt ?? p.intro}</p>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {posts.length === 0 && <p className="mt-16 text-sm text-muted-foreground">No published posts yet.</p>}
        </div>
      </section>
    </SiteLayout>
  );
}
