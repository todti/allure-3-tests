import { runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

describe("Allure global hooks", () => {
  before(async () => {
    await runGlobalSetup({ framework: "webdriverio", runner: "node" });
  });

  after(async () => {
    await runGlobalTeardown({ framework: "webdriverio", runner: "node" });
  });

  it("registers global errors and attachments for the session", async () => {
    // Intentionally empty — side effects are in hooks above.
  });
});
