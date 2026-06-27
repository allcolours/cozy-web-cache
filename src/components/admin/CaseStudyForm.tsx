import { useMutation, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { CmsImageUpload } from "@/components/admin/CmsImageUpload";

export type CaseStudyInput = {
  id?: string;
  slug: string;
  title: string;
  subtitle: string;
  location: string;
  category: string;
  client_type: string;
  cover_image_url: string;
  intro: string;
  challenge: string;
  approach: string;
  result: string;
  materials: string;
  duration: string;
  visible: boolean;
  sort_order: number;
};

export const emptyCaseStudy: CaseStudyInput = {
  slug: "",
  title: "",
  subtitle: "",
  location: "",
  category: "",
  client_type: "",
  cover_image_url: "",
  intro: "",
  challenge: "",
  approach: "",
  result: "",
  materials: "",
  duration: "",
  visible: true,
  sort_order: 0,
};

const CATEGORIES = ["Residential", "Commercial", "Industrial", "Heritage", "Hospitality"];

function slugify(s: string) {
  return s
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

export function CaseStudyForm({ initial, studyId }: { initial: CaseStudyInput; studyId?: string }) {
  const [form, setForm] = useState<CaseStudyInput>(initial);
  const [slugTouched, setSlugTouched] = useState(!!studyId);
  const navigate = useNavigate();
  const qc = useQueryClient();

  useEffect(() => {
    if (!slugTouched) setForm((f) => ({ ...f, slug: slugify(f.title) }));
  }, [form.title, slugTouched]);

  // Images for existing case study
  const [images, setImages] = useState<
    { id: string; image_url: string; sort_order: number | null }[]
  >([]);
  useEffect(() => {
    if (!studyId) return;
    supabase
      .from("case_study_images")
      .select("id, image_url, sort_order")
      .eq("case_study_id", studyId)
      .order("sort_order")
      .then(({ data }) => setImages(data ?? []));
  }, [studyId]);

  const save = useMutation({
    mutationFn: async () => {
      const payload: any = { ...form };
      delete payload.id;
      if (studyId) {
        const { error } = await supabase.from("case_studies").update(payload).eq("id", studyId);
        if (error) throw error;
        return studyId;
      }
      const { data, error } = await supabase
        .from("case_studies")
        .insert(payload)
        .select("id")
        .single();
      if (error) throw error;
      return data.id as string;
    },
    onSuccess: (id) => {
      qc.invalidateQueries({ queryKey: ["admin-case-studies"] });
      qc.invalidateQueries({ queryKey: ["case-studies"] });
      if (!studyId) navigate({ to: "/admin/case-studies/$studyId", params: { studyId: id } });
    },
    onError: (error) => {
      console.error("[CaseStudyForm] save failed:", error);
    },
  });

  const del = useMutation({
    mutationFn: async () => {
      if (!studyId) return;
      const { error } = await supabase.from("case_studies").delete().eq("id", studyId);
      if (error) throw error;
    },
    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["admin-case-studies"] });
      navigate({ to: "/admin/case-studies" });
    },
  });

  async function addImage(url: string) {
    if (!studyId || !url) return;
    const { data, error } = await supabase
      .from("case_study_images")
      .insert({ case_study_id: studyId, image_url: url, sort_order: images.length })
      .select("id, image_url, sort_order")
      .single();
    if (!error && data) setImages([...images, data]);
  }
  async function removeImage(id: string) {
    await supabase.from("case_study_images").delete().eq("id", id);
    setImages(images.filter((i) => i.id !== id));
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
        <FL label="Title">
          <input
            required
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="adm-input"
          />
        </FL>
        <FL label="Slug">
          <input
            required
            value={form.slug}
            onChange={(e) => {
              setSlugTouched(true);
              setForm({ ...form, slug: slugify(e.target.value) });
            }}
            className="adm-input font-mono text-xs"
          />
        </FL>
      </div>
      <FL label="Subtitle / summary">
        <input
          value={form.subtitle}
          onChange={(e) => setForm({ ...form, subtitle: e.target.value })}
          className="adm-input"
        />
      </FL>
      <div className="grid gap-4 md:grid-cols-4">
        <FL label="Location">
          <input
            value={form.location}
            onChange={(e) => setForm({ ...form, location: e.target.value })}
            className="adm-input"
          />
        </FL>
        <FL label="Category">
          <select
            value={form.category}
            onChange={(e) => setForm({ ...form, category: e.target.value })}
            className="adm-input"
          >
            <option value="">—</option>
            {CATEGORIES.map((c) => (
              <option key={c} value={c}>
                {c}
              </option>
            ))}
          </select>
        </FL>
        <FL label="Client type">
          <input
            value={form.client_type}
            onChange={(e) => setForm({ ...form, client_type: e.target.value })}
            className="adm-input"
          />
        </FL>
        <FL label="Duration">
          <input
            value={form.duration}
            onChange={(e) => setForm({ ...form, duration: e.target.value })}
            className="adm-input"
            placeholder="8 working days"
          />
        </FL>
      </div>
      <FL label="Cover image URL">
        <div className="flex gap-3">
          <input
            value={form.cover_image_url}
            onChange={(e) => setForm({ ...form, cover_image_url: e.target.value })}
            className="adm-input flex-1"
          />
          <CmsImageUpload
            folder="case-studies"
            onUploaded={(url) => setForm({ ...form, cover_image_url: url })}
          />
        </div>
        {form.cover_image_url && (
          <img
            src={form.cover_image_url}
            alt="Cover preview"
            className="mt-2 h-32 rounded border border-border object-cover"
          />
        )}
      </FL>

      <FL label="Intro">
        <textarea
          rows={3}
          value={form.intro}
          onChange={(e) => setForm({ ...form, intro: e.target.value })}
          className="adm-input"
        />
      </FL>
      <FL label="The Challenge">
        <textarea
          rows={4}
          value={form.challenge}
          onChange={(e) => setForm({ ...form, challenge: e.target.value })}
          className="adm-input"
        />
      </FL>
      <FL label="Our Approach (one item per line, prefixed with • for bullets)">
        <textarea
          rows={6}
          value={form.approach}
          onChange={(e) => setForm({ ...form, approach: e.target.value })}
          className="adm-input"
        />
      </FL>
      <FL label="The Result">
        <textarea
          rows={4}
          value={form.result}
          onChange={(e) => setForm({ ...form, result: e.target.value })}
          className="adm-input"
        />
      </FL>
      <FL label="Materials Used (one per line)">
        <textarea
          rows={4}
          value={form.materials}
          onChange={(e) => setForm({ ...form, materials: e.target.value })}
          className="adm-input"
        />
      </FL>

      {studyId && (
        <div>
          <h3 className="mb-2 font-display text-sm font-bold uppercase tracking-wider">
            Image gallery
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {images.map((im) => (
              <div
                key={im.id}
                className="group relative aspect-[4/3] overflow-hidden rounded border border-border"
              >
                <img src={im.image_url} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => removeImage(im.id)}
                  className="absolute right-1 top-1 rounded bg-black/70 px-2 py-0.5 text-[10px] font-bold uppercase text-white opacity-0 transition-opacity group-hover:opacity-100"
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
          <div className="mt-3 flex flex-wrap items-center gap-2">
            <input
              id="imgUrl"
              placeholder="Image URL (paste from gallery uploads or external)"
              className="adm-input flex-1"
            />
            <button
              type="button"
              onClick={() => {
                const el = document.getElementById("imgUrl") as HTMLInputElement;
                addImage(el.value);
                el.value = "";
              }}
              className="rounded-sm border border-border bg-background px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-secondary"
            >
              Add image
            </button>
            <CmsImageUpload
              folder="case-studies"
              onUploaded={(url) => addImage(url)}
              label="Upload image"
            />
          </div>
        </div>
      )}

      <div className="flex items-center gap-6">
        <label className="flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={form.visible}
            onChange={(e) => setForm({ ...form, visible: e.target.checked })}
          />{" "}
          Visible on site
        </label>
        <FL label="Sort order">
          <input
            type="number"
            value={form.sort_order}
            onChange={(e) => setForm({ ...form, sort_order: Number(e.target.value) })}
            className="adm-input w-24"
          />
        </FL>
      </div>

      {save.error && <p className="text-sm text-destructive">{(save.error as Error).message}</p>}
      {save.isSuccess && <p className="text-sm font-medium text-green-600">Saved successfully ✓</p>}

      <div className="flex flex-wrap items-center justify-between gap-3 border-t border-border pt-6">
        <div className="flex gap-3">
          <button
            type="submit"
            disabled={save.isPending}
            className="rounded-sm bg-primary px-6 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground disabled:opacity-60"
          >
            {save.isPending ? "Saving…" : "Save"}
          </button>
          {studyId && form.slug && (
            <a
              href={`/case-studies/${form.slug}`}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-sm border border-border bg-background px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider hover:bg-secondary"
            >
              Preview →
            </a>
          )}
        </div>
        {studyId && (
          <button
            type="button"
            onClick={() => confirm("Delete this case study?") && del.mutate()}
            className="text-xs font-bold uppercase tracking-wider text-destructive hover:underline"
          >
            Delete
          </button>
        )}
      </div>

      <style>{`.adm-input { width:100%; border:1px solid hsl(var(--border)); border-radius:4px; padding:8px 10px; background:#fff; font-size:14px; }`}</style>
    </form>
  );
}

function FL({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1 block font-display text-[11px] font-bold uppercase tracking-wider text-muted-foreground">
        {label}
      </span>
      {children}
    </label>
  );
}
