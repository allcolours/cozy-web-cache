import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Walkinstown Dublin 12 | All Colours Painting";
const DESC = `Professional painter and decorator in Walkinstown, Dublin 12. Interior & exterior painting, free quotes — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-walkinstown";

export const Route = createFileRoute("/painter-walkinstown")({
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
        children: JSON.stringify({"@context":"https://schema.org","@type":"LocalBusiness","name":"All Colours Painting Contractor Limited","url":"https://allcolourspainter.com/painter-walkinstown","telephone":SITE.phoneIntl,"email":SITE.email,"areaServed":{"@type":"Place","name":"Walkinstown, Dublin 12"},"address":{"@type":"PostalAddress","addressLocality":"Walkinstown","addressRegion":"Dublin 12","addressCountry":"IE"}}),
      },
    ],
  }),
  component: () => <LocalAreaPage area="Walkinstown" postcode="Dublin 12" intro="Residential and light commercial painting in Walkinstown — affordable, reliable and properly insured." />,
});
