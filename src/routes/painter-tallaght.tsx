import { HERO_SOCIAL_META } from "@/lib/hero-image";
import { createFileRoute } from "@tanstack/react-router";
import { LocalAreaPage } from "../components/LocalAreaPage";
import { SITE } from "@/lib/site";

const TITLE = "Painter Tallaght Dublin 24 | All Colours Painting";
const DESC = `Residential and commercial painting at scale across Tallaght. Free quotes, fully insured — call ${SITE.phoneDisplay}.`;
const URL = "https://allcolourspainter.com/painter-tallaght";

export const Route = createFileRoute("/painter-tallaght")({
  head: () => ({
    meta: [
      ...HERO_SOCIAL_META,
      { name: "twitter:card", content: "summary_large_image" },
      { title: TITLE },
      { name: "description", content: DESC },
      { property: "og:title", content: TITLE },
      { property: "og:description", content: DESC },
      { property: "og:url", content: URL },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: URL }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            {
              "@type": "ListItem",
              position: 1,
              name: "Home",
              item: "https://allcolourspainter.com/",
            },
            { "@type": "ListItem", position: 2, name: TITLE.split(" | ")[0], item: URL },
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: "All Colours Painting Contractor Limited",
          url: "https://allcolourspainter.com/painter-tallaght",
          telephone: SITE.phoneIntl,
          email: SITE.email,
          areaServed: { "@type": "Place", name: "Tallaght, Dublin 24" },
          address: {
            "@type": "PostalAddress",
            addressLocality: "Tallaght",
            addressRegion: "Dublin 24",
            addressCountry: "IE",
          },
        }),
      },
    ],
  }),
  component: () => (
    <LocalAreaPage
      area="Tallaght"
      postcode="Dublin 24"
      intro="Residential estates and commercial premises across Tallaght — large team, fast scheduling and consistent quality."
    />
  ),
});
