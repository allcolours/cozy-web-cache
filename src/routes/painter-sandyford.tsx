import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Sandyford Dublin | All Colours Painting";
const DESC = "Painting contractor in Sandyford, Dublin 18. Residential & commercial painting, epoxy floors, spray finishing. Free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-sandyford";

export const Route = createFileRoute("/painter-sandyford")({
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
  component: () => <LocalAreaPage area="Sandyford" postcode="Dublin 18" intro="Offices, retail units, apartment blocks and family homes across the Sandyford Business District — out-of-hours commercial painting available." />,
});
