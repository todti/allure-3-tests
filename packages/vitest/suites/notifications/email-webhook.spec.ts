import { describe, it } from "vitest";
import { testEmailWebhook } from "@allure-tests/shared";

describe("Notifications", () => {
  it("Email provider webhook fan-out completes asynchronously", async () => {
    await testEmailWebhook({ framework: "vitest", runner: "node" });
  }, 30_000);
});
