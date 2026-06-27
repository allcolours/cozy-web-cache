import { createFileRoute } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { SiteLayout } from "../components/SiteLayout";
import { SITE, WHATSAPP_URL } from "@/lib/site";

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
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({"@context":"https://schema.org","@type":"BreadcrumbList","itemListElement":[{"@type":"ListItem","position":1,"name":"Home","item":"https://allcolourspainter.com/"},{"@type":"ListItem","position":2,"name":"Free Painting Estimate","item":"https://allcolourspainter.com/estimate"}]}),
      },
    ],
  }),
  component: EstimatePage,
});

type WorkType = "interior" | "exterior" | "interior-exterior" | "commercial";

const WORK_TYPES: { id: WorkType; label: string; rate: number }[] = [
  { id: "interior", label: "Interior", rate: 12 },
  { id: "exterior", label: "Exterior", rate: 18 },
  { id: "interior-exterior", label: "Interior + Exterior", rate: 28 },
  { id: "commercial", label: "Commercial", rate: 22 },
];

const EXTRAS = [
  { id: "woodwork", label: "Woodwork & trim", price: 400 },
  { id: "ceilings", label: "All ceilings", price: 600 },
  { id: "epoxy", label: "Epoxy floor", price: 900 },
  { id: "doors", label: "Doors & frames", price: 350 },
  { id: "feature", label: "Feature wall", price: 500 },
  { id: "railings", label: "Railings & gates", price: 700 },
];

const TRUST_POINTS = [
  { title: "Free on-site visit", body: "We come to you, measure up, no charge" },
  { title: "Written quote in 48 hours", body: "Line-by-line breakdown, no surprises" },
  { title: "12-month workmanship guarantee", body: "On every job, every time" },
];

function roundTo50(n: number) {
  return Math.round(n / 50) * 50;
}

function formatCurrency(n: number) {
  return new Intl.NumberFormat("en-IE", { style: "currency", currency: "EUR", maximumFractionDigits: 0 }).format(n);
}

