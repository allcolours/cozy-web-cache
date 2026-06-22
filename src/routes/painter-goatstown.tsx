import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Goatstown Dublin 14 | All Colours Painting";
const DESC = "Professional painter and decorator in Goatstown, Dublin 14. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-goatstown";

export const Route = createFileRoute("/painter-goatstown")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-goatstown","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Goatstown, Dublin 14"},"address":{"@type":"PostalAddress","addressLocality":"Goatstown","addressRegion":"Dublin 14","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Goatstown" postcode="Dublin 14" intro="Quiet residential streets with a mix of period and modern homes — interior repaints, woodwork and exterior masonry done properly." />,
});
