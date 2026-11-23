import { HERO_SOCIAL_URL } from "@/lib/hero-image";
import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { AREAS } from "../data/areas";
import { AREA_PATHS } from "../data/areaContent";

export const Route = createFileRoute("/painters/")({
  head: () => {
    const title = "Painters Dublin – Areas We Cover | All Colours Painting";
    const description =
      "Painters and decorators serving South Dublin, Dublin city and surrounding areas, including Bray and Greystones. Find your area and request a free quote.";
    const url = "https://allcolourspainter.com/painters";
    return {
      meta: [
        { name: "twitter:card", content: "summary_large_image" },
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        {
          property: "og:image",
          content:
            HERO_SOCIAL_URL,
        },
        {
          name: "twitter:image",
          content:
            HERO_SOCIAL_URL,
        },
      ],
      links: [{ rel: "canonical", href: url }],
    };
  },
  component: AreasIndex,
});

function AreasIndex() {
  return (
    <SiteLayout>
      <section className="mx-auto max-w-7xl px-4 py-16 md:px-8 md:py-24">
        <p className="font-display text-xs font-bold uppercase tracking-[0.25em] text-primary">
          Service areas
        </p>
        <h1 className="mt-4 font-display text-4xl font-bold uppercase text-foreground md:text-5xl">
          Painters across Dublin
        </h1>
        <p className="mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground">
          We serve South Dublin, Dublin city and surrounding areas, including Bray and Greystones.
          From period homes in Ballsbridge to coastal homes in Dalkey and offices in Sandyford,
          pick your area for services and a free quote.
        </p>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {AREA_PATHS.map((a) => {
            const meta = AREAS.find((x) => x.name === a.name);
            const blurb = meta?.blurb;
            return (
              <a
                key={a.path}
                href={a.path}
                className="group block rounded-sm border border-border bg-card p-6 transition-all hover:-translate-y-1 hover:border-primary hover:shadow-lg"
              >
                <div className="font-display text-xs font-bold uppercase tracking-wider text-primary">
                  {meta?.postcode ?? "Dublin"}
                </div>
                <h2 className="mt-2 font-display text-xl font-bold uppercase text-foreground group-hover:text-primary">
                  Painters {a.name}
                </h2>
                {blurb ? (
                  <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-muted-foreground">
                    {blurb}
                  </p>
                ) : null}
                <div className="mt-5 font-display text-xs font-bold uppercase tracking-wider text-primary">
                  View {a.name} →
                </div>
              </a>
            );
          })}
        </div>
      </section>
    </SiteLayout>
  );
}
