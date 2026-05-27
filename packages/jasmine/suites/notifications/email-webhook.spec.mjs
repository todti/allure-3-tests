import { describe, it } from "mocha";
import { testEmailWebhook } from "@allure-tests/shared";

describe("Notifications", () => {
  it("Email provider webhook fan-out completes asynchronously", async function () {
    this.timeout(30_000);
    await testEmailWebhook({ framework: "jasmine", runner: "node" });
  });
});
