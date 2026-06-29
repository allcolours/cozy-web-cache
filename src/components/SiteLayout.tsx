import { Link } from "@tanstack/react-router";
import { useState, type ReactNode } from "react";
import logo from "../assets/logo.webp";
import { useSiteSettings } from "../hooks/useSiteSettings";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { CookieBanner } from "./CookieBanner";
import { FloatingContact } from "./FloatingContact";
import { FooterCTA } from "./FooterCTA";
import { MobileBottomBar } from "./MobileBottomBar";
import { WhatsAppButton } from "./WhatsAppButton";


const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/estimate", label: "Get Estimate" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Our Work (Gallery)" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/contact", label: "Contact" },
] as const;

const DESKTOP_NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Our Work (Gallery)" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
] as const;

const MORE_NAV = [
  { to: "/painter-dublin", label: "Painter Dublin" },
  { to: "/commercial-painting-dublin", label: "Commercial" },
  { to: "/projects", label: "Projects" },
  { to: "/estimate", label: "Get Estimate" },
  { to: "/contact", label: "Contact" },
] as const;

const MOBILE_NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/services", label: "Services" },
  { to: "/projects", label: "Projects" },
  { to: "/gallery", label: "Our Work (Gallery)" },
  { to: "/blog", label: "Blog" },
  { to: "/faq", label: "FAQ" },
  { to: "/commercial-painting-dublin", label: "Commercial" },
  { to: "/painter-dublin", label: "Painter Dublin" },
  { to: "/estimate", label: "Get Estimate" },
  { to: "/contact", label: "Contact" },
] as const;

// Static brand info (not editable from admin). Sourced from src/lib/site.ts.
import { SITE } from "@/lib/site";
export const COMPANY = {
  name: SITE.name,
  shortName: SITE.shortName,
  phone: SITE.phoneDisplay,
  email: SITE.email,
  area: SITE.area,
  hours: SITE.hours,
  tagline: SITE.tagline,
};

