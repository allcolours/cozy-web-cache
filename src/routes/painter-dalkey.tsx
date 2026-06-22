import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Dalkey South County Dublin | All Colours Painting";
const DESC = "Professional painter and decorator in Dalkey, South County Dublin. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-dalkey";

export const Route = createFileRoute("/painter-dalkey")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-dalkey","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Dalkey, South County Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Dalkey","addressRegion":"South County Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Dalkey" postcode="South County Dublin" intro="Granite coastal villas and modern extensions — Dalkey weather is brutal on exterior paint so we use breathable salt-resistant systems that last longer by the sea." />,
});
