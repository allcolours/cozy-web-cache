#!/usr/bin/env node
// Fails the build if any tracked source file references the 5 retired JPG
// assets (which have WebP twins) or the deleted logo.png — covers JS/TS
// imports, CSS url() strings, and MDX/Markdown asset URLs, across src/ and
// public/.
import {
  appendFileSync,
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  statSync,
  writeFileSync,
} from "node:fs";
import { dirname, join, extname } from "node:path";

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

// Path to a persisted file holding the previously-created PR comment ID.
// The CI workflow caches this file (keyed by PR number) across runs so we
// always edit the same comment instead of creating a new one each time.
const COMMENT_ID_FILE =
  process.env.STALE_ASSETS_COMMENT_ID_FILE ||
  ".github/stale-assets-cache/comment-id.txt";

function readStoredCommentId() {
  try {
    if (!existsSync(COMMENT_ID_FILE)) return null;
    const raw = readFileSync(COMMENT_ID_FILE, "utf8").trim();
    return raw ? raw : null;
  } catch {
    return null;
  }
}

function writeStoredCommentId(id) {
  try {
    mkdirSync(dirname(COMMENT_ID_FILE), { recursive: true });
    writeFileSync(COMMENT_ID_FILE, String(id));
  } catch (err) {
    console.error("Could not persist PR comment id:", err.message);
  }
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

  // 1) Reuse the cached comment ID if we have one.
  const storedId = readStoredCommentId();
  if (storedId) {
    try {
      const patchRes = await fetch(`${apiBase}/issues/comments/${storedId}`, {
        method: "PATCH",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ body: fullBody }),
      });
      if (patchRes.ok) return;
      // 404 / 410 → the comment was deleted on GitHub; fall through and recreate.
      if (patchRes.status !== 404 && patchRes.status !== 410) {
        console.error(
          `PATCH on stored comment ${storedId} failed: ${patchRes.status}`,
        );
      }
    } catch (err) {
      console.error("Could not update stored PR comment:", err.message);
    }
  }

  // 2) Fallback: look for an existing marker comment (covers first run after
  //    a cache miss so we don't create a duplicate).
  try {
    const listRes = await fetch(`${apiBase}/issues/${prNumber}/comments`, { headers });
    if (listRes.ok) {
      const comments = await listRes.json();
      const existing = comments.find((c) => c.body?.includes(COMMENT_MARKER));
      if (existing) {
        const patchRes = await fetch(`${apiBase}/issues/comments/${existing.id}`, {
          method: "PATCH",
          headers: { ...headers, "Content-Type": "application/json" },
          body: JSON.stringify({ body: fullBody }),
        });
        if (patchRes.ok) {
          writeStoredCommentId(existing.id);
          return;
        }
      }
    }
  } catch (err) {
    console.error("Could not search for existing PR comment:", err.message);
  }

  // 3) Create a new comment and persist its ID for future runs.
  try {
    const createRes = await fetch(`${apiBase}/issues/${prNumber}/comments`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ body: fullBody }),
    });
    if (createRes.ok) {
      const created = await createRes.json();
      if (created?.id) writeStoredCommentId(created.id);
    }
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
