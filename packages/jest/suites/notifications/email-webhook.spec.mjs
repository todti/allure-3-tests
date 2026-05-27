import { describe, it } from "@jest/globals";
import { testEmailWebhook } from "@allure-tests/shared";

describe("Notifications", () => {
  it("Email provider webhook fan-out completes asynchronously", async () => {
    await testEmailWebhook({ framework: "jest", runner: "node" });
  });
});
