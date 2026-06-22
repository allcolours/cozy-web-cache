import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { SiteLayout, COMPANY } from "../components/SiteLayout";
import { FaqAccordion } from "../components/FaqAccordion";
import { FAQS } from "../data/faqs";
import { SERVICES } from "../data/services";
import { TESTIMONIALS } from "../data/testimonials";
import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";

function serviceHeroImage(service?: { slug: string; name: string }) {
  if (service?.slug === "new-build-painting") {
    return {
      src: "/images/10-new-build-exterior-white-render-anthracite-windows-dublin.jpg",
      alt: "New build exterior painting white render anthracite windows Dublin",
    };
  }
  return {
    src: heroAsset.url,
    alt: `${service?.name ?? "Painting service"} in Dublin — All Colours Painting`,
  };
}

export const Route = createFileRoute("/services_/$service")({
  loader: ({ params }) => {
    const service = SERVICES.find((s) => s.slug === params.service);
    if (!service) throw notFound();
    return service;
  },
  head: ({ params, loaderData }) => {
    const service = loaderData ?? SERVICES.find((s) => s.slug === params.service);
    const title = service?.metaTitle ?? "Painting Service – All Colours Painting";
    const description = service?.metaDescription ?? "Professional painting services across Dublin.";
    const url = `https://allcolourspainter.com/services/${params.service}`;
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
            "@type": "Service",
            name: service?.name,
            provider: {
              "@type": "LocalBusiness",
              name: "All Colours Painting",
              telephone: "+353 85 821 1870",
              address: { "@type": "PostalAddress", addressLocality: "Dublin", addressCountry: "IE" },
            },
            areaServed: { "@type": "City", name: "Dublin" },
            description,
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
  component: ServicePage,
  notFoundComponent: () => (
    <SiteLayout>
      <div className="mx-auto max-w-3xl px-4 py-24 text-center md:px-8">
        <h1 className="font-display text-3xl font-bold uppercase">Service not found</h1>
        <Link to="/services" className="mt-6 inline-flex rounded-sm bg-primary px-5 py-3 font-display text-xs font-bold uppercase tracking-wider text-primary-foreground">
          See all services
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

function ServicePage() {
  const service = Route.useLoaderData();

  const heroImage =
    service.slug === "new-build-painting"
      ? { src: "/images/10-new-build-exterior-white-render-anthracite-windows-dublin.jpg", alt: "New build exterior painting with white render and anthracite windows, Dublin" }
      : { src: heroAsset.url, alt: `${service.name} in Dublin — All Colours Painting` };

  return (
    <SiteLayout>
      {/* Hero */}
      <section className="relative isolate overflow-hidden bg-[var(--color-surface-dark)] text-white">
        <img src={heroImage.src} alt={heroImage.alt} fetchPriority="high" decoding="async" width={1920} height={900} className="absolute inset-0 -z-10 h-full w-full object-cover" />
        <div className="absolute inset-0 -z-10 bg-black/70" />
        <div className="mx-auto max-w-7xl px-4 py-20 md:px-8 md:py-28">
          <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">
            Dublin · Fully insured
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl font-bold uppercase leading-tight md:text-6xl">
            {service.h1}
          </h1>
          <p className="mt-6 max-w-2xl text-base text-white/85 md:text-lg">
            {service.intro}
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

      {/* What's included + price */}
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-20">
        <div className="grid gap-10 md:grid-cols-2">
          <div>
            <h2 className="font-display text-3xl font-bold uppercase text-foreground md:text-4xl">
              What's included
            </h2>
            <ul className="mt-6 space-y-3">
              {service.features.map((f: string) => (
                <li key={f} className="flex items-start gap-3 text-sm text-foreground">
                  <span className="mt-1 inline-block h-2 w-2 shrink-0 rounded-full bg-primary" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="rounded-sm border border-border bg-card p-8">
            <p className="font-display text-xs font-bold uppercase tracking-wider text-muted-foreground">
              Typical price
            </p>
            <p className="mt-2 font-display text-3xl font-bold text-primary md:text-4xl">
              {service.priceFrom}
            </p>
            <p className="mt-4 text-sm text-muted-foreground">
              Every project is different — we'll come out, measure up and give you a free written
              quote within 48 hours.
            </p>

            <h3 className="mt-8 font-display text-sm font-bold uppercase tracking-wider text-foreground">
              Our process
            </h3>
            <div className="mt-2 h-[2px] w-10 bg-primary" />
            <p className="mt-4 text-sm leading-relaxed text-foreground">{service.process}</p>

            <div className="mt-6 rounded-sm bg-secondary p-4 text-xs text-muted-foreground">
              30+ painters · 1,200+ projects · Fully insured · Dublin based
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
          {service.name} FAQ
        </h2>
        <div className="mt-10">
          <FaqAccordion items={FAQS.slice(0, 6)} />
        </div>
      </section>

      {/* Other services */}
      <section className="border-t border-border bg-secondary py-14">
        <div className="mx-auto max-w-7xl px-4 md:px-8">
          <h2 className="font-display text-xl font-bold uppercase text-foreground">
            Other services
          </h2>
          <div className="mt-6 flex flex-wrap gap-2">
            {SERVICES.filter((s) => s.slug !== service.slug).map((s) => (
              <Link
                key={s.slug}
                to="/services/$service"
                params={{ service: s.slug }}
                className="rounded-sm border border-border bg-card px-4 py-2 font-display text-xs font-semibold uppercase tracking-wider text-foreground hover:border-primary hover:text-primary"
              >
                {s.name}
              </Link>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
