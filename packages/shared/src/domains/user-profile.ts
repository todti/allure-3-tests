import * as allure from "allure-js-commons";
import { applyFrameworkLabels } from "../showcase.js";
import type { ShowcaseContext } from "../types.js";

export async function testUserProfile(ctx: ShowcaseContext): Promise<void> {
  await applyFrameworkLabels(ctx);
  await allure.displayName("User profile stores masked and hidden parameters");
  await allure.testCaseId(`${ctx.framework}-user-profile`);
  await allure.epic("Accounts");
  await allure.feature("Profile");
  await allure.story("Sensitive fields");
  await allure.owner("accounts-team");

  await allure.step("Update profile", async (step) => {
    await step.parameter("display_name", "Allure Demo");
    await step.parameter("email", "demo@allure.dev");
    await step.parameter("api_secret", "sk-live-123456", "masked");
    await step.parameter("internal_id", "usr-hidden-9", "hidden");
  });

  await allure.step("Verify persisted fields", async (step) => {
    await step.parameter("locale", "en-US");
    await step.parameter("timezone", "UTC");
  });
}
