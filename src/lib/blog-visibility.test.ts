import { test } from "node:test";
import assert from "node:assert/strict";
import { execFileSync } from "node:child_process";

test("installed anonymous restrictive policy rejects the duplicate and permits the canonical slug", { skip: !process.env["PGHOST"] }, () => {
  const query = (sql: string) => execFileSync("psql", ["-X", "-q", "-A", "-t", "--set", "ON_ERROR_STOP=1", "-c", sql], { encoding: "utf8" }).trim();
  const expression = query(`SELECT qual FROM pg_policies WHERE schemaname = 'public' AND tablename = 'blog_posts' AND policyname = 'Hide duplicate house-price article publicly' AND permissive = 'RESTRICTIVE' AND 'anon' = ANY(roles)`);
  assert.ok(expression, "The anonymous restrictive policy must exist");
  const result = query(`SELECT ${expression} FROM (VALUES ('cost-of-painting-a-house-dublin-2025'), ('cost-to-paint-house-dublin-2025')) AS example(slug)`);
  assert.equal(result, "f\nt");
});