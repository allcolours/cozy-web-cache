import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";

type Section = { heading: string; body: string };
export type BlogPostInput = {
  id?: string;
  slug: string;
  title: string;
  category: string;
  read_time: string;
  intro: string;
  excerpt: string;
  cover_image_url: string;
  content: Section[];
  meta_title: string;
  meta_description: string;
  published: boolean;
};

const CATEGORIES = ["Pricing", "Colour Advice", "How-To", "Exterior", "Interior", "Commercial", "Materials", "Process"];

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-");
}

export function BlogPostForm({ initial, postId }: { initial: BlogPostInput; postId?: string }) {
  const [form, setForm] = useState<BlogPostInput>(initial);
  const [slugTouched, setSlugTouched] = useState(!!postId);
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    if (!slugTouched) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, slugTouched]);

  const save = useMutation({
    mutationFn: async () => {
      const payload: any = { ...form };
      delete payload.id;
      if (postId) {
        const { error } = await supabase.from("blog_posts").update(payload).eq("id", postId);
        if (error) throw error;
        return postId;
      }
      const { data, error } = await supabase.from("blog_posts").insert(payload).select("id").single();
      if (error) throw error;
      return data.id as string;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      qc.invalidateQueries({ queryKey: ["blog-posts"] });
      if (!postId) navigate({ to: "/admin/blog/$postId", params: { postId: id } });
    },
    onError: (error) => {
      console.error("[BlogPostForm] save failed:", error);
    },
  });

  const del = useMutation({
    mutationFn: async () => {
      if (!postId) return;
      const { error } = await supabase.from("blog_posts").delete().eq("id", postId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-blog"] });
      navigate({ to: "/admin/blog" });
    },
  });

  function updateSection(i: number, patch: Partial<Section>) {
    setForm({ ...form, content: form.content.map((s, idx) => (idx === i ? { ...s, ...patch } : s)) });
  }
  function addSection() {
    setForm({ ...form, content: [...form.content, { heading: "", body: "" }] });
  }
  function removeSection(i: number) {
    setForm({ ...form, content: form.content.filter((_, idx) => idx !== i) });
  }
  function moveSection(i: number, dir: -1 | 1) {
    const arr = form.content.slice();
    const j = i + dir;
    if (j < 0 || j >= arr.length) return;
    [arr[i], arr[j]] = [arr[j], arr[i]];
    setForm({ ...form, content: arr });
  }

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        save.mutate();
      }}
      className="space-y-6"
    >
      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <FieldLabel label="Title">
          <input required value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })} className="adm-input" />
        </FieldLabel>
        <FieldLabel label="Slug">
          <input required value={form.slug} onChange={(e) => { setSlugTouched(true); setForm({ ...form, slug: slugify(e.target.value) }); }} className="adm-input font-mono text-xs" />
        </FieldLabel>
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <FieldLabel label="Category">
          <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="adm-input">
            <option value="">— pick —</option>
            {CATEGORIES.map((c) => <option key={c} value={c}>{c}</option>)}
          </select>
        </FieldLabel>
        <FieldLabel label="Read time">
          <input value={form.read_time} onChange={(e) => setForm({ ...form, read_time: e.target.value })} placeholder="5 min read" className="adm-input" />
        </FieldLabel>
        <FieldLabel label="Cover image URL">
          <input value={form.cover_image_url} onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })} className="adm-input" />
        </FieldLabel>
      </div>

      <FieldLabel label="Intro / excerpt (also used as meta description if blank)">
        <textarea rows={3} value={form.intro} onChange={(e) => setForm({ ...form, intro: e.target.value, excerpt: e.target.value })} className="adm-input" />
      </FieldLabel>

      <div>
        <div className="mb-2 flex items-center justify-between">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Content sections</h3>
          <button type="button" onClick={addSection} className="rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-bold uppercase tracking-wider hover:bg-secondary">+ Add section</button>
        </div>
        <div className="space-y-4">
          {form.content.map((s, i) => (
            <div key={i} className="rounded-md border border-border bg-background p-4">
              <div className="mb-2 flex items-center justify-between text-xs text-muted-foreground">
                <span>Section {i + 1}</span>
                <div className="flex gap-2">
                  <button type="button" onClick={() => moveSection(i, -1)}>▲</button>
                  <button type="button" onClick={() => moveSection(i, 1)}>▼</button>
                  <button type="button" onClick={() => removeSection(i)} className="text-destructive">Remove</button>
                </div>
              </div>
              <input value={s.heading} onChange={(e) => updateSection(i, { heading: e.target.value })} placeholder="Heading (optional)" className="adm-input mb-2 font-display font-bold uppercase" />
              <textarea required rows={6} value={s.body} onChange={(e) => updateSection(i, { body: e.target.value })} placeholder="Body — separate paragraphs with blank lines" className="adm-input" />
            </div>
          ))}
          {form.content.length === 0 && <p className="rounded-md border border-dashed border-border p-6 text-center text-sm text-muted-foreground">No sections yet.</p>}
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <FieldLabel label="Meta title">
          <input value={form.meta_title} onChange={(e) => setForm({ ...form, meta_title: e.target.value })} className="adm-input" />
        </FieldLabel>
        <FieldLabel label="Meta description">
          <input value={form.meta_description} onChange={(e) => setForm({ ...form, meta_description: e.target.value })} className="adm-input" />
        </FieldLabel>
      </div>

      <label className="flex items-center gap-2 text-sm">
        <input type="checkbox" checked={form.published} onChange={(e) => setForm({ ...form, published: e.target.checked })} />
        Published (live on /blog)
      </label>

      {save.error && <p className="text-sm text-destructive">{(save.error as Error).message}</p>}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <div className="flex gap-3">
          <button type="submit" disabled={save.isPending} className="rounded-sm bg-primary px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-60">
            {save.isPending ? "Saving…" : "Save"}
          </button>
          {postId && form.slug && (
            <a href={`/blog/${form.slug}`} target="_blank" rel="noopener noreferrer" className="rounded-sm border border-border bg-background px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider hover:bg-secondary">Preview →</a>
          )}
        </div>
        {postId && (
          <button type="button" onClick={() => confirm("Delete this post?") && del.mutate()} className="text-xs font-bold uppercase tracking-wider text-destructive hover:underline">Delete post</button>
        )}
      </div>

      <style>{`.adm-input { width:100%; border:1px solid hsl(var(--border)); border-radius:4px; padding:8px 10px; background:#fff; font-size:14px; }`}</style>
    </form>
  );
}

function FieldLabel({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-display text-[11px] font-bold uppercase tracking-wider text-muted-foreground">{label}</span>
      {children}
    </label>
  );
}

export const emptyBlogPost: BlogPostInput = {
  slug: "",
  title: "",
  category: "",
  read_time: "5 min read",
  intro: "",
  excerpt: "",
  cover_image_url: "",
  content: [{ heading: "", body: "" }],
  meta_title: "",
  meta_description: "",
  published: false,
};
