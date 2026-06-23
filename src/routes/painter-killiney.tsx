import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Killiney Co. Dublin | All Colours Painting";
const DESC = "Professional painter and decorator in Killiney, Co. Dublin. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-killiney";

export const Route = createFileRoute("/painter-killiney")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-killiney","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Killiney, Co. Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Killiney","addressRegion":"Co. Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Killiney" postcode="Co. Dublin" intro="High-value coastal properties with demanding standards — exterior systems that handle sea air, interiors finished to spec." />,
});
