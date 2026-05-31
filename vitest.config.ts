import path from "node:path";
import { fileURLToPath } from "node:url";
import { playwright } from "@vitest/browser-playwright";
import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const storybookConfigDir = path.join(dirname, "storybook/.storybook");

const storybookOptimizeDeps = [
  "@storybook/addon-vitest",
  "@storybook/react",
  "@storybook/react-vite",
  "react",
  "react-dom",
  "react-dom/client",
  "react/jsx-runtime",
  "recharts",
  "storybook/test",
];

export default defineConfig({
  optimizeDeps: {
    include: storybookOptimizeDeps,
  },
  test: {
    projects: [
      {
        extends: true,
        root: dirname,
        optimizeDeps: {
          include: storybookOptimizeDeps,
        },
        plugins: [
          storybookTest({
            configDir: storybookConfigDir,
            storybookScript: "npm run storybook -- --no-open",
            tags: {
              include: ["test"],
              exclude: ["needs-work", "ai-generated"],
            },
          }),
        ],
        test: {
          dir: dirname,
          name: "storybook",
          isolate: false,
          browser: {
            enabled: true,
            provider: playwright({}),
            headless: true,
            instances: [{ browser: "chromium" }],
          },
        },
      },
    ],
  },
});
