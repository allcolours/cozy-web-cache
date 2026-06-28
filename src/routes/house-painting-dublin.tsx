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
import { FaqAccordion } from "../components/FaqAccordion";
import { Testimonials } from "../components/Testimonials";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import { SITE, WHATSAPP_URL } from "@/lib/site";
import { track } from "@/lib/analytics";
import { AREAS } from "../data/areas";

const META_DESCRIPTION =
  "Clean, on-time, fully insured house painters in Dublin — interiors & exteriors. Free written quote within 48 hours. Crews of 15–30, 10+ years hands-on across Dublin.";

export const Route = createFileRoute("/house-painting-dublin")({
  head: () => ({
    meta: [
      { title: "House Painters Dublin | Interiors & Exteriors | Free 48hr Quote" },
      { name: "description", content: META_DESCRIPTION },
      {
        name: "keywords",
        content:
          "house painters Dublin, interior painters Dublin, exterior painters Dublin, residential painting Dublin",
      },
      { property: "og:title", content: "House Painters Dublin | Interiors & Exteriors" },
      { property: "og:description", content: META_DESCRIPTION },
      { property: "og:url", content: "https://allcolourspainter.com/house-painting-dublin" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
    ],
    links: [
      { rel: "canonical", href: "https://allcolourspainter.com/house-painting-dublin" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: "Residential House Painting",
          provider: { "@id": "https://allcolourspainter.com/#business" },
          areaServed: { "@type": "AdministrativeArea", name: "County Dublin, Ireland" },
          description:
            "Residential interior and exterior house painting across Dublin. Free written quote within 48 hours, fully insured, registered Irish company.",
          url: "https://allcolourspainter.com/house-painting-dublin",
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Home", item: "https://allcolourspainter.com/" },
            {
              "@type": "ListItem",
              position: 2,
              name: "House Painters Dublin",
              item: "https://allcolourspainter.com/house-painting-dublin",
            },
          ],
        }),
      },
    ],
  }),
  component: HousePaintingPage,
});

const PRICES = [
  { label: "Single room", price: "from €450", note: "walls, ceiling, woodwork" },
  { label: "1-bed apartment", price: "from €1,500", note: "full interior" },
  { label: "2-bed apartment", price: "from €2,300", note: "full interior" },
  { label: "3-bed house interior", price: "from €3,500", note: "incl. hall, stairs, landing" },
  { label: "House exterior", price: "from €2,700", note: "walls, fascia, sills" },
  { label: "Kitchen respray", price: "from €1,200", note: "cabinets refreshed" },
];

const WHY = [
  {
    title: "Free written quote in 48 hours",
    body: "Fixed price, no surprises.",
  },
  {
    title: "Clean & tidy",
    body: "Floors covered, furniture protected, site spotless daily.",
  },
  {
    title: "Fully insured, registered Irish company",
    body: "CRO 810243, VAT registered.",
  },
  {
    title: "One foreman, one point of contact",
    body: "You always know who's in your home.",
  },
];

const STEPS = [
  "Call or send the form",
  "Free survey & written quote in 48h",
  "Agree date, colours, price",
  "We paint, clean up, you check every room",
];

const FAQS = [
  {
    category: "Pricing" as const,
    q: "How much to paint a 3-bed house in Dublin?",
    a: "Guide from €3,500 for a standard-condition 3-bed interior including hall, stairs and landing, standard paint and VAT. Exact price comes after a free survey based on condition, prep and colours.",
  },
  {
    category: "Process" as const,
    q: "Do you cover furniture and floors?",
    a: "Yes — every job. Floors are covered, furniture is moved and protected, and the site is left clean every day.",
  },
  {
    category: "Booking" as const,
    q: "Are you insured?",
    a: "Yes. We're fully insured and a registered Irish company (CRO 810243, VAT registered).",
  },
  {
    category: "Booking" as const,
    q: "How fast can you start?",
    a: "Most jobs within 1–2 weeks of a confirmed quote. We send a written quote within 48 hours of the survey.",
  },
  {
    category: "Materials" as const,
    q: "Do you supply paint?",
    a: "Yes — standard trade paint is included in the guide price. Premium brands and specialist finishes are optional and quoted on request.",
  },
];

