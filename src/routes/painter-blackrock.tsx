import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Blackrock Co Dublin | All Colours Painting";
const DESC = "Professional painter in Blackrock, Co. Dublin. Victorian & period homes, exterior repaints, interior decorating. Free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-blackrock";

export const Route = createFileRoute("/painter-blackrock")({
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
  component: () => <LocalAreaPage area="Blackrock" postcode="Co. Dublin" intro="Victorian and period homes, modern extensions and coastal exteriors throughout Blackrock — heritage-safe paint systems and a 12-month guarantee." />,
});
