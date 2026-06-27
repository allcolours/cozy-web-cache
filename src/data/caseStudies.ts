import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import aboutAsset from "../assets/portfolio/about-architecture.webp.asset.json";
import commercialAsset from "../assets/portfolio/service-commercial.webp.asset.json";
import industrialAsset from "../assets/portfolio/service-industrial.webp.asset.json";
import hospitalityAsset from "../assets/portfolio/service-hospitality.webp.asset.json";
import floorAsset from "../assets/portfolio/portfolio-commercial-floor.webp.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.webp.asset.json";

export interface CaseStudy {
  slug: string;
  title: string;
  sector: "Residential" | "Commercial" | "Industrial" | "Heritage";
  location: string;
  duration: string;
  team: string;
  cover: string;
  gallery: string[];
  summary: string;
  brief: string;
  challenge: string;
  approach: string[];
  materials: { name: string; use: string }[];
  result: string;
  testimonial?: { quote: string; author: string };
}

export const CASE_STUDIES: CaseStudy[] = [
  {
    slug: "victorian-terrace-ranelagh",
    title: "Sage & Cream Victorian Terrace",
    sector: "Residential",
    location: "Ranelagh, Dublin 6",
    duration: "8 working days",
    team: "3 painters",
    cover: heroAsset.url,
    gallery: [heroAsset.url, aboutAsset.url, exteriorAsset.url],
    summary:
      "Full interior repaint of a four-bed Victorian terrace, including original cornicing, ceiling roses and a hand-painted timber staircase.",
    brief:
      "The owners had just finished a kitchen extension and wanted the rest of the house to feel like one calm, considered space. Soft sage on the walls, off-white ceilings and woodwork, and a darker green on the inside of the front door for a bit of character.",
    challenge:
      "The original Victorian plaster cornicing had been painted-over so many times the detail was lost. Two of the ceilings had hairline cracks from the building work. And the family wanted to stay in the house throughout — so dust and disruption had to be kept to a minimum.",
    approach: [
      "Carefully stripped years of paint build-up off the cornicing with a heat gun to bring back the original detail",
      "Crack-stitched the ceilings, skimmed and primed before any colour went on",
      "Set up a rolling schedule: one floor at a time, full dust containment, daily clean-down so the family could move between finished rooms",
      "Hand-cut every line — no masking tape on the cornicing, all freehand brushwork",
    ],
    materials: [
      { name: "Farrow & Ball Estate Emulsion in Lichen No. 19", use: "Walls — soft sage" },
      { name: "Farrow & Ball Estate Eggshell in Studio Green No. 93", use: "Inside of front door" },
      { name: "Dulux Trade Diamond Matt", use: "Ceilings — extra durable for cracking" },
      { name: "Tikkurila Helmi 30", use: "Skirting and architraves — washable satin" },
    ],
    result:
      "The cornicing reads as a single crisp line for the first time in decades. The owners now describe walking through the front door as 'genuinely calming'. We were back six months later to do their daughter's flat.",
    testimonial: {
      quote:
        "Honestly the tidiest tradesmen we've ever had in the house. The cut-ins around the cornicing are razor sharp.",
      author: "Sarah O'Reilly, Ranelagh",
    },
  },
  {
    slug: "warehouse-night-repaint-stillorgan",
    title: "1,400 sqm Warehouse — Live Repaint",
    sector: "Industrial",
    location: "Stillorgan, Co. Dublin",
    duration: "11 nights + 2 weekends",
    team: "5 painters, 1 site lead",
    cover: industrialAsset.url,
    gallery: [industrialAsset.url, floorAsset.url, commercialAsset.url],
    summary:
      "Full repaint of a working logistics warehouse — walls, structural steel and 1,400 sqm of epoxy floor — without losing a single shift of operations.",
    brief:
      "A 14-year-old distribution warehouse had become tired and the floor markings were almost gone. Management couldn't afford downtime, so the whole repaint had to happen between shifts: weeknights 8pm–5am, plus two full weekends for the floor coatings.",
    challenge:
      "Forklifts had to be back on the floor every morning. Epoxy needs 12+ hours to cure. Steel work at 9m needs scaffold or MEWPs. And every coating had to meet the client's H&S and slip-resistance specs.",
    approach: [
      "Built a zone-by-zone schedule with the operations manager — only one third of the warehouse was off-limits on any given night",
      "Pressure-washed and degreased the floor in advance so coatings could go down the moment a zone was free",
      "Used a fast-cure epoxy system so each zone was forklift-ready in 10 hours",
      "All structural steel sprayed via MEWP overnight with full containment sheeting to protect stock",
      "Re-marked all aisle, pedestrian and racking lines to the client's updated H&S layout",
    ],
    materials: [
      { name: "Sikafloor-264 Epoxy", use: "Heavy-traffic floor coating, light grey with anti-slip" },
      { name: "Sika Permacor 2330", use: "Structural steel — corrosion protection" },
      { name: "Dulux Trade Diamond Eggshell", use: "Wall panels — scrubbable, scuff-resistant" },
      { name: "Rocol Easyline", use: "Aisle and pedestrian line-marking" },
    ],
    result:
      "Finished a day ahead of schedule with zero operational downtime. The site has since brought us back to repaint two of their other facilities and we're now on a five-year maintenance contract for the floor coatings.",
    testimonial: {
      quote:
        "We had to repaint a 1,400 sqm warehouse without shutting down. They worked nights and weekends and finished a day early.",
      author: "Mark Donnelly, Facilities Manager",
    },
  },
  {
    slug: "boutique-hotel-refresh-dublin-2",
    title: "Boutique Hotel Bar & Lobby Refresh",
    sector: "Commercial",
    location: "Dublin 2",
    duration: "9 nights",
    team: "4 painters",
    cover: hospitalityAsset.url,
    gallery: [hospitalityAsset.url, commercialAsset.url, aboutAsset.url],
    summary:
      "Overnight refresh of a 32-room boutique hotel's lobby, bar and corridor walls — finished entirely between 11pm and 7am so the hotel stayed open every night.",
    brief:
      "The hotel's lobby and bar had been the same colour for nine years and were starting to look dated. They wanted a moodier, more layered scheme — deep green panelling, warm off-white walls above, and a fresh hand-painted brass-stencilled motif behind the bar.",
    challenge:
      "Guests were checking in until midnight and breakfast was at 7am. Every night the team had to set up, paint, clean and pack away — no trace by morning. The bar still had to serve drinks until 11pm each evening.",
    approach: [
      "Custom-built lightweight modular dust screens that could be installed and removed in under 20 minutes",
      "Switched to fast-dry low-odour trade emulsions so guests never noticed paint smell in the morning",
      "Hand-painted the bar stencil over two nights with a designer on site to approve colour matching",
      "Photographed every section pre-start so furniture and art went back exactly where they belonged",
    ],
    materials: [
      { name: "Little Greene Intelligent Matt in Mid Lead 113", use: "Bar and lobby panelling" },
      { name: "Little Greene Intelligent Eggshell in Slaked Lime 105", use: "Walls above panelling" },
      { name: "Roberson Liquid Metal in Brass", use: "Hand-painted stencil behind bar" },
      { name: "Dulux Trade Vinyl Matt", use: "Corridors — extra coverage in one coat" },
    ],
    result:
      "Lobby photographs now feature in the hotel's social media and booking pages. Zero guest complaints, zero downtime, and the GM tells us occupancy was actually up the week we finished.",
  },
  {
    slug: "georgian-sash-windows-dun-laoghaire",
    title: "Georgian Sash Window Restoration",
    sector: "Heritage",
    location: "Dún Laoghaire, Co. Dublin",
    duration: "6 weeks",
    team: "2 specialist painters + joiner",
    cover: exteriorAsset.url,
    gallery: [exteriorAsset.url, heroAsset.url, aboutAsset.url],
    summary:
      "Full external repaint and partial restoration of 14 original Georgian sash windows on a protected structure, working with the project architect to keep every detail period-correct.",
    brief:
      "A protected Georgian townhouse with 14 original sliding sash windows. Decades of paint build-up had stuck several sashes shut, the putty was failing on six lights, and the architect needed everything brought back to its original colour spec.",
    challenge:
      "Working on a protected structure means every material has to be approved, lead-paint risk has to be managed safely, and you cannot damage a single piece of crown glass. Some sashes hadn't moved in 30 years.",
    approach: [
      "Lead-paint risk assessment and full containment as required for heritage work",
      "Hand-stripped windows in situ — no heat guns near original glass — using gentle solvent strippers",
      "Replaced failing linseed putty with traditional Allback linseed putty, allowed to cure properly",
      "Freed every sash, rebalanced cords and weights so all 14 windows operate smoothly again",
      "Applied a traditional linseed-oil paint system in the architect's approved heritage colour",
    ],
    materials: [
      { name: "Allback Linseed Paint in Pure White", use: "Sash frames and surrounds" },
      { name: "Allback Linseed Putty", use: "Re-glazing and bedding" },
      { name: "Mylands Heritage Eggshell", use: "Internal sash returns" },
    ],
    result:
      "All 14 windows now open, close and lock as they were designed to. The conservation officer signed off without revisions and the client says the front of the house hasn't looked this good in their lifetime.",
    testimonial: {
      quote:
        "They sourced the correct heritage primer and finished system, masked everything beautifully and didn't damage a single piece of stained glass. Old-school craftsmanship.",
      author: "James Fitzgerald, Architect",
    },
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDIES.find((c) => c.slug === slug);
