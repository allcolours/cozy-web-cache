export interface Faq {
  q: string;
  a: string;
  category: "Booking" | "Pricing" | "Process" | "Materials" | "Aftercare";
}

export const FAQS: Faq[] = [
  {
    category: "Booking",
    q: "How quickly can you start a job?",
    a: "Most interior jobs we can start within 1–3 weeks of a confirmed quote. Smaller jobs (a room or two) we can sometimes fit in within a few days. Exterior work depends on the weather and is usually booked 2–4 weeks ahead. Emergency or insurance work we'll always try to prioritise.",
  },
  {
    category: "Booking",
    q: "Do you do free quotes?",
    a: "Yes, every quote starts with a free site visit across Dublin and surrounding areas. We'll walk through the job with you, ask the questions that matter (paint type, colour, timing, who's in the house) and send a detailed written quote within 48 hours.",
  },
  {
    category: "Booking",
    q: "What areas do you cover?",
    a: "All of Dublin city and county, plus surrounding areas in Wicklow, Kildare and Meath. For larger commercial or industrial contracts we travel further — just ask.",
  },
  {
    category: "Pricing",
    q: "How do you price a job?",
    a: "By the job, not by the hour. Your quote breaks down labour, materials and any prep work separately, so you can see exactly what you're paying for. The price we quote is the price you pay — if anything unexpected comes up mid-job we stop, explain it, and only continue with your sign-off.",
  },
  {
    category: "Pricing",
    q: "Do I pay a deposit?",
    a: "For most residential jobs no deposit is needed — we invoice on completion. For larger projects or where we're sourcing premium materials in advance we may ask for a small materials deposit, agreed up front.",
  },
  {
    category: "Pricing",
    q: "Are materials included?",
    a: "Materials are itemised separately in your quote so you can see exactly what's being used. We use trade-grade paints (Dulux, Farrow & Ball, Little Greene, Sandtex, Tikkurila) and you're welcome to supply your own paint if you prefer.",
  },
  {
    category: "Process",
    q: "Do I need to move out while you work?",
    a: "Almost never. We work room-by-room with full dust sheeting, plastic containment where needed, and a daily clean-down. Families, pets and home offices can all carry on around us. For full repaints we'll just plan the schedule so you always have a bedroom, bathroom and kitchen available.",
  },
  {
    category: "Process",
    q: "How long does a typical job take?",
    a: "Rough guide: a single room with prep is 1–2 days, a hallway/stairs/landing is 2–3 days, a three-bed house repaint is 4–7 days, exterior of a semi-detached is 4–6 days depending on prep. Your written quote always includes a working-day estimate.",
  },
  {
    category: "Process",
    q: "Do you handle plastering and repairs?",
    a: "Yes — minor crack-filling, skim repairs, water-damage patches and small plaster jobs are all part of normal prep. For larger plastering work we have a long-standing plasterer we bring in so it all happens under one schedule.",
  },
  {
    category: "Materials",
    q: "Can you help with colour choice?",
    a: "Absolutely. We'll bring colour cards, recommend finishes for each surface, and for bigger jobs we'll mix up paint samples and apply them in the actual rooms so you can see the colour at different times of day before committing.",
  },
  {
    category: "Materials",
    q: "Do you use low-VOC or eco-friendly paints?",
    a: "Yes, on request. We use Dulux EasyCare, Little Greene's water-based range and other low-VOC systems for nurseries, bedrooms or anywhere allergies and air quality matter. Just mention it when we quote.",
  },
  {
    category: "Aftercare",
    q: "What guarantee do you offer?",
    a: "A 2-year written workmanship guarantee on every job. If a properly prepared surface fails — flaking, peeling, blistering — we come back and fix it free of charge. We also carry €5 million public liability insurance and full employer's liability.",
  },
  {
    category: "Aftercare",
    q: "Will you leave the place tidy?",
    a: "It's the single thing we get complimented on most. Daily clean-down, full dust sheeting, all rubbish removed, furniture put back exactly where it was. You shouldn't be able to tell anyone has been there — apart from the new paint.",
  },
  {
    category: "Aftercare",
    q: "What if I notice a touch-up is needed after you finish?",
    a: "Ring or message us. Small touch-ups within the first few months are part of the job — we'll pop back. We also leave any leftover paint clearly labelled with the room and finish so you can do tiny touch-ups yourself in future.",
  },
];
