import path from "node:path";
import { fileURLToPath } from "node:url";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const storybookConfigDir = path.join(dirname, "storybook/.storybook");

export default defineConfig({
  test: {
    projects: [
      {
        extends: true,
        root: dirname,
        plugins: [
          storybookTest({
            configDir: storybookConfigDir,
            storybookScript: "npm run storybook -- --no-open",
            tags: {
              include: ["test"],
              exclude: [],
              skip: [],
            },
          }),
        ],
        test: {
          dir: dirname,
          name: "storybook",
          fileParallelism: false,
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            isolate: false,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
