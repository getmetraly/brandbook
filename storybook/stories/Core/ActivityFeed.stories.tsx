import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { ActivityFeed } from "@metraly/ui";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Core/ActivityFeed",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const FEED_ITEMS = [
  {
    id: "1",
    timestamp: "2026-05-30T11:42:00Z",
    kind: "deploy" as const,
    title: "Deployed v2.14.0 to production",
    description: "Rollout completed across all 3 regions in 4 min 12 s.",
    severity: "ok" as const,
    meta: [{ key: "env", value: "production" }, { key: "duration", value: "4m12s" }],
  },
  {
    id: "2",
    timestamp: "2026-05-30T11:30:00Z",
    kind: "incident" as const,
    title: "P2 incident — elevated error rate on /api/search",
    description: "Error rate exceeded 5% threshold. Auto-rollback triggered.",
    severity: "danger" as const,
    meta: [{ key: "service", value: "search-api" }, { key: "error-rate", value: "7.4%" }],
  },
  {
    id: "3",
    timestamp: "2026-05-30T10:58:00Z",
    kind: "pull_request" as const,
    title: "Merged: feat/dashboard-leaderboard",
    severity: "neutral" as const,
    meta: [{ key: "author", value: "alex.chen" }, { key: "reviews", value: "2" }],
  },
  {
    id: "4",
    timestamp: "2026-05-30T10:15:00Z",
    kind: "sync" as const,
    title: "Connector sync — github/getmetraly",
    description: "14,230 records updated.",
    severity: "ok" as const,
    meta: [{ key: "records", value: "14230" }],
  },
  {
    id: "5",
    timestamp: "2026-05-30T09:45:00Z",
    kind: "alert" as const,
    title: "Build time regression detected",
    description: "CI duration increased 55% over the past 48 hours.",
    severity: "warning" as const,
    meta: [{ key: "pipeline", value: "monorepo-build" }, { key: "duration", value: "6m45s" }],
  },
  {
    id: "6",
    timestamp: "2026-05-30T08:30:00Z",
    kind: "ai" as const,
    title: "AI insight: Deployment frequency dropped 40%",
    description: "Correlated with new review policy added on May 12.",
    severity: "info" as const,
  },
  {
    id: "7",
    timestamp: "2026-05-29T17:00:00Z",
    kind: "plugin" as const,
    title: "Plugin installed: datadog-metrics",
    severity: "neutral" as const,
    meta: [{ key: "version", value: "1.2.0" }],
  },
];

export const FeedMode: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Core"
      title="ActivityFeed"
      description="Full-page and widget-mode event feed. Groups by day or kind, supports all activity types and severity levels."
      status="stable"
      tags={["data", "events"]}
    >
      <section>
        <div className="msf__section-title">Feed mode — grouped by day</div>
        <ActivityFeed
          items={FEED_ITEMS}
          mode="feed"
          groupBy="day"
          title="Activity"
          description="Recent events across connectors, deploys, and AI insights"
          frame
        />
      </section>

      <section>
        <div className="msf__section-title">Widget mode — compact</div>
        <div className="msf__constrained-3xl">
          <ActivityFeed
            items={FEED_ITEMS.slice(0, 4)}
            mode="widget"
            groupBy="none"
            frame
            title="Recent activity"
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Loading state</div>
        <div className="msf__constrained-3xl">
          <ActivityFeed
            items={[]}
            state="loading"
            mode="widget"
            frame
            title="Activity"
          />
        </div>
      </section>

      <section>
        <div className="msf__section-title">Empty state</div>
        <div className="msf__constrained-3xl">
          <ActivityFeed
            items={[]}
            state="idle"
            mode="feed"
            frame
            title="Activity"
            emptyLabel="No activity yet — connect a data source to get started"
          />
        </div>
      </section>
    </MetralyStoryFrame>
  ),
};
