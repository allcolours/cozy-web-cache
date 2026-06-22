import { createFileRoute } from "@tanstack/react-router";

const BASE_URL = "https://allcolourspainter.com";
const LASTMOD = "2026-06-22";

interface SitemapEntry {
  path: string;
  changefreq: "weekly" | "monthly" | "yearly";
  priority: string;
}

const ENTRIES: SitemapEntry[] = [
  { path: "/", changefreq: "weekly", priority: "1.0" },
  { path: "/about", changefreq: "monthly", priority: "0.8" },
  { path: "/services", changefreq: "monthly", priority: "0.9" },
  { path: "/services/interior-painting", changefreq: "monthly", priority: "0.8" },
  { path: "/services/exterior-painting", changefreq: "monthly", priority: "0.8" },
  { path: "/services/commercial-painting", changefreq: "monthly", priority: "0.8" },
  { path: "/services/kitchen-cabinet-painting", changefreq: "monthly", priority: "0.8" },
  { path: "/services/new-build-painting", changefreq: "monthly", priority: "0.7" },
  { path: "/services/wallpapering", changefreq: "monthly", priority: "0.7" },
  { path: "/gallery", changefreq: "weekly", priority: "0.8" },
  { path: "/case-studies", changefreq: "monthly", priority: "0.8" },
  { path: "/case-studies/victorian-terrace-ranelagh", changefreq: "monthly", priority: "0.7" },
  { path: "/case-studies/warehouse-night-repaint-stillorgan", changefreq: "monthly", priority: "0.7" },
  { path: "/case-studies/boutique-hotel-refresh-dublin-2", changefreq: "monthly", priority: "0.7" },
  { path: "/case-studies/georgian-sash-windows-dun-laoghaire", changefreq: "monthly", priority: "0.7" },
  { path: "/blog", changefreq: "weekly", priority: "0.8" },
  { path: "/blog/how-to-repaint-your-front-door", changefreq: "monthly", priority: "0.7" },
  { path: "/blog/how-to-choose-the-right-paint-finish", changefreq: "monthly", priority: "0.7" },
  { path: "/blog/preparing-exterior-paintwork-irish-weather", changefreq: "monthly", priority: "0.7" },
  { path: "/blog/painting-while-you-live-in-the-house", changefreq: "monthly", priority: "0.7" },
  { path: "/blog/colour-trends-dublin-homes-2026", changefreq: "monthly", priority: "0.7" },
  { path: "/painters", changefreq: "monthly", priority: "0.8" },
  { path: "/painters/ballsbridge", changefreq: "monthly", priority: "0.7" },
  { path: "/painters/dalkey", changefreq: "monthly", priority: "0.7" },
  { path: "/painters/foxrock", changefreq: "monthly", priority: "0.7" },
  { path: "/painters/rathmines", changefreq: "monthly", priority: "0.7" },
  { path: "/painters/sandyford", changefreq: "monthly", priority: "0.7" },
  { path: "/painters/dun-laoghaire", changefreq: "monthly", priority: "0.7" },
  { path: "/painters/dundrum", changefreq: "monthly", priority: "0.7" },
  { path: "/painters/ranelagh", changefreq: "monthly", priority: "0.7" },
  { path: "/pricing-guide", changefreq: "monthly", priority: "0.8" },
  { path: "/faq", changefreq: "monthly", priority: "0.7" },
  { path: "/contact", changefreq: "monthly", priority: "0.9" },
  { path: "/estimate", changefreq: "monthly", priority: "0.8" },
  { path: "/projects", changefreq: "monthly", priority: "0.7" },
  // Local area pages
  { path: "/painter-dublin", changefreq: "monthly", priority: "0.9" },
  { path: "/painter-balbriggan", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-ballinteer", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-ballsbridge", changefreq: "monthly", priority: "0.7" },
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
  { path: "/painter-harold-s-cross", changefreq: "monthly", priority: "0.7" },
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
  { path: "/painter-ranelagh", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-rathfarnham", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-rathmines", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-sallynoggin", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-sandyford", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-stillorgan", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-swords", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-tallaght", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-templeogue", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-terenure", changefreq: "monthly", priority: "0.7" },
  { path: "/painter-walkinstown", changefreq: "monthly", priority: "0.7" },
];

export const Route = createFileRoute("/sitemap.xml")({
  server: {
    handlers: {
      GET: async () => {
        const urls = ENTRIES.map(
          (e) =>
            `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <lastmod>${LASTMOD}</lastmod>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
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
