import type { Preview } from "@storybook/react";

import "../app/globals.css";
import "../app/component-overrides.css";
import "@metraly/ui/styles/metraly-theme.css";
import "@metraly/ui/styles/metraly-card.css";
import "@metraly/ui/styles/metraly-state-badge.css";
import "@metraly/ui/styles/metraly-table.css";
import "@metraly/ui/styles/metraly-widget-shell.css";
import "@metraly/ui/styles/metraly-forms.css";
import "@metraly/ui/styles/metraly-widget-picker.css";
import "@metraly/ui/styles/metraly-dashboard.css";

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
        { name: "metraly-dark", value: "#020617" },
        { name: "slate", value: "#0f172a" },
      ],
    },
    layout: "padded",
  },
};

export default preview;
