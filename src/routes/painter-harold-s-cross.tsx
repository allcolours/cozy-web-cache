import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Harold's Cross Dublin 6W | All Colours Painting";
const DESC = `Period interiors and tight-access exterior work across Harold's Cross. Free quotes, fully insured — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-harold-s-cross";

export const Route = createFileRoute("/painter-harold-s-cross")({
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
          url: "https://allcolourspainter.com/painter-harold-s-cross",
          telephone: SITE.phoneIntl,
          email: SITE.email,
          areaServed: { "@type": "Place", name: "Harold's Cross, Dublin 6W" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Harold's Cross",
            addressRegion: "Dublin 6W",
            addressCountry: "IE",
          },
        }),
      },
    ],
  }),
  component: () => (
    <LocalAreaPage
      area="Harold's Cross"
      postcode="Dublin 6W"
      intro="Victorian terraces and modern apartment conversions — we handle tight access, occupied homes and period plasterwork with equal care."
    />
  ),
});
