import { test } from "node:test";
import assert from "node:assert/strict";
import React from "react";
import { render } from "@react-email/components";
import { template as confirmation } from "./estimate-confirmation";
import { template as admin } from "./estimate-request";

test("client confirmation never renders the submitted free-text description; admin still receives it", async () => {
  const data = { name: "Example", description: "ARBITRARY_DESCRIPTION_TEST", estimateMin: 2800, estimateMax: 5500 };
  const text = await render(React.createElement(confirmation.component, data), { plainText: true });
  assert.equal(text.includes(data.description), false);
  assert.equal(text.includes("2,800"), true);
  const notification = await render(React.createElement(admin.component, data), { plainText: true });
  assert.equal(notification.includes(data.description), true);
});