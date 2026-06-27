import { SITE } from "@/lib/site";
export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://allcolourspainter.com",
    name: "All Colours Painting Contractor Limited",
    legalName: "All Colours Painting Contractor Limited",
    vatID: SITE.vat,
    description:
      "Professional painting and decorating contractor in Dublin. Interior, exterior, commercial and residential painting across Dublin and surrounding areas.",
    url: "https://allcolourspainter.com",
    telephone: SITE.phoneIntl,
    email: SITE.email,
    image:
      "https://allcolourspainter.com/__l5e/assets-v1/8242608f-5e6d-44f5-bbf1-6fc212ae1634/logo.webp",
    priceRange: "€€",
    currenciesAccepted: "EUR",
    paymentAccepted: "Cash, Bank Transfer",
    openingHours: "Mo-Sa 08:00-18:00",
    identifier: { "@type": "PropertyValue", name: "CRO", value: SITE.cro },
    address: {
      "@type": "PostalAddress",
      streetAddress: "22 Liscarne Court",
      addressLocality: "Dublin 22",
      postalCode: "D22 X052",
      addressRegion: "Leinster",
      addressCountry: "IE",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 53.319,
      longitude: -6.401,
    },
    areaServed: [
      { "@type": "City", name: "Dublin" },
      { "@type": "AdministrativeArea", name: "County Dublin" },
      { "@type": "City", name: "Dún Laoghaire" },
      { "@type": "City", name: "Sandyford" },
      { "@type": "City", name: "Ranelagh" },
      { "@type": "City", name: "Stillorgan" },
      { "@type": "City", name: "Rathfarnham" },
      { "@type": "City", name: "Clondalkin" },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Painting & Decorating Services",
      itemListElement: [
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Interior Painting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Exterior Painting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Commercial Painting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Epoxy Floor Coating" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Kitchen Cabinet Painting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Spray Painting" } },
        { "@type": "Offer", itemOffered: { "@type": "Service", name: "Wallpapering" } },
      ],
    },
    sameAs: ["https://www.facebook.com/profile.php?id=61561664309105"],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
