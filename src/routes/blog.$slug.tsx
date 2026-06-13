import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { BLOG_POSTS, getBlogPost } from "../data/blog";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => {
    const post = getBlogPost(params.slug);
    if (!post) throw notFound();
    return { post };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    const url = `https://allcolourspainter.com/blog/${p.slug}`;
    return {
      meta: [
        { title: `${p.title} | All Colours Painting Blog` },
        { name: "description", content: p.excerpt },
        { property: "og:title", content: p.title },
        { property: "og:description", content: p.excerpt },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        { property: "og:image", content: p.cover },
        { property: "article:published_time", content: p.date },
        { property: "article:author", content: p.author },
        { property: "article:section", content: p.category },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt,
            image: p.cover,
            datePublished: p.date,
            dateModified: p.date,
            author: { "@type": "Organization", name: p.author },
            publisher: {
              "@type": "Organization",
              name: "All Colours Painting Contractor Limited",
              logo: { "@type": "ImageObject", url: "https://allcolourspainter.com/favicon.ico" },
            },
            mainEntityOfPage: { "@type": "WebPage", "@id": url },
            articleSection: p.category,
          }),
        },
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            itemListElement: [
              { "@type": "ListItem", position: 1, name: "Home", item: "https://allcolourspainter.com/" },
              { "@type": "ListItem", position: 2, name: "Blog", item: "https://allcolourspainter.com/blog" },
              { "@type": "ListItem", position: 3, name: p.title, item: url },
            ],
          }),
        },
      ],
    };
  },

  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center md:px-8">
        <h1 className="font-display text-3xl font-extrabold uppercase">Article not found</h1>
        <Link to="/blog" className="mt-6 inline-flex font-display text-xs font-bold uppercase tracking-wider text-primary">← Back to blog</Link>
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
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post: p } = Route.useLoaderData() as { post: (typeof BLOG_POSTS)[number] };
  const others = BLOG_POSTS.filter((b) => b.slug !== p.slug).slice(0, 3);
  return (
    <SiteLayout>
      <article>
        <section className="relative isolate overflow-hidden">
          <img src={p.cover} alt="" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
          <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
          <div className="mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32">
            <Link to="/blog" className="font-display text-xs font-bold uppercase tracking-wider text-accent hover:text-white">← Back to blog</Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-accent">
              <span className="bg-accent/15 px-2 py-1">{p.category}</span>
              <span className="text-white/70">{new Date(p.date).toLocaleDateString("en-IE", { day: "numeric", month: "long", year: "numeric" })}</span>
              <span className="text-white/70">· {p.readTime}</span>
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-5xl">
              {p.title}
            </h1>
            <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
            <p className="text-lg leading-relaxed text-[oklch(0.25_0_0)] md:text-xl">{p.excerpt}</p>
            <div className="mt-10 space-y-10">
              {p.body.map((b, i) => (
                <div key={i}>
                  {b.heading && (
                    <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] md:text-2xl">
                      {b.heading}
                    </h2>
                  )}
                  <div className={`${b.heading ? "mt-4" : ""} space-y-4`}>
                    {b.paragraphs.map((para, j) => (
                      <p key={j} className="text-base leading-relaxed text-foreground md:text-lg">{para}</p>
                    ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 border-t border-border pt-8">
              <span className="eyebrow">— {p.author}</span>
              <Link to="/contact" className="mt-4 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">
                Talk to us about your project
              </Link>
            </div>
          </div>
        </section>

        {others.length > 0 && (
          <section className="bg-secondary">
            <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
              <span className="eyebrow">More from the journal</span>
              <h2 className="section-title mt-3 text-2xl md:text-3xl">Keep reading</h2>
              <hr className="section-rule" />
              <div className="mt-10 grid gap-6 md:grid-cols-3">
                {others.map((o) => (
                  <Link key={o.slug} to="/blog/$slug" params={{ slug: o.slug }} className="group block bg-card">
                    <div className="aspect-[4/3] overflow-hidden">
                      <img src={o.cover} alt={o.title} loading="lazy" width={800} height={600} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
                    </div>
                    <div className="border-b-[3px] border-primary p-5">
                      <div className="text-[11px] uppercase tracking-[0.16em] text-primary">{o.category}</div>
                      <h3 className="mt-2 font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{o.title}</h3>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
      </article>
    </SiteLayout>
  );
}
