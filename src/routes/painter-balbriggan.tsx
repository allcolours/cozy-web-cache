import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Balbriggan Co. Dublin | All Colours Painting";
const DESC = "Professional painter and decorator in Balbriggan, Co. Dublin. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-balbriggan";

export const Route = createFileRoute("/painter-balbriggan")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-balbriggan","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Balbriggan, Co. Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Balbriggan","addressRegion":"Co. Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Balbriggan" postcode="Co. Dublin" intro="North Dublin residential area — interior and exterior painting for homes and investment properties." />,
});
