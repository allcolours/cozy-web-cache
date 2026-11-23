import desktop from "@/assets/optimized/hero-house-1200.webp.asset.json";
import mobile from "@/assets/portfolio/hero-house-800.webp.asset.json";
import social from "@/assets/portfolio/hero-house-social.webp.asset.json";

export const HERO_IMAGE = {
  src: desktop.url,
  srcSet: `${mobile.url} 800w, ${desktop.url} 1200w`,
  sizes: "100vw",
  width: 1200,
  height: 900,
};
export const HERO_SOCIAL_URL = `https://allcolourspainter.com${social.url}`;
export const HERO_SOCIAL_META = [
  { property: "og:image", content: HERO_SOCIAL_URL },
  { name: "twitter:image", content: HERO_SOCIAL_URL },
];