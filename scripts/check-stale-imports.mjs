#!/usr/bin/env node
// Fails the build if any source file imports the 5 retired JPG assets
// (which have WebP twins) or the deleted logo.png.
import { readdirSync, readFileSync, statSync } from "node:fs";
import { join, extname } from "node:path";

const ROOT = "src";
const EXTS = new Set([".ts", ".tsx", ".js", ".jsx", ".mjs", ".cjs"]);

// Forbidden import substrings → human-readable reason
const FORBIDDEN = [
  { pattern: "logo.png", reason: "logo.png was deleted; use logo.webp" },
  { pattern: "portfolio-commercial-floor.jpg", reason: "use portfolio-commercial-floor.webp" },
  { pattern: "portfolio-exterior-1.jpg", reason: "use portfolio-exterior-1.webp" },
  { pattern: "service-commercial.jpg", reason: "use service-commercial.webp" },
  { pattern: "service-hospitality.jpg", reason: "use service-hospitality.webp" },
  { pattern: "service-industrial.jpg", reason: "use service-industrial.webp" },
];

const failures = [];

function walk(dir) {
  for (const entry of readdirSync(dir)) {
    const full = join(dir, entry);
    const st = statSync(full);
    if (st.isDirectory()) {
      walk(full);
    } else if (EXTS.has(extname(entry))) {
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

walk(ROOT);

if (failures.length > 0) {
  console.error("\n✗ Stale asset imports detected:\n");
  for (const f of failures) {
    console.error(`  ${f.file}:${f.line}`);
    console.error(`    → ${f.reason}`);
    console.error(`    ${f.text}`);
  }
  console.error(`\n${failures.length} violation(s). Build aborted.\n`);
  process.exit(1);
}

console.log("✓ No stale JPG/logo.png imports found.");
