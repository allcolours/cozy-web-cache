import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import aboutAsset from "../assets/portfolio/about-architecture.jpg.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.jpg.asset.json";
import commercialAsset from "../assets/portfolio/service-commercial.jpg.asset.json";

export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  date: string;
  readTime: string;
  category: string;
  author: string;
  body: { heading?: string; paragraphs: string[] }[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: "how-to-choose-the-right-paint-finish",
    title: "Matt, Eggshell or Satin? A Painter's Honest Guide to Choosing a Finish",
    excerpt:
      "The colour gets the credit but the finish does the work. Here's the straight talk on which sheen belongs on which surface — and the common mistakes we fix every week.",
    cover: heroAsset.url,
    date: "2026-05-18",
    readTime: "6 min read",
    category: "Materials",
    author: "All Colours Painting",
    body: [
      {
        paragraphs: [
          "Every week we walk into a house where the walls are scrubbable satin (showing every dent) and the skirting is matt emulsion (already scuffed to bits). Beautiful colour, wrong finish. Here's how to get it right in plain English.",
        ],
      },
      {
        heading: "Matt — for walls and ceilings, in that order",
        paragraphs: [
          "Matt hides imperfections — old plaster, slightly wavy ceilings, hairline cracks all but disappear under a good matt finish. It's also kindest on the eye in evening light.",
          "Modern 'durable matt' paints (Dulux Diamond Matt, Little Greene Intelligent Matt) are now genuinely scrubbable — you can wipe off little fingerprints without burnishing the surface. Pick one of those in a high-traffic room and you get matt's softness plus eggshell's durability.",
        ],
      },
      {
        heading: "Eggshell — for woodwork and rooms that take a beating",
        paragraphs: [
          "Eggshell is the workhorse finish. Slight sheen, easy to wipe clean, doesn't yellow like the old oil-based satins used to. It belongs on skirting, architraves, doors, kitchen woodwork and bathroom walls.",
          "If you've a busy hallway with kids and a dog, putting durable eggshell on the lower half of the walls (perhaps with a panelled rail) and matt above gives you the best of both worlds.",
        ],
      },
      {
        heading: "Satin and gloss — used carefully, used sparingly",
        paragraphs: [
          "Full gloss is dramatic on a front door or a piece of statement joinery. It also shows every brush mark and every flaw in the wood underneath, so prep needs to be perfect.",
          "Satin on internal walls is mostly a hangover from the 1990s. Unless there's a specific reason — moisture, wipeability beyond what eggshell offers — we'd steer you away from it on walls today.",
        ],
      },
      {
        heading: "The shortcut",
        paragraphs: [
          "Walls and ceilings: durable matt. Woodwork, doors and kitchens: water-based eggshell. Front door: gloss or eggshell depending on the look. Bathrooms: a dedicated moisture-resistant matt. Get those four right and 95% of your decisions are done.",
        ],
      },
    ],
  },
  {
    slug: "preparing-exterior-paintwork-irish-weather",
    title: "Why Exterior Paint Fails Early in Ireland (and How to Stop It)",
    excerpt:
      "Cracked render, blistered woodwork, peeling fascias — most exterior paint problems aren't bad paint, they're rushed prep. Here's what we do differently.",
    cover: exteriorAsset.url,
    date: "2026-04-02",
    readTime: "7 min read",
    category: "Exterior",
    author: "All Colours Painting",
    body: [
      {
        paragraphs: [
          "Irish weather is brutal on paintwork. Wind-driven rain, freeze-thaw cycles, salt air on the coast, and sun that suddenly appears for a fortnight in July and bleaches anything south-facing. A repaint done properly should last 8–10 years; done quickly it can start to fail in 18 months.",
        ],
      },
      {
        heading: "1. Wash, don't just sand",
        paragraphs: [
          "Render and masonry hold years of atmospheric dirt, algae and chalking paint. Going straight in with a brush over the top traps all of that under the new system. We pressure-wash and apply a biocidal wash, then let everything dry properly — usually 48 hours of dry weather.",
        ],
      },
      {
        heading: "2. Fix the moisture path first",
        paragraphs: [
          "Most blistered woodwork is moisture working its way out from behind the paint film. Cracked render, failed sealant around windows, blocked gutters — these have to be addressed before any paint goes near them. Otherwise the new paint just lasts as long as the old paint did, and you blame the painter.",
        ],
      },
      {
        heading: "3. Use the right system, not just the right brand",
        paragraphs: [
          "Sandtex, Dulux Weathershield and Zinsser all do excellent exterior products — but they're systems. A masonry stabiliser, then a primer, then two top coats. Skipping the stabiliser on chalky old render is the single most common reason a re-paint peels off in a winter.",
          "For woodwork we use a flexible water-based exterior system. It expands and contracts with the wood through Irish seasons instead of cracking like the old oil paints did.",
        ],
      },
      {
        heading: "4. Don't paint in the wrong window",
        paragraphs: [
          "Manufacturer minimums for exterior painting are typically 8°C and surfaces dry. In practice that means April to September is your reliable window, with September often the best month (dry surfaces from a warm summer, mild evenings). Painting render in November because the price was good is a false economy.",
        ],
      },
    ],
  },
  {
    slug: "painting-while-you-live-in-the-house",
    title: "Painting a House While You Still Live in It — How We Keep It Calm",
    excerpt:
      "You don't need to move out for a full repaint. With the right schedule, dust control and small daily habits, life carries on around the work. Here's how.",
    cover: aboutAsset.url,
    date: "2026-02-15",
    readTime: "5 min read",
    category: "Process",
    author: "All Colours Painting",
    body: [
      {
        paragraphs: [
          "Almost every family who hires us for a full repaint asks the same nervous question first: do we need to move out? Almost always the answer is no. The trick is sequencing the work so you always have the rooms you need.",
        ],
      },
      {
        heading: "Plan the schedule around your life, not ours",
        paragraphs: [
          "Before we start we sit down with you and figure out which rooms you genuinely need every day. Kitchen, one bathroom, one bedroom per person, somewhere to work from home. We then break the job into phases so those are never offline at the same time.",
        ],
      },
      {
        heading: "Containment, not just dust sheets",
        paragraphs: [
          "Old-school painters drape a cotton sheet and call it done. We use plastic zip-walls between zones, ZipWall poles, and HEPA-filtered hoovers. The rest of the house stays as clean as you left it that morning.",
        ],
      },
      {
        heading: "Low-odour everywhere a person sleeps",
        paragraphs: [
          "Water-based trade emulsions and eggshells have come a very long way. Used properly, you can sleep in a freshly painted room the same night without any noticeable smell. We default to these for nurseries, bedrooms and anywhere kids or elderly relatives spend time.",
        ],
      },
      {
        heading: "Daily reset",
        paragraphs: [
          "Last 30 minutes of every day is clean-down. Sheets folded, tools stacked, hallways hoovered, lids on tins. You walk in after work to a house that's quietly progressing — not a building site.",
        ],
      },
    ],
  },
  {
    slug: "colour-trends-dublin-homes-2026",
    title: "What Dublin Homes Are Actually Painting in 2026",
    excerpt:
      "Forget Pinterest. Here's what's actually going on the walls of Dublin homes we've quoted this year — and the few combinations we keep being asked for.",
    cover: commercialAsset.url,
    date: "2026-01-08",
    readTime: "4 min read",
    category: "Inspiration",
    author: "All Colours Painting",
    body: [
      {
        paragraphs: [
          "Every January we look back at the colours we mixed most often in the last year. It's a more honest indicator of where Irish taste is going than any trend report. Here's what 2025 looked like — and what we're already painting more of in 2026.",
        ],
      },
      {
        heading: "Earthy greens are still everywhere",
        paragraphs: [
          "Farrow & Ball Lichen, Little Greene Sage & Onions, and Colourtrend's Atlantic Mist between them must account for one wall in four we painted last year. Pair them with off-white ceilings and unlacquered brass and it's a hard combination to get wrong.",
        ],
      },
      {
        heading: "Warm off-whites have replaced cool whites",
        paragraphs: [
          "Brilliant white and pure cool greys are on the way out for interior walls. Dimity, Slaked Lime, School House White — anything with a hint of warmth — feels right in Irish daylight, which is usually overcast.",
        ],
      },
      {
        heading: "Inside-of-the-front-door colour",
        paragraphs: [
          "A really small move with huge personality. Paint the inside face of your front door a strong colour — oxblood, deep teal, mustard — and the rest of the hallway can stay neutral. Costs almost nothing extra and we get asked about it every other quote.",
        ],
      },
      {
        heading: "Quiet kitchens, bold studies",
        paragraphs: [
          "We're painting fewer 'feature wall' living rooms and more fully painted studies, snugs and downstairs WCs. The thinking has shifted: keep the rooms you live in calm, and let small rooms be brave.",
        ],
      },
    ],
  },
];

export const getBlogPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
