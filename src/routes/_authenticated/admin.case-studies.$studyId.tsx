import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CaseStudyForm } from "@/components/admin/CaseStudyForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/case-studies/$studyId")({
  component: EditCaseStudy,
});

function EditCaseStudy() {
  const { studyId } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-case-study", studyId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("case_studies")
        .select("*")
        .eq("id", studyId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  return (
    <AdminShell title="Edit case study">
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-destructive">{(error as Error).message}</p>}
      {data && (
        <CaseStudyForm
          studyId={studyId}
          initial={{
            id: data.id,
            slug: data.slug,
            title: data.title,
            subtitle: data.subtitle ?? "",
            location: data.location ?? "",
            category: data.category ?? "",
            client_type: data.client_type ?? "",
            cover_image_url: data.cover_image_url ?? "",
            intro: data.intro ?? "",
            challenge: data.challenge ?? "",
            approach: data.approach ?? "",
            result: data.result ?? "",
            materials: data.materials ?? "",
            duration: data.duration ?? "",
            visible: !!data.visible,
            sort_order: data.sort_order ?? 0,
          }}
        />
      )}
    </AdminShell>
  );
}
