import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";

export const Route = createFileRoute("/terms")({
  head: () => ({
    meta: [
      { title: "Terms of Service | All Colours Painting Contractor Limited" },
      { name: "description", content: "Terms governing the use of the All Colours Painting website and the services we provide." },
      { property: "og:title", content: "Terms of Service — All Colours Painting" },
      { property: "og:description", content: "Terms governing the use of our website and services." },
      { property: "og:url", content: "https://allcolourspainter.com/terms" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/terms" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://allcolourspainter.com/"},{"@type":"ListItem","position":2,"name":"Terms of Service","item":"https://allcolourspainter.com/terms"}]}),
      },
    ],
  }),
  component: TermsPage,
});

function TermsPage() {
  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-[oklch(0.2_0_0)] md:text-5xl">
            Terms of Service
          </h1>
          <div className="mt-6 h-[3px] w-[120px] bg-primary" />
          <p className="mt-6 text-sm text-foreground/70">Last updated: 14 June 2026</p>

          <div className="mt-10 space-y-8 text-sm leading-relaxed">
            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">1. About these terms</h2>
              <p className="mt-3">
                These terms govern your use of the {COMPANY.name} website. By using the site you agree to them. If you do
                not agree, please do not use the site.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">2. Quotes and bookings</h2>
              <p className="mt-3">
                Submitting an enquiry through this site does not create a contract. A contract for painting & decorating
                services is formed only when we issue a written quote that you accept in writing. Quotes are valid for 30
                days unless stated otherwise.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">3. Workmanship guarantee</h2>
              <p className="mt-3">
                We provide a written workmanship guarantee on completed jobs. Specifics (duration and scope) are stated on
                the quote and invoice for each project.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">4. Website content</h2>
              <p className="mt-3">
                Photos, text and brand marks on this site are owned by us or our licensors and may not be reproduced
                without permission. Project images are published with the customer's permission where required.
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">5. Liability</h2>
              <p className="mt-3">
                The website is provided "as is". We make no warranty that information on the site is complete or error-free.
                Nothing in these terms limits liability that cannot lawfully be limited (including for death or personal
                injury caused by negligence, or for fraud).
              </p>
            </div>

            <div>
              <h2 className="font-display text-xl font-bold uppercase tracking-wide">6. Governing law</h2>
              <p className="mt-3">
                These terms are governed by the laws of Ireland and subject to the exclusive jurisdiction of the Irish
                courts.
              </p>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
