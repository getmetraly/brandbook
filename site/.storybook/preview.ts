import type { Preview } from "@storybook/react";
import * as React from "react";

import { ThemeProvider } from "@metraly/ui";

import "./preview.css";

import "@metraly/ui/styles/metraly-theme.css";
import "@metraly/ui/styles/metraly-badge.css";
import "@metraly/ui/styles/metraly-button.css";
import "@metraly/ui/styles/metraly-card.css";
import "@metraly/ui/styles/metraly-charts.css";
import "@metraly/ui/styles/metraly-code-block.css";
import "@metraly/ui/styles/metraly-dashboard.css";
import "@metraly/ui/styles/metraly-empty-state.css";
import "@metraly/ui/styles/metraly-filter-bar.css";
import "@metraly/ui/styles/metraly-forms.css";
import "@metraly/ui/styles/metraly-input.css";
import "@metraly/ui/styles/metraly-logo.css";
import "@metraly/ui/styles/metraly-metric-card.css";
import "@metraly/ui/styles/metraly-move-menu.css";
import "@metraly/ui/styles/metraly-navigation-tree.css";
import "@metraly/ui/styles/metraly-pulse-marker.css";
import "@metraly/ui/styles/metraly-segmented.css";
import "@metraly/ui/styles/metraly-shell.css";
import "@metraly/ui/styles/metraly-skeleton.css";
import "@metraly/ui/styles/metraly-state-badge.css";
import "@metraly/ui/styles/metraly-table.css";
import "@metraly/ui/styles/metraly-trend-badge.css";
import "@metraly/ui/styles/metraly-widget-picker.css";
import "@metraly/ui/styles/metraly-widget-shell.css";
import "@metraly/ui/styles/metraly-wizard.css";
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
