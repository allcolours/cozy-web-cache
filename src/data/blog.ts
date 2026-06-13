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
    slug: "how-to-repaint-your-front-door",
    title: "How to Repaint Your Front Door (Without Regretting It a Year Later)",
    excerpt:
      "A front door takes more weather than any other surface on the house. Here's the prep, the paint and the timing we use on ours — so yours still looks sharp two winters from now.",
    cover: exteriorAsset.url,
    date: "2026-06-01",
    readTime: "6 min read",
    category: "Exterior",
    author: "All Colours Painting",
    body: [
      {
        paragraphs: [
          "A freshly painted front door is the single best-value upgrade we know. A morning's work, one tin of paint, and the whole house looks ten years younger from the kerb. But it's also the surface we get called back to most often when someone has done it themselves in a rush — usually 12–18 months later when the paint has cracked along the panel edges or peeled off the bottom rail. Here's the process we use on our own doors so it actually lasts.",
        ],
      },
      {
        heading: "1. Pick the right day, not just any dry day",
        paragraphs: [
          "Two coats of paint plus drying time means the door is open or in-and-out for most of a day. You need 8–22°C, low humidity, and no rain forecast for 24 hours after the final coat. In Ireland that's most reliably April through September, ideally a still, dry day after a dry week. Painting in November because you finally have a Saturday free is exactly how you end up with paint that won't cure properly.",
        ],
      },
      {
        heading: "2. Take the door off if you possibly can",
        paragraphs: [
          "Painting a door flat on trestles gives a dramatically better finish than painting it hung — no runs, no sags, and you can do the top and bottom edges (where water gets in) properly. If lifting it off isn't realistic, at least take the handle, letterbox and knocker off. Masking around ironmongery never looks as crisp as removing it.",
        ],
      },
      {
        heading: "3. Prep is 80% of the job",
        paragraphs: [
          "Sand the whole door with 120-grit, then 180-grit. You're not trying to take the old paint off — just to give the new coat something to grip and to flatten any rough spots. Fill any dings with a flexible exterior filler, sand flush. Wipe everything down with a tack cloth and white spirit. Any flaking areas get sanded back to a sound edge and spot-primed.",
          "Bare timber and any filler need a coat of exterior wood primer before topcoat. Skipping this is the single most common reason a door fails early — the topcoat has nothing chemical to bond to and lifts off in sheets.",
        ],
      },
      {
        heading: "4. Choose paint built for an exterior door",
        paragraphs: [
          "A front door is not interior woodwork. You want a flexible, water-based exterior gloss or satin — Dulux Weathershield Exterior Gloss, Sandtex Exterior Satinwood, or Little Greene Intelligent Exterior Eggshell are all excellent. They flex with the timber through wet-and-dry cycles instead of cracking like the old oil-based glosses did.",
          "For colour, anything dark and south-facing (deep blue, oxblood, black) gets seriously hot in summer sun and moves the timber more — go for a paint specifically rated for dark exterior colours, or accept you'll be repainting more often.",
        ],
      },
      {
        heading: "5. Two thin coats, brushed properly",
        paragraphs: [
          "Use a good 2-inch synthetic brush — a cheap brush sheds bristles into the finish and they're a misery to pick out. Cut in the panels first (mouldings, recessed panels), then do the rails (horizontals), then the stiles (verticals), always finishing your strokes top-to-bottom in the direction of the grain.",
          "Thin coats. Two thin coats look better than one thick one and dry without sagging. Let the first coat dry the full time the tin says — usually 4–6 hours — sand very lightly with 240-grit, dust off, and apply the second.",
        ],
      },
      {
        heading: "6. Don't forget the edges and the bottom",
        paragraphs: [
          "Water gets into a front door through the top and bottom edges, and through the bottom rail where it meets the threshold. These are usually the first places paint fails. Every coat should go right onto the top edge and the bottom edge — that's why we lift the door off where possible. If you can't lift it, at least open it fully and paint as much of the bottom edge as you can reach.",
        ],
      },
      {
        heading: "7. Re-hang carefully and leave it alone",
        paragraphs: [
          "Re-fit the ironmongery only when the paint is touch-dry (usually 2–4 hours after the second coat). Don't close the door fully overnight on the same day — the still-curing paint can stick to the frame. By morning it's almost always fine, but a tiny gap saves heartbreak.",
        ],
      },
      {
        heading: "If you'd rather we did it",
        paragraphs: [
          "We repaint front doors all over Dublin as small standalone jobs — usually a half-day, often combined with a touch-up of the porch or window cills. Drop us a photo on WhatsApp and we'll come back with a price the same day.",
        ],
      },
    ],
  },

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
