import type { Meta, StoryObj } from "@storybook/nextjs";
import {
  MetralyBadge,
  MetralyMetricCard,
  MetralySkeleton,
  StateBadge,
} from "@metraly/ui";

const meta: Meta<typeof MetralyMetricCard> = {
  title: "Components/MetralyMetricCard",
  component: MetralyMetricCard,
  parameters: {
    layout: "fullscreen",
  },
  render: (args) => (
    <div style={{ minHeight: 360, padding: 24, background: "var(--m-bg-0)" }}>
      <div style={{ width: "min(420px, 100%)" }}>
        <MetralyMetricCard {...args} />
      </div>
    </div>
  ),
};

export default meta;

type Story = StoryObj<typeof MetralyMetricCard>;

export const PositiveDelta: Story = {
  args: {
    title: "Deployment frequency",
    value: "24/day",
    description: "Across connected services for the last 14 days.",
    badge: <StateBadge state="live" size="sm" />,
    footer: <span style={{ color: "var(--m-ok)" }}>▲ 18% vs -14d</span>,
  },
};

export const NegativeDelta: Story = {
  args: {
    title: "Change failure rate",
    value: "4.2%",
    variant: "warning",
    description: "Share of deploys that triggered rollback or hotfix.",
    badge: <MetralyBadge variant="warning">Watch</MetralyBadge>,
    footer: <span style={{ color: "var(--m-warn)" }}>▲ 0.8% vs -14d</span>,
  },
};

export const Loading: Story = {
  args: {
    title: "Lead time for changes",
    value: <MetralySkeleton variant="text" width="72%" aria-label="Loading metric value" />,
    description: "Waiting for telemetry ingestion to complete.",
    footer: <MetralySkeleton variant="text" width="48%" aria-label="Loading metric footer" />,
  },
};

export const Empty: Story = {
  args: {
    title: "Review latency",
    value: "No data",
    description: "No pull requests matched the current time range and filters.",
    badge: <StateBadge state="noData" label="No data" size="sm" />,
    footer: "Widen the time range or relax filters.",
  },
};

export const Error: Story = {
  args: {
    title: "Incident MTTR",
    value: "Unavailable",
    variant: "error",
    description: "PagerDuty sync is disconnected for this workspace.",
    badge: <StateBadge state="error" label="Error" size="sm" />,
    footer: "Reconnect the source to restore incident telemetry.",
  },
};

export const Stale: Story = {
  args: {
    title: "Merge queue latency",
    value: "5.4h",
    variant: "info",
    description: "Latest successful sample arrived 19 minutes ago.",
    badge: <StateBadge state="stale" label="Delayed" size="sm" />,
    footer: "Source heartbeat pending",
  },
};

export const CompactOverflow: Story = {
  args: {
    title: "Long-running cross-team delivery forecast for multi-service release trains",
    value: "123,456 merged pull requests / quarter",
    density: "compact",
    description: "Overflow contract for long labels and long values inside dense dashboard grids.",
    footer: "Compact mode",
  },
};
