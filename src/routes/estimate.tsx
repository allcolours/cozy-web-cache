import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Painting Cost Calculator Dublin | All Colours Painting" },
      {
        name: "description",
        content:
          "Rough painting & decorating cost estimate for Dublin homes — interior, exterior, doors, ceilings. Get a quick from–to range in seconds before requesting a full quote.",
      },
      { property: "og:title", content: "Painting Cost Calculator — Dublin" },
      {
        property: "og:description",
        content:
          "Quick from–to cost range for painting jobs in Dublin. Not a quote — a sanity check before you call.",
      },
      { property: "og:url", content: "https://allcolourspainter.com/estimate" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/estimate" }],
  }),
  component: EstimatePage,
});

type WorkType = {
  id: string;
  label: string;
  unit: "m2" | "unit";
  unitLabel: string;
  min: number;
  max: number;
  hint: string;
};

const WORK: WorkType[] = [
  {
    id: "interior_walls",
    label: "Interior — walls only (2 coats)",
    unit: "m2",
    unitLabel: "m² wall area",
    min: 9,
    max: 16,
    hint: "Roughly room perimeter × ceiling height.",
  },
  {
    id: "interior_full",
    label: "Interior — full room (walls + ceiling + trim)",
    unit: "m2",
    unitLabel: "m² floor area",
    min: 22,
    max: 38,
    hint: "Use the floor area of the room.",
  },
  {
    id: "ceiling",
    label: "Ceilings only (2 coats)",
    unit: "m2",
    unitLabel: "m² ceiling area",
    min: 8,
    max: 14,
    hint: "Same as the room's floor area.",
  },
  {
    id: "exterior",
    label: "Exterior walls / render / pebbledash",
    unit: "m2",
    unitLabel: "m² façade area",
    min: 18,
    max: 32,
    hint: "Includes wash-down and 2 coats of masonry paint.",
  },
  {
    id: "doors",
    label: "Internal doors (both sides + frame)",
    unit: "unit",
    unitLabel: "doors",
    min: 70,
    max: 130,
    hint: "Sand, prime where needed, 2 coats.",
  },
  {
    id: "radiators",
    label: "Radiators",
    unit: "unit",
    unitLabel: "radiators",
    min: 40,
    max: 80,
    hint: "Light sand, prime, 2 coats.",
  },
  {
    id: "windows",
    label: "Window frames (interior)",
    unit: "unit",
    unitLabel: "windows",
    min: 60,
    max: 110,
    hint: "Per window, standard size.",
  },
];

type Condition = "good" | "average" | "poor";
const CONDITION: Record<Condition, { label: string; mult: number; desc: string }> = {
  good: { label: "Good", mult: 0.95, desc: "Recently painted, smooth, no major prep." },
  average: { label: "Average", mult: 1.0, desc: "Minor filling, light sanding needed." },
  poor: {
    label: "Poor / bare plaster",
    mult: 1.25,
    desc: "Heavy prep, stain blocking, fresh plaster sealing.",
  },
};

function EstimatePage() {
  const [qty, setQty] = useState<Record<string, string>>({});
  const [condition, setCondition] = useState<Condition>("average");

  const { min, max, lines } = useMemo(() => {
    let totalMin = 0;
    let totalMax = 0;
    const out: { label: string; min: number; max: number }[] = [];
    for (const w of WORK) {
      const n = parseFloat(qty[w.id] ?? "");
      if (!isFinite(n) || n <= 0) continue;
      const lo = Math.round(n * w.min * CONDITION[condition].mult);
      const hi = Math.round(n * w.max * CONDITION[condition].mult);
      totalMin += lo;
      totalMax += hi;
      out.push({ label: w.label, min: lo, max: hi });
    }
    return { min: totalMin, max: totalMax, lines: out };
  }, [qty, condition]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  return (
    <>
      <section className="bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <span className="eyebrow text-primary">Cost calculator</span>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
            Quick painting cost estimate — Dublin
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">
            A rough from–to range so you can sanity-check your budget before requesting a proper quote.
            Real prices depend on prep, access, paint grade and finish — we'll confirm everything on site, free.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Inputs */}
            <div className="lg:col-span-3">
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  1. Type & quantity of work
                </h2>
                <p className="mt-2 text-sm text-muted-foreground">
                  Fill in only what applies. Leave the rest blank.
                </p>

                <div className="mt-6 space-y-5">
                  {WORK.map((w) => (
                    <div key={w.id} className="grid gap-2 sm:grid-cols-[1fr_160px] sm:items-center">
                      <div>
                        <label htmlFor={w.id} className="font-display text-sm font-semibold uppercase tracking-wide text-[oklch(0.25_0_0)]">
                          {w.label}
                        </label>
                        <p className="mt-1 text-xs text-muted-foreground">{w.hint}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <input
                          id={w.id}
                          type="number"
                          inputMode="decimal"
                          min={0}
                          step={w.unit === "m2" ? "0.5" : "1"}
                          placeholder="0"
                          value={qty[w.id] ?? ""}
                          onChange={(e) => setQty((q) => ({ ...q, [w.id]: e.target.value }))}
                          className="w-full border border-border bg-background px-3 py-2 text-right text-sm focus:border-primary focus:outline-none"
                        />
                        <span className="whitespace-nowrap text-xs uppercase tracking-wider text-muted-foreground">
                          {w.unitLabel}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-8 border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  2. Surface condition
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-3">
                  {(Object.keys(CONDITION) as Condition[]).map((k) => {
                    const c = CONDITION[k];
                    const active = condition === k;
                    return (
                      <button
                        key={k}
                        type="button"
                        onClick={() => setCondition(k)}
                        className={`border p-4 text-left transition-colors ${
                          active
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:border-primary/50"
                        }`}
                      >
                        <div className="font-display text-sm font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                          {c.label}
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{c.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 border-t-[3px] border-primary bg-card p-6 md:p-8">
                <span className="eyebrow text-primary">Your estimate</span>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-[oklch(0.2_0_0)]">
                  Approx. cost
                </h2>

                {min === 0 ? (
                  <p className="mt-6 text-sm text-muted-foreground">
                    Add at least one quantity above to see a range.
                  </p>
                ) : (
                  <>
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="font-display text-3xl font-bold text-[oklch(0.2_0_0)] md:text-4xl">
                        {fmt(min)} – {fmt(max)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Materials & labour, ex-VAT
                    </p>

                    <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                      {lines.map((l) => (
                        <li key={l.label} className="flex items-start justify-between gap-3">
                          <span className="text-foreground">{l.label}</span>
                          <span className="whitespace-nowrap text-muted-foreground">
                            {fmt(l.min)} – {fmt(l.max)}
                          </span>
                        </li>
                      ))}
                    </ul>
                  </>
                )}

                <div className="mt-6 border-t border-border pt-5">
                  <p className="text-xs leading-relaxed text-muted-foreground">
                    This is an indicative range only — not a binding quote. Final price depends on access,
                    paint grade, scaffolding, lead-time and site conditions. Site visits are free.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Get a proper quote — free
                </Link>
                <a
                  href="tel:0858211870"
                  className="mt-3 inline-flex w-full items-center justify-center border border-border bg-background px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0_0)] transition-colors hover:border-primary hover:text-primary"
                >
                  Call 085 821 1870
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
