import { testEmailWebhook } from "@allure-tests/shared";

describe("Notifications", () => {
  it("Email provider webhook fan-out completes asynchronously", async () => {
    await testEmailWebhook({ framework: "webdriverio", runner: "node" });
  });
});
