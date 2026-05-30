import type { StorybookConfig } from "@storybook/react-vite";
import path from "path";
import { mergeConfig } from "vite";

const config: StorybookConfig = {
  stories: ["../stories/**/*.mdx", "../stories/**/*.stories.@(ts|tsx)"],
  addons: [
    "@storybook/addon-essentials",
    "@storybook/addon-a11y",
  ],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  async viteFinal(cfg) {
    return mergeConfig(cfg, {
      resolve: {
        alias: {
          "@metraly/ui": path.resolve(__dirname, "../../packages/ui/src/index.ts"),
        },
      },
    });
  },
};

export default config;
