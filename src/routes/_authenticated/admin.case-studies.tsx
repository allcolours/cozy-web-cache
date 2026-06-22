import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/case-studies")({
  component: CaseStudiesAdmin,
});

function CaseStudiesAdmin() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const { data, isLoading } = useQuery({
    queryKey: ["admin-case-studies"],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("id, slug, title, location, category, cover_image_url, visible, sort_order")
        .order("sort_order")
        .order("created_at", { ascending: false });
      if (error) throw error;
      return data;
    },
  });

  const toggle = useMutation({
    mutationFn: async (r: { id: string; visible: boolean }) => {
      const { error } = await supabase.from("case_studies").update({ visible: !r.visible }).eq("id", r.id);
      if (error) throw error;
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-case-studies"] }),
  });

  return (
    <AdminShell title="Case Studies">
      <div className="mb-6 flex items-center justify-between">
        <p className="text-sm text-muted-foreground">{data?.length ?? 0} case studies</p>
        <Link to="/admin/case-studies/new" className="rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">+ New case study</Link>
      </div>

      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}

      {data && data.length > 0 && (
        <div className="overflow-hidden rounded-md border border-border bg-background">
          <table className="w-full text-sm">
            <thead className="border-b border-border bg-secondary text-left text-xs uppercase tracking-wider text-muted-foreground">
              <tr>
                <th className="px-3 py-3">Cover</th>
                <th className="px-3 py-3">Title</th>
                <th className="px-3 py-3">Location</th>
                <th className="px-3 py-3">Category</th>
                <th className="px-3 py-3">Visible</th>
                <th className="px-3 py-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {data.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => navigate({ to: "/admin/case-studies/$studyId", params: { studyId: c.id } })}
                  className="cursor-pointer border-b border-border last:border-0 hover:bg-secondary/50"
                >
                  <td className="px-3 py-2">
                    {c.cover_image_url ? (
                      <img src={c.cover_image_url} alt="" className="h-10 w-14 rounded object-cover" />
                    ) : (
                      <div className="h-10 w-14 rounded bg-muted" />
                    )}
                  </td>
                  <td className="px-3 py-3">
                    <div className="font-medium">{c.title}</div>
                    <div className="text-xs text-muted-foreground">/{c.slug}</div>
                  </td>
                  <td className="px-3 py-3 text-muted-foreground">{c.location ?? "—"}</td>
                  <td className="px-3 py-3 text-muted-foreground">{c.category ?? "—"}</td>
                  <td className="px-3 py-3">
                    <button onClick={(e) => { e.stopPropagation(); toggle.mutate({ id: c.id, visible: !!c.visible }); }} className={`relative inline-flex h-5 w-9 items-center rounded-full ${c.visible ? "bg-[#16a34a]" : "bg-muted-foreground/30"}`} aria-label="Toggle visible">
                      <span className={`inline-block h-4 w-4 transform rounded-full bg-white transition-transform ${c.visible ? "translate-x-4" : "translate-x-0.5"}`} />
                    </button>
                  </td>
                  <td className="px-3 py-3 text-right">
                    <button
                      onClick={(e) => { e.stopPropagation(); navigate({ to: "/admin/case-studies/$studyId", params: { studyId: c.id } }); }}
                      className="text-xs font-bold uppercase tracking-wider text-primary hover:underline"
                    >
                      Edit
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </AdminShell>
  );
}