export function SiteLayout({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const settings = useSiteSettings();
  const phone = settings.phone || COMPANY.phone;
  const email = settings.email || COMPANY.email;
  const area = settings.area || COMPANY.area;
  const hours = settings.hours || COMPANY.hours;

  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground pb-16 md:pb-0">
      {/* Top contact bar */}
      <div className="hidden bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)] lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-2 text-xs md:px-8">
          <div className="flex items-center gap-6">
            <a
              href={`tel:${phone.replace(/\s/g, "")}`}
              className="flex items-center gap-2 text-white/80 hover:text-primary"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
              </svg>
              {phone}
            </a>
            <a
              href={`mailto:${email}`}
              className="flex items-center gap-2 text-white/80 hover:text-primary"
            >
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="M3 7l9 6 9-6" />
              </svg>
              {email}
            </a>
          </div>
          <div className="text-white/80">{hours}</div>
        </div>
      </div>

      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/85">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 md:px-8">
          <Link to="/" className="flex shrink-0 items-center gap-3" onClick={() => setOpen(false)}>
            <img
              src={logo}
              alt={COMPANY.name}
              width={56}
              height={56}
              loading="eager"
              className="h-12 w-12 shrink-0 object-contain sm:h-14 sm:w-14"
            />
            <span className="hidden whitespace-nowrap font-display text-sm font-bold uppercase tracking-wide text-[oklch(0.25_0_0)] sm:block">
              {COMPANY.shortName}
            </span>
          </Link>

          <nav className="hidden items-center gap-3 lg:flex xl:gap-4">
            {DESKTOP_NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="whitespace-nowrap font-display text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)] transition-colors hover:text-primary xl:text-[12px]"
                activeProps={{ className: "text-primary" }}
                activeOptions={{ exact: n.to === "/" }}
              >
                {n.label}
              </Link>
            ))}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-1 whitespace-nowrap font-display text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)] transition-colors hover:text-primary xl:text-[12px] [&[data-state=open]>span]:rotate-180">
                  More <span className="transition-transform">▾</span>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="min-w-[180px] p-1">
                {MORE_NAV.map((n) => (
                  <DropdownMenuItem key={n.to} asChild>
                    <Link
                      to={n.to}
                      className="block cursor-pointer px-4 py-2 font-display text-[11px] font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)] hover:bg-secondary hover:text-primary focus:bg-secondary focus:text-primary"
                    >
                      {n.label}
                    </Link>
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
            <Link
              to="/contact"
              className="ml-2 inline-flex items-center whitespace-nowrap rounded-sm bg-primary px-5 py-2.5 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)]"
            >
              Get a Quote
            </Link>
          </nav>

          <button
            className="inline-flex shrink-0 items-center justify-center rounded-sm p-2 text-[oklch(0.2_0_0)] lg:hidden"
            onClick={() => setOpen((v) => !v)}
            aria-label="Toggle menu"
          >
            <svg
              width="26"
              height="26"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              {open ? <path d="M6 6l12 12M6 18L18 6" /> : <path d="M3 6h18M3 12h18M3 18h18" />}
            </svg>
          </button>
        </div>

        {open && (
          <div className="max-h-[calc(100vh-4rem)] overflow-y-auto scroll-smooth border-t border-border lg:hidden">
            <nav className="mx-auto flex max-w-7xl flex-col gap-1 px-4 py-4">
              {MOBILE_NAV.map((n) => (
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
              <Link
                to="/contact"
                onClick={() => setOpen(false)}
                className="mt-3 inline-flex items-center justify-center rounded-sm bg-primary px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground"
              >
                Get a Quote
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">{children}</main>

      <FooterCTA />

      {/* Footer */}
      <footer className="bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)]">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 md:grid-cols-6 md:px-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-3">
              <img
                src={logo}
                alt={`${COMPANY.shortName} logo`}
                width={64}
                height={64}
                loading="lazy"
                className="h-16 w-16 object-contain"
              />
              <span className="font-display text-lg font-bold uppercase tracking-wide text-white">
                {COMPANY.shortName}
              </span>
            </div>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/80">
              Professional interior, exterior and commercial painting & decorating across {area}.
              Quality finishes, tidy workmanship, fully insured — backed by a 12-month written
              workmanship guarantee.
            </p>
            <div className="mt-5 h-[3px] w-16 bg-primary" />
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Explore
            </h3>
            <div className="mt-3 h-[2px] w-10 bg-primary" />
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <Link to="/" className="hover:text-primary">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary">
                  About
                </Link>
              </li>
              <li>
                <Link to="/services" className="hover:text-primary">
                  Services
                </Link>
              </li>
              <li>
                <Link to="/blog" className="hover:text-primary">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/faq" className="hover:text-primary">
                  FAQ
                </Link>
              </li>
              <li>
                <Link to="/projects" className="hover:text-primary">
                  Projects
                </Link>
              </li>
              <li>
                <Link to="/pricing-guide" className="hover:text-primary">
                  Pricing Guide
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Areas We Cover
            </h3>
            <div className="mt-3 h-[2px] w-10 bg-primary" />
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <Link to="/painter-ballsbridge" className="hover:text-primary">
                  Painter Ballsbridge
                </Link>
              </li>
              <li>
                <Link to="/painter-ranelagh" className="hover:text-primary">
                  Painter Ranelagh
                </Link>
              </li>
              <li>
                <Link to="/painter-rathmines" className="hover:text-primary">
                  Painter Rathmines
                </Link>
              </li>
              <li>
                <Link to="/painter-donnybrook" className="hover:text-primary">
                  Painter Donnybrook
                </Link>
              </li>
              <li>
                <Link to="/painter-clontarf" className="hover:text-primary">
                  Painter Clontarf
                </Link>
              </li>
              <li>
                <Link to="/painter-blackrock" className="hover:text-primary">
                  Painter Blackrock
                </Link>
              </li>
              <li>
                <Link to="/painter-dun-laoghaire" className="hover:text-primary">
                  Painter Dún Laoghaire
                </Link>
              </li>
              <li>
                <Link to="/painter-dalkey" className="hover:text-primary">
                  Painter Dalkey
                </Link>
              </li>
              <li>
                <Link to="/painter-foxrock" className="hover:text-primary">
                  Painter Foxrock
                </Link>
              </li>
              <li>
                <Link to="/painter-stillorgan" className="hover:text-primary">
                  Painter Stillorgan
                </Link>
              </li>
              <li>
                <Link to="/painter-sandyford" className="hover:text-primary">
                  Painter Sandyford
                </Link>
              </li>
              <li>
                <Link to="/painter-dundrum" className="hover:text-primary">
                  Painter Dundrum
                </Link>
              </li>
              <li>
                <Link to="/painter-rathfarnham" className="hover:text-primary">
                  Painter Rathfarnham
                </Link>
              </li>
              <li>
                <Link to="/painter-malahide" className="hover:text-primary">
                  Painter Malahide
                </Link>
              </li>
              <li>
                <Link to="/painter-clondalkin" className="hover:text-primary">
                  Painter Clondalkin
                </Link>
              </li>
              <li>
                <Link to="/painter-castleknock" className="hover:text-primary">
                  Painter Castleknock
                </Link>
              </li>
              <li>
                <Link to="/painter-sandymount" className="hover:text-primary">
                  Painter Sandymount
                </Link>
              </li>
              <li>
                <Link to="/painter-bray" className="hover:text-primary">
                  Painter Bray
                </Link>
              </li>
              <li>
                <Link to="/painter-maynooth" className="hover:text-primary">
                  Painter Maynooth
                </Link>
              </li>
              <li>
                <Link to="/painters" className="hover:text-primary font-medium">
                  View all areas →
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Commercial
            </h3>
            <div className="mt-3 h-[2px] w-10 bg-primary" />
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <Link to="/commercial-contractors" className="hover:text-primary">
                  Commercial Contractors
                </Link>
              </li>
              <li>
                <Link to="/commercial-painting-dublin" className="hover:text-primary">
                  Commercial Painting Dublin
                </Link>
              </li>
              <li>
                <Link to="/estimate" className="hover:text-primary">
                  Get Estimate
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-primary">
                  Request a Tender
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-white">
              Contact
            </h3>
            <div className="mt-3 h-[2px] w-10 bg-primary" />
            <ul className="mt-4 space-y-2 text-sm text-white/80">
              <li>
                <a href={`tel:${phone.replace(/\s/g, "")}`} className="hover:text-primary">
                  {phone}
                </a>
              </li>
              <li>
                <a href={`mailto:${email}`} className="hover:text-primary">
                  {email}
                </a>
              </li>
              <li>{area}</li>
              <li>{hours}</li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto max-w-7xl px-4 py-5 text-xs text-white/60 md:px-8">
            <div className="space-y-1 leading-relaxed">
              <div>
                {SITE.name} · Registered in Ireland No. {SITE.cro} · VAT {SITE.vat}
              </div>
              <div>Registered office: {SITE.registeredAddress}</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-3 px-4 py-5 text-xs text-white/75 md:flex-row md:px-8">
            <div>
              © {new Date().getFullYear()} {COMPANY.name}. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <Link to="/privacy" className="hover:text-primary">
                Privacy
              </Link>
              <Link to="/terms" className="hover:text-primary">
                Terms
              </Link>
              <span className="text-white/30">·</span>
              <span>Fully insured · Workmanship guaranteed</span>
            </div>
          </div>
        </div>
      </footer>

      <FloatingContact />
      <WhatsAppButton />
      <MobileBottomBar />
      <CookieBanner />
    </div>
  );
}
