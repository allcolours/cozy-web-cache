import { createServerFn } from "@tanstack/react-start";

export type GalleryItem = {
  id: string;
  title: string;
  tag: string | null;
  image_url: string;
  sort_order: number;
};

// Public list — returns rows with signed URLs (private bucket)
export const listPublicGallery = createServerFn({ method: "GET" }).handler(async () => {
  const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
  const { data, error } = await supabaseAdmin
    .from("gallery_images")
    .select("id, title, tag, image_url, sort_order")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: false });
  if (error) throw error;
  const items: GalleryItem[] = [];
  for (const row of data ?? []) {
    let url = row.image_url;
    // If it's a storage path (no http), sign it.
    if (!/^https?:\/\//.test(url)) {
      const { data: signed } = await supabaseAdmin.storage
        .from("gallery")
        .createSignedUrl(url, 60 * 60 * 24 * 7);
      url = signed?.signedUrl ?? url;
    }
    items.push({ ...row, image_url: url });
  }
  return items;
});
