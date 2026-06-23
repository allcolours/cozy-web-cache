import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Milltown Dublin 6 | All Colours Painting";
const DESC = "Professional painter and decorator in Milltown, Dublin 6. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-milltown";

export const Route = createFileRoute("/painter-milltown")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-milltown","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Milltown, Dublin 6"},"address":{"@type":"PostalAddress","addressLocality":"Milltown","addressRegion":"Dublin 6","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Milltown" postcode="Dublin 6" intro="Period and semi-detached homes in a classic Dublin suburb — thorough prep, quality materials and a clean finish every time." />,
});
