import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";

const TITLE = "Painter Rathfarnham Dublin 14 | All Colours Painting";
const DESC = "Painter and decorator in Rathfarnham, Dublin 14. Interior & exterior painting, woodwork, ceilings. Fully insured. Free quotes — call 085 821 1870.";
const URL = "https://allcolourspainter.com/painter-rathfarnham";

export const Route = createFileRoute("/painter-rathfarnham")({
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
  component: () => <LocalAreaPage area="Rathfarnham" postcode="Dublin 14" intro="Detached homes, semi-Ds and estate properties throughout Rathfarnham — interior and exterior painting with a tidy, professional finish." />,
});
