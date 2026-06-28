import { useEffect } from "react";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import { getConsent } from "@/lib/consent";

/**
 * Loads GA4 (gtag.js) ONLY after:
 *  - a non-empty `ga4_measurement_id` is configured in site_settings, AND
 *  - the visitor has accepted cookies (consent === "accepted").
 *
 * Re-checks on the "cookie-consent-change" event so opting in later in the
 * session still loads gtag. Never loads if consent is "declined" or unset.
 */
export function AnalyticsLoader() {
  const settings = useSiteSettings();
  const measurementId = (settings.ga4_measurement_id || "").trim();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (!measurementId) return;

    let loaded = false;

    function loadGtag() {
      if (loaded) return;
      if (typeof window === "undefined") return;
      if (getConsent() !== "accepted") return;
      if (document.getElementById("ga4-gtag-src")) {
        loaded = true;
        return;
      }
      loaded = true;
      window.dataLayer = window.dataLayer || [];
      const gtag: (...args: unknown[]) => void = function () {
        // eslint-disable-next-line prefer-rest-params
        window.dataLayer!.push(arguments);
      };
      window.gtag = gtag;
      gtag("js", new Date());
      gtag("config", measurementId, { send_page_view: true });

      const s = document.createElement("script");
      s.id = "ga4-gtag-src";
      s.async = true;
      s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(measurementId)}`;
      document.head.appendChild(s);
    }

    // Load now if already accepted
    loadGtag();

    // Or load when consent changes to accepted
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      if (detail === "accepted") loadGtag();
    };
    window.addEventListener("cookie-consent-change", onChange);
    return () => window.removeEventListener("cookie-consent-change", onChange);
  }, [measurementId]);

  return null;
}
