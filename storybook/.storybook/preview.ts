import type { Preview } from "@storybook/react";
import React from "react";

// ── 1. Design-system CSS entrypoint ─────────────────────────────────────────
// This is the ONLY CSS source that should style components. Individual
// component stylesheets are already @import-ed by metraly-ui.css.
import "../../packages/ui/src/styles/metraly-ui.css";

// ── 2. Storybook canvas helpers (background, padding, frame utilities) ───────
import "./preview.css";

// ── 3. ThemeProvider decorator ───────────────────────────────────────────────
import { ThemeProvider } from "@metraly/ui";

const withTheme = (Story: React.ComponentType) =>
  React.createElement(
    ThemeProvider,
    { mode: "dark" },
    React.createElement(Story),
  );

const preview: Preview = {
  decorators: [withTheme],
  parameters: {
    backgrounds: {
      // Match the Metraly dark canvas; light mode can be toggled via toolbar
      default: "dark",
      values: [
        { name: "dark",  value: "#0e1117" },
        { name: "light", value: "#f8fafc" },
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
