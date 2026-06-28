// Lightweight metadata for area pages. Powers the painters index cards and
// the chip list on the residential landing page.
// Rule: only claims a general painting contractor can truthfully back —
// interior + exterior repaints, apartments and houses, communal areas,
// new-build finishing, clean occupied-home work, free written quotes.
// No specialist conservation, marine-grade, heritage-safe or kitchen-spray claims.

export interface AreaInfo {
  slug: string;
  name: string;
  postcode?: string;
  blurb: string;
  highlights: string[];
}

const DEFAULT_HIGHLIGHTS = [
  "Interior & exterior repaints",
  "Clean, tidy work in occupied homes",
  "Free written quote within 48 hours",
];

export const AREAS: AreaInfo[] = [
  {
    slug: "ballsbridge",
    name: "Ballsbridge",
    postcode: "Dublin 4",
    blurb:
      "Repaints for Ballsbridge's red-brick period homes and modern apartments — interior and exterior, with careful prep on older properties.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "ranelagh",
    name: "Ranelagh",
    postcode: "Dublin 6",
    blurb:
      "Interior and exterior painting across Ranelagh's red-brick terraces, cottages and apartment conversions.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "rathmines",
    name: "Rathmines",
    postcode: "Dublin 6",
    blurb:
      "Apartment turnarounds and family-home repaints across Rathmines — quick scheduling for landlords and owner-occupiers.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "donnybrook",
    name: "Donnybrook",
    postcode: "Dublin 4",
    blurb:
      "Interior and exterior repaints for Donnybrook's period houses and family homes.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "sandymount",
    name: "Sandymount",
    postcode: "Dublin 4",
    blurb:
      "Repaints for Sandymount's Victorian terraces, cottages and apartments — clean work in occupied homes near the strand.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "clontarf",
    name: "Clontarf",
    postcode: "Dublin 3",
    blurb:
      "Interior and exterior painting along the Clontarf seafront — red-brick period houses, 1930s semis and apartment blocks.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "raheny",
    name: "Raheny",
    postcode: "Dublin 5",
    blurb:
      "Repaints for Raheny's 1930s semis and family homes — interior, exterior and woodwork.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "howth",
    name: "Howth",
    postcode: "Dublin 13",
    blurb:
      "Interior and exterior painting for Howth's coastal homes and village properties — proper prep on weather-exposed exteriors.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "blackrock",
    name: "Blackrock",
    postcode: "Co. Dublin",
    blurb:
      "Interior and exterior repaints across Blackrock — period homes, semis and apartment blocks near the bay.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "dun-laoghaire",
    name: "Dún Laoghaire",
    postcode: "Co. Dublin",
    blurb:
      "Repaints for Dún Laoghaire's harbour terraces and apartments — interior and exterior, with thorough prep on coastal exteriors.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "dalkey",
    name: "Dalkey",
    postcode: "Co. Dublin",
    blurb:
      "Interior and exterior painting for Dalkey's period and coastal homes — careful prep, trade-grade finishes.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "foxrock",
    name: "Foxrock",
    postcode: "Dublin 18",
    blurb:
      "Full-house interior repaints and exterior work for Foxrock's larger detached homes.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "stillorgan",
    name: "Stillorgan",
    postcode: "Co. Dublin",
    blurb:
      "Repaints and tenancy turnarounds across Stillorgan's mid-century semis and apartment blocks.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "sandyford",
    name: "Sandyford",
    postcode: "Dublin 18",
    blurb:
      "Apartment blocks, commercial units and homes around the Sandyford Business District — out-of-hours work for commercial sites.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "dundrum",
    name: "Dundrum",
    postcode: "Dublin 14",
    blurb:
      "Family-home repaints, new-build finishing and commercial work across Dundrum.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "castleknock",
    name: "Castleknock",
    postcode: "Dublin 15",
    blurb:
      "Repaints for Castleknock's detached and semi-detached homes — interior, exterior and woodwork.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "blanchardstown",
    name: "Blanchardstown",
    postcode: "Dublin 15",
    blurb:
      "Residential repaints and commercial painting across Blanchardstown's estates, apartments and business parks.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "bray",
    name: "Bray",
    postcode: "Co. Wicklow",
    blurb:
      "Interior and exterior painting across Bray — Victorian seafront terraces, semis and estate housing.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "greystones",
    name: "Greystones",
    postcode: "Co. Wicklow",
    blurb:
      "Repaints for Greystones' coastal homes and newer residential developments — interior and exterior.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "maynooth",
    name: "Maynooth",
    postcode: "Co. Kildare",
    blurb:
      "Family-home repaints, student-let turnarounds and exterior work across Maynooth and surrounds.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "naas",
    name: "Naas",
    postcode: "Co. Kildare",
    blurb:
      "Interior and exterior painting across Naas — residential estates, town-centre properties and commercial premises.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
  {
    slug: "navan",
    name: "Navan",
    postcode: "Co. Meath",
    blurb:
      "Residential repaints and commercial painting across Navan — full-house interiors, exteriors and tenancy turnarounds.",
    highlights: DEFAULT_HIGHLIGHTS,
  },
];
