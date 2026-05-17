// This file has been automatically migrated to valid ESM format by Storybook.
import type { StorybookConfig } from "@storybook/nextjs-vite";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const configDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(configDir, "../..");

const config: StorybookConfig = {
  stories: ["../../stories/**/*.stories.@(ts|tsx|mdx)"],
  addons: [getAbsolutePath("@storybook/addon-vitest")],
  framework: {
    name: getAbsolutePath("@storybook/nextjs-vite"),
    options: {},
  },
  staticDirs: ["../public"],
  typescript: {
    reactDocgen: "react-docgen-typescript",
  },
  webpackFinal: async (webpackConfig) => {
    webpackConfig.module ??= { rules: [] };
    webpackConfig.module.rules ??= [];

    webpackConfig.module.rules.unshift({
      test: /\.(ts|tsx)$/,
      include: [resolve(repoRoot, "stories"), resolve(repoRoot, "packages/ui/src")],
      use: [
        {
          loader: require.resolve("babel-loader"),
          options: {
            presets: [
              [require.resolve("@babel/preset-react"), { runtime: "automatic" }],
              require.resolve("@babel/preset-typescript"),
            ],
          },
        },
      ],
    });

    webpackConfig.resolve ??= {};
    webpackConfig.resolve.extensions = Array.from(
      new Set([...(webpackConfig.resolve.extensions ?? []), ".ts", ".tsx"]),
    );

    webpackConfig.optimization = {
      ...webpackConfig.optimization,
      minimize: false,
    };
    webpackConfig.devtool = false;

    return webpackConfig;
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
