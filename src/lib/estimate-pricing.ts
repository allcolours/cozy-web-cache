export type WorkType = "interior" | "exterior" | "interior-exterior" | "commercial";

export function calculateEstimate(type: WorkType, area: number, extras: number) {
  if (type !== "interior") return null;
  const base = area * 38;
  const total = base + extras;
  return {
    base,
    total,
    low: Math.round((total * 0.75) / 50) * 50,
    high: Math.round((total * 1.3) / 50) * 50,
  };
}