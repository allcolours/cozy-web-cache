import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { FormBotTraps, readBotTraps } from "../components/FormBotTraps";
import {
  FormSuccess,
  Spinner,
  TrustMicrocopy,
  focusFirstError,
  validateContact,
  type FieldErrors,
} from "../components/form-helpers";
import commercialAsset from "../assets/portfolio/service-commercial.webp.asset.json";
import { SITE } from "@/lib/site";
import { track } from "@/lib/analytics";

export const Route = createFileRoute("/commercial-painting-dublin")({
  head: () => ({
    meta: [
      { title: "Commercial Painting Dublin | Painting Contractor & Subcontractor" },
      {
        name: "description",
        content:
          "Dublin commercial painting contractor. 15–30 painters, out-of-hours scheduling, RCT compliant, fully insured. Painting works delivered on developments including projects for Cairn, Bennett, Elliott and Clancy.",
      },
      {
        name: "keywords",
        content:
          "commercial painting Dublin, painting contractor Dublin, painting subcontractor Dublin",
      },
      { property: "og:title", content: "Commercial Painting Dublin | All Colours Painting" },
      {
        property: "og:description",
        content:
          "B2B painting partner for property & facilities managers, REITs and main contractors across Dublin.",
      },
      { property: "og:url", content: "https://allcolourspainter.com/commercial-painting-dublin" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${commercialAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${commercialAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/commercial-painting-dublin" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Commercial Painting Contractor",
          provider: { "@id": "https://allcolourspainter.com/#business" },
          areaServed: { "@type": "AdministrativeArea", name: "County Dublin, Ireland" },
          description:
            "Commercial painting packages for main contractors, developers, property managers and facilities teams across Dublin.",
          url: "https://allcolourspainter.com/commercial-painting-dublin",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://allcolourspainter.com/",
            },
            {
              "@type": "ListItem",
              position: 2,
              name: "Commercial Painting Dublin",
              item: "https://allcolourspainter.com/commercial-painting-dublin",
            },
          ],
        }),
      },
    ],
  }),
  component: CommercialPage,
});

const STATS = [
  { value: "15–30", label: "Painters mobilised to programme" },
  { value: "24/7", label: "Out-of-hours scheduling" },
  { value: "✓", label: "Fully insured" },
  { value: "RCT", label: "Compliant subcontractor" },
];

const CLIENTS = [
  {
    title: "Property Management Companies",
    body: "Block management, common areas, hallways and external repaints across Dublin portfolios.",
  },
  {
    title: "Facilities Management",
    body: "Planned and reactive redecoration for offices, schools, healthcare and retail estates.",
  },
  {
    title: "Landlords & REITs",
    body: "Turnaround painting between tenancies, full apartment block exteriors and communal areas.",
  },
  {
    title: "Main Contractors",
    body: "Painting works delivered on Dublin developments — including projects for Cairn Homes, Bennett, Elliott and Clancy.",
  },
];

const SERVICES = [
  "Office repaints",
  "Retail fit-outs",
  "Apartment block painting",
  "Industrial floors & epoxy",
  "Out-of-hours scheduling",
  "RAMS & Safety Statement available",
];

const WHY = [
  {
    title: "Labour supply",
    body: "Scale crews of 15–30 painters on site to hit tight programme dates.",
  },
  {
    title: "Programme delivery",
    body: "On-time handover, sectional completion, snag-list closed out fast.",
  },
  {
    title: "Compliance",
    body: "RCT registered, fully insured, Safe Pass, manual handling, RAMS on request.",
  },
  {
    title: "Communication",
    body: "Dedicated WhatsApp groups, daily progress reports, photos from site.",
  },
];

function CommercialPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  function readValues(form: HTMLFormElement) {
    const fd = new FormData(form);
    return {
      company: String(fd.get("company") || "").trim(),
      contact_name: String(fd.get("contact_name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      work_type: String(fd.get("work_type") || "").trim(),
      timeline: String(fd.get("timeline") || "").trim(),
      details: String(fd.get("details") || "").trim(),
    };
  }

  function validateAll(form: HTMLFormElement): FieldErrors {
    const v = readValues(form);
    const errs = validateContact({
      name: v.contact_name,
      email: v.email,
      phone: v.phone,
      message: v.details,
      requireEmail: true,
      nameLabel: "contact name",
      messageField: "details",
    });
    // Map name error onto the actual field key.
    if (errs.name) {
      errs.contact_name = errs.name;
      delete errs.name;
    }
    if (!v.company) errs.company = "Please enter your company name.";
    if (!v.work_type) errs.work_type = "Please choose the type of work.";
    return errs;
  }

  function handleBlur(name: string) {
    return () => {
      if (!formRef.current) return;
      const all = validateAll(formRef.current);
      setErrors((prev) => ({ ...prev, [name]: all[name] }));
    };
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formEl = e.currentTarget;
    const fieldErrors = validateAll(formEl);
    setErrors(fieldErrors);
    if (Object.values(fieldErrors).some(Boolean)) {
      focusFirstError(formEl, fieldErrors);
      return;
    }
    setSubmitting(true);
    setError(null);
    const v = readValues(formEl);
    const traps = readBotTraps(new FormData(formEl));
    const payload = {
      name: v.contact_name.slice(0, 100),
      email: v.email.slice(0, 255),
      phone: v.phone.slice(0, 50) || null,
      postcode: null,
      message: [
        `Company: ${v.company.slice(0, 150)}`,
        `Type of work: ${v.work_type}`,
        `Project timeline: ${v.timeline.slice(0, 200)}`,
        `Details: ${v.details.slice(0, 2000)}`,
      ].join("\n"),
    };
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "commercial_form",
          service_type: "commercial",
          ...traps,
        }),
      });
      if (!res.ok) {
        setError(
          `Sorry, we couldn't send that. Please try again or call us on ${SITE.phoneDisplay}.`,
        );
        setSubmitting(false);
        return;
      }
    } catch {
      setError(
        `Sorry, we couldn't send that. Please try again or call us on ${SITE.phoneDisplay}.`,
      );
      setSubmitting(false);
      return;
    }
    setSent(true);
    setSubmitting(false);
    track("generate_lead", { form: "commercial" });
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={commercialAsset.url}
          alt="Commercial painting crew working on a Dublin office block"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.18_0_0)]/80" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">B2B · Commercial</span>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            Dublin's Trusted Commercial Painting Partner
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            A scalable painting workforce for property managers, facilities teams and main
            contractors — delivered on programme, fully compliant, with clear daily communication
            from site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#commercial-quote"
              className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
            >
              Get a commercial quote
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              onClick={() => track("click_to_call", { location: "commercial_hero" })}
              className="inline-flex items-center rounded-sm border border-white/30 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary"
            >
              Call {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-3xl font-extrabold text-primary md:text-4xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[oklch(0.35_0_0)]">
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Who we work with */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <span className="eyebrow text-primary">Who we work with</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Trusted by Dublin's property & construction sector
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {CLIENTS.map((c) => (
            <div key={c.title} className="rounded-sm border border-border bg-background p-6">
              <h3 className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                {c.title}
              </h3>
              <div className="mt-3 h-[2px] w-10 bg-primary" />
              <p className="mt-4 text-sm leading-relaxed text-[oklch(0.35_0_0)]">{c.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Services */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <span className="eyebrow text-primary">Commercial services</span>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Built around the way commercial sites actually run
          </h2>
          <ul className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => (
              <li
                key={s}
                className="flex items-start gap-3 rounded-sm border border-border bg-background p-5"
              >
                <svg
                  className="mt-0.5 h-5 w-5 shrink-0 text-primary"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="font-display text-sm font-semibold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  {s}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Why contractors choose us */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <span className="eyebrow text-primary">Why contractors choose us</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          A subcontractor your site team can rely on
        </h2>
        <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {WHY.map((w, i) => (
            <div
              key={w.title}
              className="relative rounded-sm border border-border bg-background p-6"
            >
              <div className="font-display text-4xl font-extrabold text-primary/20">
                {String(i + 1).padStart(2, "0")}
              </div>
              <h3 className="mt-2 font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                {w.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-[oklch(0.35_0_0)]">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section
        id="commercial-quote"
        className="bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)]"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
          <div>
            <span className="eyebrow text-accent">Get a commercial quote</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
              Tell us about your project
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              Send us the basics and we'll come back within one working day with availability,
              programme fit and a budget guide. For tenders, we can return RAMS, insurance certs and
              tax clearance on request.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/80">
              <div>
                📞{" "}
                <a
                  href={`tel:${SITE.phoneTel}`}
                  onClick={() => track("click_to_call", { location: "commercial_contact_block" })}
                  className="hover:text-primary"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div>
                ✉️{" "}
                <a href={`mailto:${SITE.email}`} className="hover:text-primary">
                  {SITE.email}
                </a>
              </div>
              <div>🕒 Mon–Sat · 8:00 – 18:00 (out-of-hours by arrangement)</div>
            </div>
          </div>

          <div className="rounded-sm bg-background p-6 text-foreground md:p-8">
            {sent ? (
              <FormSuccess />
            ) : (
              <form ref={formRef} noValidate onSubmit={handleSubmit} className="grid gap-4">
                <FormBotTraps />
                <div className="grid gap-4 md:grid-cols-2">
                  <Field
                    label="Company name"
                    name="company"
                    required
                    error={errors.company}
                    onBlur={handleBlur("company")}
                  />
                  <Field
                    label="Contact name"
                    name="contact_name"
                    required
                    error={errors.contact_name}
                    onBlur={handleBlur("contact_name")}
                  />
                  <Field
                    label="Phone"
                    name="phone"
                    type="tel"
                    error={errors.phone}
                    onBlur={handleBlur("phone")}
                  />
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    required
                    error={errors.email}
                    onBlur={handleBlur("email")}
                  />
                </div>
                <div>
                  <label
                    htmlFor="work_type"
                    className="block font-display text-xs font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)]"
                  >
                    Type of work<span className="text-primary"> *</span>
                  </label>
                  <select
                    id="work_type"
                    name="work_type"
                    defaultValue=""
                    aria-required="true"
                    aria-invalid={errors.work_type ? true : undefined}
                    aria-describedby={errors.work_type ? "work_type-err" : undefined}
                    onBlur={handleBlur("work_type")}
                    className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
                  >
                    <option value="" disabled>
                      Select…
                    </option>
                    <option>Office repaint</option>
                    <option>Apartment block</option>
                    <option>Retail fit-out</option>
                    <option>Industrial / Floors</option>
                    <option>Other</option>
                  </select>
                  {errors.work_type && (
                    <p id="work_type-err" className="mt-1 text-xs text-destructive">
                      {errors.work_type}
                    </p>
                  )}
                </div>
                <Field
                  label="Project timeline"
                  name="timeline"
                  placeholder="e.g. Start in 4 weeks, 3-week programme"
                />
                <div>
                  <label
                    htmlFor="details"
                    className="block font-display text-xs font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)]"
                  >
                    Additional details<span className="text-primary"> *</span>
                  </label>
                  <textarea
                    id="details"
                    name="details"
                    rows={4}
                    aria-required="true"
                    aria-invalid={errors.details ? true : undefined}
                    aria-describedby={errors.details ? "details-err" : undefined}
                    onBlur={handleBlur("details")}
                    className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
                    placeholder="Location, scope, access, anything we should know."
                  />
                  {errors.details && (
                    <p id="details-err" className="mt-1 text-xs text-destructive">
                      {errors.details}
                    </p>
                  )}
                </div>
                {error && (
                  <p role="alert" className="text-sm text-red-600">
                    {error}
                  </p>
                )}
                <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                  <button
                    type="submit"
                    disabled={submitting}
                    className="inline-flex items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)] disabled:opacity-60"
                  >
                    {submitting && <Spinner />}
                    {submitting ? "Sending…" : "Get a commercial quote"}
                  </button>
                  <TrustMicrocopy />
                </div>
                <p className="text-xs text-[oklch(0.5_0_0)]">
                  By submitting, you agree to our{" "}
                  <Link to="/privacy" className="underline hover:text-primary">
                    privacy policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
  placeholder,
  error,
  onBlur,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
  error?: string;
  onBlur?: () => void;
}) {
  const errId = `${name}-err`;
  return (
    <div>
      <label
        htmlFor={name}
        className="block font-display text-xs font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)]"
      >
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        placeholder={placeholder}
        aria-required={required || undefined}
        aria-invalid={error ? true : undefined}
        aria-describedby={error ? errId : undefined}
        onBlur={onBlur}
        className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
      />
      {error && (
        <p id={errId} className="mt-1 text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  );
}
