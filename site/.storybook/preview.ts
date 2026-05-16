import type { Preview } from "@storybook/react";
import * as React from "react";

import { ThemeProvider } from "@metraly/ui";

import "./preview.css";

import "@metraly/ui/styles/metraly-ui.css";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";

const preview: Preview = {
  decorators: [
    (Story) => React.createElement(ThemeProvider, {
      theme: "dark",
      className: "metraly-story-root",
      children: React.createElement(Story),
    }),
  ],
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      default: "metraly-dark",
      values: [
        { name: "metraly-dark", value: "var(--m-bg-0)" },
        { name: "surface", value: "var(--m-bg-1)" },
      ],
    },
    layout: "padded",
  },
};

export default preview;
