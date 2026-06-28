import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Howth Dublin 13 | All Colours Painting";
const DESC = `Interior and exterior repaints for Howth's coastal and village homes. Free quotes, fully insured — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-howth";

export const Route = createFileRoute("/painter-howth")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
    ],
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
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: () => (
    <LocalAreaPage
      area="Howth"
      postcode="Dublin 13"
      intro="Exposed coastal peninsula of period houses, modern builds and village properties — thorough exterior prep and weatherproof trade finishes."
    />
  ),
});
