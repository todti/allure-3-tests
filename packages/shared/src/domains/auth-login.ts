import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function testAuthLogin(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "auth-login");
  await allure.displayName("OAuth login grants access token");
  await allure.testCaseId(`${ctx.framework}-auth-login`);
  await allure.historyId(`history-${ctx.framework}-auth-login`);
  await allure.severity("blocker");
  await allure.tag("auth");
  await allure.owner("identity-team");

  await allure.step("Open authorization endpoint", async (step) => {
    await step.parameter("client_id", "allure-demo");
    await step.parameter("response_type", "code");
    await step.parameter("redirect_uri", "https://demo.local/callback");
    await delay(6);
  });

  await allure.step("Submit user credentials", async (step) => {
    await step.parameter("username", "qa-user");
    await step.parameter("password", "P@ssw0rd!", "masked");
    await allure.attachment("login-audit", "credentials accepted", ContentType.TEXT);
  });

  await allure.step("Exchange code for tokens", async () => {
    await allure.attachment(
      "token-response",
      JSON.stringify({ access_token: "demo-token", refresh_token: "demo-refresh", expires_in: 3600 }, null, 2),
      ContentType.JSON,
    );
  });
}
