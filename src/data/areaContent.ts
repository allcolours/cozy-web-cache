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
      "Careful interior and exterior repaints for Ballsbridge's period red-brick homes and apartments.",
    localContext:
      "Ballsbridge (Dublin 4) is mostly Victorian and Edwardian red-brick houses and newer apartment blocks. We work on period interiors, woodwork and exterior masonry, keeping occupied homes clean and disruption low.",
    highlights: [
      "Period interior repaints",
      "Exterior masonry & timber repaints",
      "Tidy work in occupied homes",
    ],
  },
  Ranelagh: {
    intro:
      "Interior repaints, exterior timber and railing work across Ranelagh's red-brick streets.",
    localContext:
      "Ranelagh (Dublin 6) is known for its Victorian and Edwardian red-brick terraces around the village. We repaint period interiors, hallways and stairwells, and repaint exterior timber, railings and front doors.",
    highlights: [
      "Period red-brick interiors",
      "Hallway & stairwell repaints",
      "Exterior timber & railing repaints",
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
    intro: "Clean interior repaints and careful exterior work on Donnybrook's period homes.",
    localContext:
      "Donnybrook (Dublin 4) is a leafy neighbourhood of period red-brick houses and quiet residential streets. We deliver tidy interior repaints and careful exterior preparation on older properties.",
    highlights: [
      "Period home repaints",
      "Careful exterior preparation",
      "Tidy, low-disruption crews",
    ],
  },
  Clontarf: {
    intro: "Interior and exterior repaints along the Clontarf seafront.",
    localContext:
      "Clontarf (Dublin 3) runs along the north coast, with red-brick period houses and 1930s semis near the seafront. Exteriors here see plenty of weather, so we focus on thorough prep and trade-grade weatherproof finishes.",
    highlights: [
      "Exterior repaints near the coast",
      "Render & masonry preparation",
      "Full interior repaints",
    ],
  },
  Blackrock: {
    intro: "Interior and exterior repaints for Blackrock homes near the bay.",
    localContext:
      "Blackrock (Co. Dublin, A94) mixes Victorian period houses with modern coastal properties. We repaint interiors, exterior masonry and timber, using trade-grade weatherproof systems on exposed elevations.",
    highlights: [
      "Exterior repaints near the bay",
      "Period & modern interiors",
      "Render & timber maintenance",
    ],
  },
  "Dún Laoghaire": {
    intro: "Interior and exterior repaints across Dún Laoghaire's harbour terraces.",
    localContext:
      "Dún Laoghaire (Co. Dublin, A96) is a Victorian harbour town of seafront terraces and apartments. We prep and repaint exteriors with weatherproof trade systems and deliver clean interior work in occupied homes.",
    highlights: [
      "Exterior repaints near the harbour",
      "Seafront terrace repaints",
      "Commercial & residential crews",
    ],
  },
  Dalkey: {
    intro: "Careful interior and exterior repaints for Dalkey's coastal and period homes.",
    localContext:
      "Dalkey (Co. Dublin, A96) is an upmarket coastal village of granite and period homes. We deliver careful interior finishes and weatherproof exterior repaints with thorough prep.",
    highlights: [
      "Exterior repaints near the coast",
      "Period & granite property work",
      "Careful interior finishes",
    ],
  },
  Foxrock: {
    intro: "Full-house repaints and exterior work for Foxrock's larger detached homes.",
    localContext:
      "Foxrock (Dublin 18) is a quiet, leafy suburb of large detached homes. We carry out full-house interior repaints, woodwork and trim, and exterior work on bigger properties.",
    highlights: [
      "Full-house interior repaints",
      "Woodwork & trim",
      "Large-property exterior work",
    ],
  },
  Stillorgan: {
    intro: "Repaints, tenancy turnarounds and exterior upkeep across Stillorgan.",
    localContext:
      "Stillorgan (Co. Dublin, A94) is an established south-Dublin suburb of mid-century semis and apartment blocks. We handle full repaints, tenancy turnarounds and ongoing exterior maintenance.",
    highlights: ["Full house repaints", "Tenancy turnarounds", "Exterior maintenance"],
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
    intro: "Family-home repaints, new-build finishing and commercial work in Dundrum.",
    localContext:
      "Dundrum (Dublin 14) mixes period homes, newer estates and the town-centre commercial area. We deliver family-home repaints, new-build finishing and tidy commercial work.",
    highlights: ["Family-home repaints", "New-build snagging & finishing", "Clean, tidy handover"],
  },
  Rathfarnham: {
    intro: "Full repaints, woodwork and exterior upkeep for Rathfarnham homes.",
    localContext:
      "Rathfarnham (Dublin 14) is a mature south-Dublin suburb of semis and detached homes. We handle full house repaints, woodwork and trim, and exterior maintenance for owner-occupiers.",
    highlights: ["Full house repaints", "Woodwork & trim", "Exterior maintenance"],
  },
  Malahide: {
    intro: "Interior and exterior repaints for Malahide's homes near the marina.",
    localContext:
      "Malahide (Co. Dublin, K36) is a coastal town in north Dublin with period and modern homes near the marina. We paint interiors and prep exteriors thoroughly using weatherproof trade systems suited to the coastal setting.",
    highlights: ["Exterior repaints near the coast", "Period & modern interiors", "Full-house repaints"],
  },
  Clondalkin: {
    intro: "Repaints and quick tenancy turnarounds across Clondalkin's homes and estates.",
    localContext:
      "Clondalkin (Dublin 22) combines an historic village core with large residential estates in west Dublin. We repaint older and newer homes alike, with fast tenancy turnarounds.",
    highlights: ["Full house repaints", "Tenancy turnarounds", "Older & new-build homes"],
  },
  Cabra: {
    intro: "Straightforward interior and exterior repaints across Cabra's terraces and semis.",
    localContext:
      "Cabra (Dublin 7) is a north-inner suburb of traditional terraces, 1930s semis and family homes. We deliver clean interior repaints, woodwork and exterior maintenance at honest prices.",
    highlights: ["Terrace & semi repaints", "Woodwork & trim", "Exterior maintenance"],
  },
  Phibsborough: {
    intro: "Period interiors, feature walls and tidy exterior work across Phibsborough.",
    localContext:
      "Phibsborough (Dublin 7) is a north-inner area of Victorian terraces and modern apartment conversions close to the city. We handle interior repaints, period plasterwork and tidy exterior touch-ups in occupied homes.",
    highlights: [
      "Period interior repaints",
      "Feature walls & detail",
      "Apartment & conversion work",
    ],
  },
  Drumcondra: {
    intro: "Period red-brick repaints and fast landlord turnarounds across Drumcondra.",
    localContext:
      "Drumcondra (Dublin 9) is a north-Dublin suburb of red-brick terraces and rental properties near the city. We handle interior and exterior repaints with quick turnarounds for landlords between tenancies.",
    highlights: ["Red-brick period interiors", "Landlord turnarounds", "Exterior repaints"],
  },
  Glasthule: {
    intro: "Careful interior and exterior work for Glasthule's coastal village homes.",
    localContext:
      "Glasthule (Co. Dublin, A96) sits between Dún Laoghaire and Sandycove, with Victorian and Edwardian properties and period detail. We work carefully on older homes and use weatherproof trade systems on exterior elevations.",
    highlights: ["Exterior repaints near the coast", "Period interior work", "Tidy, low-disruption crews"],
  },
  "Mount Merrion": {
    intro: "Full-house repaints and exterior upkeep for Mount Merrion's family homes.",
    localContext:
      "Mount Merrion (Co. Dublin, A94) is a mature south-Dublin suburb of detached and semi-detached family homes. We deliver full interior repaints, woodwork and exterior maintenance with a clean handover.",
    highlights: ["Full-house repaints", "Woodwork & trim", "Exterior maintenance"],
  },
  Cabinteely: {
    intro: "Repaints and exterior work across Cabinteely's family homes and estates.",
    localContext:
      "Cabinteely (Dublin 18) is a south-Dublin suburb of family homes and newer residential developments. We handle full interior repaints, woodwork and exterior maintenance with reliable scheduling.",
    highlights: ["Family-home repaints", "New-build finishing", "Exterior maintenance"],
  },
  Walkinstown: {
    intro: "Reliable residential and light commercial painting across Walkinstown.",
    localContext:
      "Walkinstown (Dublin 12) is a west-Dublin suburb of mid-century semis, terraces and small commercial units. We carry out tidy interior and exterior repaints for homeowners, landlords and small businesses.",
    highlights: ["Semi & terrace repaints", "Light commercial work", "Exterior maintenance"],
  },
  Terenure: {
    intro: "Full interior repaints and exterior maintenance for Terenure's period homes.",
    localContext:
      "Terenure (Dublin 6W) is a south-Dublin suburb of red-brick period houses and detached family homes. We handle interior repaints, period detail and exterior work with proper prep and trade-grade materials.",
    highlights: ["Period home repaints", "Hallway & stairwell work", "Exterior maintenance"],
  },
  Templeogue: {
    intro: "Clean interior and exterior repaints across Templeogue's family homes.",
    localContext:
      "Templeogue (Dublin 6W) is a well-established south-Dublin suburb of detached and semi-detached homes. We deliver full interior repaints, woodwork and exterior maintenance on reliable timelines.",
    highlights: ["Full house repaints", "Woodwork & trim", "Exterior maintenance"],
  },
  Milltown: {
    intro: "Period and semi-detached repaints with a clean finish across Milltown.",
    localContext:
      "Milltown (Dublin 6) is a quiet south-Dublin suburb of period homes and semi-detached houses near the Dodder. We deliver interior repaints, woodwork and exterior maintenance with thorough prep.",
    highlights: ["Period interior repaints", "Woodwork & trim", "Exterior maintenance"],
  },
  Monkstown: {
    intro: "Careful interior and exterior repaints across Monkstown's seafront properties.",
    localContext:
      "Monkstown (Co. Dublin, A94) is a coastal south-Dublin suburb of Victorian and Edwardian seafront properties. Exteriors here need thorough prep and weatherproof trade systems; interiors get careful, period-appropriate repaints.",
    highlights: [
      "Exterior repaints near the coast",
      "Period interior repaints",
      "Seafront render & timber",
    ],
  },
  Tallaght: {
    intro: "Residential and commercial painting at scale across Tallaght.",
    localContext:
      "Tallaght (Dublin 24) is a large west-Dublin town with residential estates and commercial premises. We handle full house repaints, tenancy turnarounds and commercial fit-outs with a large enough team to keep schedules.",
    highlights: ["Estate & semi repaints", "Commercial premises", "Tenancy turnarounds"],
  },
  Ballinteer: {
    intro: "Interior repaints and exterior masonry across Ballinteer.",
    localContext:
      "Ballinteer (Dublin 16) is a south-Dublin suburb of family homes and newer estates in the foothills. We deliver tidy interior repaints, woodwork and exterior masonry work in occupied homes.",
    highlights: ["Tidy interior repaints", "Exterior masonry", "New-build finishing"],
  },
  Lucan: {
    intro: "Interior and exterior painting for Lucan homeowners and developers.",
    localContext:
      "Lucan (Co. Dublin, K78) is a fast-growing west-Dublin area with a mix of new-build estates and older established homes. We work for owner-occupiers and developers across full repaints and new-build finishing.",
    highlights: ["New-build finishing", "Family-home repaints", "Exterior maintenance"],
  },
  Swords: {
    intro: "Residential and commercial painting across Swords and north Fingal.",
    localContext:
      "Swords (Co. Dublin, K67) is the largest town in Fingal, with residential estates and commercial premises. We handle full house repaints, exterior work and commercial fit-outs across the town.",
    highlights: ["Estate house repaints", "Commercial premises", "Exterior maintenance"],
  },
  Drimnagh: {
    intro: "Fast landlord turnarounds and full repaints across Drimnagh.",
    localContext:
      "Drimnagh (Dublin 12) is a west-Dublin suburb of traditional terraces and family homes. We deliver fast tenancy turnarounds for landlords and full interior and exterior repaints for owner-occupiers.",
    highlights: ["Tenancy turnarounds", "Terrace repaints", "Exterior maintenance"],
  },
  Balbriggan: {
    intro: "Interior and exterior painting across Balbriggan's homes and estates.",
    localContext:
      "Balbriggan (Co. Dublin, K32) is a coastal Fingal town in north Dublin, with older terraces and large newer estates. We handle interior repaints and exterior systems suited to the coastal exposure.",
    highlights: ["Coastal-ready exteriors", "Estate & terrace repaints", "Landlord turnarounds"],
  },
  Leopardstown: {
    intro: "Commercial and apartment-scheme painting around Leopardstown.",
    localContext:
      "Leopardstown (Dublin 18) sits in south Dublin near the racecourse and business district, with executive homes and apartment schemes. We deliver residential repaints and commercial work, out of hours where required.",
    highlights: [
      "Apartment-scheme common areas",
      "Out-of-hours commercial",
      "Executive home repaints",
    ],
  },
  Knocklyon: {
    intro: "Full interior repaints and exterior upkeep across Knocklyon.",
    localContext:
      "Knocklyon (Dublin 16) is an established south-Dublin suburb of family homes and semis. We deliver full interior repaints, woodwork and exterior work delivered on schedule.",
    highlights: ["Full house repaints", "Woodwork & trim", "Exterior maintenance"],
  },
  Killiney: {
    intro: "Interior and exterior repaints for Killiney homes on the south Dublin coast.",
    localContext:
      "Killiney (Co. Dublin, A96) is an upmarket coastal area of high-value homes on the south Dublin coast. Exteriors get thorough prep and weatherproof trade finishes; interiors are finished to a high standard.",
    highlights: ["Exterior repaints near the coast", "Careful interior finishes", "Larger-property work"],
  },
  "Harold's Cross": {
    intro: "Period interiors and tight-access exterior work across Harold's Cross.",
    localContext:
      "Harold's Cross (Dublin 6W) is a south-inner suburb of Victorian terraces and modern apartment conversions. We work carefully in occupied homes, handling tight access and period plasterwork.",
    highlights: ["Period terrace interiors", "Apartment conversions", "Tight-access exteriors"],
  },
  Sallynoggin: {
    intro: "Weather-ready exterior repaints and full interior work across Sallynoggin.",
    localContext:
      "Sallynoggin (Co. Dublin, A96) is a coastal south-Dublin suburb with a mix of estate housing and semis. We prep and repaint exteriors with weatherproof trade systems and deliver clean interior repaints.",
    highlights: ["Exterior repaints near the coast", "Full house repaints", "Exterior maintenance"],
  },
  Crumlin: {
    intro: "Terrace and family-home repaints with exterior masonry across Crumlin.",
    localContext:
      "Crumlin (Dublin 12) is a south-west Dublin suburb of traditional terraces and family homes. We deliver interior repaints, ceiling work and exterior masonry at competitive rates.",
    highlights: ["Terrace repaints", "Ceiling work", "Exterior masonry"],
  },
  Goatstown: {
    intro: "Period and modern home repaints with careful exterior work in Goatstown.",
    localContext:
      "Goatstown (Dublin 14) is a quiet south-Dublin suburb with a mix of period and modern homes. We deliver interior repaints, woodwork and exterior masonry done properly.",
    highlights: ["Period & modern interiors", "Woodwork & trim", "Exterior masonry"],
  },
  Glenageary: {
    intro: "Interior and exterior repaints across Glenageary.",
    localContext:
      "Glenageary (Co. Dublin, A96) is a well-established coastal south-Dublin suburb with period and modern homes. We prep and repaint exteriors with weatherproof trade systems and deliver tidy interior work.",
    highlights: ["Exterior repaints near the coast", "Full house repaints", "Woodwork & trim"],
  },
  Portmarnock: {
    intro: "Interior and exterior repaints across Portmarnock.",
    localContext:
      "Portmarnock (Co. Dublin, D13) is a coastal village in north Dublin with premium homes near the sea. We prep and repaint exteriors with weatherproof trade systems and deliver quality interior finishes.",
    highlights: [
      "Exterior repaints near the coast",
      "Full-house interior repaints",
      "Exterior timber & render",
    ],
  },
  Clonskeagh: {
    intro: "Period and family-home repaints with careful exterior work in Clonskeagh.",
    localContext:
      "Clonskeagh (Dublin 14) is a mature south-Dublin area of period houses and family homes near UCD. We deliver interior repaints and exterior masonry with proper prep and tidy crews.",
    highlights: ["Period interior repaints", "Family-home work", "Exterior masonry"],
  },
  Sandymount: {
    intro: "Interior and exterior repaints across Sandymount's Victorian terraces and apartments.",
    localContext:
      "Sandymount (Dublin 4) is a coastal village of Victorian terraces, cottages and apartments off the strand. We work cleanly in occupied homes and use weatherproof trade finishes on exposed exterior elevations.",
    highlights: ["Period terrace interiors", "Exterior repaints near the strand", "Apartment repaints"],
  },
  Raheny: {
    intro: "Interior and exterior repaints for Raheny's 1930s semis and family homes.",
    localContext:
      "Raheny (Dublin 5) is a north-Dublin suburb of 1930s semis, period homes and newer estates near the coast. We deliver full house repaints, woodwork and exterior maintenance with thorough prep.",
    highlights: ["Full house repaints", "Woodwork & trim", "Exterior maintenance"],
  },
  Howth: {
    intro: "Interior and exterior repaints for Howth's coastal and village homes.",
    localContext:
      "Howth (Dublin 13) is an exposed coastal peninsula of period houses, modern builds and village properties. Exteriors take a beating from weather, so we focus on proper prep and weatherproof trade systems.",
    highlights: [
      "Exterior repaints near the coast",
      "Render & timber maintenance",
      "Careful interior finishes",
    ],
  },
  Castleknock: {
    intro: "Interior and exterior repaints for Castleknock's detached and semi-detached homes.",
    localContext:
      "Castleknock (Dublin 15) is a leafy west-Dublin suburb of detached and semi-detached family homes near the Phoenix Park. We handle full repaints, woodwork and exterior maintenance with a tidy handover.",
    highlights: ["Full house repaints", "Woodwork & trim", "Exterior maintenance"],
  },
  Blanchardstown: {
    intro: "Residential and commercial painting across Blanchardstown.",
    localContext:
      "Blanchardstown (Dublin 15) is a large west-Dublin town with residential estates, apartment blocks and commercial parks. We deliver full house repaints, tenancy turnarounds and commercial work at scale.",
    highlights: ["Estate house repaints", "Apartment-block common areas", "Commercial premises"],
  },
  Bray: {
    intro: "Interior and exterior repaints across Bray's seafront terraces and estate housing.",
    localContext:
      "Bray (Co. Wicklow) is a coastal commuter town of Victorian seafront terraces, semis and newer estates. We prep and repaint exteriors with weatherproof trade systems and deliver clean interior work.",
    highlights: [
      "Exterior repaints near the seafront",
      "Period terrace interiors",
      "Estate & family-home repaints",
    ],
  },
  Greystones: {
    intro: "Interior and exterior repaints for Greystones' coastal and estate homes.",
    localContext:
      "Greystones (Co. Wicklow) is a coastal commuter town with growing residential estates and older village homes. We handle full repaints and exterior maintenance with thorough prep.",
    highlights: ["Full house repaints", "Exterior repaints near the coast", "New-build finishing"],
  },
  Maynooth: {
    intro: "Family-home repaints and student-let turnarounds across Maynooth.",
    localContext:
      "Maynooth (Co. Kildare) is a university town with a mix of family homes, student rentals and newer estates. We deliver fast tenancy turnarounds for landlords and full repaints for owner-occupiers.",
    highlights: ["Tenancy turnarounds", "Full house repaints", "Exterior maintenance"],
  },
  Naas: {
    intro: "Residential and commercial painting across Naas.",
    localContext:
      "Naas (Co. Kildare) is a large commuter town with residential estates, town-centre properties and commercial premises. We handle full house repaints, exterior work and commercial fit-outs.",
    highlights: ["Estate house repaints", "Commercial premises", "Exterior maintenance"],
  },
  Navan: {
    intro: "Residential and commercial painting across Navan.",
    localContext:
      "Navan (Co. Meath) is the main Meath town with residential estates and commercial premises. We deliver full house repaints, tenancy turnarounds and commercial work on reliable timelines.",
    highlights: ["Full house repaints", "Tenancy turnarounds", "Commercial premises"],
  },
};

