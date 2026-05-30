import type { Preview } from "@storybook/react-vite";
import React from "react";
import { initialize, mswLoader } from "msw-storybook-addon";
// ── 1. Design-system CSS entrypoint ─────────────────────────────────────────
// This is the ONLY CSS source that should style components. Individual
// component stylesheets are already @import-ed by metraly-ui.css.
import "../../packages/ui/src/styles/metraly-ui.css";
// ── 2. Storybook canvas helpers (background, padding, frame utilities) ───────
import "./preview.css";
import { mswHandlers } from "./msw-handlers";
// ── 3. ThemeProvider decorator ───────────────────────────────────────────────
import { ThemeProvider } from "@metraly/ui";
initialize({ onUnhandledRequest: "bypass" });
const withTheme = (Story: React.ComponentType) =>
  React.createElement(
    ThemeProvider,
    { theme: "dark" },
    React.createElement(Story),
  );

const preview: Preview = {
  decorators: [withTheme],
  loaders: [mswLoader],
  parameters: {
    msw: {
      handlers: mswHandlers,
    },
    backgrounds: {
      // Match the Metraly dark canvas; light mode can be toggled via toolbar
      default: "dark",
      values: [
        { name: "dark", value: "var(--m-bg-0)" },
        { name: "light", value: "oklch(0.97 0.006 250)" },
      ],
    },
    layout: "padded",
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    options: {
      storySort: {
        order: [
          "Introduction",
          "Core",
          "Shell",
          "Dashboard",
          "Charts",
          "Source",
          "Settings",
          "AppKit",
        ],
      },
    },
  },
};

export default preview;
