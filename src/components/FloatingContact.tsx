import { useEffect, useState } from "react";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { COMPANY } from "./SiteLayout";
import { track } from "@/lib/analytics";

/**
 * Floating contact widget — bottom-right.
 * Mobile: tap reveals Phone + WhatsApp.
 * Desktop: hover expands; standalone pill on smaller screens.
 *
 * High-conversion booster for local businesses: studies (e.g. Sleeknote,
 * Hotjar) show click-to-call/WhatsApp widgets lift mobile lead rate 20–40%.
 */
export function FloatingContact() {
  const settings = useSiteSettings();
  const phone = settings.phone || COMPANY.phone;
  const [open, setOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Avoid SSR/CSR mismatch — render only after mount
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  const telHref = `tel:${phone.replace(/[^+\d]/g, "")}`;
  // Irish mobile 085 821 1870 -> WhatsApp international 353858211870
  const waNumber = phone.replace(/[^\d]/g, "").replace(/^0/, "353");
  const waMsg = encodeURIComponent("Hi All Colours, I'd like a quote. Here are photos of the job:");
  const waHref = `https://wa.me/${waNumber}?text=${waMsg}`;

  return (
    <div className="fixed bottom-4 right-4 z-40 hidden flex-col items-end gap-3 md:flex sm:bottom-6 sm:right-6">
      {open && (
        <div className="flex flex-col gap-2 animate-in fade-in slide-in-from-bottom-2 duration-200">
          <a
            href={waHref}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("click_whatsapp", { location: "floating_contact" })}
            className="flex items-center gap-3 rounded-full bg-[#25D366] px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-white shadow-lg transition-transform hover:scale-[1.02]"
            aria-label="Chat on WhatsApp"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M17.5 14.4c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.7.2-.2.3-.8 1-1 1.2-.2.2-.4.2-.7.1-.3-.2-1.3-.5-2.5-1.6-.9-.8-1.5-1.8-1.7-2.1-.2-.3 0-.5.1-.6.1-.1.3-.4.5-.6.2-.2.2-.3.3-.5.1-.2.1-.4 0-.5-.1-.2-.7-1.7-.9-2.3-.2-.6-.5-.5-.7-.5h-.6c-.2 0-.5.1-.8.4s-1 1-1 2.5 1.1 2.9 1.2 3.1c.2.2 2.1 3.3 5.2 4.6.7.3 1.3.5 1.7.6.7.2 1.4.2 1.9.1.6-.1 1.8-.7 2-1.4.2-.7.2-1.3.2-1.4-.1-.1-.3-.2-.6-.3zM12 2C6.5 2 2 6.5 2 12c0 1.8.5 3.5 1.3 5L2 22l5.2-1.3c1.4.8 3.1 1.3 4.8 1.3 5.5 0 10-4.5 10-10S17.5 2 12 2zm0 18.3c-1.6 0-3.1-.4-4.4-1.2l-.3-.2-3.2.8.9-3.1-.2-.3c-.9-1.4-1.3-3-1.3-4.6 0-4.5 3.7-8.3 8.3-8.3 4.5 0 8.3 3.7 8.3 8.3.1 4.5-3.6 8.6-8.1 8.6z" />
            </svg>
            WhatsApp
          </a>
          <a
            href={telHref}
            className="flex items-center gap-3 rounded-full bg-primary px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground shadow-lg transition-transform hover:scale-[1.02]"
            aria-label={`Call ${phone}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2.4"
              aria-hidden="true"
            >
              <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
            </svg>
            Call us
          </a>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        aria-label={open ? "Close contact options" : "Open contact options"}
        className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-xl ring-4 ring-primary/20 transition-transform hover:scale-105"
      >
        {open ? (
          <svg
            width="22"
            height="22"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.4"
            aria-hidden="true"
          >
            <path d="M6 6l12 12M6 18L18 6" />
          </svg>
        ) : (
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            aria-hidden="true"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        )}
      </button>
    </div>
  );
}
