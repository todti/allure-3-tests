import { browser } from "@wdio/globals";
import {
  runAllureFeatureShowcase,
  runHookStyleAttachments,
} from "@allure-tests/shared";

describe("Allure 3 feature showcase (WebdriverIO)", () => {
  beforeEach(async () => {
    await runHookStyleAttachments("before", true);
  });

  afterEach(async () => {
    await runHookStyleAttachments("after", true);
  });

  it("demonstrates Allure runtime API with WebdriverIO", async () => {
    await runAllureFeatureShowcase({
      framework: "webdriverio",
      runner: "node",
      browser: {
        goto: async (url) => {
          await browser.url(url);
        },
        getTitle: async () => browser.getTitle(),
      },
    });
  });
});
