import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "../assets/logo.png";
import { useSiteSettings } from "../hooks/useSiteSettings";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/contact", label: "Contact" },
] as const;

// Static brand info (not editable from admin)
export const COMPANY = {
  name: "All Colours Painting Contractor Limited",
  shortName: "All Colours Painting",
  phone: "085 821 1870",
  email: "info@painterdublin.eu",
  area: "Dublin & surrounding areas",
  hours: "Mon–Sat · 8:00 – 18:00",
  tagline: "Painting & decorating, done properly.",
};

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const settings = useSiteSettings();
  const phone = settings.phone || COMPANY.phone;
  const email = settings.email || COMPANY.email;
  const area = settings.area || COMPANY.area;
  const hours = settings.hours || COMPANY.hours;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      {/* Top contact bar */}
      <div className="hidden bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)] md:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs md:px-8">
          <div className="flex items-center gap-6">
            <a href={`tel:${phone.replace(/\s/g, "")}`} className="flex items-center gap-2 text-white/80 hover:text-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>
              {phone}
            </a>
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-white/80 hover:text-primary">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>
              {email}
            </a>
          </div>
          <div className="text-white/60">{hours}</div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 md:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logo} alt={COMPANY.name} width={56} height={56} className="h-14 w-14 object-contain" />
            <span className="hidden font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)] sm:block">
              {COMPANY.shortName}
            </span>
          </Link>

          <nav className="hidden items-center gap-7 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="font-display text-[13px] font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)] transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/contact"
              className="ml-2 inline-flex items-center rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)]"
            >
              Get a Quote
            </Link>
          </nav>

          <button
            className="inline-flex items-center justify-center rounded-sm p-2 text-[oklch(0.2_0_0)] md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="border-t border-border md:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {NAV.map((n) => (
                <Link
                  key={n.to}
                  to={n.to}
                  onClick={() => setOpen(false)}
                  className="rounded-sm px-3 py-2 font-display text-sm font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)] hover:bg-secondary hover:text-primary"
                  activeProps={{ className: "bg-secondary text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={`tel:${phone.replace(/\s/g, "")}`}
                className="mt-3 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground"
              >
                Call {phone}
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      {/* Footer */}
      <footer className="bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-4 md:px-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" width={64} height={64} className="h-16 w-16 object-contain" />
              <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
                {COMPANY.shortName}
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/65">
              Professional interior, exterior and commercial painting & decorating across {area}.
              Quality finishes, tidy workmanship, fully insured — backed by a written workmanship guarantee.
            </p>
            <div className="mt-5 h-[3px] w-16 bg-primary" />
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Explore</h4>
            <div className="mt-3 h-[2px] w-10 bg-primary" />
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-primary">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-display text-sm font-bold uppercase tracking-wider text-white">Contact</h4>
            <div className="mt-3 h-[2px] w-10 bg-primary" />
            <ul className="mt-4 space-y-2 text-sm text-white/65">
              <li><a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary">{phone}</a></li>
              <li><a href={`mailto:${email}`} className="hover:text-primary">{email}</a></li>
              <li>{area}</li>
              <li>{hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 py-5 text-xs text-white/45 md:flex-row md:px-8">
            <div>© {new Date().getFullYear()} {COMPANY.name}. All rights reserved.</div>
            <div>Fully insured · Workmanship guaranteed</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
