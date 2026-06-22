import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Drumcondra Dublin 9 | All Colours Painting";
const DESC = "Professional painter and decorator in Drumcondra, Dublin 9. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-drumcondra";

export const Route = createFileRoute("/painter-drumcondra")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-drumcondra","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Drumcondra, Dublin 9"},"address":{"@type":"PostalAddress","addressLocality":"Drumcondra","addressRegion":"Dublin 9","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Drumcondra" postcode="Dublin 9" intro="Period red-brick terraces and investment properties — interior and exterior repaints, fast landlord turnarounds." />,
});
