import { createFileRoute, Link } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/")({
  component: Dashboard,
});

function Dashboard() {
  const { data } = useQuery({
    queryKey: ["admin-dashboard"],
    queryFn: async () => {
      const [inquiries, unread, gallery, views] = await Promise.all([
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }),
        supabase.from("contact_submissions").select("*", { count: "exact", head: true }).eq("is_read", false),
        supabase.from("gallery_images").select("*", { count: "exact", head: true }),
        supabase.from("page_views").select("*", { count: "exact", head: true }).gte("created_at", new Date(Date.now() - 7 * 86400_000).toISOString()),
      ]);
      return {
        inquiries: inquiries.count ?? 0,
        unread: unread.count ?? 0,
        gallery: gallery.count ?? 0,
        views7d: views.count ?? 0,
      };
    },
  });

  const tiles = [
    { label: "Total inquiries", value: data?.inquiries ?? "—", to: "/admin/inquiries" },
    { label: "Unread inquiries", value: data?.unread ?? "—", to: "/admin/inquiries", highlight: (data?.unread ?? 0) > 0 },
    { label: "Gallery images", value: data?.gallery ?? "—", to: "/admin/gallery" },
    { label: "Visits last 7 days", value: data?.views7d ?? "—", to: "/admin/analytics" },
  ];

  return (
    <AdminShell title="Dashboard">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {tiles.map((t) => (
          <Link
            key={t.label}
            to={t.to}
            className={`block border-t-[3px] bg-background p-6 transition-shadow hover:shadow-md ${t.highlight ? "border-primary" : "border-border"}`}
          >
            <div className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-muted-foreground">{t.label}</div>
            <div className="mt-3 font-display text-3xl font-extrabold tracking-tight">{t.value}</div>
          </Link>
        ))}
      </div>
      <div className="mt-8 grid gap-4 sm:grid-cols-2">
        <Link to="/admin/gallery" className="bg-background p-6 hover:shadow-md">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Manage gallery →</h3>
          <p className="mt-2 text-sm text-muted-foreground">Upload, rename and reorder portfolio photos.</p>
        </Link>
        <Link to="/admin/content" className="bg-background p-6 hover:shadow-md">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Edit site content →</h3>
          <p className="mt-2 text-sm text-muted-foreground">Change phone, email, hours and hero text.</p>
        </Link>
      </div>
    </AdminShell>
  );
}
