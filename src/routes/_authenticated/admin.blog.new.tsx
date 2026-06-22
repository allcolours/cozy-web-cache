import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogPostForm, emptyBlogPost } from "@/components/admin/BlogPostForm";

export const Route = createFileRoute("/_authenticated/admin/blog/new")({
  component: NewPost,
});

function NewPost() {
  return (
    <AdminShell title="New blog post">
      <BlogPostForm initial={emptyBlogPost} />
    </AdminShell>
  );
}
