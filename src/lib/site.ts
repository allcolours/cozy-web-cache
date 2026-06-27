// Canonical site / company contact details.
// Edit values here once — all CTAs, JSON-LD, footer, blog refs read from this.

export const SITE = {
  name: "All Colours Painting Contractor Limited",
  shortName: "All Colours Painting",
  // Phone, in every shape used by the site
  phoneDisplay: "085 821 1870",          // human-readable
  phoneTel: "0858211870",                // tel:<digits>
  phoneIntl: "+353858211870",            // schema.org telephone / E.164
  // WhatsApp
  whatsapp: "353858211870",              // wa.me/<digits>
  whatsappText:
    "Hi%20All%20Colours%2C%20I%27d%20like%20a%20quote.%20Here%20are%20photos%20of%20the%20job%3A",
  // Email
  email: "info@allcolourspainter.com",
  // Locale copy
  area: "Dublin & surrounding areas",
  hours: "Mon–Sat · 8:00 – 18:00",
  tagline: "Painting & decorating, done properly.",
  // Registered company details (already shown in footer / contact / JSON-LD)
  cro: "810243",
  vat: "IE4706227DH",
  registeredAddress: "22 Liscarne Court, Dublin 22, D22 X052, Ireland",
} as const;

export const WHATSAPP_URL =
  `https://wa.me/${SITE.whatsapp}?text=${SITE.whatsappText}`;
