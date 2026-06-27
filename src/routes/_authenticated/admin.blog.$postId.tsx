import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { BlogPostForm, type BlogPostInput } from "@/components/admin/BlogPostForm";
import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";

export const Route = createFileRoute("/_authenticated/admin/blog/$postId")({
  component: EditPost,
});

function EditPost() {
  const { postId } = Route.useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["admin-blog-post", postId],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("blog_posts")
        .select("*")
        .eq("id", postId)
        .single();
      if (error) throw error;
      return data;
    },
  });

  return (
    <AdminShell title="Edit blog post">
      {isLoading && <p className="text-sm text-muted-foreground">Loading…</p>}
      {error && <p className="text-sm text-destructive">{(error as Error).message}</p>}
      {data && (
        <BlogPostForm
          postId={postId}
          initial={{
            id: data.id,
            slug: data.slug,
            title: data.title,
            category: data.category ?? "",
            read_time: data.read_time ?? "",
            intro: data.intro ?? "",
            excerpt: data.excerpt ?? "",
            cover_image_url: data.cover_image_url ?? "",
            content: (Array.isArray(data.content) ? data.content : []) as BlogPostInput["content"],
            meta_title: data.meta_title ?? "",
            meta_description: data.meta_description ?? "",
            published: !!data.published,
          }}
        />
      )}
    </AdminShell>
  );
}
