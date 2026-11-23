import { createServerFn } from "@tanstack/react-start";
import { createClient } from "@supabase/supabase-js";
import { isUnavailableGalleryMedia } from "./gallery-media";

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
    const url = process.env["SUPABASE_URL"];
    const key = process.env["SUPABASE_PUBLISHABLE_KEY"];
    if (!url || !key) throw new Error("Gallery configuration unavailable");
    const supabase = createClient(url, key, {
      auth: { persistSession: false, autoRefreshToken: false },
      global: {
        fetch: (input, init) => {
          const headers = new Headers(init?.headers);
          if (key.startsWith("sb_") && headers.get("Authorization") === `Bearer ${key}`)
            headers.delete("Authorization");
          headers.set("apikey", key);
          return fetch(input, { ...init, headers });
        },
      },
    });

    const { data, error } = await supabase
      .from("gallery_images")
      .select(
        "image_url, storage_path, gallery_projects!inner(category, sort_order, visible)",
      )
      .eq("gallery_projects.visible", true)
      .not("image_url", "is", null)
      .order("sort_order", { foreignTable: "gallery_projects", ascending: true })
      .order("is_cover", { ascending: false })
      .order("sort_order", { ascending: true });

    if (error) throw error;

    const covers: GalleryCoverMap = {};
    const selected = new Set<GalleryCategory>();
    const paths: { cat: GalleryCategory; path: string }[] = [];
    for (const row of data ?? []) {
      const projectRel = (
        row as unknown as {
          gallery_projects: { category: GalleryCategory } | { category: GalleryCategory }[];
        }
      ).gallery_projects;
      const project = Array.isArray(projectRel) ? projectRel[0] : projectRel;
      const cat = project?.category as GalleryCategory | undefined;
      if (!cat) continue;
      if (selected.has(cat)) continue;
      selected.add(cat);

      const raw = (row.image_url ?? "") as string;
      if (!raw || isUnavailableGalleryMedia(raw)) continue;

      let url = raw;
      if (!/^https?:\/\//.test(raw) && !raw.startsWith("/")) {
        const path = ((row as { storage_path?: string | null }).storage_path || raw) as string;
        paths.push({ cat, path });
        continue;
      }
      covers[cat] = url;
    }
    // One signing request replaces up to eight sequential storage requests.
    if (paths.length) {
      const { data: signed } = await supabase.storage.from("gallery").createSignedUrls(
        paths.map(({ path }) => path),
        60 * 60 * 24 * 7,
      );
      for (const item of signed ?? []) {
        const match = paths.find(({ path }) => path === item.path);
        if (match && item.signedUrl) covers[match.cat] = item.signedUrl;
      }
    }
    return covers;
  },
);
