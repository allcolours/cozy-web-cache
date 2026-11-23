import { test } from "node:test";
import assert from "node:assert/strict";
import { completeContactInquiry } from "./contact-delivery";

const lead = { id: "cc40f9ac-64f8-4a59-91a5-bdc76e75bd7f", created_at: "2026-11-23T21:14:00Z" };
const logError = () => {};

test("failed inbox insert plus successful lead still notifies using the unique lead id", async () => {
  const notified: string[] = [];
  const response = await completeContactInquiry({
    inbox: { data: null, error: new Error("inbox unavailable") },
    saveLead: async () => ({ data: lead, error: null }),
    notify: async (saved) => {
      notified.push(saved.id);
    },
    logError,
  });
  assert.equal(response.status, 200);
  assert.deepEqual(await response.json(), { success: true });
  assert.deepEqual(notified, [lead.id]);
});

test("both inserts failing returns 500 without notifying", async () => {
  let notifications = 0;
  const response = await completeContactInquiry({
    inbox: { data: null, error: new Error("inbox unavailable") },
    saveLead: async () => ({ data: null, error: new Error("leads unavailable") }),
    notify: async () => {
      notifications++;
    },
    logError,
  });
  assert.equal(response.status, 500);
  assert.equal(notifications, 0);
});

test("normal inbox success retains its message id even if the CRM insert fails", async () => {
  const notified: string[] = [];
  const response = await completeContactInquiry({
    inbox: { data: { ...lead, id: "inbox-id" }, error: null },
    saveLead: async () => ({ data: null, error: new Error("leads unavailable") }),
    notify: async (saved) => {
      notified.push(saved.id);
    },
    logError,
  });
  assert.equal(response.status, 200);
  assert.deepEqual(notified, ["inbox-id"]);
});

test("notification failure does not lose a successfully saved fallback lead", async () => {
  const response = await completeContactInquiry({
    inbox: { data: null, error: new Error("inbox unavailable") },
    saveLead: async () => ({ data: lead, error: null }),
    notify: async () => {
      throw new Error("queue unavailable");
    },
    logError,
  });
  assert.equal(response.status, 200);
});
