import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Sandyford Dublin | All Colours Painting";
const DESC = `Out-of-hours commercial and residential painting across Sandyford. Free quotes, fully insured — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-sandyford";

export const Route = createFileRoute("/painter-sandyford")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
    ],
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
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: () => (
    <LocalAreaPage
      area="Sandyford"
      postcode="Dublin 18"
      intro="Offices, retail units, apartment blocks and family homes across the Sandyford Business District — out-of-hours commercial painting available."
    />
  ),
});
