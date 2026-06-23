#!/usr/bin/env node
// Fails the build if any tracked source file references the 5 retired JPG
// assets (which have WebP twins) or the deleted logo.png — covers JS/TS
// imports, CSS url() strings, and MDX/Markdown asset URLs, across src/ and
// public/.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOTS = ["src", "public"];
const EXTS = new Set([
  ".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs",
  ".css", ".scss", ".sass", ".less",
  ".md", ".mdx",
  ".html", ".htm",
  ".json", ".xml", ".txt",
]);

// Skip generated asset pointer files — they describe the old binary, not a live reference.
const SKIP_SUFFIX = [".asset.json"];

// Forbidden substrings → human-readable reason
const FORBIDDEN = [
  { pattern: "logo.png", reason: "logo.png was deleted; use logo.webp" },
  { pattern: "portfolio-commercial-floor.jpg", reason: "use portfolio-commercial-floor.webp" },
  { pattern: "portfolio-exterior-1.jpg", reason: "use portfolio-exterior-1.webp" },
  { pattern: "service-commercial.jpg", reason: "use service-commercial.webp" },
  { pattern: "service-hospitality.jpg", reason: "use service-hospitality.webp" },
  { pattern: "service-industrial.jpg", reason: "use service-industrial.webp" },
];

const failures = [];

function shouldSkip(path) {
  return SKIP_SUFFIX.some((s) => path.endsWith(s));
}

function walk(dir) {
  let entries;
  try {
    entries = readdirSync(dir);
  } catch {
    return;
  }
  for (const entry of entries) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
    } else if (EXTS.has(extname(entry)) && !shouldSkip(full)) {
      const text = readFileSync(full, "utf8");
      const lines = text.split("\n");
      lines.forEach((line, i) => {
        for (const { pattern, reason } of FORBIDDEN) {
          if (line.includes(pattern)) {
            failures.push({ file: full, line: i + 1, text: line.trim(), reason });
          }
        }
      });
    }
  }
}

for (const root of ROOTS) walk(root);

function escapeAnnotation(value) {
  return String(value)
    .replace(/%/g, "%25")
    .replace(/\r/g, "%0D")
    .replace(/\n/g, "%0A");
}

if (failures.length > 0) {
  console.error("\n✗ Stale asset references detected:\n");
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}`);
    console.error(`    → ${f.reason}`);
    console.error(`    ${f.text}`);

    // Emit a GitHub Actions annotation when running in CI so the PR
    // diff surface shows clickable markers on each offending file/line.
    if (process.env.GITHUB_ACTIONS === "true") {
      const message = escapeAnnotation(`${f.reason}: ${f.text}`);
      const file = escapeAnnotation(f.file);
      console.error(`::error file=${file},line=${f.line}::${message}`);
    }
  }
  console.error(`\n${failures.length} violation(s). Build aborted.\n`);
  process.exit(1);
}

console.log("✓ No stale JPG/logo.png references found in src/ or public/.");
