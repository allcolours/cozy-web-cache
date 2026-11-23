import { optimizedImages } from "./optimized-images";

/** Resolve immutable gallery/CDN URLs without changing stored album records. */
export function imageRenditions(src: string) {
  let path = src.split("?")[0] ?? src;
  try {
    path = new URL(src, "https://allcolourspainter.com").pathname;
  } catch {
    /* Keep relative storage paths. */
  }
  const renditions =
    optimizedImages[path] ??
    Object.entries(optimizedImages).find(
      ([original]) => original.split("/").pop() === path.split("/").pop(),
    )?.[1];
  const full = renditions?.["1200"];
  if (!full) return { src, width: 1200, height: 900 };
  const variants = new Map<number, string>();
  for (const size of ["640", "800", "1200"]) {
    const variant = renditions?.[size];
    if (variant) variants.set(variant.width, variant.url);
  }
  return {
    src: full.url,
    srcSet: Array.from(variants, ([width, url]) => `${url} ${width}w`).join(", "),
    width: full.width,
    height: full.height,
  };
}
