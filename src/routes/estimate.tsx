import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";

export const Route = createFileRoute("/estimate")({
  head: () => ({
    meta: [
      { title: "Free Painting Estimate Dublin | All Colours" },
      {
        name: "description",
        content:
          "Get a detailed painting estimate for your Dublin home or business. We visit the site, measure up and deliver a written quote within 48 hours. No pressure.",
      },
      { property: "og:title", content: "Free Painting Estimate Dublin | All Colours" },
      {
        property: "og:description",
        content:
          "Get a detailed painting estimate for your Dublin home or business. We visit the site, measure up and deliver a written quote within 48 hours. No pressure.",
      },
      { property: "og:url", content: "https://allcolourspainter.com/estimate" },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "https://allcolourspainter.com/estimate" }],
  }),
  component: EstimatePage,
});

type Category = "interior" | "exterior" | "joinery" | "floors";
type Mode = "by_room" | "by_element" | "by_floor_area";
type Item = {
  id: string;
  label: string;
  unit: string;
  min: number;
  max: number;
  category: Category;
  /** Which interior mode this item belongs to. Non-interior items leave blank. */
  interiorMode?: Mode;
  note?: string;
};

const MIN_GENERAL = 300;
const MIN_FLOORS = 750;

const ITEMS: Item[] = [
  // ─── By room (count-based, per finished room incl. walls + ceiling + skirting) ───
  { id: "room_bedroom", label: "Bedrooms", unit: "rooms", min: 340, max: 580, category: "interior", interiorMode: "by_room" },
  { id: "room_master", label: "Master bedroom", unit: "rooms", min: 420, max: 720, category: "interior", interiorMode: "by_room" },
  { id: "room_kitchen", label: "Kitchen", unit: "rooms", min: 480, max: 820, category: "interior", interiorMode: "by_room" },
  { id: "room_living", label: "Living room", unit: "rooms", min: 540, max: 940, category: "interior", interiorMode: "by_room" },
  { id: "room_dining", label: "Dining room", unit: "rooms", min: 400, max: 720, category: "interior", interiorMode: "by_room" },
  { id: "room_hall", label: "Hall", unit: "rooms", min: 300, max: 560, category: "interior", interiorMode: "by_room" },
  { id: "room_landing", label: "Landing", unit: "rooms", min: 240, max: 440, category: "interior", interiorMode: "by_room" },
  { id: "room_utility", label: "Utility room", unit: "rooms", min: 220, max: 400, category: "interior", interiorMode: "by_room" },
  { id: "room_bathroom", label: "Bathrooms", unit: "rooms", min: 260, max: 460, category: "interior", interiorMode: "by_room" },
  { id: "room_ensuite", label: "En-suite", unit: "rooms", min: 220, max: 380, category: "interior", interiorMode: "by_room" },
  { id: "room_office", label: "Office / study", unit: "rooms", min: 340, max: 580, category: "interior", interiorMode: "by_room" },

  // ─── By element ───
  { id: "walls", label: "Interior walls (2 coats)", unit: "m²", min: 10.5, max: 16, category: "interior", interiorMode: "by_element" },
  { id: "ceilings", label: "Ceilings", unit: "m²", min: 7.5, max: 11.5, category: "interior", interiorMode: "by_element" },
  { id: "skirting", label: "Skirting boards", unit: "lin. m", min: 3.5, max: 5.5, category: "interior", interiorMode: "by_element" },

  // ─── By floor area (whole property) ───
  { id: "floor_area_total", label: "Total interior floor area (whole property)", unit: "m² floor area", min: 30.5, max: 49.5, category: "interior", interiorMode: "by_floor_area" },

  // ─── Always shown ───
  { id: "facade", label: "Façade (exterior walls)", unit: "m²", min: 14.5, max: 27, category: "exterior" },
  { id: "doors", label: "Doors (both sides + frame)", unit: "doors", min: 35, max: 64, category: "joinery" },
  { id: "windows", label: "Window frames", unit: "windows", min: 35, max: 76, category: "joinery" },
  { id: "radiators", label: "Radiators", unit: "radiators", min: 20, max: 39, category: "joinery" },
  { id: "balustrades", label: "Stair balustrades", unit: "m²", min: 20, max: 35, category: "joinery" },
  { id: "floor_paint", label: "Concrete floor paint (2-pack epoxy, 2 coats)", unit: "m²", min: 11.5, max: 22, category: "floors" },
  { id: "floor_resin", label: "Resin / epoxy poured floor system", unit: "m²", min: 41, max: 99, category: "floors" },
];

