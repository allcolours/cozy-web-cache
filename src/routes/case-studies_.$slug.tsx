import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/case-studies_/$slug")({
  beforeLoad: () => {
    throw redirect({ to: "/gallery" });
  },
});
