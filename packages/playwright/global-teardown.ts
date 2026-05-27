import { runGlobalTeardownFiles } from "@allure-tests/shared";

export default async function globalTeardown() {
  runGlobalTeardownFiles({ framework: "playwright" });
}
