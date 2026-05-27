import { Given, When, Then } from "@cucumber/cucumber";
import * as allure from "allure-js-commons";
import {
  applyFrameworkLabels,
  runAllureFeatureShowcase,
  runHookStyleAttachments,
  scenarioAttachmentGallery,
  scenarioDeepNestedSteps,
  scenarioFlakyInventorySync,
  scenarioFlakyPayment,
  scenarioKnownFailure,
  scenarioRetryThenPass,
} from "@allure-tests/shared";

const cucumberCtx = { framework: "cucumber", runner: "node" };

Given("framework labels are applied for cucumber", async () => {
  await applyFrameworkLabels(cucumberCtx);
  await runHookStyleAttachments("before", false);
});

When("the shared Allure feature showcase runs", async () => {
  await runAllureFeatureShowcase(cucumberCtx);
});

When("the deep nested steps scenario runs", async () => {
  await scenarioDeepNestedSteps(cucumberCtx);
});

When("the attachment gallery scenario runs", async () => {
  await scenarioAttachmentGallery(cucumberCtx);
});

When("the flaky payment scenario runs", async () => {
  await scenarioFlakyPayment(cucumberCtx);
});

When("the flaky inventory scenario runs", async () => {
  await scenarioFlakyInventorySync(cucumberCtx);
});

When("the retry then pass scenario runs", async () => {
  await scenarioRetryThenPass(cucumberCtx);
});

When("the known failure scenario runs", async () => {
  await scenarioKnownFailure(cucumberCtx);
});

Then("the HTTP smoke step completes successfully", async () => {
  await runHookStyleAttachments("after", false);
  await allure.parameter("cucumber_step", "completed");
});

Then("the step completes with attachment", async () => {
  await runHookStyleAttachments("after", false);
  await allure.attachment("cucumber-step", "completed", "text/plain");
});
