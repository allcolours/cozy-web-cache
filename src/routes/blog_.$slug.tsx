import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { supabase } from "@/integrations/supabase/client";

type Section = { heading?: string; body?: string };
type Post = {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  intro: string | null;
  cover_image_url: string | null;
  category: string | null;
  read_time: string | null;
  author: string | null;
  published_at: string | null;
  content: Section[];
  meta_title: string | null;
  meta_description: string | null;
};

export const Route = createFileRoute("/blog_/$slug")({
  loader: async ({ params }) => {
    const { data: post } = await supabase
      .from("blog_posts")
      .select(
        "id, slug, title, excerpt, intro, cover_image_url, category, read_time, author, published_at, content, meta_title, meta_description",
      )
      .eq("slug", params.slug)
      .eq("published", true)
      .maybeSingle();
    if (!post) throw notFound();
    const { data: others } = await supabase
      .from("blog_posts")
      .select("id, slug, title, cover_image_url, category")
      .eq("published", true)
      .neq("slug", params.slug)
      .limit(3);
    return { post: post as Post, others: others ?? [] };
  },
  head: ({ loaderData }) => {
    const p = loaderData?.post;
    if (!p) return {};
    const url = `https://allcolourspainter.com/blog/${p.slug}`;
    const desc = p.meta_description ?? p.excerpt ?? p.intro ?? "";
    return {
      meta: [
        { title: `${p.meta_title ?? p.title} | All Colours Painting Blog` },
        { name: "description", content: desc },
        { property: "og:title", content: p.meta_title ?? p.title },
        { property: "og:description", content: desc },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        ...(p.cover_image_url
          ? [
              {
                property: "og:image",
                content: p.cover_image_url.startsWith("http")
                  ? p.cover_image_url
                  : `https://allcolourspainter.com${p.cover_image_url}`,
              },
              {
                name: "twitter:image",
                content: p.cover_image_url.startsWith("http")
                  ? p.cover_image_url
                  : `https://allcolourspainter.com${p.cover_image_url}`,
              },
            ]
          : []),
        ...(p.published_at
          ? [{ property: "article:published_time", content: p.published_at }]
          : []),
        ...(p.author ? [{ property: "article:author", content: p.author }] : []),
        ...(p.category ? [{ property: "article:section", content: p.category }] : []),
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: p.title,
            description: p.excerpt ?? p.intro ?? "",
            image: p.cover_image_url
              ? p.cover_image_url.startsWith("http")
                ? p.cover_image_url
                : `https://allcolourspainter.com${p.cover_image_url}`
              : "https://allcolourspainter.com/__l5e/assets-v1/2a395495-c4ec-4903-a41b-667de034b2ab/hero-house.webp",
            author: {
              "@type": "Organization",
              name: "All Colours Painting Contractor Limited",
              url: "https://allcolourspainter.com",
            },
            publisher: {
              "@type": "Organization",
              name: "All Colours Painting Contractor Limited",
              logo: {
                "@type": "ImageObject",
                url: "https://allcolourspainter.com/assets/logo-BAonhOi1.png",
              },
            },
            ...(p.published_at ? { datePublished: p.published_at } : {}),
            mainEntityOfPage: {
              "@type": "WebPage",
              "@id": url,
            },
          }),
        },
      ],
    };
  },
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center md:px-8">
        <h1 className="font-display text-3xl font-extrabold uppercase">Article not found</h1>
        <Link
          to="/blog"
          className="mt-6 inline-flex font-display text-xs font-bold uppercase tracking-wider text-primary"
        >
          ← Back to blog
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: ({ error, reset }) => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-32 text-center md:px-8">
        <h1 className="font-display text-3xl font-extrabold uppercase">Something went wrong</h1>
        <p className="mt-4 text-foreground">{error.message}</p>
        <button
          onClick={reset}
          className="mt-6 inline-flex font-display text-xs font-bold uppercase tracking-wider text-primary"
        >
          Try again
        </button>
      </div>
    </SiteLayout>
  ),
  component: BlogPostPage,
});

function BlogPostPage() {
  const { post: p, others } = Route.useLoaderData();
  const sections: Section[] = Array.isArray(p.content) ? (p.content as Section[]) : [];
  return (
    <SiteLayout>
      <article>
        <section className="relative isolate overflow-hidden">
          {p.cover_image_url && (
            <img
              src={p.cover_image_url}
              alt={p.title}
              loading="lazy"
              width={1920}
              height={900}
              className="absolute inset-0 -z-10 h-full w-full object-cover"
            />
          )}
          <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/75" />
          <div className="mx-auto max-w-4xl px-4 py-24 md:px-8 md:py-32">
            <Link
              to="/blog"
              className="font-display text-xs font-bold uppercase tracking-wider text-accent hover:text-white"
            >
              ← Back to blog
            </Link>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-accent">
              {p.category && <span className="bg-accent/15 px-2 py-1">{p.category}</span>}
              {p.published_at && (
                <span className="text-white/70">
                  {new Date(p.published_at).toLocaleDateString("en-IE", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })}
                </span>
              )}
              {p.read_time && <span className="text-white/70">· {p.read_time}</span>}
            </div>
            <h1 className="mt-4 font-display text-3xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-5xl">
              {p.title}
            </h1>
            <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          </div>
        </section>

        <section className="bg-background">
          <div className="mx-auto max-w-3xl px-4 py-16 md:px-8 md:py-24">
            {(p.intro ?? p.excerpt) && (
              <p className="text-lg leading-relaxed text-[oklch(0.25_0_0)] md:text-xl">
                {p.intro ?? p.excerpt}
              </p>
            )}
            <div className="mt-10 space-y-10">
              {sections.map((b, i) => (
                <div key={i}>
                  {b.heading && (
                    <h2 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] md:text-2xl">
                      {b.heading}
                    </h2>
                  )}
                  <div className={`${b.heading ? "mt-4" : ""} space-y-4`}>
                    {(b.body ?? "")
                      .split(/\n\n+/)
                      .filter(Boolean)
                      .map((para, j) => (
                        <p key={j} className="text-base leading-relaxed text-foreground md:text-lg">
                          {para}
                        </p>
                      ))}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-16 border-t border-border pt-8">
              {p.author && <span className="eyebrow">— {p.author}</span>}
              <Link
                to="/contact"
                className="mt-4 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
              >
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
                {others.map((o: any) => (
                  <Link
                    key={o.id}
                    to="/blog/$slug"
                    params={{ slug: o.slug }}
                    className="group block bg-card"
                  >
                    {o.cover_image_url && (
                      <div className="aspect-[4/3] overflow-hidden">
                        <img
                          src={o.cover_image_url}
                          alt={o.title}
                          loading="lazy"
                          width={800}
                          height={600}
                          className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                        />
                      </div>
                    )}
                    <div className="border-b-[3px] border-primary p-5">
                      {o.category && (
                        <div className="text-[11px] uppercase tracking-[0.16em] text-primary">
                          {o.category}
                        </div>
                      )}
                      <h3 className="mt-2 font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                        {o.title}
                      </h3>
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
