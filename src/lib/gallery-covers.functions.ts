import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";

export type GalleryCategory =
  | "interior"
  | "exterior"
  | "woodwork"
  | "metalwork"
  | "kitchens"
  | "plaster"
  | "commercial"
  | "epoxy";

export type GalleryCoverMap = Partial<Record<GalleryCategory, string>>;

/**
 * Returns the cover image URL of the FIRST visible gallery album in each
 * category. Uses the server publishable client (RLS-respecting, anon SELECT
 * policies are in place for gallery_projects / gallery_images).
 *
 * Signed URLs are minted server-side for storage-path rows so the caller can
 * render the URL directly.
 */
export const getGalleryCovers = createServerFn({ method: "GET" }).handler(
  async (): Promise<GalleryCoverMap> => {
    const supabase = createClient(
      process.env.SUPABASE_URL!,
      process.env.SUPABASE_PUBLISHABLE_KEY!,
      { auth: { storage: undefined, persistSession: false, autoRefreshToken: false } },
    );

    const { data, error } = await supabase
      .from("gallery_images")
      .select(
        "image_url, storage_path, is_cover, sort_order, gallery_projects!inner(category, sort_order, visible)",
      )
      .eq("gallery_projects.visible", true)
      .not("image_url", "is", null)
      .order("sort_order", { foreignTable: "gallery_projects", ascending: true })
      .order("is_cover", { ascending: false })
      .order("sort_order", { ascending: true });

    if (error) throw error;

    const covers: GalleryCoverMap = {};
    for (const row of data ?? []) {
      const project = (row as { gallery_projects: { category: GalleryCategory } }).gallery_projects;
      const cat = project.category;
      if (covers[cat]) continue;

      const raw = (row.image_url ?? "") as string;
      if (!raw) continue;

      let url = raw;
      if (!/^https?:\/\//.test(raw) && !raw.startsWith("/")) {
        const path = ((row as { storage_path?: string | null }).storage_path || raw) as string;
        const { data: signed } = await supabase.storage
          .from("gallery")
          .createSignedUrl(path, 60 * 60 * 24 * 7);
        if (signed?.signedUrl) url = signed.signedUrl;
      }
      covers[cat] = url;
    }
    return covers;
  },
);
