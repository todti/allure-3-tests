import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkLabels } from "../showcase.js";
import type { ShowcaseContext } from "../types.js";

const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export async function testCheckoutTax(ctx: ShowcaseContext): Promise<void> {
  await applyFrameworkLabels(ctx);
  await allure.displayName("Checkout tax engine calculates VAT in nested steps");
  await allure.testCaseId(`${ctx.framework}-checkout-tax`);
  await allure.epic("Commerce");
  await allure.feature("Checkout");
  await allure.story("Tax calculation");
  await allure.parentSuite("Storefront");
  await allure.suite("Checkout");
  await allure.subSuite("Tax engine");

  await allure.step("Load cart snapshot", async (step) => {
    await step.parameter("cart_id", `cart-${ctx.framework}`, "hidden");
    await step.parameter("currency", "EUR");
  });

  await allure.step("Run pricing pipeline", async () => {
    await allure.step("Apply discounts", async (step) => {
      await step.parameter("coupon", "ALLURE10");
      await allure.step("Validate coupon rules", async () => {
        await allure.step("Check expiration", async () => {
          await allure.step("Compare with checkout time", async (deep) => {
            await deep.parameter("timezone", "UTC");
            await allure.attachment("vat", JSON.stringify({ rate: 0.21, amount: 4.2 }), ContentType.JSON);
            await delay(5);
          });
        });
      });
    });
  });
}
