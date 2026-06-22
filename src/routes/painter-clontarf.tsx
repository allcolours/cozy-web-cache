import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Clontarf Dublin 3 | All Colours Painting";
const DESC = "Professional painter and decorator in Clontarf, Dublin 3. Interior & exterior painting, free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-clontarf";

export const Route = createFileRoute("/painter-clontarf")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-clontarf","telephone":"+353858211870","email":"info@allcolourspainter.com","areaServed":{"@type":"Place","name":"Clontarf, Dublin 3"},"address":{"@type":"PostalAddress","addressLocality":"Clontarf","addressRegion":"Dublin 3","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Clontarf" postcode="Dublin 3" intro="Sought-after coastal suburb — Victorian and Edwardian homes with period details, exterior paint that handles sea wind." />,
});
