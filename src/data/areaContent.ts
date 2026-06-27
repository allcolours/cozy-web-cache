// Per-area unique content for the 15 local painter pages.
// Keys MUST match the `area` string passed to <LocalAreaPage area="..." />.

export interface AreaContent {
  intro: string;
  localContext: string;
  highlights: [string, string, string];
}

export const AREA_CONTENT: Record<string, AreaContent> = {
  Ballsbridge: {
    intro:
      "Careful, low-dust painting for Ballsbridge's period red-brick homes, embassy properties and modern apartments.",
    localContext:
      "Ballsbridge (Dublin 4) is mostly Victorian and Edwardian red-brick houses, embassy buildings and newer apartment blocks. We work on period interiors, sash windows and exterior masonry, keeping occupied homes clean and disruption low.",
    highlights: [
      "Period interior repaints",
      "Sash window & timber repair",
      "Low-dust work in occupied homes",
    ],
  },
  Ranelagh: {
    intro:
      "Period interiors, exterior timber and railing work across Ranelagh's red-brick streets.",
    localContext:
      "Ranelagh (Dublin 6) is known for its Victorian and Edwardian red-brick terraces around the village. We repaint period interiors, hallways and stairwells, and restore exterior timber, railings and front doors.",
    highlights: [
      "Period red-brick interiors",
      "Hallway & stairwell repaints",
      "Exterior timber & railing restoration",
    ],
  },
  Rathmines: {
    intro: "Fast tenancy turnarounds and period restoration across Rathmines.",
    localContext:
      "Much of Rathmines (Dublin 6) is Victorian housing converted into apartments and rentals. We turn flats around quickly between tenancies and restore original detail in family homes, with scheduling that suits landlords.",
    highlights: [
      "Fast turnaround between tenancies",
      "Period feature restoration",
      "Landlord-friendly scheduling",
    ],
  },
  Donnybrook: {
    intro:
      "Clean interior repaints and careful exterior work on Donnybrook's period homes.",
    localContext:
      "Donnybrook (Dublin 4) is a leafy neighbourhood of period red-brick houses and quiet residential streets. We deliver tidy interior repaints and careful exterior preparation on older properties.",
    highlights: [
      "Period home repaints",
      "Careful exterior preparation",
      "Tidy, low-disruption crews",
    ],
  },
  Clontarf: {
    intro:
      "Coastal-ready exterior systems and full interiors along the Clontarf seafront.",
    localContext:
      "Clontarf (Dublin 3) runs along the north coast, with red-brick period houses and 1930s semis near the seafront. Salt and wind are hard on exterior paint, so we specify primers and finishes that last by the sea.",
    highlights: [
      "Coastal-grade exterior systems",
      "Seafront render & masonry",
      "Full interior repaints",
    ],
  },
  Blackrock: {
    intro:
      "Interiors and salt-resistant exterior finishes for Blackrock homes near the bay.",
    localContext:
      "Blackrock (Co. Dublin, A94) mixes Victorian period houses with modern coastal properties. We paint interiors, exterior masonry and timber, using systems built for the salt air near the bay.",
    highlights: [
      "Salt-resistant exterior finishes",
      "Period & modern interiors",
      "Render & timber maintenance",
    ],
  },
  "Dún Laoghaire": {
    intro:
      "Marine-grade exteriors and full interiors across Dún Laoghaire's harbour terraces.",
    localContext:
      "Dún Laoghaire (Co. Dublin, A96) is a Victorian harbour town of seafront terraces and apartments. Paint near the coast needs the right system, so we prime and finish exteriors to handle marine exposure.",
    highlights: [
      "Marine-grade exterior coatings",
      "Seafront terrace repaints",
      "Commercial & residential crews",
    ],
  },
  Dalkey: {
    intro:
      "High-standard interiors and weather-tough exteriors for Dalkey's coastal homes.",
    localContext:
      "Dalkey (Co. Dublin, A96) is an upmarket coastal village of granite and period homes. We deliver careful interior finishes and exterior systems that stand up to wind and sea spray.",
    highlights: [
      "Coastal exterior systems",
      "Granite & period property work",
      "High-standard interior finishes",
    ],
  },
  Foxrock: {
    intro:
      "Full-house repaints and hand-painted kitchens for Foxrock's larger homes.",
    localContext:
      "Foxrock (Dublin 18) is a quiet, leafy suburb of large detached homes. We carry out full-house interior repaints, hand-painted kitchen cabinetry and exterior work on bigger properties.",
    highlights: [
      "Full-house interior repaints",
      "Hand-painted kitchen cabinetry",
      "Large-property exterior work",
    ],
  },
  Stillorgan: {
    intro:
      "Repaints, tenancy turnarounds and exterior upkeep across Stillorgan.",
    localContext:
      "Stillorgan (Co. Dublin, A94) is an established south-Dublin suburb of mid-century semis and apartment blocks. We handle full repaints, tenancy turnarounds and ongoing exterior maintenance.",
    highlights: [
      "Full house repaints",
      "Tenancy turnarounds",
      "Exterior maintenance",
    ],
  },
  Sandyford: {
    intro: "Out-of-hours commercial and residential painting across Sandyford.",
    localContext:
      "Sandyford (Dublin 18) combines modern apartment blocks with the Sandyford Business District. We paint homes, communal block areas and commercial units, working out of hours where required.",
    highlights: [
      "Out-of-hours commercial painting",
      "Apartment-block common areas",
      "Health & safety compliant crews",
    ],
  },
  Dundrum: {
    intro:
      "Family-home repaints, new-build finishing and commercial work in Dundrum.",
    localContext:
      "Dundrum (Dublin 14) mixes period homes, newer estates and the town-centre commercial area. We deliver family-home repaints, new-build finishing and tidy commercial work.",
    highlights: [
      "Family-home repaints",
      "New-build snagging & finishing",
      "Clean, tidy handover",
    ],
  },
  Rathfarnham: {
    intro:
      "Full repaints, woodwork and exterior upkeep for Rathfarnham homes.",
    localContext:
      "Rathfarnham (Dublin 14) is a mature south-Dublin suburb of semis and detached homes. We handle full house repaints, woodwork and trim, and exterior maintenance for owner-occupiers.",
    highlights: [
      "Full house repaints",
      "Woodwork & trim",
      "Exterior maintenance",
    ],
  },
  Malahide: {
    intro:
      "Interiors and coastal-ready exteriors for Malahide's homes near the marina.",
    localContext:
      "Malahide (Co. Dublin, K36) is a coastal town in north Dublin with period and modern homes near the marina. We paint interiors and specify exterior finishes suited to coastal conditions.",
    highlights: [
      "Coastal exterior finishes",
      "Period & modern interiors",
      "Full-house repaints",
    ],
  },
  Clondalkin: {
    intro:
      "Repaints and quick tenancy turnarounds across Clondalkin's homes and estates.",
    localContext:
      "Clondalkin (Dublin 22) combines an historic village core with large residential estates in west Dublin. We repaint older and newer homes alike, with fast tenancy turnarounds.",
    highlights: [
      "Full house repaints",
      "Tenancy turnarounds",
      "Older & new-build homes",
    ],
  },
};

// Name → path map, for cross-linking between the 15 static area pages.
export const AREA_PATHS: Array<{ name: string; path: string }> = [
  { name: "Ballsbridge", path: "/painter-ballsbridge" },
  { name: "Ranelagh", path: "/painter-ranelagh" },
  { name: "Rathmines", path: "/painter-rathmines" },
  { name: "Donnybrook", path: "/painter-donnybrook" },
  { name: "Clontarf", path: "/painter-clontarf" },
  { name: "Blackrock", path: "/painter-blackrock" },
  { name: "Dún Laoghaire", path: "/painter-dun-laoghaire" },
  { name: "Dalkey", path: "/painter-dalkey" },
  { name: "Foxrock", path: "/painter-foxrock" },
  { name: "Stillorgan", path: "/painter-stillorgan" },
  { name: "Sandyford", path: "/painter-sandyford" },
  { name: "Dundrum", path: "/painter-dundrum" },
  { name: "Rathfarnham", path: "/painter-rathfarnham" },
  { name: "Malahide", path: "/painter-malahide" },
  { name: "Clondalkin", path: "/painter-clondalkin" },
];
