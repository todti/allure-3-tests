import { When, Then } from "@cucumber/cucumber";
import * as allure from "allure-js-commons";
import { testApiHealth, testAuditStatuses, testAuthLogin, testCacheRetry, testCatalogSearch, testCardTokenization, testCheckoutTax, testEmailWebhook, testExportAttachments, testFlakyInventory, testFlakyPayment, testFraudScore, testKnownRegression, testMetadataShowcase, testPasswordReset, testPaymentAuthorization, testPaymentRefund, testSettlementReport, testSubscriptionBilling, testUserProfile } from "@allure-tests/shared";

When("the oauth login flow runs for cucumber", async () => {
  await testAuthLogin({ framework: "cucumber", runner: "node" });
});

When("the product search flow runs for cucumber", async () => {
  await testCatalogSearch({ framework: "cucumber", runner: "node" });
});

When("the tax calculation flow runs for cucumber", async () => {
  await testCheckoutTax({ framework: "cucumber", runner: "node" });
});

When("the flaky gateway flow runs for cucumber", async () => {
  await testFlakyPayment({ framework: "cucumber", runner: "node" });
});

When("the card-tokenization flow runs for cucumber", async () => {
  await testCardTokenization({ framework: "cucumber", runner: "node" });
});

When("the payment-authorization flow runs for cucumber", async () => {
  await testPaymentAuthorization({ framework: "cucumber", runner: "node" });
});

When("the payment-refund flow runs for cucumber", async () => {
  await testPaymentRefund({ framework: "cucumber", runner: "node" });
});

When("the fraud-score flow runs for cucumber", async () => {
  await testFraudScore({ framework: "cucumber", runner: "node" });
});

When("the subscription-billing flow runs for cucumber", async () => {
  await testSubscriptionBilling({ framework: "cucumber", runner: "node" });
});

When("the settlement-report flow runs for cucumber", async () => {
  await testSettlementReport({ framework: "cucumber", runner: "node" });
});

When("the flaky sync flow runs for cucumber", async () => {
  await testFlakyInventory({ framework: "cucumber", runner: "node" });
});

When("the email webhook flow runs for cucumber", async () => {
  await testEmailWebhook({ framework: "cucumber", runner: "node" });
});

When("the export attachments flow runs for cucumber", async () => {
  await testExportAttachments({ framework: "cucumber", runner: "node" });
});

When("the cache retry flow runs for cucumber", async () => {
  await testCacheRetry({ framework: "cucumber", runner: "node" });
});

When("the audit statuses flow runs for cucumber", async () => {
  await testAuditStatuses({ framework: "cucumber", runner: "node" });
});

When("the known regression flow runs for cucumber", async () => {
  await testKnownRegression({ framework: "cucumber", runner: "node" });
});

When("the health check flow runs for cucumber", async () => {
  await testApiHealth({ framework: "cucumber", runner: "node" });
});

When("the profile params flow runs for cucumber", async () => {
  await testUserProfile({ framework: "cucumber", runner: "node" });
});

When("the password reset flow runs for cucumber", async () => {
  await testPasswordReset({ framework: "cucumber", runner: "node" });
});

When("the metadata flow runs for cucumber", async () => {
  await testMetadataShowcase({ framework: "cucumber", runner: "node" });
});

Then("the cucumber flow completes", async () => {
  await allure.parameter("cucumber_flow", "completed");
});
