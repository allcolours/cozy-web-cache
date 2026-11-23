# Architecture rules

- Shared hero renditions and leaf social metadata live in `src/lib/hero-image.ts`; keep social images out of the root head so leaf previews cannot conflict.
- Withdrawn public URLs are redirected before SSR in the server entry; this preserves 301 responses after deleting their content routes.
- Estimator pricing and asset-error bounds live in browser-safe pure helpers with focused tests, so the UI and endpoints share verified rules.
- Apply requested legacy blog corrections at read time without copying production CMS content into disposable draft data.
- Await Supabase mutations and inspect their errors; query builders are lazy thenables and an unawaited insert sends no request.
- Private content pages use `privatePageHead` for unique metadata and noindex; layouts keep only sitewide defaults.
- Keep anonymous duplicate-blog access exclusions in recorded migrations so draft acceptance carries the public-read restriction into the app.
