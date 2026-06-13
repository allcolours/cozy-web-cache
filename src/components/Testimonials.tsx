import { TESTIMONIALS, type Testimonial } from "../data/testimonials";

function Stars({ n }: { n: number }) {
  return (
    <div className="flex gap-0.5 text-accent" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: n }).map((_, i) => (
        <svg key={i} width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14l-5-4.87 6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  );
}

export function TestimonialCard({ t }: { t: Testimonial }) {
  return (
    <article className="flex h-full flex-col border-t-[3px] border-primary bg-card p-6 md:p-8">
      <Stars n={t.rating} />
      <blockquote className="mt-4 flex-1 text-base leading-relaxed text-[oklch(0.25_0_0)]">
        <span className="text-3xl leading-none text-primary/40">“</span>
        {t.quote}
      </blockquote>
      <footer className="mt-6 border-t border-border pt-4">
        <div className="font-display text-sm font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">{t.name}</div>
        <div className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/70">
          {t.role} · {t.location}
        </div>
        <div className="mt-2 text-xs text-primary">{t.project}</div>
      </footer>
    </article>
  );
}

export function TestimonialsSection({ limit, title = "What our clients say", eyebrow = "Reviews" }: { limit?: number; title?: string; eyebrow?: string }) {
  const items = limit ? TESTIMONIALS.slice(0, limit) : TESTIMONIALS;
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">{title}</h2>
            <hr className="section-rule" />
          </div>
          <div className="flex items-center gap-3 text-sm text-foreground/80">
            <Stars n={5} />
            <span><strong className="text-[oklch(0.2_0_0)]">5.0</strong> · word-of-mouth, all real clients</span>
          </div>
        </div>
        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <TestimonialCard key={t.name + t.location} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
