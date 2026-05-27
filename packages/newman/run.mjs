import { run } from "newman";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { runGlobalSetupFiles, runGlobalTeardownFiles, buildEnvironmentInfo } from "@allure-tests/shared";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

runGlobalSetupFiles({ framework: "newman" });

await new Promise((resolve, reject) => {
  run(
    {
      collection: path.join(__dirname, "collections/demo.postman_collection.json"),
      reporters: ["cli", "allure"],
      reporter: {
        allure: {
          resultsDir: path.resolve(__dirname, resultsDir),
          environmentInfo: buildEnvironmentInfo("newman"),
        },
      },
    },
    (err, summary) => {
      if (err) {
        reject(err);
        return;
      }
      const failures = summary.run.failures.length;
      resolve(failures);
    },
  );
}).then(async (failures) => {
  runGlobalTeardownFiles({ framework: "newman" });
  process.exit(Number(failures) > 0 ? 1 : 0);
});
