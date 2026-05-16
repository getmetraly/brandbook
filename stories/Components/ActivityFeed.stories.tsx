import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { ActivityFeed, type ActivityItem } from "../../packages/ui/src/components/ActivityFeed";
import { ActivityWidgetExample } from "../../packages/ui/src/dashboard/DashboardWidgetExamples";
import { WidgetStateMatrix } from "../../packages/ui/src/components/WidgetStateMatrix";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof ActivityFeed> = {
  title: "Components/ActivityFeed",
  component: ActivityFeed,
  decorators: [
    (Story) => React.createElement("div", { style: { maxWidth: 660 } }, React.createElement(Story)),
  ],
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof ActivityFeed>;

const NOW = new Date("2026-05-15T10:42:00Z");
function iso(minutesAgo: number): string {
  return new Date(NOW.getTime() - minutesAgo * 60_000).toISOString();
}

const ITEMS: ActivityItem[] = [
  {
    id: "ev-1",
    timestamp: iso(2),
    kind: "deploy",
    title: "core-api · v1842 deployed to prod",
    description: "12 commits · 4 PRs · led by alex.k",
    severity: "ok",
    meta: [{ key: "service", value: "core-api" }, { key: "env", value: "prod" }, { key: "build", value: "v1842" }],
  },
  {
    id: "ev-2",
    timestamp: iso(8),
    kind: "incident",
    title: "Sev2 opened — latency spike on /checkout",
    description: "p99 latency above 800 ms for 4 min",
    severity: "warning",
    meta: [{ key: "service", value: "payments" }, { key: "sev", value: "2" }],
  },
  {
    id: "ev-3",
    timestamp: iso(14),
    kind: "pull_request",
    title: "#4912 — Cache eviction race fix merged",
    severity: "neutral",
    meta: [{ key: "pr", value: "#4912" }, { key: "author", value: "rick.l" }],
  },
  {
    id: "ev-4",
    timestamp: iso(31),
    kind: "sync",
    title: "GitHub · acme sync completed",
    description: "8423 events in 4 min",
    severity: "ok",
    meta: [{ key: "events", value: "8423" }, { key: "duration", value: "4m" }],
  },
  {
    id: "ev-5",
    timestamp: iso(64),
    kind: "alert",
    title: "Connector throttled — Jira API quota at 92%",
    severity: "warning",
    meta: [{ key: "source", value: "jira-prod" }, { key: "quota", value: "92%" }],
  },
  {
    id: "ev-6",
    timestamp: iso(112),
    kind: "ai",
    title: "AI Workspace answered question Q-318",
    description: "Grounded on 4 evidence items",
    severity: "info",
    meta: [{ key: "q", value: "Q-318" }, { key: "model", value: "claude-sonnet-4.5" }],
  },
  {
    id: "ev-7",
    timestamp: iso(820),
    kind: "deploy",
    title: "ingest · v204 deployed to prod",
    severity: "ok",
    meta: [{ key: "service", value: "ingest" }, { key: "build", value: "v204" }],
  },
];

export const FullFeed: Story = {
  args: { items: ITEMS, mode: "feed", title: "Recent activity", description: "All sources" },
};

export const Grouped: Story = {
  args: { items: ITEMS, mode: "feed", groupBy: "day", title: "Activity by day" },
};

export const GroupedByKind: Story = {
  args: { items: ITEMS, mode: "feed", groupBy: "kind", title: "Activity by kind" },
};

export const CompactWidget: Story = {
  args: {
    items: ITEMS.slice(0, 5),
    mode: "widget",
    frame: false,
    title: "Recent activity",
  },
  decorators: [
    (Story) => <div style={{ maxWidth: 340, padding: 12, background: "var(--m-bg-1)", border: "1px solid var(--m-line)", borderRadius: 12 }}><Story /></div>,
  ],
};

// ── widget-shell composition ─────────────────────────────────────────────────

export const InsideWidget: Story = {
  render: () => (
    <div style={{ maxWidth: 400 }}>
      <ActivityWidgetExample
        title="Engineering activity"
        subtitle="all sources · today"
        feed={{
          items: ITEMS.slice(0, 5),
          title: "Engineering activity",
        }}
        onDrilldown={() => {}}
      />
    </div>
  ),
};

// ── states ───────────────────────────────────────────────────────────────────


export const Loading: Story = { args: { items: [], state: "loading", title: "Recent activity" } };
export const Empty: Story = { args: { items: [], state: "empty", title: "Recent activity" } };
export const ErrorState: Story = { args: { items: [], state: "error", title: "Recent activity" } };
export const Stale: Story = { args: { items: ITEMS.slice(0, 3), state: "stale", title: "Recent activity" } };
export const Partial: Story = { args: { items: ITEMS.slice(0, 4), state: "partial", title: "Recent activity" } };
export const RateLimited: Story = { args: { items: [], state: "rate_limited", title: "Recent activity" } };

export const FullStateMatrix: Story = {
  render: () => (
    <WidgetStateMatrix
      title="ActivityFeed — widget state matrix"
      columns={3}
      render={(s) => (
        <ActivityFeed
          items={s === "ready" || s === "partial" || s === "stale" ? ITEMS.slice(0, 3) : []}
          state={s}
          mode="widget"
          frame={false}
        />
      )}
    />
  ),
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="Components"
      title="ActivityFeed"
      description="Chronological event feed that surfaces deploys, alerts, and CI signals across all connected sources."
      status="Ready"
      tags={["feed", "events", "timeline", "monitoring"]}
    >
      <ActivityFeed
        items={ITEMS}
        mode="feed"
        title="Recent activity"
        description="All sources"
      />
    </MetralyStoryFrame>
  ),
};
