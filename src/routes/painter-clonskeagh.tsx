import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Clonskeagh Dublin 14 | All Colours Painting";
const DESC = `Period and family-home repaints with careful exterior work in Clonskeagh. Free quotes, fully insured — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-clonskeagh";

export const Route = createFileRoute("/painter-clonskeagh")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
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
            { "@type": "ListItem", position: 2, name: TITLE.split(" | ")[0], item: URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "All Colours Painting Contractor Limited",
          url: "https://allcolourspainter.com/painter-clonskeagh",
          telephone: SITE.phoneIntl,
          email: SITE.email,
          areaServed: { "@type": "Place", name: "Clonskeagh, Dublin 14" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Clonskeagh",
            addressRegion: "Dublin 14",
            addressCountry: "IE",
          },
        }),
      },
    ],
  }),
  component: () => (
    <LocalAreaPage
      area="Clonskeagh"
      postcode="Dublin 14"
      intro="Mature residential streets and period houses near UCD — interior repaints and exterior masonry done with care."
    />
  ),
});
