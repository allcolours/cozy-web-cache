import { createFileRoute } from "@tanstack/react-router";
import { CASE_STUDIES } from "../data/caseStudies";
import { BLOG_POSTS } from "../data/blog";
import { AREAS } from "../data/areas";
import { SERVICES } from "../data/services";

const BASE_URL = "https://allcolourspainter.com";

interface SitemapEntry {
  path: string;
  changefreq?: "weekly" | "monthly" | "yearly";
  priority?: string;
}

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const entries: SitemapEntry[] = [
          { path: "/", changefreq: "weekly", priority: "1.0" },
          { path: "/about", changefreq: "monthly", priority: "0.8" },
          { path: "/services", changefreq: "monthly", priority: "0.9" },
          { path: "/commercial-contractors", changefreq: "monthly", priority: "0.8" },
          { path: "/case-studies", changefreq: "monthly", priority: "0.9" },
          { path: "/projects", changefreq: "monthly", priority: "0.8" },
          { path: "/gallery", changefreq: "monthly", priority: "0.7" },
          { path: "/blog", changefreq: "weekly", priority: "0.8" },
          { path: "/faq", changefreq: "monthly", priority: "0.7" },
          { path: "/contact", changefreq: "yearly", priority: "0.6" },
          { path: "/pricing-guide", changefreq: "monthly", priority: "0.9" },
          { path: "/painters", changefreq: "monthly", priority: "0.9" },
          { path: "/privacy", changefreq: "yearly", priority: "0.3" },
          { path: "/terms", changefreq: "yearly", priority: "0.3" },
          ...AREAS.map((a) => ({ path: `/painters/${a.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...[
            { slug: "painter-dublin", priority: "0.9" },
            { slug: "painter-ranelagh", priority: "0.8" },
            { slug: "painter-sandyford", priority: "0.8" },
            { slug: "painter-dun-laoghaire", priority: "0.8" },
            { slug: "painter-stillorgan", priority: "0.8" },
            { slug: "painter-rathfarnham", priority: "0.8" },
            { slug: "painter-clondalkin", priority: "0.8" },
            { slug: "painter-blackrock", priority: "0.8" },
          ].map((p) => ({ path: `/${p.slug}`, changefreq: "monthly" as const, priority: p.priority })),
          ...SERVICES.map((s) => ({ path: `/services/${s.slug}`, changefreq: "monthly" as const, priority: "0.8" })),
          ...CASE_STUDIES.map((c) => ({ path: `/case-studies/${c.slug}`, changefreq: "monthly" as const, priority: "0.7" })),
          ...BLOG_POSTS.map((b) => ({ path: `/blog/${b.slug}`, changefreq: "monthly" as const, priority: "0.6" })),
        ];
        const urls = entries.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
        );
        const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
        return new Response(xml, {
          headers: {
            "Content-Type": "application/xml; charset=utf-8",
            "Cache-Control": "public, max-age=3600",
          },
        });
      },
    },
  },
});
