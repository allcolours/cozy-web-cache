import { test } from "node:test";
import assert from "node:assert/strict";
import { calculateEstimate } from "./estimate-pricing";
import { AssetErrorPayloadSchema, assetErrorLimitReached, ASSET_ERROR_WINDOW_MS } from "./asset-error-validation";
import { permanentRedirect } from "./permanent-redirects";
import { contactFallbackResponse } from "./contact-fallback";
import { correctHousePaintingPrice } from "./blog-content-corrections";
import { pageViewPayload } from "./page-view-payload";

test("interior uses EUR 38 per square metre plus unchanged extras", () => {
  assert.equal(calculateEstimate("interior", 80, 400)?.total, 3440);
});
test("interior range is 75% to 130%, rounded to nearest EUR 50", () => {
  const result = calculateEstimate("interior", 80, 0);
  assert.equal(result?.low, 2300);
  assert.equal(result?.high, 3950);
});
for (const type of ["exterior", "interior-exterior", "commercial"] as const) {
  test(`${type} never produces a numeric estimate`, () => assert.equal(calculateEstimate(type, 80, 400), null));
}
test("asset-error rate limit allows 30 requests then rejects in a 10-minute window", () => {
  assert.equal(assetErrorLimitReached(29), false);
  assert.equal(assetErrorLimitReached(30), true);
  assert.equal(ASSET_ERROR_WINDOW_MS, 600000);
});
test("asset URLs and page URLs truncate at 2048; user agents at 500", () => {
  const data = AssetErrorPayloadSchema.parse({ asset_url: "a".repeat(3000), page_url: "p".repeat(3000), user_agent: "u".repeat(800) });
  assert.equal(data.asset_url.length, 2048);
  assert.equal(data.page_url?.length, 2048);
  assert.equal(data.user_agent?.length, 500);
});
for (const area of ["maynooth", "naas", "navan", "balbriggan"]) {
  test(`${area} redirects permanently to the painters index`, () => assert.equal(permanentRedirect(`/painter-${area}`), "/painters"));
}
test("duplicate house-painting article redirects to the canonical article", () => assert.equal(permanentRedirect("/blog/cost-of-painting-a-house-dublin-2025"), "/blog/cost-to-paint-house-dublin-2025"));
test("successful lead fallback returns success instead of prompting duplicate submissions", async () => {
  const response = contactFallbackResponse(null);
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.equal(contactFallbackResponse(new Error("insert failed")).status, 500);
});
test("house-painting blog 3-bed semi starts at EUR 2800", () => {
  assert.equal(correctHousePaintingPrice("cost-to-paint-house-dublin-2025", "3-bed semi from €1,800."), "3-bed semi from €2,800.");
  assert.equal(correctHousePaintingPrice("cost-to-paint-house-dublin-2025", "3-bed semi from EUR 1,800."), "3-bed semi from EUR 2,800.");
  assert.equal(correctHousePaintingPrice("other-post", "3-bed semi from €1,800."), "3-bed semi from €1,800.");
});
test("page views store only path, referrer and user agent", () => {
  const payload = pageViewPayload("/contact", "r".repeat(2100), "u".repeat(700));
  assert.deepEqual(Object.keys(payload ?? {}).sort(), ["path", "referrer", "user_agent"]);
  assert.equal(payload?.referrer?.length, 2000);
  assert.equal(payload?.user_agent.length, 500);
});
test("admin and auth visits are never tracked", () => {
  for (const path of ["/admin", "/admin/analytics", "/auth", "/auth/callback"]) assert.equal(pageViewPayload(path, "", ""), null);
  assert.ok(pageViewPayload("/about", "", ""));
});