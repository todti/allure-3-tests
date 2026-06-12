import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "cypress", runner: "node", skipHttpSmoke: true };

describe("Cypress · Intercepts and requests", () => {
  it("intercepts API call and asserts on stubbed response", () => {
    cy.then(async () => {
      await applyFrameworkFeatureLabels(ctx, "Network intercepts", "cy.intercept() stub");
    });

    cy.intercept("GET", "/api/user/me", {
      statusCode: 200,
      body: { id: "u-001", name: "Demo User", role: "admin" },
    }).as("getUser");

    cy.visit("about:blank");

    cy.window().then((win) => {
      return win.fetch("/api/user/me").then((r) => r.json()).then((data) => {
        cy.then(async () => {
          await allure.step("Validate intercepted response", async () => {
            await allure.attachment("response", JSON.stringify(data, null, 2), ContentType.JSON);
            await allure.parameter("user_id", data.id);
            await allure.parameter("role", data.role);
          });
        });
      });
    });

    cy.wait("@getUser").then((interception) => {
      cy.then(async () => {
        await allure.step("Assert intercept alias", async () => {
          await allure.attachment("intercept-meta", JSON.stringify({
            method: interception.request.method,
            url: interception.request.url,
            status: interception.response?.statusCode,
          }, null, 2), ContentType.JSON);
        });
      });
      expect(interception.response?.statusCode).to.eq(200);
    });
  });

  it("intercepts POST and spies on request body", () => {
    cy.then(async () => {
      await applyFrameworkFeatureLabels(ctx, "Network intercepts", "cy.intercept() POST spy");
    });

    cy.intercept("POST", "/api/checkout", (req) => {
      req.reply({
        statusCode: 201,
        body: { orderId: "ord-9999", status: "created", total: req.body.total },
      });
    }).as("checkout");

    cy.visit("about:blank");

    cy.window().then((win) => {
      return win.fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ items: 3, total: 149.99, currency: "USD" }),
      }).then((r) => r.json());
    });

    cy.wait("@checkout").then((interception) => {
      cy.then(async () => {
        await allure.step("Assert request body was received and echoed", async () => {
          await allure.attachment("request-body", JSON.stringify(interception.request.body, null, 2), ContentType.JSON);
          await allure.attachment("response-body", JSON.stringify(interception.response?.body, null, 2), ContentType.JSON);
          await allure.parameter("order_id", interception.response?.body.orderId);
          await allure.parameter("total", String(interception.response?.body.total));
        });
      });
      expect(interception.response?.body.total).to.eq(149.99);
    });
  });
});
