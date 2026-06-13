## Goal
Rebuild the current Lovable site to match the visual style of the backed-up Painterdublin (Avada) WordPress site. Keep the existing **logo** and company name **"All Colours Painting Contractor Limited"** — only the look, structure, and copy framing will mirror the old site.

## What the old site looks like (from the backup)
- Brand colors: green primary `#18b26f`, warm yellow accent `#ffe979` / `#fbe12e`, charcoal text `#5e5e5e`, white backgrounds
- Big uppercase section titles with a thick green underline accent
- Full-width hero with photo + overlay text + CTA
- Two-column "image + text" intro blocks
- Service icon grid (3-4 columns)
- Portfolio / "Our Work" grid (2-col image cards)
- Testimonials / counters strip
- Footer on dark charcoal with green accents

## Pages to rebuild (replacing current placeholder content)
1. **Home** (`/`) — hero, "Who We Are" intro, services teaser, portfolio strip, CTA band, testimonials
2. **About** (`/about`) — story (DubDesign-style framing rewritten for All Colours), three-pillar block (Protection / Preparation / Finish), team/values
3. **Services** (`/services`) — overview + grid of Residential, Commercial, Architecture/Bespoke, Landscape, Engineering/Repairs
4. **Gallery** (`/gallery`) — portfolio grid with project images pulled from the backup uploads
5. **Contact** (`/contact`) — hero band with form + contact details

## Assets
- Reuse 8–15 representative project photos from `/tmp/sitebak/.../uploads/2024/10/` and `2025/*` (interiors, exteriors, commercial spaces). Upload to Lovable Assets CDN.
- Keep existing `src/assets/logo.png` as-is.

## Design tokens (src/styles.css)
- Replace navy/coral palette with:
  - `--primary`: green `oklch(~0.66 0.17 155)` (~#18b26f)
  - `--accent`: yellow `oklch(~0.92 0.17 95)` (~#ffe979)
  - `--foreground`: charcoal `oklch(0.4 0 0)` (~#5e5e5e)
  - Footer dark surface
- Add a uppercase "section title + underline" utility pattern.

## Layout
- Update `SiteLayout.tsx` header: logo left, horizontal nav (Home / About / Services / Gallery / Contact), green CTA "Get a Quote" button
- Update footer: dark charcoal, three columns (About blurb, Quick links, Contact), copyright row

## Out of scope (skip unless you ask)
- News/blog, sub-service pages (Residential / Commercial / Architecture / Landscape / Engineering as separate routes), portfolio detail pages, contact form backend wiring
- No new dependencies, no Lovable Cloud changes

## Technical notes
- All edits in React/TanStack route files + `SiteLayout.tsx` + `styles.css`
- Images uploaded via `lovable-assets create` and referenced by CDN URL
- Each route keeps its own `head()` meta (title, description, og)

Reply **approve** and I'll start, or tell me what to change (e.g. drop a page, swap a color, add the sub-service pages).
