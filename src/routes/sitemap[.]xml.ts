import { createFileRoute } from "@tanstack/react-router";
import { createClient } from "@supabase/supabase-js";

const BASE_URL = "https://allcolourspainter.com";

interface SitemapEntry {
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
  lastmod?: string;
}

const ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/interior-painting", changefreq: "monthly", priority: "0.8" },
  { path: "/services/exterior-painting", changefreq: "monthly", priority: "0.8" },
  { path: "/services/woodwork-and-joinery", changefreq: "monthly", priority: "0.8" },
  { path: "/services/sash-and-timber-windows", changefreq: "monthly", priority: "0.8" },
  { path: "/services/metal-railings-and-metalwork", changefreq: "monthly", priority: "0.7" },
  { path: "/services/decking-and-exterior-timber", changefreq: "monthly", priority: "0.7" },
  { path: "/services/kitchen-cabinet-painting", changefreq: "monthly", priority: "0.8" },
  { path: "/services/plaster-and-water-damage-repair", changefreq: "monthly", priority: "0.7" },
  { path: "/services/commercial-painting", changefreq: "monthly", priority: "0.8" },
  { path: "/gallery", changefreq: "weekly", priority: "0.8" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  // { path: "/case-studies", changefreq: "weekly", priority: "0.7" }, // hidden until populated
  { path: "/painters", changefreq: "monthly", priority: "0.8" },
  { path: "/pricing-guide", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/estimate", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "monthly", priority: "0.7" },
  // Local area pages
  { path: "/painter-dublin", changefreq: "monthly", priority: "0.9" },
  { path: "/painter-ballinteer", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-ballsbridge", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-blanchardstown", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-bray", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-castleknock", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-blackrock", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-cabinteely", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-cabra", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-clondalkin", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-clonskeagh", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-clontarf", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-crumlin", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-dalkey", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-donnybrook", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-drimnagh", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-drumcondra", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-dun-laoghaire", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-dundrum", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-foxrock", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-glasthule", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-glenageary", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-goatstown", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-greystones", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-harold-s-cross", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-howth", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-killiney", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-knocklyon", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-leopardstown", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-lucan", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-malahide", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-milltown", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-monkstown", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-mount-merrion", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-phibsborough", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-portmarnock", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-raheny", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-ranelagh", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-rathfarnham", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-rathmines", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-sallynoggin", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-sandyford", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-sandymount", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-stillorgan", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-swords", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-tallaght", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-templeogue", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-terenure", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-walkinstown", changefreq: "monthly", priority: "0.7" },
  // Commercial landing pages
  { path: "/commercial-contractors", changefreq: "monthly", priority: "0.8" },
  { path: "/commercial-painting-dublin", changefreq: "monthly", priority: "0.8" },
  // Residential landing page
  { path: "/house-painting-dublin", changefreq: "monthly", priority: "0.9" },
  // Legal
  { path: "/privacy", changefreq: "yearly", priority: "0.3" },
  { path: "/terms", changefreq: "yearly", priority: "0.3" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const dynamicEntries: SitemapEntry[] = [];

        const url = process.env['SUPABASE_URL'];
        const key = process.env['SUPABASE_PUBLISHABLE_KEY'];
        if (!url || !key) return new Response("Sitemap unavailable", { status: 503 });
        const supabase = createClient(url, key, {
          auth: { persistSession: false, autoRefreshToken: false },
          global: { fetch: (input, init) => {
            const headers = new Headers(init?.headers);
            if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`) headers.delete("Authorization");
            headers.set("apikey", key);
            return fetch(input, { ...init, headers });
          } },
        });
        // Paginate public posts; never return silently incomplete XML on failure.
        for (let offset = 0; ; offset += 500) {
          const { data: blogRows, error } = await supabase
            .from("blog_posts").select("slug, updated_at")
            .eq("published", true)
            .neq("slug", "cost-of-painting-a-house-dublin-2025")
            .order("slug").range(offset, offset + 499);
          if (error || !blogRows) return new Response("Sitemap unavailable", { status: 503 });
          for (const row of blogRows) {
            dynamicEntries.push({
              path: `/blog/${row.slug}`,
              changefreq: "monthly", priority: "0.7",
              ...(row.updated_at ? { lastmod: row.updated_at.slice(0, 10) } : {}),
            });
          }
          if (blogRows.length < 500) break;
        }

        const all = [...ENTRIES, ...dynamicEntries];
        const urls = all.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    ${e.lastmod ? `<lastmod>${e.lastmod}</lastmod>\n    ` : ""}<changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
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
