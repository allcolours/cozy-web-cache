import { useEffect, useRef, useState } from "react";
import { getConsent, setConsent } from "@/lib/consent";

type Props = {
  title: string;
  src: string;
  /** Tailwind/inline className applied to the outer container (controls size). */
  className?: string;
  style?: React.CSSProperties;
  /** Auto-load when the placeholder scrolls into view. Defaults to false (click-only). */
  autoLoadOnVisible?: boolean;
};

/**
 * Click-to-load (or scroll-into-view) Google Maps embed.
 * Keeps an empty styled container in the DOM so layout doesn't shift,
 * and only injects the <iframe> after user intent / visibility.
 * Auto-load only fires if cookie consent === "accepted"; otherwise
 * a click is required (and is treated as implicit consent for this load).
 */
export function MapEmbed({ title, src, className, style, autoLoadOnVisible = true }: Props) {
  const [loaded, setLoaded] = useState(false);
  const [consented, setConsented] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    setConsented(getConsent() === "accepted");
    const onChange = (e: Event) => {
      const detail = (e as CustomEvent).detail;
      setConsented(detail === "accepted");
    };
    window.addEventListener("cookie-consent-change", onChange);
    return () => window.removeEventListener("cookie-consent-change", onChange);
  }, []);

  useEffect(() => {
    if (!autoLoadOnVisible || loaded || !consented) return;
    const el = ref.current;
    if (!el || typeof IntersectionObserver === "undefined") return;
    const io = new IntersectionObserver(
      (entries) => {
        if (entries.some((e) => e.isIntersecting)) {
          setLoaded(true);
          io.disconnect();
        }
      },
      { rootMargin: "200px" },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [autoLoadOnVisible, loaded, consented]);

  const handleClick = () => {
    if (getConsent() !== "accepted") setConsent("accepted");
    setLoaded(true);
  };

  return (
    <div ref={ref} className={className} style={style}>
      {loaded ? (
        <iframe
          title={title}
          src={src}
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="h-full w-full"
          style={{ border: 0 }}
          allowFullScreen
        />
      ) : (
        <button
          type="button"
          onClick={handleClick}
          aria-label={`Load map: ${title}`}
          className="flex h-full w-full flex-col items-center justify-center gap-3 bg-secondary text-foreground transition-colors hover:bg-muted"
        >
          <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
          <span className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary">
            Load map
          </span>
          <span className="px-4 text-center text-xs text-muted-foreground">
            {title}
          </span>
        </button>
      )}
    </div>
  );
}
