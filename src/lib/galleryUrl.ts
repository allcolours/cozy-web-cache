import { supabase } from "@/integrations/supabase/client";

// In-memory cache so we don't re-sign the same path repeatedly during a page view.
const cache = new Map<string, { url: string; expiresAt: number }>();

/**
 * Resolve a gallery image URL.
 * - Absolute URLs (http/https) and root-relative paths (/...) are returned as-is.
 * - Anything else is treated as a Supabase Storage path in the 'gallery' bucket
 *   and returned as a signed URL valid for ~7 days.
 */
export async function resolveGalleryUrl(imageUrl: string, storagePath?: string | null): Promise<string> {
  if (/^https?:\/\//.test(imageUrl) || imageUrl.startsWith("/")) return imageUrl;
  const path = storagePath || imageUrl;
  const cached = cache.get(path);
  if (cached && cached.expiresAt > Date.now()) return cached.url;
  const { data } = await supabase.storage.from("gallery").createSignedUrl(path, 60 * 60 * 24 * 7);
  const url = data?.signedUrl ?? imageUrl;
  cache.set(path, { url, expiresAt: Date.now() + 1000 * 60 * 60 * 24 * 6 });
  return url;
}
