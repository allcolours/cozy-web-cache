## Status

- **Login**: already working. `info@allcolourspainter.com` / `AllColours2025!` authenticates successfully against the auth API. The previous "Invalid login credentials" errors were before the user existed. No code change needed; please retry at `/auth`.
- **Admin shell + Gallery CMS**: already built in previous turns (sidebar, dashboard, gallery list/edit/new, image upload).

## What this plan adds

### Phase 1 — Database (single migration)

Create `testimonials`, `blog_posts`, `case_studies`, `case_study_images` with the schema you specified. Each gets:
- `GRANT SELECT TO anon` (public read), `GRANT ALL TO authenticated`, `GRANT ALL TO service_role`
- RLS enabled
- Public SELECT policy (visible/published rows only)
- Authenticated full-access policy
- `updated_at` trigger on `blog_posts`

Then seed via insert tool:
- 7 testimonials extracted from current site code
- 4 blog posts extracted from current `/blog` route
- 4 case studies extracted from current `/case-studies` route

### Phase 2 — Admin CMS sections

Three new admin route trees, all under existing `_authenticated/admin.*` shell:

1. **Testimonials** — list / new / edit. Form: author, role, location, rating (1–5), project_type, content, visible, sort_order.
2. **Blog** — list / new / edit. Form: title, slug (auto from title), category select, read_time, intro, **content sections** (dynamic add/remove heading+body), meta_title, meta_description, published toggle.
3. **Case studies** — list / new / edit. Form: all text fields you listed + cover image upload + multi-image gallery upload (reuses gallery storage pattern).

Dashboard stat cards updated to count all four tables.

### Phase 3 — Public pages read from DB

- Homepage testimonials section → `useQuery` from `testimonials`
- `/blog` index + `/blog/$slug` → from `blog_posts`
- `/case-studies` index + `/case-studies/$slug` → from `case_studies` (+ images)

Each uses `useQuery` in the component (not loader) so public routes don't need server fns.

## Technical notes

- All admin pages use the existing AdminShell + `_authenticated` gate.
- Image uploads reuse the existing `gallery` storage bucket pattern with a `case-studies/` prefix, or I can create a separate `case-studies` bucket — tell me which.
- Blog content stored as `jsonb` array of `{heading, body}` sections, matching your form spec.
- Slug auto-generation client-side with kebab-case from title; editable.

## Open questions

1. Confirm login works for you now before I proceed (one quick test).
2. Separate storage bucket for case studies, or reuse `gallery`?
3. Do you want a rich text editor for blog body sections (e.g. Tiptap) or plain textarea per section as written in your spec?

## Estimated output

~12 new files (4 admin sections × ~3 files, plus public page edits to 3 existing routes), 1 migration, 1 seed insert. Roughly the same magnitude as the gallery CMS already built.

Reply "go" to execute all three phases in order, or pick a subset.