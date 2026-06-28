import { createFileRoute, Link } from "@tanstack/react-router";
import { lazy, Suspense, useRef, useState } from "react";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import { MapEmbed } from "../components/MapEmbed";
import { TestimonialsSection } from "../components/Testimonials";
import { ProcessSteps } from "../components/ProcessSteps";
import { FaqAccordion } from "../components/FaqAccordion";
import { FAQS } from "../data/faqs";

import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import aboutAsset from "../assets/portfolio/about-architecture.webp.asset.json";
import sCommercialAsset from "../assets/portfolio/service-commercial.webp.asset.json";
import sIndustrialAsset from "../assets/portfolio/service-industrial.webp.asset.json";
import sHospitalityAsset from "../assets/portfolio/service-hospitality.webp.asset.json";
import ctaAsset from "../assets/portfolio/cta-bg.webp.asset.json";
import { FormBotTraps, readBotTraps } from "../components/FormBotTraps";
import { SITE, WHATSAPP_URL } from "@/lib/site";
import { track } from "@/lib/analytics";
import {
  Spinner,
  validateContact,
  focusFirstError,
  type FieldErrors,
} from "../components/form-helpers";

const RecentProjects = lazy(() => import("../components/RecentProjects"));

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Painters Dublin — Interior, Exterior & Commercial | All Colours Painting" },
      {
        name: "description",
        content: `Professional painter and decorator in Dublin. Interior & exterior painting, epoxy floors, spray painting for houses, apartments & commercial. Free quotes — call ${SITE.phoneDisplay}.`,
      },
      {
        property: "og:title",
        content: "Painters Dublin — Interior, Exterior & Commercial | All Colours Painting",
      },
      {
        property: "og:description",
        content: `Professional painter and decorator in Dublin. Interior & exterior painting, epoxy floors, spray painting for houses, apartments & commercial. Free quotes — call ${SITE.phoneDisplay}.`,
      },
      { property: "og:url", content: "https://allcolourspainter.com/" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      { name: "google-site-verification", content: "TpNVR-l0heZM7pJ-asHG3AOc33fsISO-tctP4ns_Z5w" },
    ],
    links: [
      { rel: "canonical", href: "https://allcolourspainter.com/" },
      { rel: "preload", as: "image", href: heroAsset.url, fetchPriority: "high" },
    ],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "HousePainter",
          "@id": "https://allcolourspainter.com/#business",
          name: "All Colours Painting Contractor Limited",
          legalName: "All Colours Painting Contractor Limited",
          vatID: SITE.vat,
          url: "https://allcolourspainter.com/",
          image:
            "https://allcolourspainter.com/__l5e/assets-v1/2a395495-c4ec-4903-a41b-667de034b2ab/hero-house.webp",
          telephone: SITE.phoneIntl,
          email: SITE.email,
          priceRange: "€€",
          areaServed: { "@type": "AdministrativeArea", name: "County Dublin, Ireland" },
          address: {
            "@type": "PostalAddress",
            streetAddress: "22 Liscarne Court",
            addressLocality: "Dublin 22",
            postalCode: "D22 X052",
            addressRegion: "Leinster",
            addressCountry: "IE",
          },
          openingHoursSpecification: [
            {
              "@type": "OpeningHoursSpecification",
              dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
              opens: "08:00",
              closes: "18:00",
            },
          ],
          identifier: { "@type": "PropertyValue", name: "CRO", value: SITE.cro },
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: FAQS.slice(0, 5).map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }),
      },
    ],
  }),
  component: Home,
});

const services = [
  {
    title: "Residential",
    desc: "Interior and exterior repaints, period homes, feature walls, woodwork and ceilings — finished to a standard you'll notice.",
    img: heroAsset.url,
  },
  {
    title: "Commercial",
    desc: "Offices, retail and hospitality fit-outs delivered out of hours so your business never stops trading.",
    img: sCommercialAsset.url,
  },
  {
    title: "Industrial",
    desc: "Epoxy floor painting, floor coatings, line-marking, warehouse repaints and heavy-traffic protective systems using two-pack paints.",
    img: sIndustrialAsset.url,
  },
  {
    title: "Bespoke Finishes",
    desc: "Kitchen painting, furniture painting, railings painting, spray-finished joinery, varnish painting, wallpapering and specialist coatings on request.",
    img: sHospitalityAsset.url,
  },
];



