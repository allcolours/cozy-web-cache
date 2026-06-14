import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { BLOG_POSTS } from "../data/blog";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

export const Route = createFileRoute("/blog")({
  head: () => ({
    meta: [
      { title: "Painting & Decorating Blog | All Colours Painting" },
      { name: "description", content: "Practical advice from working painters — finishes, prep, colour, Irish weather, painting while living in the house. Written for Dublin homeowners." },
      { property: "og:title", content: "Painting & Decorating Blog — Dublin" },
      { property: "og:description", content: "Honest, hands-on painting & decorating advice for Dublin homes." },
      { property: "og:url", content: "https://allcolourspainter.com/blog" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: heroAsset.url },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/blog" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Blog",
          name: "The Painters' Notebook",
          description: "Honest, hands-on painting & decorating advice for Dublin homes.",
          url: "https://allcolourspainter.com/blog",
          blogPost: BLOG_POSTS.map((p) => ({
            "@type": "BlogPosting",
            headline: p.title,
            url: `https://allcolourspainter.com/blog/${p.slug}`,
            image: p.cover,
            datePublished: p.date,
            description: p.excerpt,
          })),
        }),
      },
    ],
  }),
  component: BlogIndex,
});

function BlogIndex() {
  const [first, ...rest] = BLOG_POSTS;
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
            <Link
              to="/blog/$slug"
              params={{ slug: first.slug }}
              className="group mt-14 grid gap-10 bg-card lg:grid-cols-[1.4fr_1fr]"
            >
              <div className="aspect-[16/10] overflow-hidden lg:aspect-auto lg:h-full">
                <img src={first.cover} alt={first.title} loading="lazy" width={1400} height={900} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
              <div className="flex flex-col justify-center border-b-[3px] border-primary p-8 md:p-10">
                <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-primary">
                  <span className="bg-primary/10 px-2 py-1">Featured</span>
                  <span>{first.category}</span>
                  <span className="text-foreground/70">{first.readTime}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl font-bold uppercase leading-tight tracking-wide text-[oklch(0.2_0_0)] md:text-3xl">
                  {first.title}
                </h2>
                <p className="mt-4 text-base leading-relaxed text-foreground">{first.excerpt}</p>
                <span className="mt-6 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary group-hover:text-[oklch(0.2_0_0)]">
                  Read article →
                </span>
              </div>
            </Link>
          )}

          {rest.length > 0 && (
            <div className="mt-16 grid gap-8 md:grid-cols-3">
              {rest.map((p) => (
                <Link key={p.slug} to="/blog/$slug" params={{ slug: p.slug }} className="group flex flex-col bg-card">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.cover} alt={p.title} loading="lazy" width={800} height={500} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex flex-1 flex-col border-b-[3px] border-primary p-6">
                    <div className="flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-primary">
                      <span>{p.category}</span>
                      <span className="text-foreground/70">{p.readTime}</span>
                    </div>
                    <h3 className="mt-3 flex-1 font-display text-lg font-bold uppercase leading-snug tracking-wide text-[oklch(0.2_0_0)]">
                      {p.title}
                    </h3>
                    <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-foreground">{p.excerpt}</p>
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
