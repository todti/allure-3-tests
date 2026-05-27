import { testApiHealth } from "@allure-tests/shared";

describe("API", () => {
  it("Public API health endpoint responds with 200", async () => {
    await testApiHealth({
      framework: "webdriverio",
      runner: "node",
      browser: {
        goto: (url) => browser.url(url),
        getTitle: () => browser.getTitle(),
      },
    });
  });
});
