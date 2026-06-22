import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { CaseStudyForm, emptyCaseStudy } from "@/components/admin/CaseStudyForm";

export const Route = createFileRoute("/_authenticated/admin/case-studies/new")({
  component: NewCaseStudy,
});

function NewCaseStudy() {
  return (
    <AdminShell title="New case study">
      <CaseStudyForm initial={emptyCaseStudy} />
    </AdminShell>
  );
}
