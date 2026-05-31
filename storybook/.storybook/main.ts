import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { dirname } from "path";
import { fileURLToPath } from "url";
import { mergeConfig } from "vite";

function getAbsolutePath(value: string) {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
const configDir = dirname(fileURLToPath(import.meta.url));

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

const config: StorybookConfig = {
  stories: [
    "../stories/**/*.mdx",
    "../stories/**/*.stories.tsx",
    "../../packages/ui/src/**/*.stories.tsx",
  ],
  addons: [
    getAbsolutePath("@storybook/addon-a11y"),
    getAbsolutePath("@storybook/addon-docs"),
    getAbsolutePath("@storybook/addon-vitest"),
    getAbsolutePath("@storybook/addon-mcp"),
    getAbsolutePath("@chromatic-com/storybook"),
  ],
  framework: {
    name: getAbsolutePath("@storybook/react-vite"),
    options: {},
  },
  staticDirs: ["../../public"],
  docs: {
    autodocs: "tag",
  },
  async viteFinal(cfg) {
    return mergeConfig(cfg, {
      optimizeDeps: {
        include: storybookOptimizeDeps,
      },
      resolve: {
        alias: {
          "@metraly/ui": path.resolve(configDir, "../../packages/ui/src/index.ts"),
        },
      },
    });
  },
};

export default config;
