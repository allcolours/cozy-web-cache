import { useState } from "react";
import type { Faq } from "../data/faqs";

export function FaqAccordion({ items }: { items: Faq[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="divide-y divide-border border-y border-border bg-card">
      {items.map((f, i) => {
        const isOpen = open === i;
        return (
          <div key={f.q}>
            <button
              type="button"
              onClick={() => setOpen(isOpen ? null : i)}
              className="flex w-full items-center justify-between gap-6 px-5 py-5 text-left md:px-8 md:py-6"
              aria-expanded={isOpen}
            >
              <span className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] md:text-lg">
                {f.q}
              </span>
              <span
                aria-hidden
                className={`inline-flex h-8 w-8 flex-shrink-0 items-center justify-center border border-primary text-primary transition-transform ${isOpen ? "rotate-45" : ""}`}
              >
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                  <path d="M12 5v14M5 12h14" />
                </svg>
              </span>
            </button>
            {isOpen && (
              <div className="px-5 pb-6 text-sm leading-relaxed text-foreground md:px-8 md:pb-8 md:text-base">
                <div className="mb-2 inline-block bg-secondary px-2 py-0.5 text-[10px] uppercase tracking-[0.14em] text-primary">
                  {f.category}
                </div>
                <p>{f.a}</p>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
