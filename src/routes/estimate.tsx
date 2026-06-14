import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Painting Cost Calculator Dublin | All Colours Painting" },
      {
        name: "description",
        content:
          "Estimate your painting & decorating cost in Dublin — interior, exterior, doors, floors. Quick from–to range before requesting a free on-site quote.",
      },
      { property: "og:title", content: "Painting Cost Calculator — Dublin" },
      {
        property: "og:description",
        content:
          "Quick from–to cost range for painting jobs in Dublin. Not a binding quote — a budget sanity check.",
      },
      { property: "og:url", content: "https://allcolourspainter.com/estimate" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/estimate" }],
  }),
  component: EstimatePage,
});

type Category = "interior" | "exterior" | "joinery" | "floors";
type Item = {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  category: Category;
  note?: string;
};

const MIN_GENERAL = 300;
const MIN_FLOORS = 900;

const ITEMS: Item[] = [
  { id: "walls", label: "Interior walls (2 coats)", unit: "m²", min: 12, max: 20, category: "interior" },
  { id: "room_full", label: "Full room (walls + ceiling + skirting/reveals)", unit: "m² floor area", min: 35, max: 60, category: "interior" },
  { id: "ceilings", label: "Ceilings", unit: "m²", min: 8, max: 15, category: "interior" },
  { id: "skirting", label: "Skirting boards", unit: "lin. m", min: 4, max: 8, category: "interior" },
  { id: "facade", label: "Façade (exterior walls)", unit: "m²", min: 18, max: 35, category: "exterior" },
  { id: "doors", label: "Doors (both sides + frame)", unit: "doors", min: 40, max: 80, category: "joinery" },
  { id: "windows", label: "Window frames", unit: "windows", min: 40, max: 90, category: "joinery" },
  { id: "radiators", label: "Radiators", unit: "radiators", min: 25, max: 50, category: "joinery" },
  { id: "balustrades", label: "Stair balustrades", unit: "m²", min: 25, max: 45, category: "joinery" },
  { id: "floor_paint", label: "Concrete floor paint (2-pack epoxy, 2 coats)", unit: "m²", min: 15, max: 30, category: "floors" },
  { id: "floor_resin", label: "Resin / epoxy poured floor system", unit: "m²", min: 50, max: 130, category: "floors" },
];

type Condition = "good" | "average" | "poor";
const CONDITION: Record<Condition, { label: string; mult: number; desc: string }> = {
  good: { label: "Good", mult: 1.0, desc: "Recently painted, smooth, minimal prep." },
  average: { label: "Average", mult: 1.2, desc: "Filling, sanding, some prep needed." },
  poor: { label: "Poor", mult: 1.5, desc: "Old paint, cracks, damp, heavy prep." },
};

type Mode = "per_room" | "per_element";

