import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Goatstown Dublin 14 | All Colours Painting";
const DESC = `Professional painter and decorator in Goatstown, Dublin 14. Interior & exterior painting, free quotes — call ${SITE.phoneDisplay}.`;
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
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://allcolourspainter.com/" },
            { "@type": "ListItem", position: 2, name: TITLE.split(" | ")[0], item: URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-goatstown","telephone":SITE.phoneIntl,"email":SITE.email,"areaServed":{"@type":"Place","name":"Goatstown, Dublin 14"},"address":{"@type":"PostalAddress","addressLocality":"Goatstown","addressRegion":"Dublin 14","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Goatstown" postcode="Dublin 14" intro="Quiet residential streets with a mix of period and modern homes — interior repaints, woodwork and exterior masonry done properly." />,
});
