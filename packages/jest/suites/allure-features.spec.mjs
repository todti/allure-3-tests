import { beforeEach, afterEach, describe, it } from "@jest/globals";
import {
  runAllureFeatureShowcase,
  runHookStyleAttachments,
} from "@allure-tests/shared";

describe("Allure 3 feature showcase (Jest)", () => {
  beforeEach(async () => {
    await runHookStyleAttachments("before", true);
  });

  afterEach(async () => {
    await runHookStyleAttachments("after", true);
  });

  it("demonstrates Allure runtime API with Jest", async () => {
    await runAllureFeatureShowcase({
      framework: "jest",
      runner: "node",
    });
  }, 30_000);
});
