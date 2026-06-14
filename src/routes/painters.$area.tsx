import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import { FaqAccordion } from "../components/FaqAccordion";
import { FAQS } from "../data/faqs";
import { AREAS } from "../data/areas";
import { TESTIMONIALS } from "../data/testimonials";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

export const Route = createFileRoute("/painters/$area")({
  loader: ({ params }) => {
    const area = AREAS.find((a) => a.slug === params.area);
    if (!area) throw notFound();
    return area;
  },
  head: ({ params, loaderData }) => {
    const area = loaderData ?? AREAS.find((a) => a.slug === params.area);
    const name = area?.name ?? "Dublin";
    const title = `Painters ${name} | Professional Painter & Decorator – All Colours`;
    const description = `Trusted painters in ${name}${area?.postcode ? `, ${area.postcode}` : ""}. Interior, exterior, kitchen & commercial painting. Free quotes, fully insured, 1,200+ projects completed.`;
    const url = `https://allcolourspainter.com/painters/${params.area}`;
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: `https://allcolourspainter.com${heroAsset.url}` },
        { property: "twitter:image", content: `https://allcolourspainter.com${heroAsset.url}` },
      ],
      links: [{ rel: "canonical", href: url }],
      scripts: [
        {
          type: "application/ld+json",
          children: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "LocalBusiness",
            name: `All Colours Painting – Painters ${name}`,
            url,
            telephone: "+353 85 821 1870",
            email: "info@allcolourspainter.com",
            image: heroAsset.url,
            priceRange: "€€",
            address: {
              "@type": "PostalAddress",
              addressLocality: name,
              addressRegion: area?.postcode ?? "Dublin",
              addressCountry: "IE",
            },
            areaServed: { "@type": "Place", name },
            aggregateRating: {
              "@type": "AggregateRating",
              ratingValue: "5.0",
              reviewCount: String(TESTIMONIALS.length),
            },
          }),
        },
      ],
    };
  },
  component: AreaPage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
        <h1 className="font-display text-3xl font-bold uppercase">Area not found</h1>
        <p className="mt-4 text-muted-foreground">
          We service all of Dublin — call us for a free quote in your area.
        </p>
        <Link to="/painters" className="mt-6 inline-flex rounded-sm bg-primary px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground">
          See all areas
        </Link>
      </div>
    </SiteLayout>
  ),
  errorComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
        <h1 className="font-display text-2xl font-bold uppercase">Something went wrong</h1>
        <Link to="/" className="mt-6 inline-flex text-primary hover:underline">Back home</Link>
      </div>
    </SiteLayout>
  ),
});

const SERVICES = [
  "Interior painting",
  "Exterior painting",
  "Kitchen cabinet painting",
  "Apartment & house repaints",
  "Spray finishing",
  "Wallpapering",
  "Commercial fit-outs",
  "Epoxy & floor painting",
];

function AreaPage() {
  const area = Route.useLoaderData();

  return (
    <SiteLayout>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden bg-[var(--color-surface-dark)] text-white"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.65), rgba(0,0,0,0.75)), url(${heroAsset.url})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">
            {area.postcode ?? "Dublin"}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            Professional painters in {area.name}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            {area.blurb}
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/contact"
              className="inline-flex items-center rounded-sm bg-primary px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground hover:bg-[oklch(0.62_0.17_158)]"
            >
              Get a free quote
            </Link>
            <a
              href={`tel:${COMPANY.phone.replace(/\s/g, "")}`}
              className="inline-flex items-center rounded-sm border border-white/30 bg-white/5 px-6 py-3 font-display text-xs font-bold uppercase tracking-wider text-white hover:bg-white/10"
            >
              Call {COMPANY.phone}
            </a>
          </div>
        </div>
      </section>

      {/* Why us in this area */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-foreground md:text-4xl">
              Why homeowners in {area.name} choose us
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              We've been painting and decorating across Dublin for over a decade. Our {area.name} clients
              get the same dedicated crew, written quote, and workmanship guarantee — backed by 1,200+
              completed projects across the city.
            </p>
            <ul className="mt-6 space-y-3">
              {area.highlights.map((h: string) => (
                <li key={h} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-border bg-card p-8">
            <h3 className="font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Services in {area.name}
            </h3>
            <div className="mt-2 h-[2px] w-10 bg-primary" />
            <ul className="mt-5 grid grid-cols-1 gap-2 text-sm text-foreground sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s} className="flex items-center gap-2">
                  <span className="inline-block h-1.5 w-1.5 rounded-full bg-primary" />
                  {s}
                </li>
              ))}
            </ul>
            <div className="mt-6 rounded-sm bg-secondary p-4 text-xs text-muted-foreground">
              30+ painters · Fully insured · Commercial & residential · Dublin based
            </div>
          </div>
        </div>
      </section>

      {/* Stats strip */}
      <section className="border-y border-border bg-secondary py-10">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-6 px-4 text-center md:grid-cols-4 md:px-8">
          {[
            ["1,200+", "Projects"],
            ["10+", "Years"],
            ["30+", "Painters"],
            ["5★", "Average rating"],
          ].map(([k, v]) => (
            <div key={k}>
              <div className="font-display text-2xl font-bold text-primary md:text-3xl">{k}</div>
              <div className="mt-1 text-xs uppercase tracking-wider text-muted-foreground">{v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="mx-auto max-w-4xl px-4 py-16 md:px-8 md:py-20">
        <h2 className="text-center font-display text-3xl font-bold uppercase text-foreground md:text-4xl">
          {area.name} painting FAQ
        </h2>
        <div className="mt-10">
          <FaqAccordion items={FAQS.slice(0, 6)} />
        </div>
      </section>

      {/* Other areas */}
      <section className="border-t border-border bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-xl font-bold uppercase text-foreground">
            We also paint in
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {AREAS.filter((a) => a.slug !== area.slug).map((a) => (
              <Link
                key={a.slug}
                to="/painters/$area"
                params={{ area: a.slug }}
                className="rounded-sm border border-border bg-card px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary"
              >
                Painters {a.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