const stats = [
  { k: "15–30", v: "Painters mobilised to programme" },
  { k: "300+", v: "Projects completed" },
  { k: "10+", v: "Years hands-on experience" },
  { k: "48hr", v: "Written quote turnaround" },
  { k: "12-Month", v: "Workmanship guarantee" },
  { k: "Free", v: "No-obligation quotes" },
];

const NEED_OPTIONS = [
  "Interior painting",
  "Exterior painting",
  "Full house repaint",
  "Commercial painting",
  "Epoxy floor",
  "Other",
];

function LeadCaptureForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [errors, setErrors] = useState<FieldErrors>({});

  function readValues(form: HTMLFormElement) {
    const fd = new FormData(form);
    return {
      name: String(fd.get("name") || "").trim(),
      phone: String(fd.get("phone") || "").trim(),
      need: String(fd.get("need") || "").trim(),
    };
  }

  function validateAll(form: HTMLFormElement): FieldErrors {
    const v = readValues(form);
    const base = validateContact({
      name: v.name,
      phone: v.phone,
      requirePhone: true,
      minMessage: 0,
    });
    if (!v.need) base.need = "Please choose what you need.";
    return base;
  }

  function handleBlur(name: string) {
    return () => {
      if (!formRef.current) return;
      const all = validateAll(formRef.current);
      setErrors((prev) => ({ ...prev, [name]: all[name] }));
    };
  }

  if (submitted) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="mx-auto max-w-3xl rounded-sm border border-white/10 bg-white/10 px-6 py-10 text-white backdrop-blur"
      >
        <h3 className="font-display text-xl font-bold uppercase text-primary">
          Thanks — we've got your request
        </h3>
        <p className="mt-3 text-sm text-white/85">
          We'll reply within one working day. For something urgent, call{" "}
          <a
            className="font-semibold text-white hover:underline"
            href={`tel:${SITE.phoneTel}`}
            onClick={() => track("click_to_call", { location: "homepage_form_success" })}
          >
            {SITE.phoneDisplay}
          </a>
          .
        </p>
        <p className="mt-3 text-sm text-white/85">
          Have photos of the job?{" "}
          <a
            href={WHATSAPP_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => track("click_whatsapp", { location: "homepage_form_success" })}
            className="font-semibold text-white underline hover:text-primary"
          >
            Send them on WhatsApp
          </a>{" "}
          — it speeds up your quote.
        </p>
      </div>
    );
  }

  return (
    <form
      ref={formRef}
      noValidate
      onSubmit={async (e) => {
        e.preventDefault();
        const formEl = e.currentTarget;
        const fieldErrors = validateAll(formEl);
        const hasError = Object.values(fieldErrors).some(Boolean);
        setErrors(fieldErrors);
        if (hasError) {
          focusFirstError(formEl, fieldErrors);
          return;
        }
        setSubmitting(true);
        setError(null);
        const fd = new FormData(formEl);
        const traps = readBotTraps(fd);
        const v = readValues(formEl);
        try {
          const res = await fetch("/api/public/contact", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              name: v.name.slice(0, 100),
              email: "no-reply@homepage-lead.local",
              phone: v.phone.slice(0, 50),
              message: `Homepage quick quote — service requested: ${v.need.slice(0, 100)}`,
              source: "homepage_form",
              service_type: v.need.slice(0, 100),
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
        setSubmitted(true);
        setSubmitting(false);
        track("generate_lead", { form: "homepage" });
      }}
      className="mx-auto grid max-w-3xl gap-4 rounded-sm border border-white/10 bg-white/10 p-5 backdrop-blur sm:grid-cols-2 md:grid-cols-4 md:p-6"
    >
      <FormBotTraps />
      <div className="sm:col-span-1">
        <label htmlFor="lead-name" className="sr-only">
          Your name
        </label>
        <input
          id="lead-name"
          type="text"
          name="name"
          placeholder="Your name *"
          autoComplete="name"
          aria-required="true"
          aria-invalid={errors.name ? true : undefined}
          aria-describedby={errors.name ? "lead-name-err" : undefined}
          onBlur={handleBlur("name")}
          className="w-full rounded-sm border border-white/20 bg-white px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        {errors.name && (
          <p id="lead-name-err" className="mt-1 text-xs text-red-200">
            {errors.name}
          </p>
        )}
      </div>
      <div className="sm:col-span-1">
        <label htmlFor="lead-phone" className="sr-only">
          Your phone number
        </label>
        <input
          id="lead-phone"
          type="tel"
          name="phone"
          placeholder="Your phone number *"
          autoComplete="tel"
          aria-required="true"
          aria-invalid={errors.phone ? true : undefined}
          aria-describedby={errors.phone ? "lead-phone-err" : undefined}
          onBlur={handleBlur("phone")}
          className="w-full rounded-sm border border-white/20 bg-white px-3 py-3 text-sm text-foreground placeholder:text-muted-foreground focus:border-primary focus:outline-none"
        />
        {errors.phone && (
          <p id="lead-phone-err" className="mt-1 text-xs text-red-200">
            {errors.phone}
          </p>
        )}
      </div>
      <div className="sm:col-span-2 md:col-span-1">
        <label htmlFor="lead-need" className="sr-only">
          What service do you need?
        </label>
        <select
          id="lead-need"
          name="need"
          defaultValue=""
          aria-required="true"
          aria-invalid={errors.need ? true : undefined}
          aria-describedby={errors.need ? "lead-need-err" : undefined}
          onBlur={handleBlur("need")}
          className="w-full rounded-sm border border-white/20 bg-white px-3 py-3 text-sm text-foreground focus:border-primary focus:outline-none"
        >
          <option value="" disabled>
            What do you need? *
          </option>
          {NEED_OPTIONS.map((o) => (
            <option key={o} value={o}>
              {o}
            </option>
          ))}
        </select>
        {errors.need && (
          <p id="lead-need-err" className="mt-1 text-xs text-red-200">
            {errors.need}
          </p>
        )}
      </div>
      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-sm bg-primary px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)] disabled:opacity-50 sm:col-span-2 md:col-span-1"
      >
        {submitting && <Spinner />}
        {submitting ? "Sending…" : "Request a Free Quote →"}
      </button>
      <p className="text-xs text-white/70 sm:col-span-2 md:col-span-4">
        Fully insured · Written quote within 48 hours · No obligation.
      </p>
      {error && (
        <p role="alert" className="text-xs text-red-200 sm:col-span-2 md:col-span-4">
          {error}
        </p>
      )}
    </form>
  );
}

