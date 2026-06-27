import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Ranelagh Dublin 6 | All Colours Painting";
const DESC = `Professional painter and decorator in Ranelagh, Dublin 6. Interior & exterior repaints, period homes, feature walls. Free quotes — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-ranelagh";

export const Route = createFileRoute("/painter-ranelagh")({
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
      area="Ranelagh"
      postcode="Dublin 6"
      intro="Bay-window redbricks, cottage extensions and designer-grade interior repaints — delivered to the standard Ranelagh expects."
    />
  ),
});
