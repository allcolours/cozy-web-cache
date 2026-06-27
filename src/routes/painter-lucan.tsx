import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Lucan Co. Dublin | All Colours Painting";
const DESC = `Professional painter and decorator in Lucan, Co. Dublin. Interior & exterior painting, free quotes — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-lucan";

export const Route = createFileRoute("/painter-lucan")({
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
            { "@type": "ListItem", position: 1, name: "Home", item: "https://allcolourspainter.com/" },
            { "@type": "ListItem", position: 2, name: TITLE.split(" | ")[0], item: URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-lucan","telephone":SITE.phoneIntl,"email":SITE.email,"areaServed":{"@type":"Place","name":"Lucan, Co. Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Lucan","addressRegion":"Co. Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Lucan" postcode="Co. Dublin" intro="Growing residential area with a mix of new builds and established homes — interior and exterior painting for homeowners and developers." />,
});
