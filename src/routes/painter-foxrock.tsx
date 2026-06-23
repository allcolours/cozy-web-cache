import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Foxrock Dublin 18 | All Colours Painting";
const DESC = "Professional painter and decorator in Foxrock, Dublin 18. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-foxrock";

export const Route = createFileRoute("/painter-foxrock")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-foxrock","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Foxrock, Dublin 18"},"address":{"@type":"PostalAddress","addressLocality":"Foxrock","addressRegion":"Dublin 18","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Foxrock" postcode="Dublin 18" intro="Detached family homes and luxury developments — showroom-grade interiors, hand-painted kitchens and full-house repaints with zero mess." />,
});
