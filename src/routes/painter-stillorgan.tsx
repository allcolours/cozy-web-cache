import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Stillorgan Dublin | All Colours Painting";
const DESC = "Painting and decorating in Stillorgan, Co. Dublin. Residential repaints, commercial fit-outs, epoxy floors. Free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-stillorgan";

export const Route = createFileRoute("/painter-stillorgan")({
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
  component: () => <LocalAreaPage area="Stillorgan" postcode="Co. Dublin" intro="Family-home repaints, commercial fit-outs and epoxy floors across Stillorgan and the surrounding South Dublin suburbs." />,
});
