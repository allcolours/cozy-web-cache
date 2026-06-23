import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Rathmines Dublin 6 | All Colours Painting";
const DESC = "Professional painter and decorator in Rathmines, Dublin 6. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-rathmines";

export const Route = createFileRoute("/painter-rathmines")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-rathmines","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Rathmines, Dublin 6"},"address":{"@type":"PostalAddress","addressLocality":"Rathmines","addressRegion":"Dublin 6","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Rathmines" postcode="Dublin 6" intro="Investment properties, period conversions and family homes — fast landlord turnarounds and careful restoration of classic D6 redbrick detail." />,
});
