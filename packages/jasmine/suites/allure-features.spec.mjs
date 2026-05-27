import {
  runAllureFeatureShowcase,
  runHookStyleAttachments,
} from "@allure-tests/shared";

describe("Allure 3 feature showcase (Jasmine)", () => {
  beforeEach(async () => {
    await runHookStyleAttachments("before", true);
  });

  afterEach(async () => {
    await runHookStyleAttachments("after", true);
  });

  it("demonstrates Allure runtime API with Jasmine", async () => {
    await runAllureFeatureShowcase({
      framework: "jasmine",
      runner: "node",
    });
  });
});
