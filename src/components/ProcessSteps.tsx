const STEPS = [
  {
    n: "01",
    t: "Free site visit",
    d: "We come round, walk every room with you, take measurements and notes, and ask the questions the next person won't think to ask.",
  },
  {
    n: "02",
    t: "Detailed written quote",
    d: "Within 48 hours you get a line-by-line quote — labour, materials, prep — with a working-day estimate. The price you see is the price you pay.",
  },
  {
    n: "03",
    t: "Planning together",
    d: "We pick a start date that suits your life, agree on colours and finishes, and plan the schedule so you keep the rooms you need every day.",
  },
  {
    n: "04",
    t: "Protect & prepare",
    d: "Floors covered, furniture sheeted, dust contained. Then the proper prep: sand, fill, prime, repair. This is where the finish is actually decided.",
  },
  {
    n: "05",
    t: "Paint cleanly",
    d: "Trade-grade paints, sharp cut-ins, no masking shortcuts. Daily clean-down so you can move through the house every evening as normal.",
  },
  {
    n: "06",
    t: "Sign-off & 12-month workmanship guarantee",
    d: "We walk the job with you, fix any snags on the spot, leave labelled touch-up paint, and back the whole job with a 12-month workmanship guarantee.",
  },
];

export function ProcessSteps({
  background = "secondary",
}: {
  background?: "secondary" | "background";
}) {
  return (
    <section className={background === "secondary" ? "bg-secondary" : "bg-background"}>
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="max-w-2xl">
          <span className="eyebrow">How we work</span>
          <h2 className="section-title mt-3 text-3xl md:text-4xl">From first call to final coat</h2>
          <hr className="section-rule" />
          <p className="mt-6 text-base text-foreground">
            Six small steps that turn a daunting job into a calm, predictable process — for you and
            for us.
          </p>
        </div>
        <ol className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {STEPS.map((s) => (
            <li key={s.n} className="border-t-[3px] border-primary bg-card p-6 md:p-8">
              <div className="font-display text-5xl font-extrabold leading-none text-primary/25">
                {s.n}
              </div>
              <h3 className="mt-3 font-display text-lg font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
                {s.t}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-foreground">{s.d}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