function EstimatePage() {
  const [workType, setWorkType] = useState<WorkType>("interior");
  const [area, setArea] = useState<number>(80);
  const [rooms, setRooms] = useState<number>(4);
  const [selectedExtras, setSelectedExtras] = useState<Set<string>>(new Set());

  const rate = useMemo(() => WORK_TYPES.find((w) => w.id === workType)?.rate ?? 12, [workType]);

  const baseCost = area * rate;
  const extrasCost = useMemo(() => {
    return EXTRAS.filter((e) => selectedExtras.has(e.id)).reduce((sum, e) => sum + e.price, 0);
  }, [selectedExtras]);

  const total = baseCost + extrasCost;
  const low = roundTo50(total * 0.9);
  const high = roundTo50(total * 1.25);

  function handleRoomsChange(value: number) {
    setRooms(value);
    setArea(value * 20);
  }

  function toggleExtra(id: string) {
    setSelectedExtras((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  }

  const selectedExtrasList = EXTRAS.filter((e) => selectedExtras.has(e.id));

  return (
    <SiteLayout>
      {/* Hero intro */}
      <section className="bg-[var(--color-surface-dark)] text-[var(--color-surface-dark-foreground)]">
        <div className="mx-auto max-w-4xl px-4 py-16 text-center md:px-8 md:py-24">
          <span className="eyebrow text-primary">Cost calculator</span>
          <h1 className="mt-3 font-display text-3xl font-extrabold uppercase tracking-tight text-white md:text-5xl">
            Get an Instant Estimate
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
            Select your job type and size for a ballpark range. We'll follow up with a precise written quote after a free site visit.
          </p>
        </div>
      </section>

      {/* Calculator */}
      <section className="bg-background">
        <div className="mx-auto max-w-5xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-10 lg:grid-cols-5">
            {/* Inputs */}
            <div className="space-y-8 lg:col-span-3">
              {/* Type of work */}
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  1. Type of work
                </h2>
                <div className="mt-5 grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {WORK_TYPES.map((w) => {
                    const active = workType === w.id;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        onClick={() => setWorkType(w.id)}
                        className={`rounded-sm border px-4 py-3 text-center font-display text-xs font-bold uppercase tracking-wider transition-colors ${
                          active
                            ? "border-primary bg-primary text-primary-foreground"
                            : "border-border bg-background text-foreground hover:border-primary hover:text-primary"
                        }`}
                      >
                        {w.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Size */}
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  2. Size
                </h2>

                <div className="mt-6 space-y-6">
                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="area" className="font-display text-sm font-semibold uppercase tracking-wide text-[oklch(0.25_0_0)]">
                        Floor area
                      </label>
                      <span className="font-display text-sm font-bold text-primary">{area} m²</span>
                    </div>
                    <input
                      id="area"
                      type="range"
                      min={20}
                      max={400}
                      step={5}
                      value={area}
                      onChange={(e) => setArea(Number(e.target.value))}
                      className="mt-3 w-full accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>20 m²</span>
                      <span>400 m²</span>
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between">
                      <label htmlFor="rooms" className="font-display text-sm font-semibold uppercase tracking-wide text-[oklch(0.25_0_0)]">
                        Number of rooms
                      </label>
                      <span className="font-display text-sm font-bold text-primary">{rooms}</span>
                    </div>
                    <input
                      id="rooms"
                      type="range"
                      min={1}
                      max={12}
                      step={1}
                      value={rooms}
                      onChange={(e) => handleRoomsChange(Number(e.target.value))}
                      className="mt-3 w-full accent-primary"
                    />
                    <div className="mt-1 flex justify-between text-xs text-muted-foreground">
                      <span>1</span>
                      <span>12</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Extras */}
              <div className="border-t-[3px] border-primary bg-card p-6 md:p-8">
                <h2 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                  3. Extras
                </h2>
                <div className="mt-5 grid gap-3 sm:grid-cols-2">
                  {EXTRAS.map((e) => {
                    const active = selectedExtras.has(e.id);
                    return (
                      <button
                        key={e.id}
                        type="button"
                        onClick={() => toggleExtra(e.id)}
                        className={`flex items-center justify-between rounded-sm border px-4 py-3 text-left transition-colors ${
                          active
                            ? "border-primary bg-primary/5"
                            : "border-border bg-background hover:border-primary/50"
                        }`}
                      >
                        <span className={`font-display text-xs font-bold uppercase tracking-wide ${active ? "text-primary" : "text-[oklch(0.2_0_0)]"}`}>
                          {e.label}
                        </span>
                        <span className="text-sm font-semibold text-foreground">+{formatCurrency(e.price)}</span>
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
                <div className="mt-4 font-display text-4xl font-extrabold text-[oklch(0.2_0_0)] md:text-5xl">
                  {formatCurrency(low)} – {formatCurrency(high)}
                </div>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  Guide estimate only — free on-site quote within 48 hours
                </p>

                <div className="mt-6 flex flex-col gap-3">
                  <a
                    href={`tel:${SITE.phoneTel}`}
                    className="inline-flex items-center justify-center rounded-sm bg-[oklch(0.25_0_0)] px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white transition-colors hover:bg-black`
                  >
                    📞 Call ${SITE.phoneDisplay}
                  </a>
                  <a
                    href={WHATSAPP_URL}
                    target=`_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center rounded-sm bg-[#25D366] px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-white transition-colors hover:opacity-90"
                  >
                    💬 Send photos on WhatsApp
                  </a>
                </div>

                {/* Breakdown */}
                <div className="mt-8 border-t border-border pt-6">
                  <h3 className="font-display text-xs font-bold uppercase tracking-wider text-[oklch(0.3_0_0)]">
                    Cost breakdown
                  </h3>
                  <ul className="mt-4 space-y-3 text-sm">
                    <li className="flex items-center justify-between">
                      <span className="text-foreground">{WORK_TYPES.find((w) => w.id === workType)?.label} painting</span>
                      <span className="font-medium text-foreground">{formatCurrency(baseCost)}</span>
                    </li>
                    {selectedExtrasList.map((e) => (
                      <li key={e.id} className="flex items-center justify-between">
                        <span className="text-foreground">{e.label}</span>
                        <span className="font-medium text-foreground">+{formatCurrency(e.price)}</span>
                      </li>
                    ))}
                    <li className="flex items-center justify-between border-t border-border pt-3">
                      <span className="font-semibold text-[oklch(0.2_0_0)]">Estimated total</span>
                      <span className="font-bold text-primary">{formatCurrency(total)}</span>
                    </li>
                    <li className="flex items-center justify-between text-xs text-muted-foreground">
                      <span>Guide range</span>
                      <span>{formatCurrency(low)} – {formatCurrency(high)}</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Reassurance */}
      <section className="bg-secondary">
        <div className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
          <div className="grid gap-8 md:grid-cols-3">
            {TRUST_POINTS.map((p) => (
              <div key={p.title} className="border-t-[3px] border-primary bg-background p-6">
                <h3 className="font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{p.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-foreground/80">{p.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
