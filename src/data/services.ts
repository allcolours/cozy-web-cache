export interface ServiceInfo {
  slug: string;
  name: string;
  h1: string;
  intro: string;
  /** Used in <title> and meta description */
  metaTitle: string;
  metaDescription: string;
  /** Bullet list shown on the page */
  features: string[];
  /** Typical price range (string, displayed) */
  priceFrom: string;
  /** Short paragraph on process */
  process: string;
}

export const SERVICES: ServiceInfo[] = [
  {
    slug: "kitchen-cabinet-painting",
    name: "Kitchen Cabinet Painting",
    h1: "Kitchen Cabinet Painting Dublin",
    intro:
      "Transform a tired kitchen for a fraction of the cost of a replacement. We hand-paint and spray-finish kitchen cabinets across Dublin using primer + 2K topcoat systems that stand up to daily family life — not the chip-prone DIY emulsion finishes you see on YouTube.",
    metaTitle: "Kitchen Cabinet Painting Dublin | Spray & Hand Painted – All Colours",
    metaDescription:
      "Professional kitchen cabinet painting & respraying in Dublin. Primer + 2K topcoat, hand-painted or sprayed finish, from €1,800. Fully insured, free quotes.",
    features: [
      "Hand-painted or spray-finished",
      "Primer + 2K polyurethane topcoat",
      "All doors removed, sprayed off-site",
      "Cabinet boxes hand-painted in-place",
      "Tulip, Otex or Zinsser bonding primer",
      "Colour match to any Farrow & Ball / Colourtrend / Fleetwood shade",
    ],
    priceFrom: "€1,800 – €3,800",
    process:
      "Day 1 we remove and label every door and drawer front, then bring them back to our workshop for degrease, sand, prime and two-coat spray. While they're curing we hand-paint the cabinet boxes in-place. Doors come back 4–5 days later, fully cured, and we re-hang and adjust everything.",
  },
  {
    slug: "exterior-painting",
    name: "Exterior Painting",
    h1: "Exterior House Painting Dublin",
    intro:
      "Render, pebbledash, masonry, render-board, timber fascias and soffits — our exterior systems are specified for the Irish climate. We pressure-wash, treat algae, fix the moisture path, then apply a full Sandtex, Dulux Weathershield or Zinsser system that lasts 8–10 years, not 18 months.",
    metaTitle: "Exterior House Painting Dublin | Render & Masonry – All Colours",
    metaDescription:
      "Exterior house painting in Dublin — render, pebbledash, masonry & timber. Sandtex / Weathershield systems built for Irish weather. Free quotes, fully insured.",
    features: [
      "Pressure-wash + biocidal treatment",
      "Crack repair & render patching",
      "Masonry stabiliser on chalky render",
      "Two top coats of Sandtex / Weathershield",
      "Flexible exterior wood system on fascias",
      "Scaffold or access tower included",
    ],
    priceFrom: "€2,500 – €5,500",
    process:
      "We start with a proper wash and a 48-hour dry, then repair any crazed render, failed sealant and rotten timber. Stabiliser on chalky areas, primer on bare timber, then two top coats. Painted in the right weather window (April–September) for maximum life.",
  },
  {
    slug: "interior-painting",
    name: "Interior Painting",
    h1: "Interior House Painting Dublin",
    intro:
      "From a single room refresh to a full repaint between tenancies, our interior crews deliver a flawless finish with proper prep, durable paint and zero mess. We use Dulux Trade, Fleetwood and Colourtrend by default, and you can sleep in the room the same night.",
    metaTitle: "Interior House Painting Dublin | Rooms, Apartments & Whole Homes",
    metaDescription:
      "Interior painters Dublin. Single rooms, apartments and full house repaints. Two coats, dustless sanding, water-based eggshell on woodwork. Free written quote.",
    features: [
      "Two coats throughout as standard",
      "Dustless sanding on woodwork",
      "Water-based, low-odour systems",
      "Light filling & line-fix included",
      "ZipWall containment around occupied rooms",
      "Daily clean-down — no building-site mess",
    ],
    priceFrom: "€280 – €5,500",
    process:
      "We protect floors and furniture, mask cleanly, sand and fill, then apply two coats of trade-grade emulsion to walls and ceilings and water-based eggshell on woodwork. Every job ends with a walk-through and a snag list — nothing's signed off until you're happy.",
  },
  {
    slug: "commercial-painting",
    name: "Commercial Painting",
    h1: "Commercial Painters Dublin",
    intro:
      "Offices, retail units, restaurants, hotels and apartment-block common areas — we work out-of-hours so your business never stops. Safe Pass certified crews, full RAMS, public liability cover and a single point of contact for the whole job.",
    metaTitle: "Commercial Painters Dublin | Offices, Retail & Hotels – All Colours",
    metaDescription:
      "Commercial painting contractors in Dublin. Out-of-hours offices, retail fit-outs, hotels, restaurants & apartment blocks. Safe Pass certified, fully insured.",
    features: [
      "Out-of-hours & weekend working",
      "Safe Pass + Manual Handling certified crews",
      "Full RAMS and method statements",
      "Fully insured",
      "Apartment-block common areas",
      "Tenant-friendly scheduling",
    ],
    priceFrom: "Quoted per project",
    process:
      "We walk the site with the facilities or property manager, agree access windows, then schedule crews to fit your operating hours. Daily sign-off, photo updates and a single project lead from quote to handover.",
  },
  {
    slug: "new-build-painting",
    name: "New Build Painting",
    h1: "New Build Painting & Snag List Specialists Dublin",
    intro:
      "We're a go-to subcontractor for developers across Dublin — apartment blocks, housing schemes and one-off luxury new builds. Spray-applied mist coats, finish coats to spec, and a snag-list crew that closes out the punch list quickly so units can hand over.",
    metaTitle: "New Build Painters Dublin | Developer & Snag List Crews – All Colours",
    metaDescription:
      "New build painting contractors Dublin. Apartment blocks, housing schemes, snag lists. Spray mist coats, finish coats, fast snag close-out. Fully insured.",
    features: [
      "Spray-applied mist coats",
      "Finish coats to architect's spec",
      "Snag list close-out crews",
      "Working alongside other trades",
      "Programme-driven scheduling",
      "Developer references on request",
    ],
    priceFrom: "Quoted per project",
    process:
      "We price from drawings and a finishes schedule. On site we spray mist coats once first-fix is complete, then return for finish coats after second-fix. A separate snag crew picks up the punch list per unit so handover dates don't slip.",
  },
  {
    slug: "wallpapering",
    name: "Wallpapering",
    h1: "Professional Wallpaper Hanging Dublin",
    intro:
      "Feature walls, full rooms, period restoration and tricky paste-the-wall papers — our paperhangers are trained for the difficult stuff. Pattern matching, lining paper on poor plaster, and proper prep on freshly skimmed walls.",
    metaTitle: "Wallpaper Hanging Dublin | Feature Walls & Period Papers",
    metaDescription:
      "Professional wallpaper hangers in Dublin. Feature walls, period restoration, paste-the-wall, lining paper. Pattern-matched finish. Free quotes.",
    features: [
      "Paste-the-paper and paste-the-wall",
      "Lining paper for difficult walls",
      "Pattern matching at every drop",
      "Designer & heritage papers",
      "Strip & prep included in quote",
      "Cole & Son, Sanderson, Farrow & Ball trained",
    ],
    priceFrom: "€55 – €120 per roll hung",
    process:
      "We strip the old paper, repair the wall, line if needed, then hang the new paper plumb with pattern-matched seams. A typical feature wall is half a day; a full room is 1–2 days depending on pattern repeat.",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
