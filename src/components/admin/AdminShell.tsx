import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useQueryClient } from "@tanstack/react-query";

const NAV: { to: string; label: string; exact?: boolean }[] = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/inquiries", label: "Inquiries" },
  { to: "/admin/content", label: "Content" },
  { to: "/admin/analytics", label: "Analytics" },
];

export function AdminShell({ children, title }: { children: ReactNode; title: string }) {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const navigate = useNavigate();
  const qc = useQueryClient();
  const path = useRouterState({ select: (s) => s.location.pathname });

  async function signOut() {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  }

  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center text-muted-foreground">Loading…</div>;
  }
  if (!isAdmin) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-background px-4 text-center">
        <h1 className="font-display text-2xl font-bold uppercase">Not authorized</h1>
        <p className="text-sm text-muted-foreground">Your account doesn't have admin access.</p>
        <button onClick={signOut} className="rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground">
          Sign out
        </button>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen flex-col bg-secondary md:flex-row">
      <aside className="border-b border-border bg-[oklch(0.2_0_0)] text-white md:w-60 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-5 py-5 md:block">
          <Link to="/" className="font-display text-sm font-bold uppercase tracking-wide text-primary">All Colours · Admin</Link>
          <button onClick={signOut} className="text-xs text-white/60 hover:text-primary md:hidden">Sign out</button>
        </div>
        <nav className="flex gap-1 overflow-x-auto px-3 pb-3 md:flex-col md:gap-0 md:px-0 md:pb-0">
          {NAV.map((n) => {
            const active = n.exact ? path === n.to : path.startsWith(n.to);
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`whitespace-nowrap px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-colors md:py-3 ${
                  active ? "bg-primary text-primary-foreground" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                {n.label}
              </Link>
            );
          })}
          <button onClick={signOut} className="mt-auto hidden px-4 py-3 text-left font-display text-xs font-bold uppercase tracking-wider text-white/50 hover:text-primary md:block">
            Sign out
          </button>
        </nav>
      </aside>
      <main className="flex-1">
        <header className="border-b border-border bg-background px-5 py-5 md:px-8 md:py-6">
          <h1 className="font-display text-xl font-extrabold uppercase tracking-tight md:text-2xl">{title}</h1>
        </header>
        <div className="px-5 py-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
