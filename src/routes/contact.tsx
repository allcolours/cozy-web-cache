import { createFileRoute, Link } from "@tanstack/react-router";
import { useRef, useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { MapEmbed } from "../components/MapEmbed";
import { useSiteSettings } from "../hooks/useSiteSettings";
import { FormBotTraps, readBotTraps } from "../components/FormBotTraps";
import {
  FormSuccess,
  Spinner,
  TrustMicrocopy,
  focusFirstError,
  validateContact,
  type FieldErrors,
} from "../components/form-helpers";
import ctaAsset from "../assets/portfolio/cta-bg.webp.asset.json";
import { SITE } from "@/lib/site";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Get a Free Quote | All Colours Painting Dublin" },
      {
        name: "description",
        content: `Request a free painting quote in Dublin. Call ${SITE.phoneDisplay} or email ${SITE.email}. We respond within 24 hours. No obligation estimates.`,
      },
      { property: "og:title", content: "Get a Free Quote | All Colours Painting Dublin" },
      {
        property: "og:description",
        content: `Request a free painting quote in Dublin. Call ${SITE.phoneDisplay} or email ${SITE.email}. We respond within 24 hours. No obligation estimates.`,
      },
      { property: "og:url", content: "https://allcolourspainter.com/contact" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${ctaAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${ctaAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/contact" }],
    scripts: [
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
              name: "Contact",
              item: "https://allcolourspainter.com/contact",
            },
          ],
        }),
      },
    ],
  }),
  component: Contact,
});

