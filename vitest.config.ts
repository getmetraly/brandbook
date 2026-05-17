import { defineConfig } from "vitest/config";
import { storybookTest } from "@storybook/addon-vitest/vitest-plugin";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dirname = path.dirname(fileURLToPath(import.meta.url));
const configDir = path.join(dirname, "site/.storybook");

// The @storybook/nextjs-vite framework preset overrides Vite root to `site/`, which causes
// vitest to look for `stories/**` inside `site/stories/` — a directory that doesn't exist.
// This plugin runs after the framework preset and restores the repo root as the Vite root,
// so relative story globs resolve correctly.
const fixRoot = {
  name: "metraly:fix-vitest-root",
  enforce: "post" as const,
  config() {
    return { root: dirname };
  },
};

export default defineConfig({
  root: dirname,
  test: {
    projects: [
      {
        root: dirname,
        plugins: [
          storybookTest({ configDir }),
          fixRoot,
        ],
        test: {
          name: "storybook",
          browser: {
            enabled: true,
            provider: "playwright",
            headless: true,
            instances: [{ browser: "chromium" }],
          },
          setupFiles: [path.join(configDir, "vitest.setup.ts")],
        },
      },
    ],
  },
});
