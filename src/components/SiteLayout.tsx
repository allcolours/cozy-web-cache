import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "../assets/logo.png";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/services", label: "Services" },
  { to: "/gallery", label: "Gallery" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
] as const;

export const COMPANY = {
  name: "All Colours Painting Contractor Limited",
  shortName: "All Colours",
  phone: "020 1234 5678",
  email: "info@allcolourspainting.co.uk",
  area: "London & surrounding areas",
};

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground">
      <header className="sticky top-0 z-50 border-b border-border bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 md:px-8">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={logo} alt={COMPANY.name} width={48} height={48} className="h-12 w-12 object-contain" />
            <span className="hidden text-base font-semibold tracking-tight text-primary sm:block">
              {COMPANY.shortName}
            </span>
          </Link>
          <nav className="hidden items-center gap-8 md:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90"
            >
              {COMPANY.phone}
            </a>
          </nav>
          <button
            className="inline-flex items-center justify-center rounded-md p-2 text-primary md:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
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
                  className="rounded-md px-3 py-2 text-sm font-medium text-muted-foreground hover:bg-secondary hover:text-primary"
                  activeProps={{ className: "bg-secondary text-primary" }}
                  activeOptions={{ exact: n.to === "/" }}
                >
                  {n.label}
                </Link>
              ))}
              <a
                href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
                className="mt-2 inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground"
              >
                Call {COMPANY.phone}
              </a>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <footer className="border-t border-border bg-primary text-primary-foreground">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 md:grid-cols-4 md:px-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img src={logo} alt="" width={56} height={56} className="h-14 w-14 object-contain brightness-0 invert" />
              <span className="text-lg font-semibold">{COMPANY.shortName}</span>
            </div>
            <p className="mt-4 max-w-md text-sm text-primary-foreground/70">
              Professional interior, exterior and commercial painting & decorating across {COMPANY.area}.
              Quality finishes, tidy workmanship, fully insured.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Explore</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
              {NAV.map((n) => (
                <li key={n.to}>
                  <Link to={n.to} className="hover:text-primary-foreground">{n.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider">Contact</h4>
            <ul className="mt-4 space-y-2 text-sm text-primary-foreground/70">
              <li><a href={`tel:${COMPANY.phone.replace(/\s/g, "")}`} className="hover:text-primary-foreground">{COMPANY.phone}</a></li>
              <li><a href={`mailto:${COMPANY.email}`} className="hover:text-primary-foreground">{COMPANY.email}</a></li>
              <li>{COMPANY.area}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-primary-foreground/10">
          <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-primary-foreground/60 md:px-8">
            © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
