import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { InsightCard } from "../../packages/ui/src/components/InsightCard";
import { WidgetStateMatrix } from "../../packages/ui/src/components/WidgetStateMatrix";

const meta: Meta<typeof InsightCard> = {
  title: "Components/InsightCard",
  component: InsightCard,
  parameters: { layout: "padded" },
};
export default meta;
type Story = StoryObj<typeof InsightCard>;

export const RulesBased: Story = {
  args: {
    title: "Lead time degrading over last 14 days",
    summary:
      "Median PR-to-deploy time on the platform team grew from 18 h to 24 h over the last 14 days. The increase concentrates on PRs with more than 3 reviewers.",
    tone: "warning",
    source: "rules",
    freshness: "2026-05-15T09:00:00Z",
    confidence: "medium",
    meta: [
      { key: "team", value: "platform" },
      { key: "metric", value: "lead-time-p50" },
      { key: "window", value: "14d" },
    ],
    primaryAction: { label: "Open metric", onClick: () => {} },
    secondaryAction: { label: "Dismiss", onClick: () => {} },
  },
};

export const Anomaly: Story = {
  args: {
    title: "Deploy frequency anomaly",
    summary: "Production deploys are down 38% week-over-week. The drop coincides with a CI runner outage on May 12.",
    tone: "danger",
    source: "anomaly",
    freshness: "2026-05-15T10:00:00Z",
    confidence: "high",
    evidence: [
      { id: "e1", label: "deploy_count metric · last 14 d", kind: "metric", caption: "−38% WoW" },
      { id: "e2", label: "GitHub Actions runner outage", kind: "log", caption: "2026-05-12 14:21" },
      { id: "e3", label: "PR queue depth · last 14 d", kind: "metric", caption: "+62%" },
    ],
    primaryAction: { label: "Open dashboard", onClick: () => {} },
  },
};

export const SourceHealthRecommendation: Story = {
  args: {
    title: "Increase GitHub PAT scope to read:org",
    summary:
      "12% of repo events are skipped because the current token cannot enumerate the organization. Granting read:org would unlock org-level metrics and reduce drift.",
    tone: "warning",
    source: "rules",
    confidence: "high",
    freshness: "2026-05-15T08:42:00Z",
    primaryAction: { label: "Open source settings", onClick: () => {} },
  },
};

export const AIGrounded: Story = {
  args: {
    title: "Sprint burndown is unlikely to land on time",
    summary:
      "Based on PR throughput and remaining ticket points, current trajectory ends sprint at 78% completion. Three PRs older than 5 days account for most of the slip.",
    tone: "warning",
    source: "ai",
    confidence: "medium",
    freshness: "2026-05-15T10:30:00Z",
    evidence: [
      { id: "e1", label: "Sprint burndown · current sprint", kind: "metric", caption: "trend" },
      { id: "e2", label: "PR-3211, PR-3214, PR-3219 — stale", kind: "PR", caption: "5–9 d" },
    ],
    primaryAction: { label: "Open sprint", onClick: () => {} },
    secondaryAction: { label: "Explain in AI Workspace", onClick: () => {} },
  },
};

export const Compact: Story = {
  args: {
    title: "Cache hit rate dropped to 81%",
    summary: "Hit rate dropped 7 pp over 24 h.",
    tone: "warning",
    source: "anomaly",
    confidence: "medium",
    freshness: "2026-05-15T10:30:00Z",
    compact: true,
    frame: false,
  },
};

export const Loading: Story = {
  args: { title: "Sprint burndown", summary: "", state: "loading" },
};
export const Empty: Story = {
  args: { title: "Sprint burndown", summary: "", state: "empty" },
};
export const ErrorState: Story = {
  args: { title: "Sprint burndown", summary: "", state: "error" },
};
export const Stale: Story = {
  args: { ...AIGrounded.args!, state: "stale" },
};
export const Partial: Story = {
  args: { ...AIGrounded.args!, state: "partial" },
};

export const FullStateMatrix: Story = {
  render: () => (
    <WidgetStateMatrix
      title="InsightCard — widget state matrix"
      columns={3}
      render={(s) => (
        <InsightCard
          title="Lead time degrading"
          summary={s === "ready" || s === "partial" || s === "stale" ? "Median lead time grew from 18 h to 24 h over the last 14 days." : ""}
          tone="warning"
          source="rules"
          confidence="medium"
          state={s}
          frame={false}
          compact
        />
      )}
    />
  ),
};
