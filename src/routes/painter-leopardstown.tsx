import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Leopardstown Dublin 18 | All Colours Painting";
const DESC = "Professional painter and decorator in Leopardstown, Dublin 18. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-leopardstown";

export const Route = createFileRoute("/painter-leopardstown")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-leopardstown","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Leopardstown, Dublin 18"},"address":{"@type":"PostalAddress","addressLocality":"Leopardstown","addressRegion":"Dublin 18","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Leopardstown" postcode="Dublin 18" intro="Executive homes and apartment schemes near the business district — commercial and residential work delivered to spec." />,
});
