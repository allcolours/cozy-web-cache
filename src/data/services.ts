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
  /** Short paragraph on process */
  process: string;
  /** Optional honest caveat shown beneath the service description */
  caveat?: string;
}

export const SERVICES: ServiceInfo[] = [
  {
    slug: "interior-painting",
    name: "Interior Painting & Decorating",
    h1: "Interior Painting & Decorating Dublin",
    intro:
      "Walls, ceilings and full repaints in occupied homes and offices. Two coats as standard on prepared surfaces, water-based trade emulsions on walls and ceilings, dust-free sanding with extraction, careful masking, and a clean tidy-down at the end of every day.",
    metaTitle: "Interior Painters Dublin | Walls, Ceilings & Full Repaints – All Colours",
    metaDescription:
      "Interior painting and decorating in Dublin — walls, ceilings, single rooms and full repaints. Clean work in occupied homes. Free written quote.",
    features: [
      "Walls, ceilings and full house repaints",
      "Two coats as standard on prepared surfaces",
      "Filling, sanding and line-fix on walls",
      "Dust-free sanding with extraction",
      "Trade-grade emulsion and water-based finishes",
      "Floors and furniture protected daily",
      "Clean, tidy work in occupied homes",
    ],
    process:
      "We protect floors and furniture, mask cleanly, fill and sand with dust extraction, then apply two coats of trade emulsion on walls and ceilings. Every job finishes with a walk-through and snag list — nothing is signed off until you're happy.",

  },
  {
    slug: "exterior-painting",
    name: "Exterior Painting & Weatherproofing",
    h1: "Exterior Painting & Weatherproofing Dublin",
    intro:
      "Render, pebbledash, masonry, brickwork and timber fascias and soffits. We power-wash, treat for algae and mould, stabilise chalky surfaces and apply weather-resistant exterior systems, including salt- and weather-resistant coastal systems on exposed and seafront properties.",
    metaTitle: "Exterior Painters Dublin | Render, Masonry & Weatherproofing – All Colours",
    metaDescription:
      "Exterior house painting in Dublin — render, pebbledash, masonry and timber. Power-washing, antifungal treatment and weather-resistant exterior systems.",
    features: [
      "Power-washing and surface preparation",
      "Antifungal and biocidal treatment",
      "Stabiliser on chalky or powdery render",
      "Weather-resistant masonry top coats",
      "Salt- and weather-resistant coastal systems on exposed and seafront properties",
      "Fascia, soffit and exterior timber",
      "Crack and render patch repairs",
    ],
    process:
      "We wash the surface and allow it to dry, repair cracks and failed sections, stabilise chalky areas and prime bare timber. Two finish coats are applied in a suitable weather window so the system has the best chance of a long life.",

  },
  {
    slug: "woodwork-and-joinery",
    name: "Woodwork & Joinery",
    h1: "Woodwork & Joinery Painting Dublin",
    intro:
      "Architraves, door frames, doors, skirting boards, staircases and banisters. Two-pack filler on knocks and joints, proper sanding between coats, and a choice of satinwood, eggshell, gloss or varnish to suit the room.",
    metaTitle: "Woodwork & Joinery Painting Dublin | Doors, Skirtings & Stairs",
    metaDescription:
      "Painting of architraves, door frames, doors, skirtings, staircases and banisters in Dublin. Two-pack filler prep, satinwood, eggshell, gloss or varnish finishes.",
    features: [
      "Architraves, frames and skirting",
      "Doors, staircases and banisters",
      "Two-pack filler on knocks and joints",
      "Sanded between coats",
      "Satinwood, eggshell and gloss",
      "Varnish finishes on bare timber",
    ],
    process:
      "We fill and sand back, prime bare or patched timber, then apply two coats of the chosen finish — typically a water-based satinwood or eggshell for a clean, hard-wearing result that does not yellow.",
  },
  {
    slug: "sash-and-timber-windows",
    name: "Sash & Timber Window Repainting",
    h1: "Sash & Timber Window Repainting Dublin",
    intro:
      "Preparation and repainting of sash windows, shutters and glazing frames. We sand back flaking paint, fill open joints, prime bare timber and finish with a suitable exterior or interior wood system.",
    caveat:
      "This is repainting and refurbishment — we bring windows back as close as possible to their original appearance, but it is not a brand-new window or a full conservation restoration.",
    metaTitle: "Sash Window Painters Dublin | Repainting Sashes, Shutters & Frames",
    metaDescription:
      "Repainting of sash windows, shutters and glazing frames in Dublin. Honest refurbishment — surfaces refreshed to look as close as possible to original.",
    features: [
      "Sash windows, shutters and glazing frames",
      "Sanded back and filled where needed",
      "Bare timber primed before painting",
      "Interior and exterior systems",
      "Careful masking around glass",
      "Repainting and refurbishment, not full restoration",
    ],
    process:
      "We open and prepare each sash or frame, sand back loose paint, fill open joints, prime bare timber and apply finish coats. The aim is a clean, refreshed look that respects the original profile of the window.",
  },
  {
    slug: "metal-railings-and-metalwork",
    name: "Metal Railings & Exterior Metalwork",
    h1: "Metal Railings & Exterior Metalwork Painting Dublin",
    intro:
      "Preparation, priming and finishing of metal railings, gates and exterior metalwork. Rust spots are wire-brushed back, treated and primed before a durable top coat is applied.",
    metaTitle: "Railings & Metalwork Painting Dublin | Gates & Exterior Metal",
    metaDescription:
      "Painting of metal railings, gates and exterior metalwork in Dublin. Rust treatment, priming and durable top coats for exterior conditions.",
    features: [
      "Metal railings and gates",
      "Wire-brushing and rust treatment",
      "Rust-inhibiting primers",
      "Durable exterior top coats",
      "Brush and roller application",
      "Surrounding surfaces protected",
    ],
    process:
      "We mask off adjacent walls and ground, wire-brush and treat rust, spot-prime bare metal, then apply finish coats suited to exterior exposure.",
  },
  {
    slug: "decking-and-exterior-timber",
    name: "Decking & Exterior Timber",
    h1: "Decking & Exterior Timber Treatment Dublin",
    intro:
      "Power-washing, antifungal treatment and oiling of timber decking, garden joinery and exterior timber surfaces. We clean the timber back, treat for algae and mould, then re-oil to restore colour and protection.",
    metaTitle: "Decking & Exterior Timber Treatment Dublin | Wash, Treat & Oil",
    metaDescription:
      "Decking and exterior timber treatment in Dublin — power-washing, antifungal treatment and oiling to restore and protect timber surfaces.",
    features: [
      "Decking, garden joinery and exterior timber",
      "Power-washing back to clean timber",
      "Antifungal and algae treatment",
      "Decking oil to restore colour",
      "Two coats where required",
      "Surrounding planting protected",
    ],
    process:
      "We power-wash the timber, allow it to dry, treat for algae and mould, then apply decking oil in even coats to restore appearance and weather protection.",
  },
  {
    slug: "kitchen-cabinet-painting",
    name: "Kitchen Cabinet & Press Repainting",
    h1: "Kitchen Cabinet & Press Repainting Dublin",
    intro:
      "Brush-applied repainting of kitchen presses, cabinets and built-in joinery. Doors and frames are cleaned, sanded, primed where needed and finished in a hard-wearing satinwood — a practical refresh for a tired kitchen.",
    metaTitle: "Kitchen Cabinet Painting Dublin | Brush-Painted Press Repaints",
    metaDescription:
      "Brush-applied repainting of kitchen presses, cabinets and built-in joinery in Dublin. Degrease, sand, prime and satinwood finish. Free quotes.",
    features: [
      "Kitchen presses and cabinet doors",
      "Built-in joinery and cabinet boxes",
      "Degrease, sand and prime",
      "Bonding primer on factory finishes",
      "Brush-applied satinwood top coats",
      "Hinges and handles removed and refitted",
    ],
    process:
      "We remove handles and label hinges, degrease and sand every face, apply an adhesion primer where needed, then brush on two coats of a hard-wearing satinwood. Doors are reinstated and adjusted at the end of the job.",
  },
  {
    slug: "plaster-and-water-damage-repair",
    name: "Plaster & Water-Damage Repair",
    h1: "Plaster & Water-Damage Repair Dublin",
    intro:
      "Replacing damaged plasterboard, taping and jointing, priming and repainting — typically on ceilings and walls after leaks, or where the surface is no longer sound enough to take paint on its own.",
    metaTitle: "Plaster & Water-Damage Repair Dublin | Ceiling Leak Repaints",
    metaDescription:
      "Plaster and water-damage repair in Dublin — replace damaged plasterboard, tape and joint, prime and repaint ceilings and walls after leaks.",
    features: [
      "Damaged plasterboard replaced",
      "Taping and jointing of new boards",
      "Stain-block primer on water marks",
      "Skim repairs on cracked plaster",
      "Ceiling and wall repaints after leaks",
      "Surfaces brought back ready for finish",
    ],
    process:
      "We cut out and replace damaged board where needed, tape and joint the joins, prime the repair with a stain-blocking primer and repaint the ceiling or wall so the repair is no longer visible.",
  },
  {
    slug: "commercial-painting",
    name: "Commercial & Institutional Painting",
    h1: "Commercial & Institutional Painters Dublin",
    intro:
      "Schools, churches, clinics, offices and community and heritage venues. We work to a programme and out of hours where required, with a single point of contact from quote through to handover.",
    metaTitle: "Commercial & Institutional Painters Dublin | Schools, Clinics, Offices",
    metaDescription:
      "Commercial and institutional painting in Dublin — schools, churches, clinics, offices and community venues. Programme-driven, out-of-hours work available.",
    features: [
      "Schools, churches and community venues",
      "Clinics, offices and retail",
      "Out-of-hours and weekend working",
      "Programme-driven scheduling",
      "Single point of contact",
      "Fully insured",
    ],
    process:
      "We walk the site with the facilities or property manager, agree access windows and a programme, then schedule crews to fit your operating hours with daily sign-off and a clear handover.",
  },
];

export const getService = (slug: string) => SERVICES.find((s) => s.slug === slug);
