import type { Preview } from "@storybook/nextjs-vite";
import * as React from "react";

import { ThemeProvider } from "@metraly/ui";
import { initialize, mswLoader } from "msw-storybook-addon";

import "./preview.css";

import "@metraly/ui/styles/metraly-ui.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

import { mswHandlers } from "./msw-handlers";

initialize({ onUnhandledRequest: "bypass" });

const preview: Preview = {
  decorators: [
    (Story) => (
      <ThemeProvider theme="dark" className="metraly-story-root">
        <Story />
      </ThemeProvider>
    ),
  ],

  loaders: [mswLoader],

  parameters: {
    msw: { handlers: mswHandlers },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      options: {
        "metraly-dark": { name: "metraly-dark", value: "var(--m-bg-0)" },
        surface: { name: "surface", value: "var(--m-bg-1)" },
      },
    },
    layout: "padded",
  },

  initialGlobals: {
    backgrounds: {
      value: "metraly-dark",
    },
  },
};

export default preview;
