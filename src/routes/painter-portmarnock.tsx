import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Portmarnock Co. Dublin | All Colours Painting";
const DESC = "Professional painter and decorator in Portmarnock, Co. Dublin. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-portmarnock";

export const Route = createFileRoute("/painter-portmarnock")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-portmarnock","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Portmarnock, Co. Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Portmarnock","addressRegion":"Co. Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Portmarnock" postcode="Co. Dublin" intro="Coastal village with premium homes — exterior systems suited to coastal exposure and quality interior finishes." />,
});
