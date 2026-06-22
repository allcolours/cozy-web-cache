import { createClient } from '@supabase/supabase-js';
import { TESTIMONIALS } from './src/data/testimonials.ts';
import { BLOG_POSTS } from './src/data/blog.ts';
import { CASE_STUDIES } from './src/data/caseStudies.ts';

const sb = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_SERVICE_ROLE_KEY!);

const tRows = TESTIMONIALS.map((t, i) => ({
  author_name: t.name, author_role: t.role, location: t.location,
  content: t.quote, rating: t.rating, project_type: t.project,
  visible: true, sort_order: i,
}));
console.log('testimonials:', (await sb.from('testimonials').insert(tRows)).error?.message ?? `+${tRows.length}`);

const bRows = BLOG_POSTS.map((p) => ({
  slug: p.slug, title: p.title, excerpt: p.excerpt, cover_image_url: p.cover,
  category: p.category, author: p.author, read_time: p.readTime, intro: p.excerpt,
  meta_title: p.title, meta_description: p.excerpt,
  content: p.body.map((b) => ({ heading: b.heading ?? '', body: b.paragraphs.join('\n\n') })),
  published: true, published_at: p.date,
}));
console.log('blog_posts:', (await sb.from('blog_posts').insert(bRows)).error?.message ?? `+${bRows.length}`);

const csRows = CASE_STUDIES.map((c, i) => ({
  slug: c.slug, title: c.title, subtitle: c.summary ?? null,
  location: c.location ?? null, category: c.sector ?? null, client_type: c.team ?? null,
  cover_image_url: c.cover ?? null, intro: c.brief ?? null, challenge: c.challenge ?? null,
  approach: Array.isArray(c.approach) ? c.approach.map((s) => `• ${s}`).join('\n') : (c.approach ?? null),
  result: c.result ?? null,
  materials: Array.isArray(c.materials) ? c.materials.map((m: any) => typeof m === 'string' ? m : `${m.name} — ${m.use}`).join('\n') : (c.materials ?? null),
  duration: c.duration ?? null, visible: true, sort_order: i,
}));
const { data: inserted, error: csErr } = await sb.from('case_studies').insert(csRows).select('id, slug');
console.log('case_studies:', csErr?.message ?? `+${inserted?.length}`);

if (inserted) {
  const imgRows: any[] = [];
  for (const cs of CASE_STUDIES) {
    const row = inserted.find((r) => r.slug === cs.slug);
    if (!row || !cs.gallery) continue;
    cs.gallery.forEach((g: any, i: number) => {
      imgRows.push({ case_study_id: row.id, image_url: typeof g === 'string' ? g : g.url, sort_order: i });
    });
  }
  if (imgRows.length) {
    console.log('case_study_images:', (await sb.from('case_study_images').insert(imgRows)).error?.message ?? `+${imgRows.length}`);
  }
}
