# Draft polish

- [x] Resize 97 portfolio/gallery images; add 291 CDN card renditions/loading hints, all under 150 KB.
- [x] Regenerate favicon and Apple touch icon from existing logo; both URLs return 200.
- [x] Fix shared contrast, gallery accessible names and owned network errors; Supabase-owned BroadcastChannel left unchanged to preserve auth subscribers.
- [x] Preserve admin notifications after successful lead fallback; four regression tests and isolated endpoint check pass.
- [x] Inspect FAQ/services blocking reads: FAQ has no loader; batch service cover signing without changing gallery selection.
- [x] Run all 22 existing/new tests and verify mobile/desktop pages; automatic build OK. No publishing.

# Audit fixes

- [x] Remove unsupported tax claims; inspect CMS rows without editing those claims.
- [x] Correct estimator and apply legacy house-painting blog corrections at read time.
- [x] Resize shared hero and logo; preserve visual framing.
- [x] Fix shared contrast and contact accessibility.
- [x] Harden confirmation email, asset-error logging, and contact fallback.
- [x] Repair anonymous page views and verify admin analytics.
- [x] Clean sitemap, hide duplicate blog URL, and withdraw service areas with 301 redirects.
- [x] Add leaf-page social images and shorten metadata; keep images out of root to avoid preview conflicts.
- [x] Verify 18 regression tests, mobile/desktop flows, sitemap and automatic build; report exact changed files.
- [ ] Independent CLI build/typecheck result: blocked by platform instruction to use automatic verification; only automatic build OK output is available.

Protected files: package.json, bun.lock, vite.config.ts, vercel.json. Do not publish. SchemaOrg address, geo and sameAs remain unchanged.