import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { TrendBadge } from "@metraly/ui";

const meta: Meta<typeof TrendBadge> = {
  title: "Components/TrendBadge",
  component: TrendBadge,
  args: {
    direction: "up",
    sentiment: "positive",
    value: "18%",
  },
};

export default meta;
type Story = StoryObj<typeof TrendBadge>;

const stageStyle = {
  minHeight: 280,
  padding: 24,
  background: "var(--m-bg-0)",
  color: "var(--m-fg-0)",
};

export const Default: Story = {};

export const TableCell: Story = {
  args: {
    direction: "down",
    sentiment: "negative",
    size: "sm",
    value: "4.2%",
  },
};

export const CanonicalMatrix: Story = {
  render: () => (
    <div style={stageStyle}>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, max-content))", justifyItems: "start", alignItems: "start", gap: 16 }}>
        <TrendBadge direction="up" sentiment="positive" value="18%" />
        <TrendBadge direction="down" sentiment="negative" value="7%" />
        <TrendBadge direction="flat" sentiment="neutral" value="0.0%" />
        <TrendBadge direction="up" sentiment="negative" value="18%" label="up 18% but risky" />
        <TrendBadge direction="down" sentiment="positive" value="12%" label="down 12% improvement" />
        <TrendBadge direction="flat" sentiment="neutral" size="sm" value="stable" />
      </div>
    </div>
  ),
};
