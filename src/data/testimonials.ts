export interface Testimonial {
  name: string;
  location: string;
  role: string;
  rating: number;
  quote: string;
  project: string;
}

export const TESTIMONIALS: Testimonial[] = [
  {
    name: "Sarah O'Reilly",
    location: "Ranelagh, Dublin 6",
    role: "Homeowner",
    rating: 5,
    quote:
      "Honestly the tidiest tradesmen we've ever had in the house. Three bedrooms and a hallway in four days, dust sheets everywhere, and they hoovered before they left every evening. The cut-ins around the cornicing are razor sharp.",
    project: "Full repaint of a Victorian terrace",
  },
  {
    name: "Liam Byrne",
    location: "Clontarf, Dublin 3",
    role: "Homeowner",
    rating: 5,
    quote:
      "Got three quotes — All Colours weren't the cheapest, but the lads spent forty minutes walking around the house before quoting. That alone told me they actually cared. Two years on, the exterior still looks brand new.",
    project: "Exterior render and woodwork repaint",
  },
  {
    name: "Niamh Kelly",
    location: "Sandymount, Dublin 4",
    role: "Interior Designer",
    rating: 5,
    quote:
      "I've used a lot of painters for client jobs and these are the only ones I trust with Farrow & Ball. They prep like they're paying for the paint themselves. Genuinely lovely to deal with too — my clients always ring to thank me.",
    project: "Three client projects across South Dublin",
  },
  {
    name: "Mark Donnelly",
    location: "Stillorgan, Co. Dublin",
    role: "Facilities Manager",
    rating: 5,
    quote:
      "We had to repaint a 1,400 sqm warehouse without shutting down. They worked nights and weekends, kept the site spotless, and finished a day early. We've since brought them in for two more sites.",
    project: "Industrial warehouse repaint",
  },
  {
    name: "Aoife & Brian Murphy",
    location: "Glasnevin, Dublin 9",
    role: "Homeowners",
    rating: 5,
    quote:
      "We were nervous about painting our new baby's room — fumes, timing, the lot. The team used low-VOC paints, finished the whole thing in one day and you couldn't smell a thing the next morning. So thoughtful.",
    project: "Nursery and master bedroom",
  },
  {
    name: "Ciara Walsh",
    location: "Rathmines, Dublin 6",
    role: "Landlord",
    rating: 5,
    quote:
      "Tenants moved out on Friday, lads were in on Saturday morning, done by Tuesday evening. New tenants moved in Wednesday. That's the kind of turnaround that keeps a rental running.",
    project: "Two-bed apartment turnover",
  },
  {
    name: "James Fitzgerald",
    location: "Dún Laoghaire, Co. Dublin",
    role: "Architect",
    rating: 5,
    quote:
      "Sash windows on a protected structure — they sourced the correct heritage primer and finished system, masked everything beautifully and didn't damage a single piece of stained glass. Old-school craftsmanship.",
    project: "Heritage sash window restoration",
  },
  {
    name: "Orla Doyle",
    location: "Lucan, Co. Dublin",
    role: "Homeowner",
    rating: 5,
    quote:
      "The quote was clear, the price didn't change, and the job was finished when they said it would be. Sounds basic — until you've had a few cowboys in the house. We'll use them again in a heartbeat.",
    project: "Hallway, stairs and landing",
  },
];