function Contact() {
  const settings = useSiteSettings();
  const formRef = useRef<HTMLFormElement>(null);
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  function readValues(form: HTMLFormElement) {
    const fd = new FormData(form);
    return {
      name: String(fd.get("name") || "").trim(),
      email: String(fd.get("email") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      postcode: String(fd.get("postcode") || "").trim(),
      message: String(fd.get("message") || "").trim(),
      consent: fd.get("consent") === "on",
    };
  }

  function validateAll(form: HTMLFormElement): FieldErrors {
    const v = readValues(form);
    const errs = validateContact({
      name: v.name,
      email: v.email,
      phone: v.phone,
      message: v.message,
    });
    if (!v.consent) errs.consent = "Please accept the privacy policy to continue.";
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
      name: v.name.slice(0, 100),
      email: v.email.slice(0, 255),
      phone: v.phone.slice(0, 50) || null,
      postcode: v.postcode.slice(0, 50) || null,
      message: v.message.slice(0, 4000),
    };
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "contact_form", ...traps }),
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
  }

  return (
    <SiteLayout>
      <section className="relative isolate overflow-hidden">
        <img
          src={ctaAsset.url}
          alt="Freshly painted Dublin home exterior by All Colours Painting"
          loading="lazy"
          width={1920}
          height={900}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/80" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">Contact us</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-6xl">
            Tell us about your project
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            Whether it's a single room or a full commercial fit-out, we'll come back to you within
            one working day with a clear, written quote.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="grid gap-12 md:grid-cols-5">
            <div className="md:col-span-2">
              <span className="eyebrow">Get in touch</span>
              <h2 className="section-title mt-3 text-3xl">Free, no-obligation quotes</h2>
              <hr className="section-rule" />
              <dl className="mt-8 space-y-6 text-sm">
                <ContactRow
                  label="Phone"
                  value={settings.phone}
                  href={`tel:${settings.phone.replace(/\s/g, "")}`}
                  icon="phone"
                />
                <ContactRow
                  label="Email"
                  value={settings.email}
                  href={`mailto:${settings.email}`}
                  icon="mail"
                />
                <ContactRow label="Service area" value={settings.area} icon="pin" />
                <ContactRow label="Hours" value={settings.hours} icon="clock" />
              </dl>
              <div className="mt-8 border-t border-border/60 pt-6 text-xs leading-relaxed text-foreground/70">
                <p className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
                  Company details
                </p>
                <p className="mt-2">All Colours Painting Contractor Limited</p>
                <p>Registered in Ireland · Company No. {SITE.cro}</p>
                <p>VAT {SITE.vat}</p>
                <p>Registered office: {SITE.registeredAddress}</p>
              </div>
            </div>

            <form
              ref={formRef}
              noValidate
              onSubmit={handleSubmit}
              className="space-y-4 border-t-[3px] border-primary bg-card p-6 md:col-span-3 md:p-10"
            >
              {sent ? (
                <FormSuccess />
              ) : (
                <>
                  <FormBotTraps />
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                    Request a quote
                  </h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field
                      label="Name"
                      name="name"
                      required
                      error={errors.name}
                      onBlur={handleBlur("name")}
                    />
                    <Field
                      label="Phone"
                      name="phone"
                      type="tel"
                      error={errors.phone}
                      onBlur={handleBlur("phone")}
                    />
                  </div>
                  <Field
                    label="Email"
                    name="email"
                    type="email"
                    error={errors.email}
                    onBlur={handleBlur("email")}
                  />
                  <Field label="Postcode" name="postcode" />
                  <div>
                    <label
                      htmlFor="project-details"
                      className="font-display text-xs font-bold uppercase tracking-wider text-[oklch(0.2_0_0)]"
                    >
                      Project details<span className="text-primary"> *</span>
                    </label>
                    <textarea
                      id="project-details"
                      name="message"
                      rows={5}
                      aria-required="true"
                      aria-invalid={errors.message ? true : undefined}
                      aria-describedby={errors.message ? "project-details-err" : undefined}
                      onBlur={handleBlur("message")}
                      className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
                    />
                    {errors.message && (
                      <p id="project-details-err" className="mt-1 text-xs text-destructive">
                        {errors.message}
                      </p>
                    )}
                  </div>
                  <div>
                    <label
                      htmlFor="consent"
                      className="flex items-start gap-3 pt-2 text-xs text-foreground/75"
                    >
                      <input
                        id="consent"
                        name="consent"
                        type="checkbox"
                        aria-required="true"
                        aria-invalid={errors.consent ? true : undefined}
                        aria-describedby={errors.consent ? "consent-err" : undefined}
                        onBlur={handleBlur("consent")}
                        className="mt-0.5 h-4 w-4 shrink-0 border-input accent-[oklch(0.55_0.17_158)]"
                      />
                      <span>
                        I agree that my details may be used to respond to this enquiry, as
                        described in the{" "}
                        <Link to="/privacy" className="text-primary hover:underline">
                          Privacy Policy
                        </Link>
                        .
                      </span>
                    </label>
                    {errors.consent && (
                      <p id="consent-err" className="mt-1 text-xs text-destructive">
                        {errors.consent}
                      </p>
                    )}
                  </div>
                  {error && (
                    <p role="alert" className="text-sm text-destructive">
                      {error}
                    </p>
                  )}
                  <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
                    <button
                      type="submit"
                      disabled={submitting}
                      className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)] disabled:opacity-50 sm:w-auto"
                    >
                      {submitting && <Spinner />}
                      {submitting ? "Sending…" : "Request my free quote"}
                    </button>
                    <TrustMicrocopy />
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </section>

      <section className="bg-[var(--color-surface)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <span className="eyebrow">Where we work</span>
          <h2 className="section-title mt-3 text-3xl">Serving Dublin & surrounding areas</h2>
          <hr className="section-rule" />
          <p className="mt-4 max-w-2xl text-sm text-foreground/80">
            We cover all of Dublin city and county — including Ballsbridge, Donnybrook, Rathmines,
            Ranelagh, Dundrum, Dún Laoghaire and Blackrock — plus parts of Wicklow, Kildare and
            Meath.
          </p>
          <MapEmbed
            title="All Colours Painting service area — Dublin"
            src="https://www.google.com/maps?q=Dublin,Ireland&z=11&output=embed"
            className="mt-8 aspect-[16/9] w-full overflow-hidden border-t-[3px] border-primary bg-card"
          />
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactRow({
  label,
  value,
  href,
  icon,
}: {
  label: string;
  value: string;
  href?: string;
  icon: "phone" | "mail" | "pin" | "clock";
}) {
  const Icon = () => {
    const props = {
      width: 18,
      height: 18,
      viewBox: "0 0 24 24",
      fill: "none",
      stroke: "currentColor",
      strokeWidth: 2,
    } as const;
    switch (icon) {
      case "phone":
        return (
          <svg {...props}>
            <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" />
          </svg>
        );
      case "mail":
        return (
          <svg {...props}>
            <rect x="3" y="5" width="18" height="14" rx="2" />
            <path d="M3 7l9 6 9-6" />
          </svg>
        );
      case "pin":
        return (
          <svg {...props}>
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" />
            <circle cx="12" cy="10" r="3" />
          </svg>
        );
      case "clock":
        return (
          <svg {...props}>
            <circle cx="12" cy="12" r="9" />
            <path d="M12 7v5l3 2" />
          </svg>
        );
    }
  };
  return (
    <div className="flex items-start gap-4">
      <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center bg-primary text-primary-foreground">
        <Icon />
      </div>
      <div>
        <dt className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-primary">
          {label}
        </dt>
        <dd className="mt-1 text-sm text-foreground">
          {href ? (
            <a className="hover:text-primary" href={href}>
              {value}
            </a>
          ) : (
            value
          )}
        </dd>
      </div>
    </div>
  );
}

function Field({
  label,
  name,
  type = "text",
  required,
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
}) {
  return (
    <div>
      <label
        htmlFor={name}
        className="font-display text-xs font-bold uppercase tracking-wider text-[oklch(0.2_0_0)]"
      >
        {label}
        {required && " *"}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
      />
    </div>
  );
}
