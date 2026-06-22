import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Phibsborough Dublin 7 | All Colours Painting";
const DESC = "Professional painter and decorator in Phibsborough, Dublin 7. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-phibsborough";

export const Route = createFileRoute("/painter-phibsborough")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-phibsborough","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Phibsborough, Dublin 7"},"address":{"@type":"PostalAddress","addressLocality":"Phibsborough","addressRegion":"Dublin 7","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Phibsborough" postcode="Dublin 7" intro="Victorian terraces and modern apartments — interior repaints, feature walls and period plasterwork handled properly." />,
});
