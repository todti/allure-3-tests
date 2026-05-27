import { afterEach, beforeEach, describe, it } from "mocha";
import {
  runAllureFeatureShowcase,
  runHookStyleAttachments,
} from "@allure-tests/shared";

describe("Allure 3 feature showcase (Mocha)", () => {
  beforeEach(async () => {
    await runHookStyleAttachments("before", false);
  });

  afterEach(async () => {
    await runHookStyleAttachments("after", false);
  });

  it("demonstrates Allure runtime API with Mocha", async function () {
    this.timeout(30_000);
    await runAllureFeatureShowcase({
      framework: "mocha",
      runner: "node",
    });
  });
});
