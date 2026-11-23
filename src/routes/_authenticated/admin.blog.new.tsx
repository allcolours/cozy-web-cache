import { privatePageHead } from "@/lib/page-head";
import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogPostForm, emptyBlogPost } from "@/components/admin/BlogPostForm";

export const Route = createFileRoute("/_authenticated/admin/blog/new")({
  head: () => privatePageHead("New Blog Post", "New Blog Post administration for All Colours Painting."),
  component: NewPost,
});

function NewPost() {
  return (
    <AdminShell title="New blog post">
      <BlogPostForm initial={emptyBlogPost} />
    </AdminShell>
  );
}