// Name → path map, for cross-linking between the static area pages.
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
  { name: "Cabra", path: "/painter-cabra" },
  { name: "Phibsborough", path: "/painter-phibsborough" },
  { name: "Drumcondra", path: "/painter-drumcondra" },
  { name: "Glasthule", path: "/painter-glasthule" },
  { name: "Mount Merrion", path: "/painter-mount-merrion" },
  { name: "Cabinteely", path: "/painter-cabinteely" },
  { name: "Walkinstown", path: "/painter-walkinstown" },
  { name: "Terenure", path: "/painter-terenure" },
  { name: "Templeogue", path: "/painter-templeogue" },
  { name: "Milltown", path: "/painter-milltown" },
  { name: "Monkstown", path: "/painter-monkstown" },
  { name: "Tallaght", path: "/painter-tallaght" },
  { name: "Ballinteer", path: "/painter-ballinteer" },
  { name: "Lucan", path: "/painter-lucan" },
  { name: "Swords", path: "/painter-swords" },
  { name: "Drimnagh", path: "/painter-drimnagh" },
  { name: "Balbriggan", path: "/painter-balbriggan" },
  { name: "Leopardstown", path: "/painter-leopardstown" },
  { name: "Knocklyon", path: "/painter-knocklyon" },
  { name: "Killiney", path: "/painter-killiney" },
  { name: "Harold's Cross", path: "/painter-harold-s-cross" },
  { name: "Sallynoggin", path: "/painter-sallynoggin" },
  { name: "Crumlin", path: "/painter-crumlin" },
  { name: "Goatstown", path: "/painter-goatstown" },
  { name: "Glenageary", path: "/painter-glenageary" },
  { name: "Portmarnock", path: "/painter-portmarnock" },
  { name: "Clonskeagh", path: "/painter-clonskeagh" },
  { name: "Sandymount", path: "/painter-sandymount" },
  { name: "Raheny", path: "/painter-raheny" },
  { name: "Howth", path: "/painter-howth" },
  { name: "Castleknock", path: "/painter-castleknock" },
  { name: "Blanchardstown", path: "/painter-blanchardstown" },
  { name: "Bray", path: "/painter-bray" },
  { name: "Greystones", path: "/painter-greystones" },
  { name: "Maynooth", path: "/painter-maynooth" },
  { name: "Naas", path: "/painter-naas" },
  { name: "Navan", path: "/painter-navan" },
];

// Towns we cover by van within our normal service radius but without a
// dedicated landing page. Shown as a plain-text coverage list on the
// residential landing page and other "areas" sections.
export const ALSO_SERVING: string[] = [
  "Sutton",
  "Baldoyle",
  "Marino",
  "Glasnevin",
  "Santry",
  "Finglas",
  "Artane",
  "Coolock",
  "Rathgar",
  "Churchtown",
  "Firhouse",
  "Booterstown",
  "Palmerstown",
  "Inchicore",
  "Kilmainham",
  "Skerries",
  "Celbridge",
  "Leixlip",
  "Kilcock",
  "Dunboyne",
  "Ashbourne",
  "Ratoath",
  "Delgany",
];
