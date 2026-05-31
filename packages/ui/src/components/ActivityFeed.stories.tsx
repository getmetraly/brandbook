import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { ActivityFeed } from "./ActivityFeed";
import type { ActivityItem } from "./ActivityFeed";

const items: ActivityItem[] = [
  {
    id: "deploy-1",
    timestamp: "2026-05-30T09:14:00Z",
    kind: "deploy",
    title: "Latency budget restored",
    description: "Payments API recovered after the canary rollback completed.",
    severity: "ok",
    meta: [
      { key: "service", value: "payments-api" },
      { key: "region", value: "eu-west-1" },
    ],
  },
  {
    id: "pr-1",
    timestamp: "2026-05-30T08:48:00Z",
    kind: "pull_request",
    title: "Review queue exceeded target",
    description: "Median review wait time is up 37% over the last 24 hours.",
    severity: "warning",
    href: "/reviews/queue",
  },
  {
    id: "incident-1",
    timestamp: "2026-05-29T21:22:00Z",
    kind: "incident",
    title: "Connector token expired",
    description: "GitHub sync is paused until a new token is approved.",
    severity: "danger",
  },
];

function InteractiveActivityFeed() {
  const [activeTitle, setActiveTitle] = React.useState("Nothing selected");

  return (
    <div>
      <ActivityFeed
        groupBy="none"
        items={items}
        mode="widget"
        onItemActivate={(item) => setActiveTitle(item.title)}
      />
      <p>Selected: {activeTitle}</p>
    </div>
  );
}

const meta = {
  component: ActivityFeed,
  tags: ["ai-generated"],
} satisfies Meta<typeof ActivityFeed>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Feed: Story = {
  args: {
    description: "Recent activity across deployment, review, and connector workflows.",
    groupBy: "day",
    items,
    mode: "feed",
    title: "Workspace activity",
  },
};

export const Widget: Story = {
  args: {
    groupBy: "none",
    items: items.slice(0, 2),
    mode: "widget",
    title: "Recent changes",
  },
};

export const Interactive: Story = {
  args: {
    groupBy: "none",
    items,
    mode: "widget",
  },
  render: () => <InteractiveActivityFeed />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: /deploy: latency budget restored/i }),
    );
    await expect(canvas.getByText(/selected: latency budget restored/i)).toBeVisible();
  },
};
