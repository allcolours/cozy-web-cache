import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { TESTIMONIALS, type Testimonial } from "../data/testimonials";

function Stars({ n, className = "text-accent" }: { n: number; className?: string }) {
  return (
    <div role="img" className={`flex gap-0.5 ${className}`} aria-label={`${n} out of 5 stars`}>
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
        <div className="font-display text-sm font-bold uppercase tracking-wide text-[oklch(0.2_0_0)]">
          {t.name}
        </div>
        <div className="mt-1 text-xs uppercase tracking-[0.14em] text-foreground/70">
          {t.role} · {t.location}
        </div>
        <div className="mt-2 text-xs text-primary">{t.project}</div>
      </footer>
    </article>
  );
}

export function TestimonialsSection({
  limit = 6,
  title = "What our clients say",
  eyebrow = "Reviews",
}: {
  limit?: number;
  title?: string;
  eyebrow?: string;
}) {
  const { data: dbItems } = useQuery({
    queryKey: ["testimonials", limit],
    queryFn: async () => {
      const { data, error } = await supabase
        .from("testimonials")
        .select("author_name, author_role, location, content, rating, project_type")
        .eq("visible", true)
        .order("sort_order")
        .limit(limit);
      if (error) throw error;
      return data.map<Testimonial>((d) => ({
        name: d.author_name,
        role: d.author_role ?? "",
        location: d.location ?? "",
        rating: d.rating ?? 5,
        quote: d.content,
        project: d.project_type ?? "",
      }));
    },
  });
  const items = (dbItems && dbItems.length > 0 ? dbItems : TESTIMONIALS).slice(0, limit);
  const firstRow = items.slice(0, 3);
  const secondRow = items.slice(3, 6);
  return (
    <section className="bg-background">
      <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
        <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
          <div>
            <span className="eyebrow">{eyebrow}</span>
            <h2 className="section-title mt-3 text-3xl md:text-4xl">{title}</h2>
            <hr className="section-rule" />
            <p className="mt-3 text-sm text-foreground/70">
              Real client feedback — Facebook &amp; word of mouth
            </p>
          </div>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {firstRow.map((t) => (
            <TestimonialCard key={t.name + t.location} t={t} />
          ))}
        </div>
        {secondRow.length > 0 && (
          <div className="mt-6 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {secondRow.map((t) => (
              <TestimonialCard key={t.name + t.location} t={t} />
            ))}
          </div>
        )}

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:items-center">
          <a
            href="https://www.facebook.com/profile.php?id=61561664309105&sk=reviews"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center rounded-sm border-[2px] border-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary hover:bg-primary hover:text-primary-foreground"
          >
            Read more reviews on Facebook →
          </a>
          <a
            href="https://g.page/r/allcolourspainting/review"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-display text-xs font-bold uppercase tracking-wider text-primary hover:text-[oklch(0.2_0_0)]"
          >
            Leave us a review on Google →
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              aria-hidden="true"
            >
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14 21 3" />
            </svg>
          </a>
          <span className="text-xs text-foreground/70">
            All reviews verified — sourced from our Facebook page.
          </span>
        </div>

        {/* As seen on / trust bar */}
        <div className="mt-16 border-t border-border pt-10">
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center">
            <span className="whitespace-nowrap font-display text-xs font-bold uppercase tracking-wider text-foreground/70">
              Projects delivered for:
            </span>
            <div className="flex flex-wrap gap-2">
              {[
                "Cairn Homes",
                "Bennett Construction",
                "Elliott Group",
                "Clancy Construction",
              ].map((name) => (
                <span
                  key={name}
                  className="rounded-full bg-secondary px-3 py-1.5 text-xs font-semibold uppercase tracking-wider text-foreground/80"
                >
                  {name}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
