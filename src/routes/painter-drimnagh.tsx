import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Drimnagh Dublin 12 | All Colours Painting";
const DESC = "Professional painter and decorator in Drimnagh, Dublin 12. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-drimnagh";

export const Route = createFileRoute("/painter-drimnagh")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-drimnagh","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Drimnagh, Dublin 12"},"address":{"@type":"PostalAddress","addressLocality":"Drimnagh","addressRegion":"Dublin 12","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Drimnagh" postcode="Dublin 12" intro="Interior and exterior painting for homes and investment properties across Drimnagh — fast turnarounds for landlords." />,
});
