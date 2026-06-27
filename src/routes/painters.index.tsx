import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "../components/SiteLayout";
import { AREAS } from "../data/areas";
import { AREA_PATHS } from "../data/areaContent";


export const Route = createFileRoute("/painters/")({
  head: () => {
    const title = "Painters Dublin – Areas We Cover | All Colours Painting";
    const description =
      "Professional painters & decorators serving every part of Dublin: Ballsbridge, Dalkey, Foxrock, Rathmines, Sandyford, Dún Laoghaire, Dundrum, Ranelagh and more.";
    const url = "https://allcolourspainter.com/painters";
    return {
      meta: [
        { title },
        { name: "description", content: description },
        { property: "og:title", content: title },
        { property: "og:description", content: description },
        { property: "og:url", content: url },
        { property: "og:type", content: "website" },
        { property: "og:image", content: "https://allcolourspainter.com/__l5e/assets-v1/2a395495-c4ec-4903-a41b-667de034b2ab/hero-house.webp" },
        { name: "twitter:image", content: "https://allcolourspainter.com/__l5e/assets-v1/2a395495-c4ec-4903-a41b-667de034b2ab/hero-house.webp" },
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
          We work in every Dublin postcode — from period homes in Ballsbridge to coastal villas in
          Dalkey and busy office blocks in Sandyford. Pick your area for local examples, services and
          a free quote.
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
