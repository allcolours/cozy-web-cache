import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import { useSiteSettings } from "../hooks/useSiteSettings";

export const Route = createFileRoute("/privacy")({
  head: () => ({
    meta: [
      { title: "Privacy Policy | All Colours Painting Contractor Limited" },
      {
        name: "description",
        content:
          "How All Colours Painting collects, uses and protects your personal data in line with GDPR.",
      },
      { property: "og:title", content: "Privacy Policy — All Colours Painting" },
      {
        property: "og:description",
        content: "How we collect, use and protect your personal data.",
      },
      { property: "og:url", content: "https://allcolourspainter.com/privacy" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/privacy" }],
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
              name: "Privacy Policy",
              item: "https://allcolourspainter.com/privacy",
            },
          ],
        }),
      },
    ],
  }),
  component: PrivacyPage,
});

function PrivacyPage() {
  const settings = useSiteSettings();
  const email = settings.email || COMPANY.email;
  const phone = settings.phone || COMPANY.phone;

  return (
    <SiteLayout>
      <section className="bg-background">
        <div className="mx-auto max-w-3xl px-4 py-20 md:px-8 md:py-28">
          <span className="eyebrow">Legal</span>
          <h1 className="mt-3 font-display text-4xl font-extrabold uppercase leading-[1.1] tracking-tight text-[oklch(0.2_0_0)] md:text-5xl">
            Privacy Policy
          </h1>
          <div className="mt-6 h-[3px] w-[120px] bg-primary" />
          <p className="mt-6 text-sm text-foreground/70">Last updated: 14 June 2026</p>

          <div className="prose mt-10 max-w-none text-foreground">
            <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">
              1. Who we are
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              {COMPANY.name} ("we", "us", "our") is a painting and decorating business based in
              Dublin, Ireland. We are the data controller for personal data you provide to us
              through this website.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              Contact:{" "}
              <a className="text-primary hover:underline" href={`mailto:${email}`}>
                {email}
              </a>{" "}
              ·{" "}
              <a className="text-primary hover:underline" href={`tel:${phone.replace(/\s/g, "")}`}>
                {phone}
              </a>
            </p>

            <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">
              2. What we collect
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                Information you submit via our contact form: name, email, phone (optional), postcode
                (optional), and project details.
              </li>
              <li>
                Technical data: anonymous page-view counters (no cookies that identify you
                personally).
              </li>
            </ul>

            <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">
              3. Why we use it
            </h2>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>
                To respond to your enquiry and prepare a quote (legal basis: your consent / steps to
                enter a contract).
              </li>
              <li>
                To improve the website (legal basis: legitimate interest — aggregated,
                non-identifying analytics).
              </li>
              <li>To comply with our legal obligations (e.g. accounting records).</li>
            </ul>

            <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">
              4. How long we keep it
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              Enquiries are kept for up to 24 months so we can follow up on your project.
              Accepted-quote and invoice records are kept for 7 years to meet Irish Revenue
              requirements. After that, data is securely deleted.
            </p>

            <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">
              5. Who we share it with
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              We do not sell your data. We share it only with service providers that help us run the
              website and respond to you: our hosting and database provider (Supabase / Lovable
              Cloud, EU region) and our email delivery provider. All processors are contractually
              bound to protect your data.
            </p>

            <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">
              6. Your rights (GDPR)
            </h2>
            <p className="mt-3 text-sm leading-relaxed">You have the right to:</p>
            <ul className="mt-3 list-disc space-y-2 pl-5 text-sm leading-relaxed">
              <li>Access the personal data we hold about you</li>
              <li>Correct or update inaccurate data</li>
              <li>Request deletion ("right to be forgotten")</li>
              <li>Object to or restrict processing</li>
              <li>Withdraw consent at any time</li>
              <li>
                Lodge a complaint with the Irish Data Protection Commission (
                <a
                  className="text-primary hover:underline"
                  href="https://www.dataprotection.ie"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  dataprotection.ie
                </a>
                )
              </li>
            </ul>
            <p className="mt-3 text-sm leading-relaxed">
              To exercise any of these rights, email{" "}
              <a className="text-primary hover:underline" href={`mailto:${email}`}>
                {email}
              </a>
              .
            </p>

            <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">
              7. Cookies
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              This website uses only strictly necessary technical storage required for the site to
              function. We do not use advertising or third-party tracking cookies.
            </p>
            <p className="mt-3 text-sm leading-relaxed">
              We set a first-party <code>cookie_consent</code> cookie to remember your choice about
              optional embedded content. Google Maps is loaded only after you give consent; until
              then no request is made to Google.
            </p>

            <h2 className="mt-10 font-display text-xl font-bold uppercase tracking-wide">
              8. Changes to this policy
            </h2>
            <p className="mt-3 text-sm leading-relaxed">
              We may update this policy from time to time. The "last updated" date at the top
              reflects the latest version.
            </p>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
