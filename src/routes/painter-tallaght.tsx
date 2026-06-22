import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Tallaght Dublin 24 | All Colours Painting";
const DESC = "Professional painter and decorator in Tallaght, Dublin 24. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-tallaght";

export const Route = createFileRoute("/painter-tallaght")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-tallaght","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Tallaght, Dublin 24"},"address":{"@type":"PostalAddress","addressLocality":"Tallaght","addressRegion":"Dublin 24","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Tallaght" postcode="Dublin 24" intro="Residential estates and commercial premises across Tallaght — large team, fast scheduling and consistent quality." />,
});
