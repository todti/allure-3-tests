import { Given, When, Then } from "@cucumber/cucumber";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { applyFrameworkFeatureLabels } from "@allure-tests/shared";

const ctx = { framework: "cucumber", runner: "node" };

Given("the cucumber showcase environment is initialized", async () => {
  await applyFrameworkFeatureLabels(ctx, "Gherkin advanced", "Scenario Outline and DocString");
  await allure.attachment("init", "Cucumber showcase environment ready", ContentType.TEXT);
});

Given("a payment request with amount {int} and currency {string}", async function (amount, currency) {
  this.paymentAmount = amount;
  this.paymentCurrency = currency;
  await allure.parameter("amount", String(amount));
  await allure.parameter("currency", currency);
});

When("the card {string} with prefix {string} is validated", async function (cardType, prefix) {
  this.cardType = cardType;
  this.cardPrefix = prefix;
  const knownPrefixes = { "4": true, "5": true, "37": true };
  this.validationResult = knownPrefixes[prefix] ? "approved" : "declined";
  await allure.parameter("card_type", cardType);
  await allure.parameter("prefix", prefix);
});

Then("the validation result should be {string}", async function (expected) {
  await allure.step(`Assert validation = ${expected}`, async () => {
    await allure.attachment("result", JSON.stringify({
      card: this.cardType,
      prefix: this.cardPrefix,
      amount: this.paymentAmount,
      currency: this.paymentCurrency,
      result: this.validationResult,
    }, null, 2), ContentType.JSON);
    if (this.validationResult !== expected) {
      throw new Error(`Expected ${expected} but got ${this.validationResult}`);
    }
  });
});

Then("the outcome is recorded in the allure report", async function () {
  await allure.attachment("outcome", `${this.cardType}: ${this.validationResult}`, ContentType.TEXT);
});

Given("the following JSON payload is submitted:", async function (docString) {
  this.payload = docString;
  await allure.step("Receive DocString payload", async () => {
    await allure.attachment("raw-payload", docString, ContentType.JSON);
  });
});

Then("the payload is processed and attached to the report", async function () {
  await allure.step("Process and validate payload", async () => {
    const parsed = JSON.parse(this.payload);
    await allure.parameter("event", parsed.event);
    await allure.parameter("order_id", parsed.orderId);
    await allure.parameter("amount", String(parsed.amount));
    await allure.attachment("parsed-payload", JSON.stringify(parsed, null, 2), ContentType.JSON);
  });
});

Given("the following users are registered:", async function (dataTable) {
  this.users = dataTable.hashes();
  await allure.step("Load user data table", async () => {
    await allure.attachment("users", JSON.stringify(this.users, null, 2), ContentType.JSON);
    await allure.parameter("user_count", String(this.users.length));
  });
});

Then("the user table is validated and attached to the report", async function () {
  await allure.step("Validate user records", async () => {
    const active = this.users.filter((u) => u.status === "active");
    const inactive = this.users.filter((u) => u.status === "inactive");
    await allure.parameter("active_users", String(active.length));
    await allure.parameter("inactive_users", String(inactive.length));
    await allure.attachment("summary", JSON.stringify({ active: active.length, inactive: inactive.length }, null, 2), ContentType.JSON);
  });
});
