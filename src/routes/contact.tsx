import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { useSiteSettings } from "../hooks/useSiteSettings";
import ctaAsset from "../assets/portfolio/cta-bg.jpg.asset.json";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | All Colours Painting Contractor Limited" },
      { name: "description", content: "Request a free painting & decorating quote. Call, email, or send us a message." },
      { property: "og:title", content: "Contact All Colours Painting" },
      { property: "og:description", content: "Request a free painting & decorating quote." },
      { property: "og:url", content: "https://allcolourspainter.com/contact" },
      { property: "og:type", content: "website" },
      { property: "og:image", content: ctaAsset.url },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/contact" }],
  }),
  component: Contact,
});

function Contact() {
  const settings = useSiteSettings();
  const [sent, setSent] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim().slice(0, 100),
      email: String(form.get("email") || "").trim().slice(0, 255),
      phone: String(form.get("phone") || "").trim().slice(0, 50) || null,
      postcode: String(form.get("postcode") || "").trim().slice(0, 50) || null,
      message: String(form.get("message") || "").trim().slice(0, 4000),
    };
    const consent = form.get("consent") === "on";
    if (!payload.name || !payload.email || !payload.message) {
      setError("Please fill in your name, email, and a short message.");
      setSubmitting(false);
      return;
    }
    if (!consent) {
      setError("Please accept the privacy policy to continue.");
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/public/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
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
      <section className="relative isolate overflow-hidden">
        <img src={ctaAsset.url} alt="" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-[oklch(0.2_0_0)]/80" />
        <div className="mx-auto max-w-7xl px-4 py-24 md:px-8 md:py-36">
          <span className="eyebrow text-accent">Contact us</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-white md:text-6xl">
            Tell us about your project
          </h1>
          <div className="mt-6 h-[3px] w-[170px] bg-primary" />
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            Whether it's a single room or a full commercial fit-out, we'll come back to you within one working day with a clear, written quote.
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
                <ContactRow label="Phone" value={settings.phone} href={`tel:${settings.phone.replace(/\s/g, "")}`} icon="phone" />
                <ContactRow label="Email" value={settings.email} href={`mailto:${settings.email}`} icon="mail" />
                <ContactRow label="Service area" value={settings.area} icon="pin" />
                <ContactRow label="Hours" value={settings.hours} icon="clock" />
              </dl>
            </div>

            <form
              onSubmit={handleSubmit}
              className="space-y-4 border-t-[3px] border-primary bg-card p-6 md:col-span-3 md:p-10"
            >
              {sent ? (
                <div className="bg-primary/10 p-8 text-center">
                  <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">Thanks — message received</h3>
                  <p className="mt-3 text-sm text-foreground">We'll be in touch within one working day.</p>
                </div>
              ) : (
                <>
                  <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">Request a quote</h3>
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Name" name="name" required />
                    <Field label="Phone" name="phone" type="tel" />
                  </div>
                  <Field label="Email" name="email" type="email" required />
                  <Field label="Postcode" name="postcode" />
                  <div>
                    <label htmlFor="project-details" className="font-display text-xs font-bold uppercase tracking-wider text-[oklch(0.2_0_0)]">Project details</label>
                    <textarea id="project-details" name="message" required rows={5} className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                  </div>
                  <label htmlFor="consent" className="flex items-start gap-3 pt-2 text-xs text-foreground/75">
                    <input id="consent" name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 border-input accent-[oklch(0.55_0.17_158)]" />
                    <span>
                      I agree that my details may be used to respond to this enquiry, as described in the{" "}
                      <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
                    </span>
                  </label>
                  {error && <p className="text-sm text-destructive">{error}</p>}
                  <button type="submit" disabled={submitting} className="w-full rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-[oklch(0.62_0.17_158)] disabled:opacity-50 sm:w-auto">
                    {submitting ? "Sending…" : "Request my free quote"}
                  </button>
                </>
              )}
            </form>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}

function ContactRow({ label, value, href, icon }: { label: string; value: string; href?: string; icon: "phone" | "mail" | "pin" | "clock" }) {
  const Icon = () => {
    const props = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 } as const;
    switch (icon) {
      case "phone": return <svg {...props}><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92Z" /></svg>;
      case "mail": return <svg {...props}><rect x="3" y="5" width="18" height="14" rx="2" /><path d="M3 7l9 6 9-6" /></svg>;
      case "pin": return <svg {...props}><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0Z" /><circle cx="12" cy="10" r="3" /></svg>;
      case "clock": return <svg {...props}><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></svg>;
    }
  };
  return (
    <div className="flex items-start gap-4">
      <div className="inline-flex h-10 w-10 flex-shrink-0 items-center justify-center bg-primary text-primary-foreground"><Icon /></div>
      <div>
        <dt className="font-display text-[11px] font-bold uppercase tracking-[0.18em] text-primary">{label}</dt>
        <dd className="mt-1 text-sm text-foreground">
          {href ? <a className="hover:text-primary" href={href}>{value}</a> : value}
        </dd>
      </div>
    </div>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="font-display text-xs font-bold uppercase tracking-wider text-[oklch(0.2_0_0)]">{label}{required && " *"}</label>
      <input id={name} name={name} type={type} required={required} className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}
