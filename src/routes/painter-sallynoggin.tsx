import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Sallynoggin Co. Dublin | All Colours Painting";
const DESC = "Professional painter and decorator in Sallynoggin, Co. Dublin. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-sallynoggin";

export const Route = createFileRoute("/painter-sallynoggin")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-sallynoggin","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Sallynoggin, Co. Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Sallynoggin","addressRegion":"Co. Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Sallynoggin" postcode="Co. Dublin" intro="Coastal suburb with a mix of housing types — exterior and interior painting with proper weatherproofing for the marine environment." />,
});
