import "./lib/error-capture";

import { consumeLastCapturedError } from "./lib/error-capture";
import { renderErrorPage } from "./lib/error-page";

type ServerEntry = {
  fetch: (request: Request, env: unknown, ctx: unknown) => Promise<Response> | Response;
};

let serverEntryPromise: Promise<ServerEntry> | undefined;

async function getServerEntry(): Promise<ServerEntry> {
  if (!serverEntryPromise) {
    serverEntryPromise = import("@tanstack/react-start/server-entry").then(
      (m) => (m.default ?? m) as ServerEntry,
    );
  }
  return serverEntryPromise;
}

// h3 swallows in-handler throws into a normal 500 Response with body
// {"unhandled":true,"message":"HTTPError"} — try/catch alone never fires for those.
async function normalizeCatastrophicSsrResponse(response: Response): Promise<Response> {
  if (response.status < 500) return response;
  const contentType = response.headers.get("content-type") ?? "";
  if (!contentType.includes("application/json")) return response;

  const body = await response.clone().text();
  if (!body.includes('"unhandled":true') || !body.includes('"message":"HTTPError"')) {
    return response;
  }

  console.error(consumeLastCapturedError() ?? new Error(`h3 swallowed SSR error: ${body}`));
  return new Response(renderErrorPage(), {
    status: 500,
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}

const DENY_CACHE_PREFIXES = [
  "/admin",
  "/_authenticated/",
  "/auth",
  "/api/",
  "/lovable/",
];
const DENY_CACHE_EXACT = new Set([
  "/auth",
  "/unsubscribe",
  "/blog",
  "/case-studies",
]);

function shouldCacheMarketingResponse(request: Request, response: Response): boolean {
  const method = request.method;
  if (method !== "GET" && method !== "HEAD") return false;
  if (response.status !== 200) return false;
  const ct = response.headers.get("content-type") ?? "";
  if (!ct.toLowerCase().includes("text/html")) return false;
  if (response.headers.get("set-cookie")) return false;
  if (response.headers.has("cache-control")) return false;

  const path = new URL(request.url).pathname;
  if (DENY_CACHE_EXACT.has(path)) return false;
  for (const p of DENY_CACHE_PREFIXES) if (path.startsWith(p)) return false;
  // Deny DB-loaded SSR sections (blog, case-studies and their detail pages)
  if (path.startsWith("/blog/") || path.startsWith("/case-studies/")) return false;
  if (path === "/blog" || path === "/case-studies") return false;
  return true;
}

function addCacheHeaders(request: Request, response: Response): Response {
  if (!shouldCacheMarketingResponse(request, response)) return response;
  const headers = new Headers(response.headers);
  headers.set("Cache-Control", "public, s-maxage=300, stale-while-revalidate=86400");
  const prevVary = headers.get("Vary");
  headers.set("Vary", prevVary ? `${prevVary}, Cookie, Accept-Encoding` : "Cookie, Accept-Encoding");
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export default {
  async fetch(request: Request, env: unknown, ctx: unknown) {
    try {
      const handler = await getServerEntry();
      const response = await handler.fetch(request, env, ctx);
      const normalized = await normalizeCatastrophicSsrResponse(response);
      return addCacheHeaders(request, normalized);
    } catch (error) {
      console.error(error);
      return new Response(renderErrorPage(), {
        status: 500,
        headers: { "content-type": "text/html; charset=utf-8" },
      });
    }
  },
};
