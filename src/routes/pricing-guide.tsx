import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";

export const Route = createFileRoute("/pricing-guide")({
  head: () => {
    const title = "Painting Cost in Dublin 2026 | Price Guide – All Colours Painting";
    const description =
      "How much does it cost to paint a house in Dublin? Honest 2026 price ranges for interior, exterior, kitchen and apartment painting — plus what changes the price.";
    const url = "https://allcolourspainter.com/pricing-guide";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "article" },
        {
          property: "og:image",
          content:
            "https://allcolourspainter.com/__l5e/assets-v1/2a395495-c4ec-4903-a41b-667de034b2ab/hero-house.webp",
        },
        { name: "twitter:card", content: "summary_large_image" },
        {
          name: "twitter:image",
          content:
            "https://allcolourspainter.com/__l5e/assets-v1/2a395495-c4ec-4903-a41b-667de034b2ab/hero-house.webp",
        },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "FAQPage",
            mainEntity: PRICING_FAQ.map((f) => ({
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
              {
                "@type": "ListItem",
                position: 1,
                name: "Home",
                item: "https://allcolourspainter.com/",
              },
              {
                "@type": "ListItem",
                position: 2,
                name: "Pricing Guide",
                item: "https://allcolourspainter.com/pricing-guide",
              },
            ],
          }),
        },
      ],
    };
  },
  component: PricingGuidePage,
});

const ROWS: { job: string; range: string; notes: string }[] = [
  {
    job: "Single room (walls)",
    range: "€280 – €550",
    notes: "One coat colour change incl. prep & light filling.",
  },
  {
    job: "Single room (walls + ceiling + woodwork)",
    range: "€550 – €950",
    notes: "Full repaint with two coats and proper prep.",
  },
  {
    job: "1-bed apartment (full interior)",
    range: "€1,400 – €2,400",
    notes: "Walls, ceilings, woodwork; landlord turnaround.",
  },
  {
    job: "2-bed apartment (full interior)",
    range: "€1,800 – €3,200",
    notes: "Depends on condition and colour change.",
  },
  {
    job: "3-bed semi (full interior)",
    range: "€2,800 – €5,500",
    notes: "Typical Dublin family home, two coats throughout.",
  },
  {
    job: "4-bed detached (full interior)",
    range: "€4,500 – €8,500",
    notes: "Includes stairwell and high ceilings.",
  },
  {
    job: "Exterior – 3-bed semi",
    range: "€2,500 – €5,000",
    notes: "Render or pebbledash, masonry paint, access included.",
  },
  {
    job: "Kitchen cabinet respray",
    range: "€1,800 – €3,800",
    notes: "Hand-painted or sprayed, primer + 2K topcoat.",
  },
  {
    job: "Garage / utility epoxy floor",
    range: "€650 – €1,500",
    notes: "Per 20–35 m², two-pack epoxy, prep included.",
  },
];

const PRICING_FAQ: { q: string; a: string }[] = [
  {
    q: "How much does it cost to paint a 3-bed house in Dublin?",
    a: "A typical interior repaint of a 3-bed semi in Dublin runs €2,800–€5,500 depending on prep work, colour change and how much woodwork is included. Two coats and proper preparation are standard with us.",
  },
  {
    q: "What's included in your painting quote?",
    a: "Every quote includes labour, paint (Dulux Trade, Fleetwood or Colourtrend by default), masking, light filling, two coats where needed, and a full clean-up. There are no surprise extras.",
  },
  {
    q: "How long does an interior repaint take?",
    a: "A single room is usually 1–2 days. A 3-bed apartment takes 4–6 working days. A full 4-bed house takes 8–12 days depending on condition and access.",
  },
  {
    q: "Do you offer free quotes?",
    a: "Yes — every quote is free, written, itemised and valid for 30 days. We visit on-site in Dublin within 48 hours of your request.",
  },
  {
    q: "Are you fully insured?",
    a: "Yes. Fully insured, Safe Pass certified crews, and a written workmanship guarantee on every job.",
  },
];

function PricingGuidePage() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-24">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">
          2026 Price guide
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase text-foreground md:text-5xl">
          How much does painting cost in Dublin?
        </h1>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground md:text-lg">
          Honest, up-to-date ranges based on hundreds of quotes we've issued across Dublin in
          2025–2026. Every project is different, so use these as a guide — your written quote will
          be exact.
        </p>

        <div className="mt-12 overflow-hidden rounded-sm border border-border">
          <table className="w-full text-left text-sm">
            <thead className="bg-secondary">
              <tr>
                <th className="px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-foreground">
                  Job
                </th>
                <th className="px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-foreground">
                  Typical price
                </th>
                <th className="hidden px-4 py-3 font-display text-xs font-bold uppercase tracking-wider text-foreground sm:table-cell">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {ROWS.map((r) => (
                <tr key={r.job} className="border-t border-border">
                  <td className="px-4 py-3 align-top font-medium text-foreground">{r.job}</td>
                  <td className="px-4 py-3 align-top font-display font-bold text-primary">
                    {r.range}
                  </td>
                  <td className="hidden px-4 py-3 align-top text-muted-foreground sm:table-cell">
                    {r.notes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <h2 className="mt-16 font-display text-2xl font-bold uppercase text-foreground md:text-3xl">
          What changes the price?
        </h2>
        <ul className="mt-5 space-y-3 text-base leading-relaxed text-muted-foreground">
          <li>
            <strong className="text-foreground">Condition.</strong> Heavy filling, damp patches or
            wallpaper removal add labour time.
          </li>
          <li>
            <strong className="text-foreground">Colour change.</strong> Dark to light (or vice
            versa) often needs a third coat.
          </li>
          <li>
            <strong className="text-foreground">Paint spec.</strong> Trade emulsion vs. premium
            Colourtrend / Fleetwood / Farrow & Ball.
          </li>
          <li>
            <strong className="text-foreground">Access.</strong> High ceilings, stairwells and
            external scaffolding.
          </li>
          <li>
            <strong className="text-foreground">Finish level.</strong> Standard vs. designer-grade
            hand-finished joinery.
          </li>
        </ul>

        <h2 className="mt-16 font-display text-2xl font-bold uppercase text-foreground md:text-3xl">
          Common questions
        </h2>
        <div className="mt-6 space-y-6">
          {PRICING_FAQ.map((f) => (
            <div key={f.q} className="rounded-sm border border-border bg-card p-5">
              <h3 className="font-display text-base font-bold uppercase text-foreground">{f.q}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{f.a}</p>
            </div>
          ))}
        </div>

        <div className="mt-14 rounded-sm bg-[var(--color-surface-dark)] p-8 text-center text-white">
          <h2 className="font-display text-2xl font-bold uppercase">Want an exact price?</h2>
          <p className="mt-3 text-sm text-white/80">
            Free, written, itemised quote within 48 hours anywhere in Dublin.
          </p>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
          >
            Request your free quote
          </Link>
        </div>
      </section>
    </SiteLayout>
  );
}
