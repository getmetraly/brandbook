import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MetralySegmentedControl, ThemeProvider } from "@metraly/ui";

const meta: Meta<typeof MetralySegmentedControl> = {
  title: "Primitives/MetralySegmentedControl",
  component: MetralySegmentedControl,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ boxSizing: "border-box", width: "100%", minHeight: 120, padding: 24, background: "var(--m-bg-0)", display: "grid", gap: 16, alignContent: "start" }}>
          <div style={{ width: "min(720px, 100%)", minWidth: 0 }}>
            <Story />
          </div>
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetralySegmentedControl>;

const timeRangeOptions = [
  { value: "7d", label: "7d" },
  { value: "14d", label: "14d" },
  { value: "30d", label: "30d" },
  { value: "90d", label: "90d" },
];

export const Default: Story = {
  args: {
    options: timeRangeOptions,
    defaultValue: "30d",
    ariaLabel: "Time range",
  },
};

export const Small: Story = {
  args: {
    options: timeRangeOptions,
    defaultValue: "14d",
    size: "sm",
    ariaLabel: "Time range",
  },
};

export const FullWidth: Story = {
  render: () => (
    <div style={{ width: 320 }}>
      <MetralySegmentedControl
        fullWidth
        ariaLabel="Breakdown view"
        defaultValue="table"
        options={[
          { value: "table", label: "Table" },
          { value: "leaderboard", label: "Leaderboard" },
          { value: "compare", label: "Compare" },
        ]}
      />
    </div>
  ),
};

export const WithDisabledOption: Story = {
  render: () => (
    <MetralySegmentedControl
      ariaLabel="Chart mode"
      defaultValue="line"
      options={[
        { value: "line", label: "Line" },
        { value: "bar", label: "Bar" },
        { value: "heatmap", label: "Heatmap", disabled: true },
      ]}
    />
  ),
};
