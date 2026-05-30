import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { MetralyIcon } from "./MetralyIcon";
import { MetralyMetricCard } from "./MetralyMetricCard";
import { TrendBadge } from "./TrendBadge";

const meta = {
  component: MetralyMetricCard,
  tags: ["ai-generated", "needs-work"],
} satisfies Meta<typeof MetralyMetricCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    title: "Change failure rate",
    value: "1.8%",
    description: "Rolling 7-day view across critical production services.",
    variant: "primary",
    icon: <MetralyIcon name="activity" size="md" />,
    badge: <TrendBadge direction="down" sentiment="positive" value="-0.6%" />,
    footer: "Within the target error budget envelope.",
  },
};

export const Compact: Story = {
  args: {
    title: "Queued sync jobs",
    value: "24",
    description: "Backfill tasks waiting for low-traffic windows.",
    variant: "warning",
    density: "compact",
    footer: "Scheduler will fan out after the current deploy wave.",
  },
};

export const CssCheck: Story = {
  args: {
    title: "Active services",
    value: "128",
    description: "Services currently reporting healthy heartbeats.",
    variant: "success",
  },
  play: async ({ canvas }) => {
    const card = canvas.getByText(/active services/i).closest(".metraly-metric-card");
    if (!(card instanceof HTMLElement)) {
      throw new Error("Metric card root not found");
    }

    await expect(getComputedStyle(card).borderRadius).toBe("10px");
  },
};
