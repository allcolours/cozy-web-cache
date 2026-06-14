import { Link } from "@tanstack/react-router";
import { COMPANY } from "./SiteLayout";
import { useSiteSettings } from "../hooks/useSiteSettings";

export function FooterCTA() {
  const settings = useSiteSettings();
  const phone = settings.phone || COMPANY.phone;

  return (
    <section className="border-t border-border bg-[var(--color-surface)]">
      <div className="mx-auto flex max-w-7xl flex-col items-center gap-6 px-4 py-14 text-center md:flex-row md:justify-between md:px-8 md:text-left">
        <div>
          <h2 className="font-display text-2xl font-bold uppercase tracking-tight text-[oklch(0.2_0_0)] md:text-3xl">
            Get a free quote today
          </h2>
          <p className="mt-2 max-w-lg text-sm text-muted-foreground">
            No-obligation written quotes for interior, exterior & commercial painting across Dublin & surrounding areas. We usually reply within one working day.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className="inline-flex items-center justify-center rounded-sm bg-primary px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)]"
          >
            Request a quote
          </Link>
          <a
            href={`tel:${phone.replace(/\s/g, "")}`}
            className="inline-flex items-center justify-center rounded-sm border border-border bg-background px-8 py-3.5 font-display text-xs font-bold uppercase tracking-wider text-foreground transition-colors hover:bg-secondary"
          >
            Call {phone}
          </a>
        </div>
      </div>
    </section>
  );
}
