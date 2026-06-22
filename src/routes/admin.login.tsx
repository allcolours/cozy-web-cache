import { createFileRoute, redirect } from "@tanstack/react-router";

// The site already has a Supabase sign-in page at /auth that redirects to /admin.
// Keep /admin/login as an alias so it can be linked safely.
export const Route = createFileRoute("/admin/login")({
  beforeLoad: () => {
    throw redirect({ to: "/auth" });
  },
});
