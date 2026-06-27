import { createFileRoute, redirect } from "@tanstack/react-router";

export const Route = createFileRoute("/case-studies")({
  beforeLoad: () => {
    throw redirect({ to: "/gallery" });
  },
});
