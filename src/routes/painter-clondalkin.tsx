import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Clondalkin Dublin 22 | All Colours Painting";
const DESC = "Painting contractor in Clondalkin, Dublin 22. Houses, apartments, commercial units. Clean, reliable, fully insured. Free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-clondalkin";

export const Route = createFileRoute("/painter-clondalkin")({
  head: () => ({
    meta: [
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
    ],
    links: [{ rel: "canonical", href: URL }],
  }),
  component: () => <LocalAreaPage area="Clondalkin" postcode="Dublin 22" intro="Houses, apartments and commercial units across Clondalkin — reliable crews, clean workmanship and written quotes within 48 hours." />,
});
