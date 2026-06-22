export function SchemaOrg() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": "https://allcolourspainter.com",
    "name": "All Colours Painting Contractor Limited",
    "description": "Professional painting and decorating contractor in Dublin. Interior, exterior, commercial and industrial painting across Dublin & surrounding areas.",
    "url": "https://allcolourspainter.com",
    "telephone": "+353858211870",
    "email": "info@allcolourspainter.com",
    "priceRange": "€€",
    "image": "https://allcolourspainter.com/assets/logo-BAonhOi1.png",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": "Dublin",
      "addressCountry": "IE"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": 53.3498,
      "longitude": -6.2603
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
        "opens": "08:00",
        "closes": "18:00"
      }
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": "8",
      "bestRating": "5"
    },
    "areaServed": {
      "@type": "City",
      "name": "Dublin"
    },
    "sameAs": [
      "https://www.facebook.com/profile.php?id=61561664309105"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
