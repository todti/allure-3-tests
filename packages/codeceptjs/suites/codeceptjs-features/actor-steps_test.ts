import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "codeceptjs", runner: "node" };

Feature("CodeceptJS · Actor-driven steps");

Scenario("records nested allure steps and actor I.say() pattern", async () => {
  await applyFrameworkFeatureLabels(ctx, "Actor pattern", "I.say() and nested steps");

  await allure.step("Set up actor context", async () => {
    await allure.attachment("actor", JSON.stringify({ name: "I", role: "codeceptjs-actor" }, null, 2), ContentType.JSON);
  });

  await allure.step("Actor performs checkout flow", async () => {
    const cart = { items: 3, subtotal: 89.97, shipping: 9.99, tax: 8.10, total: 108.06 };

    await allure.step("I add items to cart", async () => {
      await allure.parameter("item_count", String(cart.items));
      await allure.attachment("cart", JSON.stringify(cart, null, 2), ContentType.JSON);
    });

    await allure.step("I proceed to checkout", async () => {
      await allure.parameter("subtotal", String(cart.subtotal));
      await allure.parameter("total", String(cart.total));
    });

    await allure.step("I confirm payment", async () => {
      const order = { id: "ord-cc-001", status: "confirmed", total: cart.total };
      await allure.attachment("order-confirmation", JSON.stringify(order, null, 2), ContentType.JSON);
      await allure.parameter("order_id", order.id);
    });
  });
});

Scenario("demonstrates retry and flake tolerance in actor scenario", async () => {
  await applyFrameworkFeatureLabels(ctx, "Actor pattern", "Retry and resilience");

  let attempt = 0;
  await allure.step("Actor retries flaky operation", async () => {
    const maxAttempts = 3;
    let success = false;

    while (attempt < maxAttempts && !success) {
      attempt++;
      await allure.step(`Attempt ${attempt}`, async () => {
        await allure.parameter("attempt", String(attempt));
        if (attempt >= 2) {
          success = true;
          await allure.attachment("result", `Succeeded on attempt ${attempt}`, ContentType.TEXT);
        } else {
          await allure.attachment("result", `Attempt ${attempt} failed, retrying`, ContentType.TEXT);
        }
      });
    }

    await allure.parameter("total_attempts", String(attempt));
    await allure.parameter("success", String(success));
  });
});
