import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Crumlin Dublin 12 | All Colours Painting";
const DESC = `Terrace and family-home repaints with exterior masonry across Crumlin. Free quotes, fully insured — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-crumlin";

export const Route = createFileRoute("/painter-crumlin")({
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
          url: "https://allcolourspainter.com/painter-crumlin",
          telephone: SITE.phoneIntl,
          email: SITE.email,
          areaServed: { "@type": "Place", name: "Crumlin, Dublin 12" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Crumlin",
            addressRegion: "Dublin 12",
            addressCountry: "IE",
          },
        }),
      },
    ],
  }),
  component: () => (
    <LocalAreaPage
      area="Crumlin"
      postcode="Dublin 12"
      intro="Traditional terraces and family homes in Crumlin — interior repaints, ceiling work and exterior masonry at competitive rates."
    />
  ),
});
