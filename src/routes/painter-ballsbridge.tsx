import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Ballsbridge Dublin 4 | All Colours Painting";
const DESC = "Professional painter and decorator in Ballsbridge, Dublin 4. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-ballsbridge";

export const Route = createFileRoute("/painter-ballsbridge")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-ballsbridge","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Ballsbridge, Dublin 4"},"address":{"@type":"PostalAddress","addressLocality":"Ballsbridge","addressRegion":"Dublin 4","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Ballsbridge" postcode="Dublin 4" intro="Embassy-row Victorians, period red-bricks and modern apartment blocks — all requiring a careful, low-dust finish we've delivered hundreds of times." />,
});