function EstimatePage() {
  const [qty, setQty] = useState<Record<string, string>>({});
  const [condition, setCondition] = useState<Condition>("average");
  const [mode, setMode] = useState<Mode>("per_element");

  const result = useMemo(() => {
    const mult = CONDITION[condition].mult;
    let generalMin = 0, generalMax = 0;
    let floorsMin = 0, floorsMax = 0;
    const lines: { label: string; min: number; max: number }[] = [];

    for (const it of ITEMS) {
      // Hide based on mode
      if (mode === "per_room" && (it.id === "walls" || it.id === "ceilings" || it.id === "skirting")) continue;
      if (mode === "per_element" && it.id === "room_full") continue;

      const n = parseFloat(qty[it.id] ?? "");
      if (!isFinite(n) || n <= 0) continue;
      const lo = Math.round(n * it.min * mult);
      const hi = Math.round(n * it.max * mult);
      lines.push({ label: it.label, min: lo, max: hi });
      if (it.category === "floors") {
        floorsMin += lo; floorsMax += hi;
      } else {
        generalMin += lo; generalMax += hi;
      }
    }

    const generalBumped = generalMin > 0 && generalMin < MIN_GENERAL;
    const floorsBumped = floorsMin > 0 && floorsMin < MIN_FLOORS;
    if (generalBumped) { generalMin = MIN_GENERAL; if (generalMax < MIN_GENERAL) generalMax = MIN_GENERAL; }
    if (floorsBumped) { floorsMin = MIN_FLOORS; if (floorsMax < MIN_FLOORS) floorsMax = MIN_FLOORS; }

    return {
      min: generalMin + floorsMin,
      max: generalMax + floorsMax,
      lines,
      generalBumped,
      floorsBumped,
      hasAny: lines.length > 0,
    };
  }, [qty, condition, mode]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  const sectionItems = (cat: Category) =>
    ITEMS.filter((i) => {
      if (i.category !== cat) return false;
      if (mode === "per_room" && (i.id === "walls" || i.id === "ceilings" || i.id === "skirting")) return false;
      if (mode === "per_element" && i.id === "room_full") return false;
      return true;
    });

  const renderField = (it: Item) => (
    <div key={it.id} className="grid gap-2 sm:grid-cols-[1fr_160px] sm:items-center">
      <label htmlFor={it.id} className="font-display text-sm font-semibold uppercase tracking-wide text-[oklch(0.25_0_0)]">
        {it.label}
      </label>
      <div className="flex items-center gap-2">
        <input
          id={it.id}
          type="number"
          inputMode="decimal"
          min={0}
          step={it.unit.includes("m²") || it.unit.includes("lin") ? "0.5" : "1"}
          placeholder="0"
          value={qty[it.id] ?? ""}
          onChange={(e) => setQty((q) => ({ ...q, [it.id]: e.target.value }))}
          className="w-full border border-border bg-background px-3 py-2 text-right text-sm focus:border-primary focus:outline-none"
        />
        <span className="whitespace-nowrap text-xs uppercase tracking-wider text-muted-foreground">{it.unit}</span>
      </div>
    </div>
  );

  return (
    <>
      <section className="bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)]">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <span className="eyebrow text-primary">Cost calculator</span>
          <h1 className="mt-3 font-display text-3xl font-bold uppercase tracking-tight text-white md:text-5xl">
            Painting cost estimate — Dublin
          </h1>
          <p className="mt-5 max-w-2xl text-base text-white/75 md:text-lg">
            A quick from–to range for planning your budget. Final price is confirmed after a free
            on-site visit — written quote within 48 hours.
          </p>
        </div>
      </section>

      <section className="bg-background">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
          <div className="grid gap-10 lg:grid-cols-5">
            <div className="lg:col-span-3 space-y-8">
              {/* Condition */}
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  1. Surface condition
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
                          active ? "border-primary bg-primary/5" : "border-border bg-background hover:border-primary/50"
                        }`}
                      >
                        <div className="font-display text-sm font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                          {c.label} <span className="text-primary">×{c.mult}</span>
                        </div>
                        <p className="mt-2 text-xs text-muted-foreground">{c.desc}</p>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Interior */}
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                    2. Interior
                  </h2>
                  <div className="inline-flex border border-border">
                    {(["per_room", "per_element"] as Mode[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                          mode === m ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-primary/10"
                        }`}
                      >
                        {m === "per_room" ? "By room" : "By element"}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {mode === "per_room"
                    ? "Enter the floor area of each room — covers walls, ceiling and skirting."
                    : "Enter walls, ceilings and skirting separately."}
                </p>
                <div className="mt-6 space-y-5">{sectionItems("interior").map(renderField)}</div>
              </div>

              {/* Exterior */}
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">3. Exterior</h2>
                <div className="mt-6 space-y-5">{sectionItems("exterior").map(renderField)}</div>
              </div>

              {/* Joinery */}
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  4. Doors, windows, radiators, balustrades
                </h2>
                <div className="mt-6 space-y-5">{sectionItems("joinery").map(renderField)}</div>
              </div>

              {/* Floors */}
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  5. Floors
                </h2>
                <p className="mt-2 text-xs text-muted-foreground">Minimum floor order: €900.</p>
                <div className="mt-6 space-y-5">{sectionItems("floors").map(renderField)}</div>
              </div>
            </div>

            {/* Result */}
            <div className="lg:col-span-2">
              <div className="sticky top-24 border-t-[3px] border-primary bg-card p-6 md:p-8">
                <span className="eyebrow text-primary">Your estimate</span>
                <h2 className="mt-3 font-display text-2xl font-bold uppercase tracking-tight text-[oklch(0.2_0_0)]">
                  Approx. cost
                </h2>

                {!result.hasAny ? (
                  <p className="mt-6 text-sm text-muted-foreground">
                    Add at least one quantity to see a range.
                  </p>
                ) : (
                  <>
                    <div className="mt-6 flex items-baseline gap-2">
                      <span className="font-display text-3xl font-bold text-[oklch(0.2_0_0)] md:text-4xl">
                        {fmt(result.min)} – {fmt(result.max)}
                      </span>
                    </div>
                    <p className="mt-2 text-xs uppercase tracking-[0.18em] text-muted-foreground">
                      Materials & labour
                    </p>

                    {(result.generalBumped || result.floorsBumped) && (
                      <div className="mt-4 space-y-1 text-xs text-muted-foreground">
                        {result.generalBumped && <p>Minimum order: €300.</p>}
                        {result.floorsBumped && <p>Minimum floor order: €900.</p>}
                      </div>
                    )}

                    <ul className="mt-6 space-y-2 border-t border-border pt-5 text-sm">
                      {result.lines.map((l) => (
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
                    Indicative only — not a binding quote. Exact price is confirmed after a free on-site
                    visit, with a written proposal within 48 hours. The free visit is included and not
                    charged separately.
                  </p>
                </div>

                <Link
                  to="/contact"
                  className="mt-6 inline-flex w-full items-center justify-center bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90"
                >
                  Request an exact quote
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
