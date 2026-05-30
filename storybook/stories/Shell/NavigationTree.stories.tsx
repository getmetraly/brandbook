import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MetralyNavigationTree, MetralyIcon } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Shell/NavigationTree",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const TREE_ITEMS = [
  {
    value: "dashboards",
    label: "Dashboards",
    icon: <MetralyIcon name="home" size="sm" />,
    children: [
      { value: "overview",    label: "Overview",         icon: <MetralyIcon name="activity" size="sm" /> },
      { value: "vp-eng",     label: "VP Engineering",   icon: <MetralyIcon name="trendingUp" size="sm" /> },
      { value: "tech-lead",  label: "Tech Lead",        icon: <MetralyIcon name="gitPR" size="sm" /> },
      { value: "devops",     label: "DevOps / SRE",     icon: <MetralyIcon name="cpu" size="sm" /> },
    ],
  },
  {
    value: "analytics",
    label: "Analytics",
    icon: <MetralyIcon name="bar2" size="sm" />,
    children: [
      { value: "metrics",   label: "Metrics Explorer", icon: <MetralyIcon name="bar2" size="sm" /> },
      { value: "ai",        label: "AI Workspace",     icon: <MetralyIcon name="brain" size="sm" />, tone: "primary" as const },
    ],
  },
  {
    value: "configure",
    label: "Configure",
    icon: <MetralyIcon name="settings" size="sm" />,
    children: [
      { value: "plugins",    label: "Plugins",     icon: <MetralyIcon name="puzzle" size="sm" />, disabled: true },
      { value: "connectors", label: "Connectors",  icon: <MetralyIcon name="link" size="sm" /> },
    ],
  },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Shell"
      title="MetralyNavigationTree"
      description="Hierarchical navigation tree with expand/collapse, roving tabindex, active state, and disabled items."
      status="stable"
      tags={["navigation", "a11y", "interactive"]}
    >
      <section>
        <div className="msf__section-title">Two-level tree (defaultExpanded)</div>
        <div className="msf__nav-preview">
          <MetralyNavigationTree
            items={TREE_ITEMS}
            defaultValue="overview"
            defaultExpandedValues={["dashboards", "analytics"]}
            ariaLabel="App navigation"
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
