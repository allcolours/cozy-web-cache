import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Knocklyon Dublin 16 | All Colours Painting";
const DESC = `Professional painter and decorator in Knocklyon, Dublin 16. Interior & exterior painting, free quotes — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-knocklyon";

export const Route = createFileRoute("/painter-knocklyon")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-knocklyon","telephone":SITE.phoneIntl,"email":SITE.email,"areaServed":{"@type":"Place","name":"Knocklyon, Dublin 16"},"address":{"@type":"PostalAddress","addressLocality":"Knocklyon","addressRegion":"Dublin 16","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Knocklyon" postcode="Dublin 16" intro="Established suburban homes throughout Knocklyon — full interior repaints, woodwork and exterior work delivered on schedule." />,
});
