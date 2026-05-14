import type { Preview } from "@storybook/react";

import "@metraly/ui/styles/metraly-theme.css";
import "@metraly/ui/styles/metraly-badge.css";
import "@metraly/ui/styles/metraly-card.css";
import "@metraly/ui/styles/metraly-charts.css";
import "@metraly/ui/styles/metraly-dashboard.css";
import "@metraly/ui/styles/metraly-forms.css";
import "@metraly/ui/styles/metraly-logo.css";
import "@metraly/ui/styles/metraly-metric-card.css";
import "@metraly/ui/styles/metraly-state-badge.css";
import "@metraly/ui/styles/metraly-table.css";
import "@metraly/ui/styles/metraly-widget-picker.css";
import "@metraly/ui/styles/metraly-widget-shell.css";
import "@metraly/ui/styles/metraly-button.css";
import "@metraly/ui/styles/metraly-input.css";

const preview: Preview = {
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
