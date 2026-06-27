import heroAsset from "../assets/portfolio/hero-house.webp.asset.json";
import aboutAsset from "../assets/portfolio/about-architecture.webp.asset.json";
import exteriorAsset from "../assets/portfolio/portfolio-exterior-1.webp.asset.json";
import commercialAsset from "../assets/portfolio/service-commercial.webp.asset.json";

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
    slug: "cost-to-paint-house-dublin-2025",
    title: "How Much Does It Cost to Paint a House in Dublin in 2025?",
    excerpt:
      "Realistic pricing guide for house painting in Dublin 2025. Includes room-by-room breakdown, what affects price, and how to get an accurate quote.",
    cover: heroAsset.url,
    date: "2025-09-12",
    readTime: "7 min read",
    category: "Pricing",
    author: "All Colours Painting",
    body: [
      {
        paragraphs: [
          "Every week we get the same first message: 'roughly, what would it cost to paint our house?' It's a fair question, and a hard one to answer without seeing the place. But after thousands of Dublin quotes, here's an honest 2025 guide to what you should expect to pay — and why two quotes for the same house can be a thousand euro apart and both be reasonable.",
        ],
      },
      {
        heading: "Room-by-room interior pricing (2025)",
        paragraphs: [
          "Standard bedroom (walls and ceiling, light prep, one colour): €300–€500. Add €80–€150 if the woodwork (skirting, architrave, door) is being painted too.",
          "Living or dining room: €400–€700. Bigger surface area, usually more prep, often two colours and a feature wall.",
          "Kitchen walls and ceiling (excluding cabinets): €350–€600. Cabinet spraying is a separate job and starts around €900 for a small kitchen.",
          "Hallway, stairs and landing: €600–€1,100. The hardest interior job in any house — high walls, awkward access, lots of cutting in around spindles.",
          "Bathroom: €250–€400 with a proper moisture-resistant paint.",
          "Full three-bed semi interior repaint (walls, ceilings, woodwork, two coats): typically €3,500–€5,500.",
        ],
      },
      {
        heading: "Exterior pricing (2025)",
        paragraphs: [
          "Front door repaint: €180–€280 done properly (off the hinges, sanded, primed, two coats).",
          "Render and pebbledash, three-bed semi, full exterior: €2,000–€4,500 depending on prep, scaffolding and number of coats. A detached house with awkward access can be €5,000–€8,000.",
          "Fascias, soffits and gutters (front and back): €450–€900.",
          "Window frames (timber, full prep and repaint): €80–€140 per window.",
        ],
      },
      {
        heading: "What actually moves the price",
        paragraphs: [
          "Prep work is the single biggest variable. A house with sound, well-maintained surfaces might need an hour of filling and sanding per room. A house that hasn't been touched in 15 years can need a full day per room before any paint comes out. Honest quotes price this in; cheap quotes skip it and the finish shows within a year.",
          "Paint quality matters more than people think. Trade Dulux Diamond or Little Greene Intelligent Matt cost two to three times what a basic contract emulsion does, but they cover better (often saving a coat) and last years longer. We default to mid-trade products and price accordingly.",
          "Access changes everything outside. A bungalow with grass right up to the walls is a ladder job. A four-storey Georgian with railings out front needs scaffolding, and scaffolding alone can be €800–€2,000 of the quote before any paint is bought.",
          "Colour changes — particularly going from a dark colour to a light one, or vice versa — often need an extra coat. Two coats become three. Factor 25–35% extra time.",
        ],
      },
      {
        heading: "What should be in a proper quote",
        paragraphs: [
          "A written quote that itemises labour, materials and prep separately. Specific paint brands and finishes named (not just 'two coats of emulsion'). Number of coats specified. Surfaces included and excluded listed. Start date, expected duration and payment terms. Confirmation the contractor is fully insured. A clear price for change-of-scope work if you decide to add a room mid-job.",
        ],
      },
      {
        heading: "Red flags to walk away from",
        paragraphs: [
          "Cash-only with no written quote. A price that's 40% below everyone else (almost always one coat, no prep, and they'll be unreachable when it fails). No insurance details. No fixed address or VAT number. Pressure to pay a large deposit up front — a normal deposit for materials is 20–25%, paid against an invoice, not 50% in cash.",
        ],
      },
      {
        heading: "Get an accurate quote",
        paragraphs: [
          "Photos on WhatsApp are usually enough for a ballpark within 10%. For a fixed price we'll come out, measure, and put a written quote in your inbox within 48 hours — no obligation, no pressure. Use the form on our contact page or send a few photos and we'll come back the same day.",
        ],
      },
    ],
  },
  {
    slug: "best-exterior-paint-ireland",
    title: "Best Exterior Paint for Irish Weather — What Actually Lasts",
    excerpt:
      "What exterior paints actually survive Irish rain and damp? Painters with 10 years Dublin experience share what works — and what doesn't.",
    cover: exteriorAsset.url,
    date: "2025-08-20",
    readTime: "6 min read",
    category: "Materials",
    author: "All Colours Painting",
    body: [
      {
        paragraphs: [
          "Irish weather punishes exterior paint in a way most paint marketing doesn't account for. Wind-driven rain hits walls horizontally for weeks at a time. Damp sits in render through winter. South-facing elevations bake one afternoon and freeze that night. After a decade of repainting Dublin houses, here are the products we actually trust — and the ones we've stopped using.",
        ],
      },
      {
        heading: "What Irish weather does to paint",
        paragraphs: [
          "Three things kill exterior paint here. First, persistent moisture: render absorbs water and the paint film has to breathe it back out or it blisters. Second, freeze-thaw: water sitting in micro-cracks expands when it freezes and lifts the paint. Third, UV on the few bright days, which breaks down cheap binders within a year or two. A paint that handles dry Spanish heat brilliantly can fail in two winters here.",
        ],
      },
      {
        heading: "Masonry: Sandtex and Dulux Weathershield are the safe bets",
        paragraphs: [
          "Sandtex Ultra Smooth Masonry has been the workhorse on Dublin pebbledash and render for thirty years for a reason. It's a high-build, flexible, microporous paint — it lets moisture escape but stops it getting in. Expect 8–10 years on a properly prepped wall.",
          "Dulux Weathershield Smooth Masonry is the closest direct competitor and arguably has a better colour range. Same performance bracket. Either is fine; we usually pick by colour match.",
          "Both want a stabilising primer on chalky or previously painted render. Skip the primer and you've wasted the topcoat — it'll peel off in flakes the first wet winter.",
        ],
      },
      {
        heading: "Exterior woodwork: Tikkurila and Sadolin lead",
        paragraphs: [
          "For windows, doors, fascias and any exterior timber, we've moved almost entirely to water-based flexible systems. Tikkurila Unica Super and Sadolin Superdec both flex with the timber through wet-dry cycles instead of cracking like the old oil glosses did.",
          "Dulux Weathershield Exterior Gloss is fine for front doors. For long-lasting work on softwood windows, Tikkurila is the one that holds up year after year.",
        ],
      },
      {
        heading: "Prep matters more than the paint",
        paragraphs: [
          "We get called to 'redo a paint job that failed' more often than we get called for fresh exterior jobs. Almost every failure is prep, not product. The order that matters: pressure-wash and biocide everything. Let it dry for at least 48 hours of dry weather. Fix the actual moisture source (blocked gutter, cracked sealant, failed lead flashing) before paint touches it. Stabilise chalky surfaces. Spot-prime any bare patches. Then — and only then — paint.",
        ],
      },
      {
        heading: "How long it should actually last",
        paragraphs: [
          "Properly prepped masonry with a quality system: 8–10 years on the south and west elevations, 10–12 years on the north and east. Exterior woodwork: 5–7 years with a modern water-based system, less on south-facing windows. If a job is failing in under 4 years, it's almost always under-prepped, not the wrong paint.",
        ],
      },
      {
        heading: "Get a proper exterior quote",
        paragraphs: [
          "Every exterior job we quote includes the specific paint system we'll use, the prep we'll do, and an honest estimate of how long it should last. Send us a few photos and we'll come back with a price within 48 hours.",
        ],
      },
    ],
  },
  {
    slug: "how-long-to-paint-house-interior",
    title: "How Long Does It Take to Paint a House Interior in Dublin?",
    excerpt:
      "Realistic timelines for interior painting jobs in Dublin. Room by room guide from professional painters.",
    cover: aboutAsset.url,
    date: "2025-07-15",
    readTime: "5 min read",
    category: "Process",
    author: "All Colours Painting",
    body: [
      {
        paragraphs: [
          "When you're trying to schedule a painter around work, kids, and the in-laws coming to stay, the timeline matters as much as the price. Here's an honest guide to how long interior painting actually takes, based on years of Dublin jobs.",
        ],
      },
      {
        heading: "Room by room timelines",
        paragraphs: [
          "Standard bedroom (walls and ceiling, two coats, light prep): one painter, one day. Add half a day if woodwork is included.",
          "Living or dining room: 1–1.5 days for a single painter. More if there's a feature wall in a different colour or significant prep.",
          "Kitchen (walls and ceiling, excluding cabinets): one day. Spraying cabinets is a separate 2–3 day job that needs the kitchen fully cleared.",
          "Hallway, stairs and landing: 2–3 days. It's almost always the slowest part of any house repaint — high walls, scaffold or ladder work, lots of cutting in around spindles and banisters.",
          "Bathroom: half a day to a day depending on tiling and fittings to mask off.",
          "Full three-bed semi interior repaint: typically 6–10 working days with a two-painter crew.",
        ],
      },
      {
        heading: "What slows a job down",
        paragraphs: [
          "Heavy prep is the biggest variable. A wall that's been Polyfilla-patched fifteen times needs sanding flat and possibly skim-coating before paint goes on. That can add a full day per room.",
          "Colour changes — particularly dark-to-light or strong reds and yellows — almost always need three coats instead of two. Factor 30% extra time.",
          "Drying time between coats is fixed by the paint, not by hustle. Two coats means at least 4 hours of drying in the middle, often overnight. You can't sensibly do walls and ceilings of one room in a single morning.",
          "Furniture, flooring protection and moving stuff around adds half a day to most jobs. The faster you can have the room cleared before we arrive, the faster we're out.",
          "Wallpaper removal, replastering, or fixing damp issues are separate jobs that need to happen first. We'll usually flag these at the quote stage.",
        ],
      },
      {
        heading: "Planning around your schedule",
        paragraphs: [
          "Most Dublin families don't move out for a repaint and don't need to. The trick is sequencing. We agree which rooms you need offline-free (usually the kitchen, one bathroom and the bedrooms you sleep in) and phase the work so those are never down at the same time.",
          "If you're selling and need everything done fast, a two- or three-painter crew can knock a full three-bed interior out in 4–5 days. It costs more per day but the total is similar — and you get your house back sooner.",
          "If you're living through it, we work normal hours (8–5), clean down every evening, and keep one set of stairs and one hallway usable at all times. The house functions around the job rather than the other way around.",
        ],
      },
      {
        heading: "Get a timeline with your quote",
        paragraphs: [
          "Every quote we send includes a realistic start date, working days needed, and which rooms will be offline on which days. Send us a few photos or book a free home visit and we'll come back with a fixed price and a schedule that works around your life.",
        ],
      },
    ],
  },
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
  {
    slug: "cost-of-painting-a-house-dublin-2025",
    title: "How Much Does It Cost to Paint a House in Dublin in 2025?",
    excerpt:
      "Real pricing for interior and exterior house painting in Dublin. 3-bed semi from €1,800. Get accurate figures before you call anyone.",
    cover: heroAsset.url,
    date: "2025-10-02",
    readTime: "5 min read",
    category: "Pricing",
    author: "All Colours Painting",
    body: [
      {
        heading: "Interior house painting — what to expect",
        paragraphs: [
          "A standard 3-bed semi-detached interior repaint in Dublin typically costs between €1,800 and €3,200, depending on condition and finish.",
          "Breakdown: Living room (walls + ceiling) €350–€550. Kitchen €400–€700. Three bedrooms €250–€400 each. Hallway, stairs and landing €500–€900. Woodwork throughout (skirting, architraves, doors) €600–€1,200.",
          "The biggest variables are prep time and the current state of the surfaces. A house that hasn't been painted in 10 years takes longer to sand, fill and prime than one done 3 years ago.",
        ],
      },
      {
        heading: "Exterior house painting — real Dublin figures",
        paragraphs: [
          "Exterior work is more variable. Typical ranges: 3-bed semi, smooth render €1,800–€3,000. 3-bed semi, pebbledash €2,500–€4,500. Detached 4–5 bed €3,500–€7,000. Front only €800–€1,800. Fascias, soffits and gutters add €400–€800.",
          "One thing Dublin homeowners often underestimate: preparation. Cracked render, peeling paint and mould growth all need to be treated before painting.",
        ],
      },
      {
        heading: "What affects the price most?",
        paragraphs: [
          "Four factors: surface condition, access (scaffolding adds €300–€800), number of coats (most exteriors need primer + 2 finish coats minimum), and paint quality (trade-grade Dulux or Johnstone's lasts 2–3x longer than budget paint).",
          "We always specify the paint in our written quotes — so you know exactly what's going on your walls.",
        ],
      },
      {
        heading: "How to get an accurate quote",
        paragraphs: [
          "The only way to get a price you can trust is a site visit. We visit the property, walk every room and take measurements. Written quote within 48 hours. No obligation. Call 085 821 1870 or request online.",
        ],
      },
    ],
  },
  {
    slug: "best-paint-colours-dublin-homes-2025",
    title: "Best Paint Colours for Dublin Homes in 2025",
    excerpt:
      "What colours actually work in Dublin's grey light? Our painters share the shades that look good year-round in Irish interiors — with real project examples.",
    cover: aboutAsset.url,
    date: "2025-10-08",
    readTime: "4 min read",
    category: "Colour Advice",
    author: "All Colours Painting",
    body: [
      {
        heading: "Why Dublin light changes everything",
        paragraphs: [
          "Ireland sits at 51–55° north, which means lower, greyer light than most paint colours are designed for. Shades made for sunnier climates look wrong on a Dublin wall.",
          "Rule of thumb: go warmer and lighter than you think you need to. Dublin light knocks 15–20% of warmth and brightness out of any colour.",
        ],
      },
      {
        heading: "Whites and off-whites that work",
        paragraphs: [
          "Pure white is rarely right. Best options: Dulux Jasmine White (warm, creamy), Farrow & Ball Pointing No.2003 (for period homes), Johnstone's Antique White (affordable alternative), Little Greene Slaked Lime (cooler white for bright rooms).",
          "For woodwork we default to Dulux Trade Brilliant White Satinwood — durable and easy to touch up.",
        ],
      },
      {
        heading: "Living rooms and open-plan spaces",
        paragraphs: [
          "The trend has moved away from cool grey toward earthy mineral tones. Most requested: Farrow & Ball Elephant's Breath (works in almost any light). Also strong: Dulux Denim Drift, Little Greene Sloe (a deep navy that's excellent for feature walls), Farrow & Ball Mole's Breath.",
        ],
      },
      {
        heading: "Kitchens — what holds up",
        paragraphs: [
          "Always specify a hard-wearing eggshell or satin finish for kitchens. Popular choices: Farrow & Ball Pigeon (grey-green), Dulux Willow Tree (sage green at a fraction of the price), Farrow & Ball Shaded White (for cabinets), Little Greene Invisible Green (dramatic, for large kitchens).",
          "For cabinet painting use a specialist cabinet paint (Zinsser or Dulux Trade) — not standard wall paint.",
        ],
      },
      {
        heading: "Getting colour right",
        paragraphs: [
          "Paint two large test patches (A3 size minimum). Live with them for 48 hours. Look in morning light, afternoon light and artificial light before you commit.",
          "We give honest colour advice as part of every site visit — call 085 821 1870 to book.",
        ],
      },
    ],
  },
  {
    slug: "how-to-prepare-walls-before-painting-dublin",
    title: "How to Prepare Walls Before Painting — The Right Way",
    excerpt:
      "Preparation is where paint jobs succeed or fail. Our Dublin painters explain exactly how we prep walls — and what happens when it's skipped.",
    cover: exteriorAsset.url,
    date: "2025-10-15",
    readTime: "5 min read",
    category: "How-To",
    author: "All Colours Painting",
    body: [
      {
        heading: "Why prep matters more than paint",
        paragraphs: [
          "Premium paint on poor prep fails faster than budget paint on good prep. Preparation does three things: adhesion, smoothness and longevity.",
          "We spend 40–50% of total job time on preparation. It's the part you don't see in photos — and the reason finishes still look right five years on.",
        ],
      },
      {
        heading: "Step 1 — Cleaning the surface",
        paragraphs: [
          "Sugar soap solution for interiors. Pressure washer plus mould treatment for exteriors — Dublin's damp climate means most exterior surfaces have biological growth.",
          "Drying time: 24 hours for interiors, 48–72 hours for exteriors before any paint goes on.",
        ],
      },
      {
        heading: "Step 2 — Filling and repairs",
        paragraphs: [
          "Hairline cracks: fine surface filler. Larger holes: two-part filler or bonding plaster. Render cracks: flexible exterior filler or sand-cement. Gaps around frames: decorator's caulk — not filler, because caulk flexes with movement.",
          "And yes, we fill nail holes and picture hooks as standard.",
        ],
      },
      {
        heading: "Step 3 — Sanding",
        paragraphs: [
          "Sanding smooths filled areas and gives gloss paint a key. We use vacuum sanders on interior work — they capture dust at source, so your house stays liveable while we work.",
          "On woodwork with multiple layers of old gloss, a heat gun is faster and kinder to the timber than chemical strippers.",
        ],
      },
      {
        heading: "Step 4 — Priming",
        paragraphs: [
          "Not optional. Primer seals filler and plaster, improves adhesion, and blocks stains.",
          "Stain-blocking primer (Zinsser BIN) on any staining. Standard PVA for new plaster. Exterior masonry primer on bare render. Skipping primer is the most common cause of patchy results on older Dublin houses.",
        ],
      },
      {
        heading: "The result of doing it right",
        paragraphs: [
          "All preparation is included in our written quotes, itemised line by line. No surprises on the day. Call 085 821 1870 for a free site visit.",
        ],
      },
    ],
  },
  {
    slug: "exterior-painting-dublin-when-and-how",
    title: "Exterior Painting in Dublin — When to Do It and What to Expect",
    excerpt:
      "When is the right time to paint your Dublin home's exterior? What preparation is needed? How long will it last? Real answers from a working Dublin painter.",
    cover: commercialAsset.url,
    date: "2025-10-22",
    readTime: "5 min read",
    category: "Exterior",
    author: "All Colours Painting",
    body: [
      {
        heading: "The best time of year",
        paragraphs: [
          "April to September is ideal. Requirements: air temperature above 10°C, no rain forecast for 24 hours after, surface moisture below 15%, no direct hot sun while painting.",
          "We work year-round when conditions allow — but we won't paint in rain, frost, or on damp surfaces.",
        ],
      },
      {
        heading: "How long does exterior paint last in Dublin?",
        paragraphs: [
          "With proper prep and quality paint: 7–12 years on render, 5–8 years on timber.",
          "What reduces lifespan: poor prep, cheap paint (budget masonry paint chalks in 3–4 years), ongoing damp issues, mould that hasn't been treated.",
          "What extends it: full prep, primer, two coats of Dulux Weathershield or Johnstone's Stormshield, and good water management around the building.",
        ],
      },
      {
        heading: "Pebbledash and rough render",
        paragraphs: [
          "Much of Dublin's housing stock is pebbledash (1930s–1970s semis). It's harder to paint: more abrasive on rollers, holds more moisture, takes significantly more paint, and loose sections need repair before any coating goes on.",
          "Long-pile roller plus back-brushing is required to work paint into the texture. Once painted, pebbledash needs regular maintenance — but future repaints are much easier.",
        ],
      },
      {
        heading: "What's included in a proper exterior paint job",
        paragraphs: [
          "Eight steps: pressure wash, mould and algae treatment, crack repair, masking, primer, two coats of masonry paint, woodwork (fascias, soffits, window frames), and a full site clean.",
          "Some painters quote low by excluding prep or the second coat — always check what's included before signing.",
        ],
      },
      {
        heading: "Getting a quote",
        paragraphs: [
          "Free site visits across Dublin. We identify damp issues and structural problems before painting, not after. Written quote within 48 hours.",
          "Get quotes from at least 2 painters and ask each to specify exactly what's included. Call 085 821 1870.",
        ],
      },
    ],
  },
];

export const getBlogPost = (slug: string) => BLOG_POSTS.find((p) => p.slug === slug);
