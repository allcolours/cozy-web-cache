import { useEffect } from "react";

// Tracks media (img/source/video) load failures and reports each unique URL once per session.
const reported = new Set<string>();

function shouldTrack(url: string): boolean {
  if (!url) return false;
  if (url.startsWith("data:") || url.startsWith("blob:")) return false;
  return true;
}

async function report(url: string, status?: number) {
  if (reported.has(url)) return;
  reported.add(url);
  try {
    await fetch("/api/public/log-asset-error", {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        asset_url: url.slice(0, 2048),
        page_url: window.location.href.slice(0, 2048),
        user_agent: navigator.userAgent.slice(0, 500),
        status: status ?? null,
        referrer: document.referrer ? document.referrer.slice(0, 2048) : null,
      }),
      keepalive: true,
    });
  } catch {
    // swallow — monitoring must not break the app
  }
}

async function probeStatus(url: string): Promise<number | undefined> {
  try {
    const res = await fetch(url, { method: "HEAD" });
    return res.status;
  } catch {
    return undefined;
  }
}

export function AssetErrorMonitor() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    const handler = (event: Event) => {
      const target = event.target as HTMLElement | null;
      if (!target) return;
      let src = "";
      if (target instanceof HTMLImageElement) src = target.currentSrc || target.src;
      else if (target instanceof HTMLSourceElement) src = target.src;
      else if (target instanceof HTMLVideoElement) src = target.currentSrc || target.src;
      else if (target instanceof HTMLLinkElement) src = target.href;
      else if (target instanceof HTMLScriptElement) src = target.src;
      else return;

      if (!shouldTrack(src)) return;

      // Probe to get HTTP status; if it loads (cached, transient), skip logging.
      void probeStatus(src).then((status) => {
        if (status && status >= 200 && status < 400) return;
        void report(src, status);
      });
    };

    // Use capture so we catch error events that don't bubble.
    window.addEventListener("error", handler, true);
    return () => window.removeEventListener("error", handler, true);
  }, []);

  return null;
}