function HousePaintingPage() {
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  function readValues(form: HTMLFormElement) {
    const fd = new FormData(form);
    return {
      contact_name: String(fd.get("contact_name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      address: String(fd.get("address") || "").trim(),
      details: String(fd.get("details") || "").trim(),
    };
  }

  function validateAll(form: HTMLFormElement): FieldErrors {
    const v = readValues(form);
    const errs = validateContact({
      name: v.contact_name,
      phone: v.phone,
      message: v.details,
      requirePhone: true,
      nameLabel: "name",
      messageField: "details",
    });
    if (errs.name) {
      errs.contact_name = errs.name;
      delete errs.name;
    }
    if (!v.address) errs.address = "Please enter your address or area.";
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
      email: "",
      phone: v.phone.slice(0, 50),
      postcode: v.address.slice(0, 100),
      message: [
        `Address / area: ${v.address.slice(0, 200)}`,
        `What needs painting: ${v.details.slice(0, 2000)}`,
      ].join("\n"),
    };
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...payload,
          source: "house_painting_dublin",
          service_type: "residential",
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
    track("generate_lead", { form: "house_painting_dublin" });
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Freshly painted Dublin family home interior"
          fetchPriority="high"
          decoding="async"
          width={1920}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.18_0_0)]/75" />
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-32">
          <span className="eyebrow text-accent">Residential · Dublin</span>
          <h1 className="mt-3 max-w-4xl font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
            House Painters in Dublin — Interiors &amp; Exteriors
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
            Clean, on-time, fully insured. Free written quote within 48 hours. Crews of 15–30, 10+
            years hands-on across Dublin.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#house-quote"
              className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
            >
              Get my free quote
            </a>
            <a
              href={`tel:${SITE.phoneTel}`}
              onClick={() => track("click_to_call", { location: "house_hero" })}
              className="inline-flex items-center rounded-sm border border-white/30 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary"
            >
              Call now · {SITE.phoneDisplay}
            </a>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-5 md:px-8">
          <p className="text-center text-sm font-semibold text-[oklch(0.25_0_0)] md:text-base">
            300+ projects delivered · Fully insured · Registered Irish company (CRO 810243)
          </p>
        </div>
      </section>

      {/* Services + Guide prices */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <span className="eyebrow text-primary">Pricing guide</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          What we paint — and what it costs
        </h2>
        <div className="mt-10 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {PRICES.map((p) => (
            <div
              key={p.label}
              className="flex flex-col rounded-sm border border-border bg-background p-6"
            >
              <div className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                {p.label}
              </div>
              <div className="mt-3 font-display text-3xl font-extrabold text-primary">
                {p.price}
              </div>
              <p className="mt-2 text-sm text-[oklch(0.4_0_0)]">{p.note}</p>
            </div>
          ))}
        </div>
        <p className="mt-6 max-w-3xl text-sm leading-relaxed text-[oklch(0.4_0_0)]">
          Guide prices for standard condition, including standard paint and VAT. Your exact price
          comes after a free survey — based on condition, prep and colours.
        </p>
      </section>

      {/* Why us */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <span className="eyebrow text-primary">Why homeowners pick us</span>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Painting done properly — without the mess
          </h2>
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {WHY.map((w) => (
              <div key={w.title} className="rounded-sm border border-border bg-background p-6">
                <h3 className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  {w.title}
                </h3>
                <div className="mt-3 h-[2px] w-10 bg-primary" />
                <p className="mt-4 text-sm leading-relaxed text-[oklch(0.35_0_0)]">{w.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <span className="eyebrow text-primary">How it works</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          Simple, four-step process
        </h2>
        <ol className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {STEPS.map((s, i) => (
            <li key={s} className="relative rounded-sm border border-border bg-background p-6">
              <div className="font-display text-4xl font-extrabold text-primary/20">
                {String(i + 1).padStart(2, "0")}
              </div>
              <p className="mt-2 font-display text-sm font-semibold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                {s}
              </p>
            </li>
          ))}
        </ol>
      </section>

      {/* Reviews */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8">
          <span className="eyebrow text-primary">What homeowners say</span>
          <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Rated by homeowners across Dublin.
          </h2>
          <div className="mt-10">
            <Testimonials />
          </div>
        </div>
      </section>

      {/* Areas */}
      <section className="mx-auto max-w-7xl px-4 py-20 md:px-8">
        <span className="eyebrow text-primary">Areas we cover</span>
        <h2 className="mt-3 max-w-3xl font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
          We cover all of Dublin and surrounding counties.
        </h2>
        <ul className="mt-8 flex flex-wrap gap-2">
          {AREAS.map((a) => (
            <li key={a.slug}>
              <Link
                to={`/painter-${a.slug}` as string}
                className="inline-flex items-center rounded-sm border border-border bg-background px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-[oklch(0.25_0_0)] hover:border-primary hover:text-primary"
              >
                {a.name}
              </Link>
            </li>
          ))}
        </ul>
        <p className="mt-4 text-sm text-[oklch(0.4_0_0)]">
          Not listed?{" "}
          <a
            href={`tel:${SITE.phoneTel}`}
            onClick={() => track("click_to_call", { location: "house_areas" })}
            className="font-semibold text-primary hover:underline"
          >
            Call {SITE.phoneDisplay}
          </a>{" "}
          — we cover all of Dublin and surrounding counties.
        </p>
      </section>

      {/* FAQ */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-4xl px-4 py-20 md:px-8">
          <span className="eyebrow text-primary">FAQ</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight md:text-4xl">
            Quick answers
          </h2>
          <div className="mt-10">
            <FaqAccordion items={FAQS} />
          </div>
        </div>
      </section>

      {/* Final CTA + form */}
      <section
        id="house-quote"
        className="bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)]"
      >
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
          <div>
            <span className="eyebrow text-accent">Free quote</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
              Get your free 48-hour written quote
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/75">
              Send us the basics and we'll come back within one working day to book a free survey.
              Prefer to talk? Call or WhatsApp — we usually answer the same day.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/85">
              <div>
                📞{" "}
                <a
                  href={`tel:${SITE.phoneTel}`}
                  onClick={() => track("click_to_call", { location: "house_form_block" })}
                  className="hover:text-primary"
                >
                  {SITE.phoneDisplay}
                </a>
              </div>
              <div>
                💬{" "}
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("click_whatsapp", { location: "house_form_block" })}
                  className="hover:text-primary"
                >
                  WhatsApp us photos
                </a>
              </div>
              <div>🕒 Mon–Sat · 8:00 – 18:00</div>
            </div>
          </div>

          <div className="rounded-sm bg-background p-6 text-foreground md:p-8">
            {sent ? (
              <FormSuccess />
            ) : (
              <form ref={formRef} noValidate onSubmit={handleSubmit} className="grid gap-4">
                <FormBotTraps />
                <Field
                  label="Name"
                  name="contact_name"
                  required
                  error={errors.contact_name}
                  onBlur={handleBlur("contact_name")}
                />
                <Field
                  label="Phone"
                  name="phone"
                  type="tel"
                  required
                  error={errors.phone}
                  onBlur={handleBlur("phone")}
                />
                <Field
                  label="Address or area"
                  name="address"
                  required
                  placeholder="e.g. Rathmines, Dublin 6"
                  error={errors.address}
                  onBlur={handleBlur("address")}
                />
                <div>
                  <label
                    htmlFor="details"
                    className="block font-display text-xs font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)]"
                  >
                    What needs painting?<span className="text-primary"> *</span>
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
                    placeholder="e.g. 3-bed semi interior — hall, stairs, landing + 2 bedrooms."
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
                    {submitting ? "Sending…" : "Get my free quote"}
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
