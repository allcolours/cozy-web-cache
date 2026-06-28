// Lightweight analytics helper. SSR-safe.
// `track()` is a no-op until gtag is loaded (which only happens after consent).

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export function track(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window === "undefined") return;
  const gtag = window.gtag;
  if (typeof gtag !== "function") return;
  try {
    gtag("event", eventName, params || {});
  } catch {
    // never throw from analytics
  }
}
