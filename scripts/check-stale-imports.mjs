#!/usr/bin/env node
// Fails the build if any tracked source file references the 5 retired JPG
// assets (which have WebP twins) or the deleted logo.png — covers JS/TS
// imports, CSS url() strings, and MDX/Markdown asset URLs, across src/ and
// public/.
import { appendFileSync, readdirSync, readFileSync, statSync } from "node:fs";
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

const COMMENT_MARKER = "<!-- stale-assets-check -->";

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

function buildSummary() {
  let summary = "## Stale asset references\n\n";
  summary += `Found **${failures.length}** reference(s) to retired assets:\n\n`;
  summary += "| File | Line | Reason |\n";
  summary += "|------|------|--------|\n";

  for (const f of failures) {
    summary += `| \`${f.file}\` | ${f.line} | ${f.reason} |\n`;
  }

  summary += "\nPlease switch to the recommended replacement asset before merging.\n";
  return summary;
}

async function postOrUpdatePrComment(summaryMarkdown) {
  if (process.env.GITHUB_ACTIONS !== "true") return;

  const eventPath = process.env.GITHUB_EVENT_PATH;
  const repo = process.env.GITHUB_REPOSITORY;
  const token = process.env.GITHUB_TOKEN;
  const runId = process.env.GITHUB_RUN_ID;
  if (!eventPath || !repo || !token || !runId) return;

  let prNumber;
  try {
    const event = JSON.parse(readFileSync(eventPath, "utf8"));
    prNumber = event?.pull_request?.number;
  } catch {
    return;
  }
  if (!prNumber) return;

  const [owner, repoName] = repo.split("/");
  if (!owner || !repoName) return;

  const jobSummaryUrl = `https://github.com/${owner}/${repoName}/actions/runs/${runId}`;
  const fullBody = `${COMMENT_MARKER}\n${summaryMarkdown}\n📄 [View job summary](${jobSummaryUrl})`;

  const apiBase = `https://api.github.com/repos/${owner}/${repoName}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
    "User-Agent": "stale-assets-check",
  };

  try {
    const listRes = await fetch(`${apiBase}/issues/${prNumber}/comments`, { headers });
    if (listRes.ok) {
      const comments = await listRes.json();
      const existing = comments.find((c) => c.body?.includes(COMMENT_MARKER));
      if (existing) {
        await fetch(`${apiBase}/issues/comments/${existing.id}`, {
          method: "PATCH",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ body: fullBody }),
        });
        return;
      }
    }
  } catch (err) {
    console.error("Could not search for existing PR comment:", err.message);
  }

  try {
    await fetch(`${apiBase}/issues/${prNumber}/comments`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ body: fullBody }),
    });
  } catch (err) {
    console.error("Could not post PR comment:", err.message);
  }
}

(async () => {
  if (failures.length > 0) {
    console.error("\n✗ Stale asset references detected:\n");

    const summary = buildSummary();

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

    if (process.env.GITHUB_STEP_SUMMARY) {
      appendFileSync(process.env.GITHUB_STEP_SUMMARY, summary);
    }

    await postOrUpdatePrComment(summary);

    console.error(`\n${failures.length} violation(s). Build aborted.\n`);
    process.exit(1);
  }

  console.log("✓ No stale JPG/logo.png references found in src/ or public/.");
})();
