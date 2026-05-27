import { run } from "newman";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const resultsDir = process.env.ALLURE_RESULTS_DIR ?? "allure-results";

await new Promise((resolve, reject) => {
  run(
    {
      collection: path.join(__dirname, "collections/demo.postman_collection.json"),
      reporters: ["cli", "allure"],
      reporter: {
        allure: {
          resultsDir: path.resolve(__dirname, resultsDir),
          environmentInfo: {
            framework: "newman",
            node_version: process.version,
          },
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
}).then((failures) => process.exit(Number(failures) > 0 ? 1 : 0));
