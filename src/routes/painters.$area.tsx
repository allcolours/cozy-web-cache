import { createFileRoute, redirect } from "@tanstack/react-router";
import { AREA_PATHS } from "../data/areaContent";

const VALID_SLUGS = new Set(AREA_PATHS.map((a) => a.path.replace(/^\/painter-/, "")));

// Legacy /painters/$area URLs duplicated the static /painter-[slug] pages and caused
// keyword cannibalisation. Permanently redirect to the canonical static route.
export const Route = createFileRoute("/painters/$area")({
  beforeLoad: ({ params }) => {
    if (!VALID_SLUGS.has(params.area)) {
      throw redirect({ to: "/painters", statusCode: 301 });
    }
    throw redirect({ href: `/painter-${params.area}`, statusCode: 301 });
  },
  component: () => null,
});
