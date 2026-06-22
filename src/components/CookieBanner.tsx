import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";

const STORAGE_KEY = "acp-cookie-consent";

export function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    try {
      if (!localStorage.getItem(STORAGE_KEY)) setVisible(true);
    } catch {
      // ignore (SSR / privacy mode)
    }
  }, []);

  if (!visible) return null;

  const accept = () => {
    try {
      localStorage.setItem(STORAGE_KEY, "accepted");
    } catch {
      // ignore
    }
    setVisible(false);
  };

  return (
    <div
      role="dialog"
      aria-live="polite"
      aria-label="Cookie consent"
      className="fixed inset-x-0 bottom-16 z-[60] border-t border-border bg-[var(--color-surface-dark)] text-white shadow-lg md:bottom-0"
    >
      <div className="mx-auto flex max-w-7xl flex-col items-start gap-3 px-4 py-4 md:flex-row md:items-center md:justify-between md:gap-6 md:px-8">
        <p className="text-sm leading-relaxed text-white/85">
          We use cookies to improve your experience. By continuing you accept our use of cookies.
        </p>
        <div className="flex shrink-0 gap-2">
          <Link
            to="/faq"
            className="inline-flex items-center rounded-sm border border-white/30 px-4 py-2 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary"
          >
            Learn more
          </Link>
          <button
            type="button"
            onClick={accept}
            className="inline-flex items-center rounded-sm bg-primary px-5 py-2 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
