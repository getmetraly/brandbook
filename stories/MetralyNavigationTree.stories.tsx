import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import {
  MetralyIcon,
  MetralyNavigationTree,
  type MetralyNavigationTreeItem,
  ThemeProvider,
} from "@metraly/ui";

const items: MetralyNavigationTreeItem[] = [
  {
    value: "dora",
    label: "DORA Metrics",
    icon: <MetralyIcon name="zap" size="sm" />,
    children: [
      { value: "deploy-freq", label: "Deployment Frequency", meta: "deploys/day", tone: "cyan" },
      { value: "lead-time", label: "Lead Time for Changes", meta: "hours", tone: "purple" },
      { value: "cfr", label: "Change Failure Rate", meta: "%", tone: "warn" },
      { value: "mttr", label: "MTTR", meta: "minutes", tone: "ok" },
    ],
  },
  {
    value: "ci",
    label: "CI / CD",
    icon: <MetralyIcon name="activity" size="sm" />,
    children: [
      { value: "ci-pass", label: "Build Success Rate", meta: "%", tone: "ok" },
      { value: "ci-duration", label: "Build Duration", meta: "min", tone: "cyan" },
      { value: "ci-queue", label: "Pipeline Queue Time", meta: "sec", tone: "warn" },
    ],
  },
  {
    value: "pr",
    label: "Pull Requests",
    icon: <MetralyIcon name="gitPR" size="sm" />,
    children: [
      { value: "pr-cycle", label: "PR Cycle Time", meta: "hours", tone: "purple" },
      { value: "pr-review", label: "Review Time", meta: "hours", tone: "cyan" },
    ],
  },
];

const meta: Meta<typeof MetralyNavigationTree> = {
  title: "Patterns/MetralyNavigationTree",
  component: MetralyNavigationTree,
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: 24, background: "var(--m-bg-0)", width: 320 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MetralyNavigationTree>;

export const MetricTree: Story = {
  args: {
    ariaLabel: "Metrics",
    items,
    defaultValue: "deploy-freq",
    defaultExpandedValues: ["dora", "ci"],
  },
};

export const DenseRail: Story = {
  render: () => (
    <div style={{ padding: 12, border: "1px solid var(--m-line)", borderRadius: "var(--m-r-3)", background: "var(--m-bg-1)" }}>
      <MetralyNavigationTree
        ariaLabel="Metrics"
        items={items}
        defaultValue="lead-time"
        defaultExpandedValues={["dora", "pr"]}
      />
    </div>
  ),
};
