import { createFileRoute } from "@tanstack/react-router";
import { AdminShell } from "@/components/admin/AdminShell";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

export const Route = createFileRoute("/_authenticated/admin/gallery")({
  component: GalleryAdmin,
});

type Row = {
  id: string;
  title: string;
  tag: string | null;
  image_url: string;
  sort_order: number;
  signed_url?: string;
};

function GalleryAdmin() {
  const qc = useQueryClient();
  const [uploading, setUploading] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  const { data, isLoading } = useQuery({
    queryKey: ["admin-gallery"],
    queryFn: async (): Promise<Row[]> => {
      const { data, error } = await supabase
        .from("gallery_images")
        .select("*")
        .order("sort_order", { ascending: true })
        .order("created_at", { ascending: false });
      if (error) throw error;
      const rows: Row[] = [];
      for (const r of data ?? []) {
        let signed = r.image_url;
        if (!/^https?:\/\//.test(r.image_url)) {
          const { data: s } = await supabase.storage.from("gallery").createSignedUrl(r.image_url, 3600);
          signed = s?.signedUrl ?? r.image_url;
        }
        rows.push({ ...r, signed_url: signed });
      }
      return rows;
    },
  });

  async function handleUpload(e: React.ChangeEvent<HTMLInputElement>) {
    const files = e.target.files;
    if (!files?.length) return;
    setUploading(true);
    setErr(null);
    try {
      for (const file of Array.from(files)) {
        const path = `${crypto.randomUUID()}-${file.name.replace(/[^a-zA-Z0-9._-]/g, "_")}`;
        const { error: upErr } = await supabase.storage.from("gallery").upload(path, file, {
          cacheControl: "31536000",
          upsert: false,
        });
        if (upErr) throw upErr;
        const { error: insErr } = await supabase.from("gallery_images").insert({
          image_url: path,
          title: file.name.replace(/\.[^.]+$/, ""),
          tag: "Project",
          sort_order: 100,
        });
        if (insErr) throw insErr;
      }
      qc.invalidateQueries({ queryKey: ["admin-gallery"] });
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Upload failed");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  }

  async function updateRow(id: string, patch: { title?: string; tag?: string | null; sort_order?: number }) {
    await supabase.from("gallery_images").update(patch).eq("id", id);
    qc.invalidateQueries({ queryKey: ["admin-gallery"] });
  }

  async function deleteRow(row: Row) {
    if (!confirm("Delete this image?")) return;
    if (!/^https?:\/\//.test(row.image_url)) {
      await supabase.storage.from("gallery").remove([row.image_url]);
    }
    await supabase.from("gallery_images").delete().eq("id", row.id);
    qc.invalidateQueries({ queryKey: ["admin-gallery"] });
  }

  return (
    <AdminShell title="Gallery">
      <div className="mb-6 flex flex-wrap items-center gap-3 border-t-[3px] border-primary bg-background p-5">
        <div className="flex-1">
          <h3 className="font-display text-sm font-bold uppercase tracking-wider">Upload photos</h3>
          <p className="mt-1 text-xs text-muted-foreground">JPG, PNG or WEBP. Multiple files supported.</p>
        </div>
        <label className="cursor-pointer rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]">
          {uploading ? "Uploading…" : "Choose files"}
          <input type="file" multiple accept="image/*" className="hidden" onChange={handleUpload} disabled={uploading} />
        </label>
      </div>
      {err && <p className="mb-4 text-sm text-destructive">{err}</p>}

      {isLoading ? (
        <p className="text-sm text-muted-foreground">Loading…</p>
      ) : !data?.length ? (
        <p className="text-sm text-muted-foreground">No images yet. Upload some to populate the public gallery.</p>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {data.map((row) => (
            <div key={row.id} className="bg-background">
              <img src={row.signed_url} alt={row.title} className="aspect-[4/3] w-full object-cover" />
              <div className="space-y-3 p-4">
                <input
                  defaultValue={row.title}
                  onBlur={(e) => e.target.value !== row.title && updateRow(row.id, { title: e.target.value })}
                  placeholder="Title"
                  className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <input
                  defaultValue={row.tag ?? ""}
                  onBlur={(e) => (e.target.value || null) !== row.tag && updateRow(row.id, { tag: e.target.value || null })}
                  placeholder="Tag (e.g. Exterior · Residential)"
                  className="w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary"
                />
                <div className="flex items-center justify-between gap-2">
                  <label className="text-xs text-muted-foreground">
                    Order:{" "}
                    <input
                      type="number"
                      defaultValue={row.sort_order}
                      onBlur={(e) => Number(e.target.value) !== row.sort_order && updateRow(row.id, { sort_order: Number(e.target.value) })}
                      className="w-16 border border-input bg-background px-2 py-1 text-sm"
                    />
                  </label>
                  <button onClick={() => deleteRow(row)} className="text-xs font-bold uppercase tracking-wider text-destructive hover:underline">
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </AdminShell>
  );
}
