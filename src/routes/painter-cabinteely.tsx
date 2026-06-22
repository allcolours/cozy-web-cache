import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Cabinteely Dublin 18 | All Colours Painting";
const DESC = "Professional painter and decorator in Cabinteely, Dublin 18. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-cabinteely";

export const Route = createFileRoute("/painter-cabinteely")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-cabinteely","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Cabinteely, Dublin 18"},"address":{"@type":"PostalAddress","addressLocality":"Cabinteely","addressRegion":"Dublin 18","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Cabinteely" postcode="Dublin 18" intro="Suburban family homes and new developments throughout Cabinteely — reliable scheduling, tidy crews and a finish that lasts." />,
});
