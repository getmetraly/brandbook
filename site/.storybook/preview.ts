import type { Preview } from "@storybook/react";

import "@metraly/ui/styles/metraly-theme.css";

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
