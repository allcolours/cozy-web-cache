export type ConsentValue = "accepted" | "declined";

const COOKIE_NAME = "cookie_consent";
const MAX_AGE_SECONDS = 60 * 60 * 24 * 180; // ~180 days

export function getConsent(): ConsentValue | null {
  if (typeof document === "undefined") return null;
  const match = document.cookie.split("; ").find((row) => row.startsWith(`${COOKIE_NAME}=`));
  if (!match) return null;
  const value = decodeURIComponent(match.split("=")[1] ?? "");
  return value === "accepted" || value === "declined" ? value : null;
}

export function setConsent(value: ConsentValue): void {
  if (typeof document === "undefined") return;
  document.cookie = `${COOKIE_NAME}=${value}; Max-Age=${MAX_AGE_SECONDS}; Path=/; SameSite=Lax`;
  if (typeof window !== "undefined") {
    window.dispatchEvent(new CustomEvent("cookie-consent-change", { detail: value }));
  }
}
