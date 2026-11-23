// These legacy example URLs have no corresponding public files or stored assets.
const unavailableMedia = new Set([
  "/images/gallery/kitchen-cabinets-1.jpg",
  "/images/gallery/terrace-front-1.jpg",
]);

export function isUnavailableGalleryMedia(url: string): boolean {
  return unavailableMedia.has(url);
}