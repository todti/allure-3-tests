import { When, Then } from "@cucumber/cucumber";
import * as allure from "allure-js-commons";
import { ContentType } from "allure-js-commons";
import { testApiHealth, testAuditStatuses, testAuthLogin, testCacheRetry, testCatalogSearch, testCardTokenization, testCheckoutTax, testEmailWebhook, testExportAttachments, testFlakyInventory, testFlakyPayment, testFraudScore, testKnownRegression, testMetadataShowcase, testPasswordReset, testPaymentAuthorization, testPaymentRefund, testSettlementReport, testSubscriptionBilling, testUserProfile } from "@allure-tests/shared";

const ctx = { framework: "cucumber", runner: "node" };

When("the oauth login flow runs for cucumber", async () => {
  await testAuthLogin(ctx);
  await allure.attachment("flow.log", "OAuth login: token acquired, session cookie set", ContentType.TEXT);
});

When("the product search flow runs for cucumber", async () => {
  await testCatalogSearch(ctx);
  await allure.attachment("flow.log", "Product search: filters applied, pagination verified", ContentType.TEXT);
});

When("the tax calculation flow runs for cucumber", async () => {
  await testCheckoutTax(ctx);
  await allure.attachment("flow.log", "Checkout: VAT calculation completed across nested tax steps", ContentType.TEXT);
});

When("the flaky gateway flow runs for cucumber", async () => {
  await testFlakyPayment(ctx);
  await allure.attachment("flow.log", "Payment gateway: transient timeout before authorization", ContentType.TEXT);
});

When("the card-tokenization flow runs for cucumber", async () => {
  await testCardTokenization(ctx);
  await allure.attachment("flow.log", "Card number tokenized via PCI vault", ContentType.TEXT);
});

When("the payment-authorization flow runs for cucumber", async () => {
  await testPaymentAuthorization(ctx);
  await allure.attachment("flow.log", "Payment intent authorized against card token", ContentType.TEXT);
});

When("the payment-refund flow runs for cucumber", async () => {
  await testPaymentRefund(ctx);
  await allure.attachment("flow.log", "Full refund issued to original card", ContentType.TEXT);
});

When("the fraud-score flow runs for cucumber", async () => {
  await testFraudScore(ctx);
  await allure.attachment("flow.log", "Fraud model scored transaction, auto-approved low-risk payment", ContentType.TEXT);
});

When("the subscription-billing flow runs for cucumber", async () => {
  await testSubscriptionBilling(ctx);
  await allure.attachment("flow.log", "Recurring subscription cycle charged stored payment method", ContentType.TEXT);
});

When("the settlement-report flow runs for cucumber", async () => {
  await testSettlementReport(ctx);
  await allure.attachment("flow.log", "Daily settlement report generated and submitted to acquiring bank", ContentType.TEXT);
});

When("the flaky sync flow runs for cucumber", async () => {
  await testFlakyInventory(ctx);
  await allure.attachment("flow.log", "Inventory shard lock triggered intermittent sync failure", ContentType.TEXT);
});

When("the email webhook flow runs for cucumber", async () => {
  await testEmailWebhook(ctx);
  await allure.attachment("flow.log", "Email webhook fan-out completed asynchronously", ContentType.TEXT);
});

When("the export attachments flow runs for cucumber", async () => {
  await testExportAttachments(ctx);
  await allure.attachment("flow.log", "Report export bundled multiple attachment formats", ContentType.TEXT);
});

When("the cache retry flow runs for cucumber", async () => {
  await testCacheRetry(ctx);
  await allure.attachment("flow.log", "Distributed cache miss on cold start, recovered after retry", ContentType.TEXT);
});

When("the audit statuses flow runs for cucumber", async () => {
  await testAuditStatuses(ctx);
  await allure.attachment("flow.log", "Audit pipeline recorded passed, skipped, and broken steps", ContentType.TEXT);
});

When("the known regression flow runs for cucumber", async function () {
  try {
    await testKnownRegression(ctx);
  } catch (e) {
    await this.attach(e instanceof Error ? e.message : String(e), "text/plain");
    throw e;
  }
});

When("the health check flow runs for cucumber", async () => {
  await testApiHealth(ctx);
  await allure.attachment("flow.log", "Health endpoint GET /health responded with 200", ContentType.TEXT);
});

When("the profile params flow runs for cucumber", async () => {
  await testUserProfile(ctx);
  await allure.attachment("flow.log", "User profile stored masked and hidden parameters", ContentType.TEXT);
});

When("the password reset flow runs for cucumber", async () => {
  await testPasswordReset(ctx);
  await allure.attachment("flow.log", "Password reset: token sent and delivery confirmed", ContentType.TEXT);
});

When("the metadata flow runs for cucumber", async () => {
  await testMetadataShowcase(ctx);
  await allure.attachment("flow.log", "Allure metadata API surface documented at runtime", ContentType.TEXT);
});

Then("the cucumber flow completes", async () => {
  await allure.parameter("cucumber_flow", "completed");
  await allure.attachment("flow.log", "Gherkin step execution confirmed complete", ContentType.TEXT);
});
