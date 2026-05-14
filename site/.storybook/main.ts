import type { StorybookConfig } from "@storybook/nextjs";
import { createRequire } from "node:module";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const require = createRequire(import.meta.url);
const configDir = dirname(fileURLToPath(import.meta.url));
const repoRoot = resolve(configDir, "../..");

const config: StorybookConfig = {
  stories: ["../../stories/**/*.stories.@(ts|tsx|mdx)"],
  addons: [],
  framework: {
    name: "@storybook/nextjs",
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
