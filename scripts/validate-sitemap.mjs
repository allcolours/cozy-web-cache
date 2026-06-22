#!/usr/bin/env node
// Validates /sitemap.xml structure and that public/robots.txt references it.
// Works in two modes:
//   - Static: parses src/routes/sitemap[.]xml.ts ENTRIES and builds XML in-process.
//   - HTTP (optional): SITEMAP_URL=<url> node scripts/validate-sitemap.mjs
//
// Caching: skipped when the cache key (hash of inputs + script + SITEMAP_URL)
// matches a previous successful run. Deploy branches always revalidate.
// Disable with NO_CACHE=1.
import { readFileSync, existsSync, mkdirSync, writeFileSync } from "node:fs";
import { createHash } from "node:crypto";
import { XMLParser, XMLValidator } from "fast-xml-parser";

const ROBOTS_PATH = "public/robots.txt";
const SITEMAP_ROUTE = "src/routes/sitemap[.]xml.ts";
const BASE_URL = "https://allcolourspainter.com";
const CACHE_DIR = "node_modules/.cache/validate-sitemap";
const CACHE_FILE = `${CACHE_DIR}/last-ok`;
const DEPLOY_BRANCHES = new Set(["main", "master", "production", "prod", "release"]);

function fail(msg) {
  console.error(`✗ ${msg}`);
  process.exitCode = 1;
}
function ok(msg) {
  console.log(`✓ ${msg}`);
}

function currentBranch() {
  return (
    process.env.VERCEL_GIT_COMMIT_REF ||
    process.env.CF_PAGES_BRANCH ||
    process.env.GITHUB_REF_NAME ||
    process.env.BRANCH ||
    ""
  );
}

function computeCacheKey() {
  const h = createHash("sha256");
  h.update("v1");
  h.update(process.env.SITEMAP_URL || "");
  for (const p of [SITEMAP_ROUTE, ROBOTS_PATH, "scripts/validate-sitemap.mjs"]) {
    h.update(p);
    h.update(existsSync(p) ? readFileSync(p) : Buffer.from("missing"));
  }
  return h.digest("hex");
}

const isDeployBranch = DEPLOY_BRANCHES.has(currentBranch());
const cacheKey = computeCacheKey();
if (!process.env.NO_CACHE && !isDeployBranch && existsSync(CACHE_FILE)) {
  try {
    if (readFileSync(CACHE_FILE, "utf8").trim() === cacheKey) {
      console.log("✓ Sitemap validation cached (inputs unchanged) — skipping");
      process.exit(0);
    }
  } catch {}
}
if (isDeployBranch) console.log(`(deploy branch "${currentBranch()}" — cache bypassed)`);


// 1. robots.txt
if (!existsSync(ROBOTS_PATH)) {
  fail(`${ROBOTS_PATH} missing`);
} else {
  const robots = readFileSync(ROBOTS_PATH, "utf8");
  const m = robots.match(/^\s*Sitemap:\s*(\S+)\s*$/im);
  if (!m) {
    fail(`robots.txt is missing a "Sitemap:" directive`);
  } else if (!m[1].endsWith("/sitemap.xml")) {
    fail(`robots.txt Sitemap directive does not point to /sitemap.xml: ${m[1]}`);
  } else if (!m[1].startsWith(BASE_URL)) {
    fail(`robots.txt Sitemap URL does not use BASE_URL ${BASE_URL}: ${m[1]}`);
  } else {
    ok(`robots.txt references ${m[1]}`);
  }
}

// 2. Sitemap XML
async function getXml() {
  if (process.env.SITEMAP_URL) {
    const res = await fetch(process.env.SITEMAP_URL);
    if (!res.ok) throw new Error(`HTTP ${res.status} fetching ${process.env.SITEMAP_URL}`);
    const ct = res.headers.get("content-type") || "";
    if (!/xml/i.test(ct)) fail(`Content-Type is not XML: ${ct}`);
    else ok(`HTTP Content-Type: ${ct}`);
    return await res.text();
  }
  // Static mode: extract ENTRIES from the route file and rebuild XML the same way the handler does.
  const src = readFileSync(SITEMAP_ROUTE, "utf8");
  const arrMatch = src.match(/const ENTRIES:[^=]*=\s*(\[[\s\S]*?\n\];)/);
  if (!arrMatch) throw new Error("Could not locate ENTRIES array in sitemap route");
  // eslint-disable-next-line no-new-func
  const entries = new Function(`return ${arrMatch[1].replace(/;$/, "")}`)();
  const urls = entries.map(
    (e) =>
      `  <url>\n    <loc>${BASE_URL}${e.path}</loc>\n    <changefreq>${e.changefreq}</changefreq>\n    <priority>${e.priority}</priority>\n  </url>`,
  );
  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.join("\n")}\n</urlset>`;
}

const xml = await getXml();

const validity = XMLValidator.validate(xml);
if (validity !== true) {
  fail(`Sitemap XML is not well-formed: ${JSON.stringify(validity.err)}`);
} else {
  ok("Sitemap XML is well-formed");
}

const parsed = new XMLParser({ ignoreAttributes: false }).parse(xml);
const urlset = parsed.urlset;
if (!urlset) fail("Sitemap missing <urlset> root");
else if (urlset["@_xmlns"] !== "http://www.sitemaps.org/schemas/sitemap/0.9")
  fail(`Wrong xmlns: ${urlset["@_xmlns"]}`);
else ok("Sitemap has correct <urlset> namespace");

const urls = Array.isArray(urlset.url) ? urlset.url : urlset.url ? [urlset.url] : [];
if (urls.length === 0) fail("Sitemap has no <url> entries");
else ok(`Sitemap contains ${urls.length} URLs`);

const seen = new Set();
let badLoc = 0,
  dupes = 0,
  badPriority = 0;
for (const u of urls) {
  const loc = u.loc;
  if (!loc || typeof loc !== "string" || !/^https?:\/\//.test(loc)) badLoc++;
  if (seen.has(loc)) dupes++;
  seen.add(loc);
  if (u.priority !== undefined) {
    const p = Number(u.priority);
    if (!(p >= 0 && p <= 1)) badPriority++;
  }
}
if (badLoc) fail(`${badLoc} URL(s) have an invalid <loc>`);
else ok("All <loc> values are absolute URLs");
if (dupes) fail(`${dupes} duplicate URL(s) in sitemap`);
else ok("No duplicate URLs");
if (badPriority) fail(`${badPriority} URL(s) have priority outside 0.0–1.0`);
else ok("All priorities in 0.0–1.0");

// Spot-check that the homepage is present
if (!seen.has(`${BASE_URL}/`)) fail("Sitemap is missing the homepage entry");
else ok("Homepage is present");

if (process.exitCode) {
  console.error("\nSitemap validation FAILED");
  process.exit(1);
}
console.log("\nSitemap validation passed");
