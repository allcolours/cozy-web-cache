import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Mount Merrion Co. Dublin | All Colours Painting";
const DESC = "Professional painter and decorator in Mount Merrion, Co. Dublin. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-mount-merrion";

export const Route = createFileRoute("/painter-mount-merrion")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-mount-merrion","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Mount Merrion, Co. Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Mount Merrion","addressRegion":"Co. Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Mount Merrion" postcode="Co. Dublin" intro="Detached family homes in a mature, well-regarded suburb — quality interior and exterior painting with attention to period detail." />,
});
