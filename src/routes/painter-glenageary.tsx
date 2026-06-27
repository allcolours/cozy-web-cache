import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Glenageary Co. Dublin | All Colours Painting";
const DESC = `Professional painter and decorator in Glenageary, Co. Dublin. Interior & exterior painting, free quotes — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-glenageary";

export const Route = createFileRoute("/painter-glenageary")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-glenageary","telephone":SITE.phoneIntl,"email":SITE.email,"areaServed":{"@type":"Place","name":"Glenageary, Co. Dublin"},"address":{"@type":"PostalAddress","addressLocality":"Glenageary","addressRegion":"Co. Dublin","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Glenageary" postcode="Co. Dublin" intro="Well-established coastal suburb with period and modern homes — exterior systems suited to coastal conditions, tidy interior work." />,
});
