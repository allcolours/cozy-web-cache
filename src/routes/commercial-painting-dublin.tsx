import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import commercialAsset from "../assets/portfolio/service-commercial.jpg.asset.json";

export const Route = createFileRoute("/commercial-painting-dublin")({
  head: () => ({
    meta: [
      { title: "Commercial Painting Dublin | Painting Contractor & Subcontractor" },
      {
        name: "description",
        content:
          "Dublin's trusted commercial painting partner. 20+ painters, out-of-hours scheduling, RCT compliant, €6.5m insured. Trusted by Cairn, Bennett, Elliott & Clancy.",
      },
      { name: "keywords", content: "commercial painting Dublin, painting contractor Dublin, painting subcontractor Dublin" },
      { property: "og:title", content: "Commercial Painting Dublin | All Colours Painting" },
      { property: "og:description", content: "B2B painting partner for property & facilities managers, REITs and main contractors across Dublin." },
      { property: "og:url", content: "https://allcolourspainter.com/commercial-painting-dublin" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: `https://allcolourspainter.com${commercialAsset.url}` },
      { name: "twitter:image", content: `https://allcolourspainter.com${commercialAsset.url}` },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/commercial-painting-dublin" }],
  }),
  component: CommercialPage,
});

const STATS = [
  { value: "15–30", label: "Painters mobilised to programme" },
  { value: "24/7", label: "Out-of-hours scheduling" },
  { value: "€6.5m", label: "Public liability insured" },
  { value: "RCT", label: "Compliant subcontractor" },
];

const CLIENTS = [
  { title: "Property Management Companies", body: "Block management, common areas, hallways and external repaints across Dublin portfolios." },
  { title: "Facilities Management", body: "Planned and reactive redecoration for offices, schools, healthcare and retail estates." },
  { title: "Landlords & REITs", body: "Turnaround painting between tenancies, full apartment block exteriors and communal areas." },
  { title: "Main Contractors", body: "Trusted painting subcontractor for Cairn, Bennett, Elliott and Clancy on live Dublin sites." },
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
  { title: "Labour supply", body: "Scale from 15 to 30+ painters on site to hit tight programme dates." },
  { title: "Programme delivery", body: "On-time handover, sectional completion, snag-list closed out fast." },
  { title: "Compliance", body: "RCT registered, €6.5m PL insurance, Safe Pass, manual handling, RAMS on request." },
  { title: "Communication", body: "Dedicated WhatsApp groups, daily progress reports, photos from site." },
];

function CommercialPage() {
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("contact_name") || "").trim().slice(0, 100),
      email: String(form.get("email") || "").trim().slice(0, 255),
      phone: String(form.get("phone") || "").trim().slice(0, 50) || null,
      postcode: null,
      message: [
        `Company: ${String(form.get("company") || "").trim().slice(0, 150)}`,
        `Type of work: ${String(form.get("work_type") || "").trim()}`,
        `Project timeline: ${String(form.get("timeline") || "").trim().slice(0, 200)}`,
        `Details: ${String(form.get("details") || "").trim().slice(0, 2000)}`,
      ].join("\n"),
    };
    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in your name, email and project details.");
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...payload, source: "commercial_form", service_type: "commercial" }),
      });
      if (!res.ok) {
        setError("Sorry, we couldn't send that. Please try again or call us directly.");
        setSubmitting(false);
        return;
      }
    } catch {
      setError("Sorry, we couldn't send that. Please try again or call us directly.");
      setSubmitting(false);
      return;
    }
    setSent(true);
    setSubmitting(false);
  }

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden">
        <img
          src={commercialAsset.url}
          alt="Commercial painting crew working on a Dublin office block"
          loading="lazy"
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
            A scalable painting workforce for property managers, facilities teams and main contractors —
            delivered on programme, fully compliant, with clear daily communication from site.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="#commercial-quote"
              className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
            >
              Get a commercial quote
            </a>
            <a
              href="tel:0858211870"
              className="inline-flex items-center rounded-sm border border-white/30 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:border-primary hover:text-primary"
            >
              Call 085 821 1870
            </a>
          </div>
        </div>
      </section>

      {/* Stats bar */}
      <section className="border-y border-border bg-secondary">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 py-8 md:grid-cols-4 md:px-8">
          {STATS.map((s) => (
            <div key={s.label} className="text-center md:text-left">
              <div className="font-display text-3xl font-extrabold text-primary md:text-4xl">{s.value}</div>
              <div className="mt-1 text-xs font-semibold uppercase tracking-wider text-[oklch(0.35_0_0)]">{s.label}</div>
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
              <h3 className="font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{c.title}</h3>
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
              <li key={s} className="flex items-start gap-3 rounded-sm border border-border bg-background p-5">
                <svg className="mt-0.5 h-5 w-5 shrink-0 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
                <span className="font-display text-sm font-semibold uppercase tracking-wide text-[oklch(0.2_0_0)]">{s}</span>
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
            <div key={w.title} className="relative rounded-sm border border-border bg-background p-6">
              <div className="font-display text-4xl font-extrabold text-primary/20">{String(i + 1).padStart(2, "0")}</div>
              <h3 className="mt-2 font-display text-base font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{w.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-[oklch(0.35_0_0)]">{w.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Contact form */}
      <section id="commercial-quote" className="bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)]">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-20 md:grid-cols-2 md:px-8">
          <div>
            <span className="eyebrow text-accent">Get a commercial quote</span>
            <h2 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-white md:text-4xl">
              Tell us about your project
            </h2>
            <p className="mt-5 max-w-md text-sm leading-relaxed text-white/70">
              Send us the basics and we'll come back within one working day with availability, programme fit
              and a budget guide. For tenders, we can return RAMS, insurance certs and tax clearance on request.
            </p>
            <div className="mt-8 space-y-3 text-sm text-white/80">
              <div>📞 <a href="tel:0858211870" className="hover:text-primary">085 821 1870</a></div>
              <div>✉️ <a href="mailto:info@allcolourspainter.com" className="hover:text-primary">info@allcolourspainter.com</a></div>
              <div>🕒 Mon–Sat · 8:00 – 18:00 (out-of-hours by arrangement)</div>
            </div>
          </div>

          <div className="rounded-sm bg-background p-6 text-foreground md:p-8">
            {sent ? (
              <div className="py-8 text-center">
                <h3 className="font-display text-xl font-bold uppercase text-primary">Thanks — message received</h3>
                <p className="mt-3 text-sm text-[oklch(0.35_0_0)]">We'll reply within one working day. For urgent jobs, call 085 821 1870.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="grid gap-4">
                <div className="grid gap-4 md:grid-cols-2">
                  <Field label="Company name" name="company" required />
                  <Field label="Contact name" name="contact_name" required />
                  <Field label="Phone" name="phone" type="tel" />
                  <Field label="Email" name="email" type="email" required />
                </div>
                <div>
                  <label className="block font-display text-xs font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)]">
                    Type of work
                  </label>
                  <select
                    name="work_type"
                    required
                    defaultValue=""
                    className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
                  >
                    <option value="" disabled>Select…</option>
                    <option>Office repaint</option>
                    <option>Apartment block</option>
                    <option>Retail fit-out</option>
                    <option>Industrial / Floors</option>
                    <option>Other</option>
                  </select>
                </div>
                <Field label="Project timeline" name="timeline" placeholder="e.g. Start in 4 weeks, 3-week programme" />
                <div>
                  <label className="block font-display text-xs font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)]">
                    Additional details
                  </label>
                  <textarea
                    name="details"
                    rows={4}
                    className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
                    placeholder="Location, scope, access, anything we should know."
                  />
                </div>
                {error && <p className="text-sm text-red-600">{error}</p>}
                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex items-center justify-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)] disabled:opacity-60"
                >
                  {submitting ? "Sending…" : "Get a commercial quote"}
                </button>
                <p className="text-xs text-[oklch(0.5_0_0)]">
                  By submitting, you agree to our <Link to="/privacy" className="underline hover:text-primary">privacy policy</Link>.
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
}: {
  label: string;
  name: string;
  type?: string;
  required?: boolean;
  placeholder?: string;
}) {
  return (
    <div>
      <label className="block font-display text-xs font-semibold uppercase tracking-wider text-[oklch(0.3_0_0)]">
        {label}
        {required && <span className="text-primary"> *</span>}
      </label>
      <input
        name={name}
        type={type}
        required={required}
        placeholder={placeholder}
        className="mt-2 w-full rounded-sm border border-border bg-background px-3 py-2.5 text-sm"
      />
    </div>
  );
}
