import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function GscTestButton() {
  const [status, setStatus] = useState<{ kind: "idle" | "loading" | "ok" | "err"; msg?: string }>({
    kind: "idle",
  });
  const send = async () => {
    setStatus({ kind: "loading" });
    try {
      const apikey = import.meta.env.VITE_SUPABASE_PUBLISHABLE_KEY as string;
      const res = await fetch("/api/public/hooks/gsc-coverage-report", {
        method: "POST",
        headers: { "Content-Type": "application/json", apikey },
        body: "{}",
      });
      const json = await res.json().catch(() => ({}));
      if (!res.ok) throw new Error(json?.error || `HTTP ${res.status}`);
      const t = json?.totals || {};
      setStatus({
        kind: "ok",
        msg: `Queued → info@allcolourspainter.com · ${t.indexed ?? 0}/${t.submitted ?? 0} indexed, ${t.errors ?? 0} errors, ${t.warnings ?? 0} warnings`,
      });
    } catch (e: any) {
      setStatus({ kind: "err", msg: e?.message || "Failed to send" });
    }
  };
  return (
    <div className="flex flex-col items-start gap-2">
      <button
        onClick={send}
        disabled={status.kind === "loading"}
        className="rounded-sm border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary disabled:opacity-50"
      >
        {status.kind === "loading" ? "Sending…" : "Test GSC Report"}
      </button>
      {status.msg ? (
        <div
          className={`text-xs ${status.kind === "err" ? "text-destructive" : "text-muted-foreground"}`}
        >
          {status.msg}
        </div>
      ) : null}
    </div>
  );
}

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const [inquiries, unread, gallery, testimonials, posts, studies, views, newLeads] =
        await Promise.all([
          supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
          supabase
            .from("contact_submissions")
            .select("*", { count: "exact", head: true })
            .eq("is_read", false),
          supabase.from("gallery_projects").select("*", { count: "exact", head: true }),
          supabase.from("testimonials").select("*", { count: "exact", head: true }),
          supabase.from("blog_posts").select("*", { count: "exact", head: true }),
          supabase.from("case_studies").select("*", { count: "exact", head: true }),
          supabase
            .from("page_views")
            .select("*", { count: "exact", head: true })
            .gte("created_at", new Date(Date.now() - 7 * 86400_000).toISOString()),
          supabase.from("leads").select("*", { count: "exact", head: true }).eq("status", "new"),
        ]);
      return {
        inquiries: inquiries.count ?? 0,
        unread: unread.count ?? 0,
        gallery: gallery.count ?? 0,
        testimonials: testimonials.count ?? 0,
        posts: posts.count ?? 0,
        studies: studies.count ?? 0,
        views7d: views.count ?? 0,
        newLeads: newLeads.count ?? 0,
      };
    },
  });

  const tiles = [
    {
      label: "New Leads",
      value: data?.newLeads ?? "—",
      to: "/admin/leads" as const,
      highlight: (data?.newLeads ?? 0) > 0,
    },
    { label: "Gallery Projects", value: data?.gallery ?? "—", to: "/admin/gallery" as const },
    { label: "Testimonials", value: data?.testimonials ?? "—", to: "/admin/testimonials" as const },
    { label: "Blog Posts", value: data?.posts ?? "—", to: "/admin/blog" as const },
    { label: "Case Studies", value: data?.studies ?? "—", to: "/admin/case-studies" as const },
    { label: "Total inquiries", value: data?.inquiries ?? "—", to: "/admin/inquiries" as const },
    {
      label: "Unread inquiries",
      value: data?.unread ?? "—",
      to: "/admin/inquiries" as const,
      highlight: (data?.unread ?? 0) > 0,
    },
    { label: "Visits last 7 days", value: data?.views7d ?? "—", to: "/admin/analytics" as const },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="mb-6 flex flex-wrap items-start gap-3">
        <a
          href="/"
          target="_blank"
          rel="noopener noreferrer"
          className="rounded-sm border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wider text-foreground hover:bg-secondary"
        >
          View site →
        </a>
        <GscTestButton />
      </div>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.label}
            to={t.to}
            className={`block border-t-[3px] bg-background p-6 transition-shadow hover:shadow-md ${t.highlight ? "border-primary" : "border-border"}`}
          >
            <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">
              {t.label}
            </div>
            <div className="mt-3 font-display text-3xl font-extrabold tracking-tight">
              {t.value}
            </div>
          </Link>
        ))}
      </div>
    </AdminShell>
  );
}
