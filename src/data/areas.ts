export interface AreaInfo {
  slug: string;
  name: string;
  postcode?: string;
  blurb: string;
  highlights: string[];
}

export const AREAS: AreaInfo[] = [
  {
    slug: "ballsbridge",
    name: "Ballsbridge",
    postcode: "Dublin 4",
    blurb:
      "Period homes, red-brick Victorians and modern apartments around Ballsbridge demand a careful, low-dust finish. Our crews are experienced with embassy-row properties and listed Georgian terraces.",
    highlights: [
      "Heritage-safe paint systems",
      "Sash window and shopfront restoration",
      "Discreet weekday access for D4 residents",
    ],
  },
  {
    slug: "dalkey",
    name: "Dalkey",
    postcode: "South County Dublin",
    blurb:
      "From granite coastal villas to modern coastal extensions, Dalkey weather is brutal on exterior paint. We use breathable, salt-resistant systems that last longer by the sea.",
    highlights: [
      "Salt- and wind-resistant exterior systems",
      "Render, pebbledash and timber maintenance",
      "Painters who know coastal South Dublin",
    ],
  },
  {
    slug: "foxrock",
    name: "Foxrock",
    postcode: "Dublin 18",
    blurb:
      "Detached family homes and luxury developments throughout Foxrock — we deliver showroom-grade interiors, hand-painted kitchens and full-house repaints with zero mess.",
    highlights: [
      "Full-house interior repaints",
      "Hand-painted kitchen cabinetry",
      "Dust-free sanding for occupied homes",
    ],
  },
  {
    slug: "rathmines",
    name: "Rathmines",
    postcode: "Dublin 6",
    blurb:
      "Investment properties, period conversions and family homes — we turn around Rathmines apartments quickly between tenancies and restore period detail on classic D6 redbrick.",
    highlights: [
      "Rapid turnaround between tenancies",
      "Period feature restoration",
      "Landlord-friendly invoicing & scheduling",
    ],
  },
  {
    slug: "sandyford",
    name: "Sandyford",
    postcode: "Dublin 18",
    blurb:
      "Offices, retail units and apartment blocks across the Sandyford Business District — out-of-hours commercial painting that keeps your business running.",
    highlights: [
      "Out-of-hours commercial painting",
      "Communal areas & apartment blocks",
      "Health & safety compliant crews",
    ],
  },
  {
    slug: "dun-laoghaire",
    name: "Dún Laoghaire",
    postcode: "South County Dublin",
    blurb:
      "Seafront terraces and harbour-side commercial premises — exterior paint near the coast needs the right primer and finish. We specify it correctly the first time.",
    highlights: [
      "Marine-grade exterior coatings",
      "Listed-building friendly finishes",
      "Commercial & residential crews",
    ],
  },
  {
    slug: "dundrum",
    name: "Dundrum",
    postcode: "Dublin 14",
    blurb:
      "Family homes, new-build estates and shopping district commercial spaces — fast, tidy crews delivering consistent finish quality across Dundrum and Goatstown.",
    highlights: [
      "New-build snag list painting",
      "Family-home full repaints",
      "Tidy crews, clean handover",
    ],
  },
  {
    slug: "ranelagh",
    name: "Ranelagh",
    postcode: "Dublin 6",
    blurb:
      "Bay-window redbricks, cottage extensions and stylish café fitouts — Ranelagh demands a designer-grade finish. Our painters work to interior-designer specifications every day.",
    highlights: [
      "Designer-grade finish standards",
      "Bespoke colour matching",
      "Café and retail fitouts",
    ],
  },
];
