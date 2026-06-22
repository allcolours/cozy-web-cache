import { Link, useNavigate, useRouterState } from "@tanstack/react-router";
import { useEffect, useState, type ReactNode } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useIsAdmin } from "@/hooks/useIsAdmin";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const NAV: { to: string; label: string; exact?: boolean; badgeKey?: "leads" }[] = [
  { to: "/admin", label: "Dashboard", exact: true },
  { to: "/admin/leads", label: "Leads", badgeKey: "leads" },
  { to: "/admin/gallery", label: "Gallery" },
  { to: "/admin/testimonials", label: "Testimonials" },
  { to: "/admin/blog", label: "Blog" },
  { to: "/admin/case-studies", label: "Case Studies" },
  { to: "/admin/inquiries", label: "Inquiries" },
  { to: "/admin/content", label: "Content" },
  { to: "/admin/analytics", label: "Analytics" },
];

type AdminDiagnostic = {
  loading: boolean;
  userId: string | null;
  email: string | null;
  roleResult: boolean | null;
  roleError: string | null;
  selectOk: boolean | null;
  selectError: string | null;
  updateCode: string | null;
  updateMessage: string | null;
  updateStatus: string | null;
  authError: string | null;
};

const initialDiagnostic: AdminDiagnostic = {
  loading: true,
  userId: null,
  email: null,
  roleResult: null,
  roleError: null,
  selectOk: null,
  selectError: null,
  updateCode: null,
  updateMessage: null,
  updateStatus: null,
  authError: null,
};

export function AdminShell({ children, title }: { children: ReactNode; title: string }) {
  const { data: isAdmin, isLoading } = useIsAdmin();
  const [diagnostic, setDiagnostic] = useState<AdminDiagnostic>(initialDiagnostic);
  const navigate = useNavigate();
  const qc = useQueryClient();
  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    let cancelled = false;

    async function runDiagnostics() {
      const next: AdminDiagnostic = { ...initialDiagnostic };

      try {
        const { data: userData, error: userError } = await supabase.auth.getUser();
        next.authError = userError ? `${userError.name}: ${userError.message}` : null;
        next.userId = userData.user?.id ?? null;
        next.email = userData.user?.email ?? null;

        if (userData.user?.id) {
          const { data: roleData, error: roleError } = await supabase.rpc("has_role", {
            _user_id: userData.user.id,
            _role: "admin",
          });
          next.roleResult = roleError ? null : Boolean(roleData);
          next.roleError = roleError ? `${roleError.code ?? "unknown"}: ${roleError.message}` : null;
        }

        const { error: selectError } = await supabase.from("gallery_projects").select("id").limit(1);
        next.selectOk = !selectError;
        next.selectError = selectError ? `${selectError.code ?? "unknown"}: ${selectError.message}` : null;

        const { error: updateError } = await supabase
          .from("gallery_projects")
          .update({ visible: true })
          .eq("id", "00000000-0000-0000-0000-000000000000")
          .select("id")
          .single();
        next.updateCode = updateError?.code ?? null;
        next.updateMessage = updateError?.message ?? null;
        next.updateStatus = updateError
          ? updateError.code === "PGRST116"
            ? "PGRST116: no matching row returned; permission check appears to pass."
            : updateError.code === "42501"
              ? "42501: permission denied; RLS or grants blocked the update."
              : `${updateError.code ?? "unknown"}: ${updateError.message}`
          : "No error returned.";
      } catch (error) {
        next.authError = error instanceof Error ? error.message : String(error);
      } finally {
        next.loading = false;
        if (!cancelled) setDiagnostic(next);
      }
    }

    runDiagnostics();

    return () => {
      cancelled = true;
    };
  }, []);

  const { data: newLeadsCount = 0 } = useQuery({
    queryKey: ["admin-new-leads-count"],
    enabled: !!isAdmin,
    queryFn: async () => {
      const { count } = await supabase
        .from("leads")
        .select("*", { count: "exact", head: true })
        .eq("status", "new");
      return count ?? 0;
    },
  });

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
            const badge = n.badgeKey === "leads" ? newLeadsCount : 0;
            return (
              <Link
                key={n.to}
                to={n.to}
                className={`flex items-center justify-between gap-2 whitespace-nowrap px-4 py-2 font-display text-xs font-bold uppercase tracking-wider transition-colors md:py-3 ${
                  active ? "bg-primary text-primary-foreground" : "text-white/70 hover:bg-white/5 hover:text-white"
                }`}
              >
                <span>{n.label}</span>
                {badge > 0 && (
                  <span className={`inline-flex min-w-[20px] items-center justify-center rounded-full px-1.5 py-0.5 text-[10px] font-bold ${active ? "bg-white/20 text-white" : "bg-primary text-primary-foreground"}`}>
                    {badge}
                  </span>
                )}
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
        <div className="px-5 pt-5 md:px-8 md:pt-6">
          <details className="border border-[oklch(0.82_0.15_85)] bg-[oklch(0.97_0.07_95)] px-4 py-3 text-[oklch(0.28_0.08_70)] shadow-sm" open>
            <summary className="cursor-pointer font-display text-xs font-bold uppercase tracking-wider">
              Admin diagnostics
            </summary>
            <dl className="mt-3 grid gap-2 text-xs md:grid-cols-2">
              <div>
                <dt className="font-bold uppercase">User</dt>
                <dd className="break-all">{diagnostic.loading ? "Checking…" : diagnostic.userId ?? "No user"}</dd>
                <dd className="break-all">{diagnostic.email ?? "No email"}</dd>
              </div>
              <div>
                <dt className="font-bold uppercase">Admin role</dt>
                <dd>{diagnostic.roleResult === null ? "Unknown" : String(diagnostic.roleResult)}</dd>
                {diagnostic.roleError && <dd className="break-all">{diagnostic.roleError}</dd>}
              </div>
              <div>
                <dt className="font-bold uppercase">Gallery SELECT</dt>
                <dd>{diagnostic.selectOk === null ? "Unknown" : diagnostic.selectOk ? "Success" : "Error"}</dd>
                {diagnostic.selectError && <dd className="break-all">{diagnostic.selectError}</dd>}
              </div>
              <div>
                <dt className="font-bold uppercase">Gallery UPDATE probe</dt>
                <dd className="break-all">{diagnostic.updateStatus ?? "Unknown"}</dd>
                {diagnostic.updateCode && <dd>Code: {diagnostic.updateCode}</dd>}
                {diagnostic.updateMessage && <dd className="break-all">{diagnostic.updateMessage}</dd>}
              </div>
              {diagnostic.authError && (
                <div className="md:col-span-2">
                  <dt className="font-bold uppercase">Auth error</dt>
                  <dd className="break-all">{diagnostic.authError}</dd>
                </div>
              )}
            </dl>
          </details>
        </div>
        <div className="px-5 py-6 md:px-8 md:py-8">{children}</div>
      </main>
    </div>
  );
}
