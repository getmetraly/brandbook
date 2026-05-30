/**
 * DashboardWidgetExamples — widget-shell composition recipes
 * ------------------------------------------------------------------
 * Demonstrates the canonical pattern for embedding chart primitives,
 * ActivityFeed, InsightCard, and StateBoard inside the brandbook's
 * DashboardWidget chrome.
 *
 * These are NOT new widget types. They're reference compositions that
 * Storybook and migration agents can copy verbatim.
 *
 * The existing DashboardWidget shell accepts StateBadgeState.
 * These recipes map the 12-state WidgetStateStatus into the
 * current widget shell state API and keep drilldown actions inside slots.
 */
import * as React from "react";
import { DashboardWidget } from "../dashboard/DashboardWidget";
import { MetralyGauge, type MetralyGaugeProps } from "../charts/MetralyGauge";
import { MetralyHeatmap, type MetralyHeatmapProps } from "../charts/MetralyHeatmap";
import { ActivityFeed, type ActivityFeedProps } from "../components/ActivityFeed";
import { InsightCard, type InsightCardProps } from "../components/InsightCard";
import { StateBoard, type StateBoardProps } from "../components/StateBoard";
import type { WidgetStateStatus } from "../components/WidgetStateMatrix";

function mapWidgetStateToBadgeState(state: WidgetStateStatus): React.ComponentProps<typeof DashboardWidget>["state"] {
  switch (state) {
    case "ready": return "live";
    case "loading": return "info";
    case "empty": return "noData";
    case "partial": return "warning";
    case "stale": return "stale";
    case "rate_limited": return "delayed";
    case "source_disconnected": return "disconnected";
    case "auth_failed":
    case "schema_mismatch":
    case "permission_denied":
    case "formula_invalid":
    case "error":
      return "error";
    default:
      return "info";
  }
}

function drilldownFooter(onDrilldown?: () => void) {
  return onDrilldown ? (
    <button type="button" className="metraly-focus-ring" onClick={onDrilldown}>Open details</button>
  ) : undefined;
}

const DEFAULT_GAUGE: Omit<MetralyGaugeProps, "state" | "bare"> = {
  value: 72,
  max: 100,
  unit: "%",
  tone: "success",
  label: "Deployment frequency",
  description: "Last 14 days",
  summary: "Target 70%",
};

const DEFAULT_HEATMAP: Omit<MetralyHeatmapProps, "state" | "compact"> = {
  title: "PR review load",
  description: "Last 14 days",
  xLabels: ["Mon", "Tue", "Wed", "Thu", "Fri"],
  yLabels: ["Payments", "Platform", "Infra"],
  unit: "PRs",
  cells: [
    { x: "Mon", y: "Payments", value: 12 },
    { x: "Tue", y: "Payments", value: 18 },
    { x: "Wed", y: "Platform", value: 9 },
    { x: "Thu", y: "Platform", value: 15 },
    { x: "Fri", y: "Infra", value: 6 },
  ],
};

const DEFAULT_FEED: Omit<ActivityFeedProps, "state" | "mode" | "frame"> = {
  items: [
    {
      id: "evt-1",
      timestamp: "2026-05-30T10:12:00Z",
      kind: "deploy",
      title: "Payments API deployed",
      description: "Production rollout completed without incidents",
      severity: "ok",
      meta: [{ key: "env", value: "prod" }],
    },
    {
      id: "evt-2",
      timestamp: "2026-05-30T09:44:00Z",
      kind: "pull_request",
      title: "Review queue crossed target",
      description: "Two reviewers carry most of the open PR load",
      severity: "warning",
      meta: [{ key: "open", value: "31" }],
    },
  ],
};

const DEFAULT_INSIGHT: Omit<InsightCardProps, "state" | "frame" | "compact"> = {
  title: "Review bottleneck detected",
  summary: "Cycle time increased because review queue time grew while open PR count stayed flat.",
  tone: "warning",
  source: "ai",
  confidence: "high",
  freshness: "2026-05-30T10:18:00Z",
  evidence: [
    { id: "ev-1", kind: "metric", label: "Review p50", caption: "22h" },
    { id: "ev-2", kind: "team", label: "Payments reviewers", caption: "64% load" },
  ],
};

const DEFAULT_BOARD: Omit<StateBoardProps, "state" | "frame"> = {
  title: "Service health",
  description: "Current connector status",
  variant: "list",
  items: [
    { id: "github", label: "GitHub", hint: "Sync healthy", status: "ok", meter: "48 ms" },
    { id: "jira", label: "Jira", hint: "Partial scope", status: "warning", meter: "2 scopes" },
    { id: "slack", label: "Slack", hint: "Not configured", status: "disabled" },
  ],
};

