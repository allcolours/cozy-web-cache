import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Ballinteer Dublin 16 | All Colours Painting";
const DESC = "Professional painter and decorator in Ballinteer, Dublin 16. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-ballinteer";

export const Route = createFileRoute("/painter-ballinteer")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-ballinteer","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Ballinteer, Dublin 16"},"address":{"@type":"PostalAddress","addressLocality":"Ballinteer","addressRegion":"Dublin 16","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Ballinteer" postcode="Dublin 16" intro="Family homes and new-build estates in the foothills — clean, dust-controlled interior repaints and exterior masonry work." />,
});
