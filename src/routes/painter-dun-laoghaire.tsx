import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Dún Laoghaire Co. Dublin | All Colours Painting";
const DESC = `Marine-grade exteriors and full interiors across Dún Laoghaire's harbour terraces. Free quotes, fully insured — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-dun-laoghaire";

export const Route = createFileRoute("/painter-dun-laoghaire")({
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
      area="Dún Laoghaire"
      postcode="South County Dublin"
      intro="Seafront terraces and harbour-side properties — marine-grade exterior systems and traditional interior decorating done right."
    />
  ),
});
