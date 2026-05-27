import { Given, When, Then } from "@cucumber/cucumber";
import * as allure from "allure-js-commons";
import {
  applyFrameworkLabels,
  applyMetadata,
  runStepsAndParameters,
  runAttachments,
  runAsyncPatterns,
  runHttpSmoke,
  runHookStyleAttachments,
} from "@allure-tests/shared";

Given("framework labels are applied for cucumber", async () => {
  await applyFrameworkLabels({ framework: "cucumber", runner: "node" });
  await runHookStyleAttachments("before", false);
});

When("the shared Allure feature showcase runs", async () => {
  await applyMetadata({ framework: "cucumber", runner: "node" });
  await runStepsAndParameters();
  await runAttachments({ framework: "cucumber", runner: "node" });
  await runAsyncPatterns();
});

Then("the HTTP smoke step completes successfully", async () => {
  await runHttpSmoke();
  await runHookStyleAttachments("after", false);
  await allure.parameter("cucumber_step", "completed");
});
