import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout, COMPANY } from "../components/SiteLayout";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact | All Colours Painting Contractor Limited" },
      { name: "description", content: "Request a free painting & decorating quote in London. Call, email, or send us a message." },
      { property: "og:title", content: "Contact All Colours Painting" },
      { property: "og:description", content: "Request a free painting & decorating quote in London." },
    ],
  }),
  component: Contact,
});

function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <SiteLayout>
      <section className="border-b border-border bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <p className="text-sm font-semibold uppercase tracking-wider text-accent">Contact</p>
          <h1 className="mt-2 text-4xl font-bold tracking-tight text-primary md:text-5xl">Get a free quote</h1>
          <p className="mt-4 max-w-2xl text-lg text-muted-foreground">Tell us a little about your project and we'll come back to you within one working day.</p>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-12 md:grid-cols-5">
          <div className="md:col-span-2">
            <h2 className="text-xl font-semibold text-primary">Get in touch</h2>
            <dl className="mt-6 space-y-5 text-sm">
              <div>
                <dt className="font-semibold text-primary">Phone</dt>
                <dd className="mt-1"><a className="text-muted-foreground hover:text-accent" href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}>{COMPANY.phone}</a></dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Email</dt>
                <dd className="mt-1"><a className="text-muted-foreground hover:text-accent" href={`mailto:${COMPANY.email}`}>{COMPANY.email}</a></dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Service area</dt>
                <dd className="mt-1 text-muted-foreground">{COMPANY.area}</dd>
              </div>
              <div>
                <dt className="font-semibold text-primary">Hours</dt>
                <dd className="mt-1 text-muted-foreground">Mon–Sat · 8:00 – 18:00</dd>
              </div>
            </dl>
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); setSent(true); }}
            className="space-y-4 rounded-xl border border-border bg-card p-6 md:col-span-3 md:p-8"
          >
            {sent ? (
              <div className="rounded-md bg-accent/10 p-6 text-center">
                <h3 className="text-lg font-semibold text-primary">Thanks — message received.</h3>
                <p className="mt-2 text-sm text-muted-foreground">We'll be in touch within one working day.</p>
              </div>
            ) : (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Name" name="name" required />
                  <Field label="Phone" name="phone" type="tel" />
                </div>
                <Field label="Email" name="email" type="email" required />
                <Field label="Postcode" name="postcode" />
                <div>
                  <label className="text-sm font-medium text-primary">Project details</label>
                  <textarea required rows={5} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
                </div>
                <button type="submit" className="w-full rounded-md bg-primary px-6 py-3 text-sm font-semibold text-primary-foreground transition-colors hover:bg-primary/90 sm:w-auto">
                  Request my free quote
                </button>
              </>
            )}
          </form>
        </div>
      </section>
    </SiteLayout>
  );
}

function Field({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="text-sm font-medium text-primary">{label}{required && " *"}</label>
      <input id={name} name={name} type={type} required={required} className="mt-1 w-full rounded-md border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}
