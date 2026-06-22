/**
 * Manifest of real project photos that must be placed in `public/images/`
 * for the hero backgrounds on About, Services, New Build and Industrial pages.
 *
 * This script intentionally does nothing — it documents the exact filenames
 * the app code references so the real JPEGs can be uploaded into the repo
 * at these paths.
 */
export const REQUIRED_HERO_IMAGES = [
  {
    path: "public/images/01-georgian-manor-house-sage-green-exterior-dublin.jpg",
    usedBy: "src/routes/about.tsx (hero)",
    alt: "Georgian manor house exterior painting in sage green, Dublin",
  },
  {
    path: "public/images/13-georgian-door-white-portico-columns-grey-paint-gold-dublin.jpg",
    usedBy: "src/routes/services.tsx (hero)",
    alt: "Georgian door painting in grey with gold hardware, Dublin 4",
  },
  {
    path: "public/images/10-new-build-exterior-white-render-anthracite-windows-dublin.jpg",
    usedBy: "src/routes/services_.$service.tsx (slug: new-build-painting hero)",
    alt: "New build exterior painting with white render and anthracite windows, Dublin",
  },
  {
    path: "public/images/08-storage-facility-epoxy-floor-yellow-doors-low-angle-dublin.jpg",
    usedBy: "src/routes/services.tsx (Industrial & Floor Painting cards)",
    alt: "Industrial epoxy floor coating in Dublin storage facility",
  },
] as const;