// ───────────────────────────────────────────────────────────────────────────
// Gauge in a widget shell — DORA / Source Health / SLO

export interface GaugeWidgetExampleProps {
  title?: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  gauge?: Omit<MetralyGaugeProps, "state" | "bare">;
  onDrilldown?: () => void;
  compact?: boolean;
}

export const GaugeWidgetExample: React.FC<GaugeWidgetExampleProps> = ({
  title = "Deployment frequency",
  subtitle = "DORA · Last 14d",
  state = "ready",
  gauge = DEFAULT_GAUGE,
  onDrilldown,
  compact,
}) => (
  <DashboardWidget title={title} subtitle={subtitle} state={mapWidgetStateToBadgeState(state)} footer={drilldownFooter(onDrilldown)} fullWidth={compact}>
    <MetralyGauge
      {...gauge}
      bare
      variant={compact ? "compact" : gauge.variant ?? "semicircle"}
      state={state}
    />
  </DashboardWidget>
);

// ───────────────────────────────────────────────────────────────────────────
// Heatmap in a widget shell — Activity / Incidents / Sync gaps

export interface HeatmapWidgetExampleProps {
  title?: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  heatmap?: Omit<MetralyHeatmapProps, "state" | "compact">;
  onDrilldown?: () => void;
}

export const HeatmapWidgetExample: React.FC<HeatmapWidgetExampleProps> = ({
  title = "Review load",
  subtitle = "Team heatmap",
  state = "ready",
  heatmap = DEFAULT_HEATMAP,
  onDrilldown,
}) => (
  <DashboardWidget title={title} subtitle={subtitle} state={mapWidgetStateToBadgeState(state)} footer={drilldownFooter(onDrilldown)}>
    <MetralyHeatmap
      {...heatmap}
      compact
      density={heatmap.density ?? "dashboard"}
      state={state}
    />
  </DashboardWidget>
);

// ───────────────────────────────────────────────────────────────────────────
// ActivityFeed in a widget shell — Recent activity

export interface ActivityWidgetExampleProps {
  title?: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  feed?: Omit<ActivityFeedProps, "state" | "mode" | "frame">;
  onDrilldown?: () => void;
}

export const ActivityWidgetExample: React.FC<ActivityWidgetExampleProps> = ({
  title = "Activity feed",
  subtitle = "Live source events",
  state = "ready",
  feed = DEFAULT_FEED,
  onDrilldown,
}) => (
  <DashboardWidget title={title} subtitle={subtitle} state={mapWidgetStateToBadgeState(state)} footer={drilldownFooter(onDrilldown)}>
    <ActivityFeed {...feed} mode="widget" frame={false} state={state} />
  </DashboardWidget>
);

// ───────────────────────────────────────────────────────────────────────────
// InsightCard in a widget shell — DORA bottleneck / anomaly summary

export interface InsightWidgetExampleProps {
  title?: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  insight?: Omit<InsightCardProps, "state" | "frame" | "compact">;
  onDrilldown?: () => void;
}

export const InsightWidgetExample: React.FC<InsightWidgetExampleProps> = ({
  title = "AI insight",
  subtitle = "Latest analysis",
  state = "ready",
  insight = DEFAULT_INSIGHT,
  onDrilldown,
}) => (
  <DashboardWidget title={title} subtitle={subtitle} state={mapWidgetStateToBadgeState(state)} footer={drilldownFooter(onDrilldown)}>
    <InsightCard {...insight} state={state} frame={false} compact />
  </DashboardWidget>
);

// ───────────────────────────────────────────────────────────────────────────
// StateBoard in a widget shell — Service status / provider status

export interface StateBoardWidgetExampleProps {
  title?: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  board?: Omit<StateBoardProps, "state" | "frame">;
  onDrilldown?: () => void;
}

export const StateBoardWidgetExample: React.FC<StateBoardWidgetExampleProps> = ({
  title = "Service health",
  subtitle = "3 services",
  state = "ready",
  board = DEFAULT_BOARD,
  onDrilldown,
}) => (
  <DashboardWidget title={title} subtitle={subtitle} state={mapWidgetStateToBadgeState(state)} footer={drilldownFooter(onDrilldown)}>
    <StateBoard {...board} state={state} frame={false} variant={board.variant ?? "list"} />
  </DashboardWidget>
);