type Condition = "good" | "average" | "poor";
const CONDITION: Record<Condition, { label: string; mult: number; desc: string }> = {
  good: { label: "Good", mult: 1.0, desc: "Recently painted, smooth, minimal prep." },
  average: { label: "Average", mult: 1.2, desc: "Filling, sanding, some prep needed." },
  poor: { label: "Poor", mult: 1.5, desc: "Old paint, cracks, damp, heavy prep." },
};

function EstimatePage() {
  const [qty, setQty] = useState<Record<string, string>>({});
  const [condition, setCondition] = useState<Condition>("average");
  const [mode, setMode] = useState<Mode>("by_element");
  const [requestOpen, setRequestOpen] = useState(false);

  const isVisible = (it: Item) => {
    if (it.category !== "interior") return true;
    return it.interiorMode === mode;
  };

  const result = useMemo(() => {
    const mult = CONDITION[condition].mult;
    let generalMin = 0, generalMax = 0;
    let floorsMin = 0, floorsMax = 0;
    const lines: { label: string; min: number; max: number }[] = [];

    for (const it of ITEMS) {
      if (!isVisible(it)) continue;
      const n = parseFloat(qty[it.id] ?? "");
      if (!isFinite(n) || n <= 0) continue;
      const lo = Math.round(n * it.min * mult);
      const hi = Math.round(n * it.max * mult);
      lines.push({ label: it.label + (it.unit === "rooms" && n > 1 ? ` ×${n}` : ""), min: lo, max: hi });
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

  const sectionItems = (cat: Category) => ITEMS.filter((i) => i.category === cat && isVisible(i));

  const renderField = (it: Item) => {
    const isInt = it.unit === "rooms" || it.unit === "doors" || it.unit === "windows" || it.unit === "radiators";
    return (
      <div key={it.id} className="grid gap-2 sm:grid-cols-[1fr_160px] sm:items-center">
        <label htmlFor={it.id} className="font-display text-sm font-semibold uppercase tracking-wide text-[oklch(0.25_0_0)]">
          {it.label}
        </label>
        <div className="flex items-center gap-2">
          <input
            id={it.id}
            type="number"
            inputMode={isInt ? "numeric" : "decimal"}
            min={0}
            step={isInt ? "1" : "0.5"}
            placeholder="0"
            value={qty[it.id] ?? ""}
            onChange={(e) => setQty((q) => ({ ...q, [it.id]: e.target.value }))}
            className="w-full border border-border bg-background px-3 py-2 text-right text-sm focus:border-primary focus:outline-none"
          />
          <span className="whitespace-nowrap text-xs uppercase tracking-wider text-muted-foreground">{it.unit}</span>
        </div>
      </div>
    );
  };

  const modeLabel = (m: Mode) =>
    m === "by_room" ? "By room" : m === "by_element" ? "By element" : "By floor area";

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
                  <div className="inline-flex flex-wrap border border-border">
                    {(["by_room", "by_element", "by_floor_area"] as Mode[]).map((m) => (
                      <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition-colors ${
                          mode === m ? "bg-primary text-primary-foreground" : "bg-background text-foreground hover:bg-primary/10"
                        }`}
                      >
                        {modeLabel(m)}
                      </button>
                    ))}
                  </div>
                </div>
                <p className="mt-2 text-xs text-muted-foreground">
                  {mode === "by_room"
                    ? "Enter how many of each room type — each includes walls, ceiling and skirting."
                    : mode === "by_element"
                      ? "Enter walls, ceilings and skirting separately."
                      : "Enter the total interior floor area of the whole property. Typical 3-bed two-storey ≈ 100 m²."}
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
                <p className="mt-2 text-xs text-muted-foreground">Minimum floor order: €750.</p>
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
                        {result.floorsBumped && <p>Minimum floor order: €750.</p>}
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

                <button
                  type="button"
                  disabled={!result.hasAny}
                  onClick={() => setRequestOpen(true)}
                  className="mt-6 inline-flex w-full items-center justify-center bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:cursor-not-allowed disabled:opacity-50"
                >
                  Send this request
                </button>
                <a
                  href="tel:0858211870"
                  className="mt-3 inline-flex w-full items-center justify-center border border-border bg-background px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-[oklch(0.2_0_0)] transition-colors hover:border-primary hover:text-primary"
                >
                  Call 085 821 1870
                </a>
              </div>
            </div>
          </div>

          <p className="mt-10 border-t border-border pt-6 text-center text-xs uppercase tracking-[0.12em] text-muted-foreground">
            Prices shown are indicative and may vary. The final price will be confirmed and agreed upon during the on-site assessment visit.
          </p>
        </div>
      </section>

      {requestOpen && (
        <RequestModal
          onClose={() => setRequestOpen(false)}
          estimateMin={result.min}
          estimateMax={result.max}
          condition={CONDITION[condition].label + ` (×${CONDITION[condition].mult})`}
          mode={modeLabel(mode)}
          lineItems={result.lines}
        />
      )}
    </>
  );
}

function RequestModal({
  onClose,
  estimateMin,
  estimateMax,
  condition,
  mode,
  lineItems,
}: {
  onClose: () => void;
  estimateMin: number;
  estimateMax: number;
  condition: string;
  mode: string;
  lineItems: { label: string; min: number; max: number }[];
}) {
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    document.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  const fmt = (n: number) =>
    new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    const form = new FormData(e.currentTarget);
    const payload = {
      name: String(form.get("name") || "").trim().slice(0, 100),
      email: String(form.get("email") || "").trim().slice(0, 255),
      phone: String(form.get("phone") || "").trim().slice(0, 50),
      address: String(form.get("address") || "").trim().slice(0, 255),
      description: String(form.get("description") || "").trim().slice(0, 4000),
      estimateMin,
      estimateMax,
      condition,
      mode,
      lineItems,
    };
    const consent = form.get("consent") === "on";
    if (!payload.name || !payload.email || !payload.phone || !payload.address || !payload.description) {
      setError("Please fill in all required fields.");
      setSubmitting(false);
      return;
    }
    if (!consent) {
      setError("Please accept the privacy policy to continue.");
      setSubmitting(false);
      return;
    }
    try {
      const res = await fetch("/api/public/estimate", {
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
    <div
      className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 p-0 sm:items-center sm:p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
    >
      <div
        className="relative max-h-[95vh] w-full max-w-xl overflow-y-auto border-t-[3px] border-primary bg-card p-6 shadow-xl md:p-8"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          aria-label="Close"
          className="absolute right-3 top-3 inline-flex h-9 w-9 items-center justify-center text-foreground hover:text-primary"
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M6 6l12 12M18 6L6 18" />
          </svg>
        </button>

        {sent ? (
          <div className="py-6 text-center">
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
              Thanks — request sent
            </h3>
            <p className="mt-3 text-sm text-foreground">
              We'll be in touch within one working day to arrange a free on-site visit. A confirmation has been sent to your email.
            </p>
            <button
              type="button"
              onClick={onClose}
              className="mt-6 inline-flex items-center justify-center bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-primary/90"
            >
              Close
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <span className="eyebrow text-primary">Send this request</span>
            <h3 className="font-display text-xl font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
              Your details
            </h3>
            <p className="text-sm text-muted-foreground">
              Estimate range: <strong className="text-foreground">{fmt(estimateMin)} – {fmt(estimateMax)}</strong>. We'll come back within one working day to arrange a free on-site visit.
            </p>

            <div className="grid gap-4 sm:grid-cols-2">
              <ModalField label="Name" name="name" required />
              <ModalField label="Phone" name="phone" type="tel" required />
            </div>
            <ModalField label="Email" name="email" type="email" required />
            <ModalField label="Address of the property" name="address" required />
            <div>
              <label htmlFor="description" className="font-display text-xs font-bold uppercase tracking-wider text-[oklch(0.2_0_0)]">
                Description *
              </label>
              <textarea
                id="description"
                name="description"
                required
                rows={4}
                placeholder="Tell us about the property and the work — rooms, surfaces, timing, colour preferences…"
                className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <label htmlFor="consent" className="flex items-start gap-3 pt-1 text-xs text-foreground/75">
              <input id="consent" name="consent" type="checkbox" required className="mt-0.5 h-4 w-4 shrink-0 border-input accent-[oklch(0.55_0.17_158)]" />
              <span>I agree that my details may be used to respond to this enquiry, as described in the Privacy Policy.</span>
            </label>
            {error && <p className="text-sm text-destructive">{error}</p>}
            <button
              type="submit"
              disabled={submitting}
              className="w-full bg-primary px-6 py-3 font-display text-sm font-bold uppercase tracking-wider text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-50"
            >
              {submitting ? "Sending…" : "Send request"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function ModalField({ label, name, type = "text", required }: { label: string; name: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label htmlFor={name} className="font-display text-xs font-bold uppercase tracking-wider text-[oklch(0.2_0_0)]">
        {label}{required && " *"}
      </label>
      <input id={name} name={name} type={type} required={required} className="mt-2 w-full border border-input bg-background px-3 py-2 text-sm outline-none focus:border-primary focus:ring-2 focus:ring-primary/20" />
    </div>
  );
}
