// CMS content stays untouched; apply the requested corrections when serving it.
const TITLES: Record<string, string> = {
  "best-exterior-paint-ireland": "Best Exterior Paint for Irish Weather | All Colours",
  "best-paint-colours-dublin-homes-2025": "Paint Colours for Dublin Homes 2025 | All Colours",
  "colour-trends-dublin-homes-2026": "Dublin Home Colour Trends 2026 | All Colours",
  "cost-to-paint-house-dublin-2025": "House Painting Costs in Dublin 2025 | All Colours",
  "exterior-painting-dublin-when-and-how": "Exterior Painting in Dublin: When and How | All Colours",
  "how-long-to-paint-house-interior": "How Long Does Interior Painting Take? | All Colours",
  "how-to-choose-the-right-paint-finish": "Matt, Eggshell or Satin? Paint Finish Guide | All Colours",
  "how-to-prepare-walls-before-painting-dublin": "How to Prepare Walls Before Painting | All Colours",
  "how-to-repaint-your-front-door": "How to Repaint Your Front Door | All Colours",
  "painting-while-you-live-in-the-house": "Painting While You Live in the House | All Colours",
  "preparing-exterior-paintwork-irish-weather": "Why Exterior Paint Fails in Ireland | All Colours",
};

export function limitMeta(value: string, max: number) {
  if (value.length <= max) return value;
  const cut = value.slice(0, max - 1);
  return `${cut.slice(0, cut.lastIndexOf(" ") > 0 ? cut.lastIndexOf(" ") : cut.length).trimEnd()}…`;
}
export function blogMetaTitle(slug: string, title: string) {
  return TITLES[slug] ?? limitMeta(title, 60);
}
export function correctHousePaintingPrice(slug: string, text: string | null) {
  if (!text || !["cost-to-paint-house-dublin-2025", "cost-of-painting-a-house-dublin-2025"].includes(slug)) return text;
  return text.replace(/(3[-–]bed\s+semi[^.\n]{0,100}?from\s*)(€\s*|EUR\s*)1,?800/gi, "$1$22,800");
}