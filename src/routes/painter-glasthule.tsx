import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Glasthule Co. Dublin | All Colours Painting";
const DESC = `Professional painter and decorator in Glasthule, Co. Dublin. Interior & exterior painting, free quotes — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-glasthule";

export const Route = createFileRoute("/painter-glasthule")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-glasthule","telephone":SITE.phoneIntl,"email":SITE.email,"areaServed":{"@type":"Place","name":"Glasthule, Co. Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Glasthule","addressRegion":"Co. Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Glasthule" postcode="Co. Dublin" intro="Village-feel coastal suburb — Victorian and Edwardian properties with character details that require experienced hands." />,
});
