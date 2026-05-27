import { run } from "newman";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { buildEnvironmentInfo, runGlobalSetup, runGlobalTeardown } from "@allure-tests/shared";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

await runGlobalSetup({ framework: "newman", runner: "node" });

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
    (err) => {
      if (err) {
        reject(err);
        return;
      }
      resolve(undefined);
    },
  );
});

await runGlobalTeardown({ framework: "newman", runner: "node" });
