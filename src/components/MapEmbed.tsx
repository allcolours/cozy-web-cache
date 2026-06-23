import { useEffect, useRef, useState } from "react";

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
 */
export function MapEmbed({ title, src, className, style, autoLoadOnVisible = false }: Props) {
  const [loaded, setLoaded] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!autoLoadOnVisible || loaded) return;
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
  }, [autoLoadOnVisible, loaded]);

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
          onClick={() => setLoaded(true)}
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
