import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Ballsbridge Dublin 4 | All Colours Painting";
const DESC = `Careful, low-dust painting for Ballsbridge's period red-brick homes, embassy properties and modern apartments. Free quotes, fully insured — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-ballsbridge";

export const Route = createFileRoute("/painter-ballsbridge")({
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
          url: "https://allcolourspainter.com/painter-ballsbridge",
          telephone: SITE.phoneIntl,
          email: SITE.email,
          areaServed: { "@type": "Place", name: "Ballsbridge, Dublin 4" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Ballsbridge",
            addressRegion: "Dublin 4",
            addressCountry: "IE",
          },
        }),
      },
    ],
  }),
  component: () => (
    <LocalAreaPage
      area="Ballsbridge"
      postcode="Dublin 4"
      intro="Embassy-row Victorians, period red-bricks and modern apartment blocks — all requiring a careful, low-dust finish we've delivered hundreds of times."
    />
  ),
});
