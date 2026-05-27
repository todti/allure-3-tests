import * as allure from "allure-js-commons";
import { applyFrameworkLabels } from "../showcase.js";
import type { ShowcaseContext } from "../types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function testPasswordReset(ctx: ShowcaseContext): Promise<void> {
  await applyFrameworkLabels(ctx);
  await allure.displayName("Password reset journey sends token and confirms delivery");
  await allure.testCaseId(`${ctx.framework}-password-reset`);
  await allure.epic("Customer journeys");
  await allure.feature("Self-service");
  await allure.story("Password reset");
  await allure.link("https://allurereport.org/docs/v3/", "Allure docs");

  await allure.step("Request reset token", async (step) => {
    await step.parameter("channel", "email");
    await delay(5);
  });

  await allure.step("Deliver message", async (step) => {
    await step.parameter("template", "reset-v2");
    await delay(5);
  });

  await allure.step("Confirm link opened", async (step) => {
    await step.parameter("token_status", "valid");
  });
}
