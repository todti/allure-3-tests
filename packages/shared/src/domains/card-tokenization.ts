import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyDomainLabels } from "../labels.js";
import type { ShowcaseContext } from "../types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function testCardTokenization(ctx: ShowcaseContext): Promise<void> {
  await applyDomainLabels(ctx, "card-tokenization");
  await allure.displayName("Card number is tokenized via PCI vault");
  await allure.testCaseId(`${ctx.framework}-card-tokenization`);
  await allure.historyId(`history-${ctx.framework}-card-tokenization`);
  await allure.severity("blocker");
  await allure.owner("payments-team");
  await allure.tag("pci");
  await allure.tag("tokenization");

  await allure.step("Validate card number (Luhn check)", async (step) => {
    await step.parameter("card_bin", "411111");
    await step.parameter("card_last4", "1111");
    await step.parameter("network", "Visa");
    await delay(4);
  });

  await allure.step("Submit to PCI tokenization vault", async (step) => {
    await step.parameter("vault", "stripe-elements");
    await step.parameter("mode", "live");
    await allure.attachment(
      "vault-request",
      JSON.stringify({ card: "masked", cvc: "masked" }, null, 2),
      ContentType.JSON,
    );
  });

  await allure.step("Receive and store token", async (step) => {
    await step.parameter("token", "tok_visa_****1111", "masked");
    await allure.attachment(
      "tokenization-response",
      JSON.stringify({ token: "tok_demo_xxxx", brand: "visa", exp_month: 12, exp_year: 2027 }, null, 2),
      ContentType.JSON,
    );
  });
}