function Home() {
  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate w-full overflow-hidden">
        <img
          src={heroAsset.url}
          alt="Freshly painted Dublin home exterior by All Colours Painting"
          width={1920}
          height={1280}
          fetchPriority="high"
          decoding="async"
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-gradient-to-r from-black/70 via-black/45 to-black/10" />
        <div className="mx-auto max-w-7xl px-6 py-28 md:px-8 md:py-44">
          <div className="max-w-2xl text-white">
            <span className="eyebrow text-accent">{COMPANY.area}</span>
            <h1 className="mt-5 font-display text-4xl font-extrabold uppercase leading-[1.05] tracking-tight text-white md:text-6xl">
              Painting & decorating, <br />
              done <span className="text-primary">properly.</span>
            </h1>
            <div className="mt-6 h-[3px] w-[170px] bg-primary" />
            <p className="mt-6 max-w-xl text-base text-white/85 md:text-lg">
              {COMPANY.name} delivers precise, long-lasting finishes for homes, landlords and
              businesses — on time and on budget. Free quotes, no pressure.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="#quote"
                className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)]"
              >
                Request a free quote
              </a>
              <Link
                to="/projects"
                className="inline-flex items-center rounded-sm border border-white/40 bg-white/10 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white backdrop-blur hover:bg-white/20"
              >
                View our work
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Who we are */}
      <section className="bg-background">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:gap-16 md:px-8 md:py-28">
          <div>
            <span className="eyebrow">Who we are</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">
              Welcome to All Colours Painting
            </h2>
            <hr className="section-rule" />
            <div className="mt-8 space-y-5 text-base leading-relaxed text-foreground">
              <p>
                Our owner brings 10+ years hands-on painting experience across Dublin — family
                homes, period townhouses, apartment blocks and commercial fit-outs. Most of our
                work comes from repeat clients, architects and main contractors who've used us
                before.
              </p>
              <p>
                Every job runs the same way: protect the space, prep the surfaces properly, apply
                trade paint systems to spec, and leave the site clean. The prep is where the finish
                is decided — so that's where we spend the time.
              </p>
              <p>
                From a single feature wall to a full commercial fit-out, we treat every job the
                same: prepare meticulously, paint cleanly, leave the site spotless.
              </p>
            </div>
            <Link
              to="/about"
              className="mt-8 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]"
            >
              Read more about us →
            </Link>
          </div>
          <div className="relative">
            <img
              src={aboutAsset.url}
              alt="Close-up of clean architectural painting detail on interior moulding"
              loading="lazy"
              width={1200}
              height={800}
              className="aspect-[4/5] w-full object-cover"
            />
            <div className="absolute -bottom-6 -left-6 hidden h-32 w-32 border-[6px] border-accent md:block" />
          </div>
        </div>
      </section>

      {/* Our promise — 4 values */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 pb-4 pt-20 md:px-8 md:pb-8 md:pt-28">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">Why we're worth it</span>
            <h2 className="section-title text-3xl md:text-4xl">Our work comes with a promise</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-2xl text-base text-foreground">
              Six things every client gets from us — every single job, no exceptions.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                t: "Professional",
                d: "We don't cut corners. We listen to what you need and deliver it on time, every time.",
              },
              {
                t: "Fast & Efficient",
                d: "Modern techniques, the best tools on the market. We're in, the job is done, and we're gone.",
              },
              {
                t: "Reliable",
                d: "We say what we'll do — and we do what we say. Honest quotes, honest timelines.",
              },
              {
                t: "Clean & Dust-Free",
                d: "Floors, furniture and belongings fully protected. Vacuum sanding keeps dust out of your home.",
              },
              {
                t: "Fully Insured",
                d: "Fully insured and tax-compliant. Every job covered from first prep to final coat.",
              },
              {
                t: "12-Month Warranty",
                d: "If anything's not right within 12 months of completion, we come back and put it right — no quibble. Written workmanship guarantee on every job.",
              },
            ].map((v, i) => (
              <div key={v.t} className="border-t-[3px] border-primary bg-card p-7">
                <div className="font-display text-xs font-bold uppercase tracking-[0.18em] text-primary">
                  0{i + 1}
                </div>
                <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  {v.t}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground">{v.d}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-12 md:grid-cols-3 md:px-8">
          {stats.map((s) => (
            <div key={s.v} className="text-center">
              <div className="font-display text-2xl font-extrabold text-primary md:text-3xl">
                {s.k}
              </div>
              <div className="mt-2 text-[11px] uppercase tracking-[0.18em] text-foreground">
                {s.v}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* What we offer */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">What we do</span>
            <h2 className="section-title text-3xl md:text-4xl">What we offer</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-2xl text-base text-foreground">
              An experienced team of painters and decorators specialising in a wide range of
              commercial, residential and bespoke projects.
            </p>
          </div>

          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="group overflow-hidden bg-card">
                <div className="aspect-[4/3] overflow-hidden">
                  <img
                    src={s.img}
                    alt={`${s.title} painting & decorating in Dublin`}
                    loading="lazy"
                    width={800}
                    height={600}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>
                <div className="border-b-[3px] border-primary p-6">
                  <h3 className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                    {s.title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-foreground">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10">
            <Link
              to="/services"
              className="inline-flex items-center rounded-sm border-[2px] border-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground"
            >
              All services →
            </Link>
          </div>
        </div>
      </section>

      {/* Recent projects (lazy, below the fold) */}
      <Suspense fallback={<div aria-hidden className="bg-secondary" style={{ minHeight: 720 }} />}>
        <RecentProjects />
      </Suspense>

      {/* Process */}
      <ProcessSteps background="background" />

      {/* Testimonials */}
      <TestimonialsSection />

      {/* FAQ teaser */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-5xl px-4 py-20 md:px-8 md:py-28">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <div>
              <span className="eyebrow">Questions, answered</span>
              <h2 className="section-title mt-3 text-3xl md:text-4xl">Before you book</h2>
              <hr className="section-rule" />
            </div>
            <Link
              to="/faq"
              className="font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]"
            >
              Read all FAQs →
            </Link>
          </div>
          <div className="mt-10">
            <FaqAccordion items={FAQS.slice(0, 5)} />
          </div>
        </div>
      </section>

      {/* Rooms & specialities — SEO long-tail */}
      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">Rooms & specialities</span>
            <h2 className="section-title text-3xl md:text-4xl">Every room, every surface</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-3xl text-base text-foreground">
              From a single room to a full house repaint — kitchens and cabinets, hallways and
              stairs, ceilings, apartments and period homes. If it needs painting, we paint it.
            </p>
          </div>

          <div className="mt-8">
            <Link
              to="/services"
              className="inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]"
            >
              See all services →
            </Link>
          </div>
        </div>
      </section>

      {/* Areas we cover */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-24">
          <div className="flex flex-col items-start gap-2">
            <span className="eyebrow">Where we work</span>
            <h2 className="section-title text-3xl md:text-4xl">
              Painter & decorator across Dublin
            </h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-3xl text-base text-foreground">
              Looking for a <strong>painter near me</strong> in Dublin? We cover interior painting,
              exterior painting, dash and pebbledash repaints for houses and apartments across South
              Dublin and surrounding areas.
            </p>
          </div>

          <div className="mt-12 grid gap-10 md:grid-cols-5 md:gap-12">
            <div className="md:col-span-3">
              <MapEmbed
                title="Map of County Dublin — All Colours Painting service area"
                src="https://www.google.com/maps?q=County+Dublin,+Ireland&z=10&output=embed"
                className="relative w-full overflow-hidden border border-border bg-secondary"
                style={{ aspectRatio: "920 / 680" }}
              />
              <p className="mt-3 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                We cover all of County Dublin
              </p>
            </div>

            <div className="self-start md:col-span-2">
              <ul className="grid grid-cols-2 gap-x-4 gap-y-3 text-sm text-foreground">
                {[
                  { name: "Ballsbridge", to: "/painter-ballsbridge" },
                  { name: "Ranelagh", to: "/painter-ranelagh" },
                  { name: "Rathmines", to: "/painter-rathmines" },
                  { name: "Blackrock", to: "/painter-blackrock" },
                  { name: "Dún Laoghaire", to: "/painter-dun-laoghaire" },
                  { name: "Dalkey", to: "/painter-dalkey" },
                  { name: "Foxrock", to: "/painter-foxrock" },
                  { name: "Dundrum", to: "/painter-dundrum" },
                ].map((a) => (
                  <li
                    key={a.to}
                    className="flex items-center gap-2 border-l-2 border-primary/70 pl-3"
                  >
                    <Link
                      to={a.to}
                      className="font-medium text-[oklch(0.2_0_0)] hover:text-primary"
                    >
                      {a.name}
                    </Link>
                  </li>
                ))}
              </ul>
              <Link
                to="/painters"
                className="mt-6 inline-flex items-center font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]"
              >
                View all areas →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Lead capture — Get a Free Quote */}
      <section id="quote" className="relative isolate overflow-hidden scroll-mt-24">
        <img
          src={ctaAsset.url}
          alt="Freshly painted Dublin home exterior"
          loading="lazy"
          width={1920}
          height={600}
          className="absolute inset-0 -z-10 h-full w-full object-cover"
        />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/85" />
        <div className="mx-auto max-w-5xl px-4 py-20 text-center md:px-8 md:py-28">
          <span className="eyebrow text-accent">Free quotes</span>
          <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
            Ready to get started?
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Tell us about your project and we'll visit, measure up and send a written quote within
            48 hours. No obligation, no pressure.
          </p>
          <div className="mt-10">
            <LeadCaptureForm />
          </div>
          <div className="mt-10 flex flex-wrap justify-center gap-6 text-sm text-white/80 md:gap-10">
            <span className="flex items-center gap-2">✓ Free site visit</span>
            <span className="flex items-center gap-2">✓ Written quote in 48hrs</span>
            <span className="flex items-center gap-2">✓ 12-month guarantee</span>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function RecentProjects() {
  const { data: albums } = useQuery({ queryKey: ["home-recent-albums"], queryFn: fetchHomeAlbums });
  const items = albums ?? [];
  if (items.length === 0) return null;
  return (
    <section className="bg-secondary">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">Our work</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">Recent projects</h2>
            <hr className="section-rule" />
            <p className="mt-6 max-w-2xl text-base text-foreground">
              A selection of recent Dublin jobs from our gallery — interiors, exteriors, floor
              coatings and commercial fit-outs.
            </p>
          </div>
          <Link
            to="/projects"
            className="font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]"
          >
            See more projects →
          </Link>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((p) => (
            <Link key={p.id} to="/projects" className="group relative block overflow-hidden bg-card">
              <div className="aspect-[16/11] overflow-hidden">
                {p.cover_url ? (
                  <img
                    src={p.cover_url}
                    alt={p.title}
                    loading="lazy"
                    width={1200}
                    height={825}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                ) : (
                  <div className="h-full w-full bg-muted" />
                )}
              </div>
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-black/85 via-black/40 to-transparent p-6 text-white">
                <p className="text-[11px] uppercase tracking-[0.18em] text-accent">
                  {CATEGORY_LABEL[p.category] ?? p.category} · {p.location}
                </p>
                <h3 className="mt-1 font-display text-lg font-bold uppercase tracking-wide">
                  {p.title}
                </h3>
                <p className="mt-1 text-xs text-white/80">
                  {p.photo_count} photo{p.photo_count === 1 ? "" : "s"}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
