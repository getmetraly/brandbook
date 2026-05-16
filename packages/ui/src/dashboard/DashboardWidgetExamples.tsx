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

// ───────────────────────────────────────────────────────────────────────────
// Gauge in a widget shell — DORA / Source Health / SLO

export interface GaugeWidgetExampleProps {
  title: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  gauge: Omit<MetralyGaugeProps, "state" | "bare">;
  onDrilldown?: () => void;
  compact?: boolean;
}

export const GaugeWidgetExample: React.FC<GaugeWidgetExampleProps> = ({
  title,
  subtitle,
  state = "ready",
  gauge,
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
  title: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  heatmap: Omit<MetralyHeatmapProps, "state" | "compact">;
  onDrilldown?: () => void;
}

export const HeatmapWidgetExample: React.FC<HeatmapWidgetExampleProps> = ({
  title,
  subtitle,
  state = "ready",
  heatmap,
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
  title: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  feed: Omit<ActivityFeedProps, "state" | "mode" | "frame">;
  onDrilldown?: () => void;
}

export const ActivityWidgetExample: React.FC<ActivityWidgetExampleProps> = ({
  title,
  subtitle,
  state = "ready",
  feed,
  onDrilldown,
}) => (
  <DashboardWidget title={title} subtitle={subtitle} state={mapWidgetStateToBadgeState(state)} footer={drilldownFooter(onDrilldown)}>
    <ActivityFeed {...feed} mode="widget" frame={false} state={state} />
  </DashboardWidget>
);

// ───────────────────────────────────────────────────────────────────────────
// InsightCard in a widget shell — DORA bottleneck / anomaly summary

export interface InsightWidgetExampleProps {
  title: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  insight: Omit<InsightCardProps, "state" | "frame" | "compact">;
  onDrilldown?: () => void;
}

export const InsightWidgetExample: React.FC<InsightWidgetExampleProps> = ({
  title,
  subtitle,
  state = "ready",
  insight,
  onDrilldown,
}) => (
  <DashboardWidget title={title} subtitle={subtitle} state={mapWidgetStateToBadgeState(state)} footer={drilldownFooter(onDrilldown)}>
    <InsightCard {...insight} state={state} frame={false} compact />
  </DashboardWidget>
);

// ───────────────────────────────────────────────────────────────────────────
// StateBoard in a widget shell — Service status / provider status

export interface StateBoardWidgetExampleProps {
  title: string;
  subtitle?: string;
  state?: WidgetStateStatus;
  board: Omit<StateBoardProps, "state" | "frame">;
  onDrilldown?: () => void;
}

export const StateBoardWidgetExample: React.FC<StateBoardWidgetExampleProps> = ({
  title,
  subtitle,
  state = "ready",
  board,
  onDrilldown,
}) => (
  <DashboardWidget title={title} subtitle={subtitle} state={mapWidgetStateToBadgeState(state)} footer={drilldownFooter(onDrilldown)}>
    <StateBoard {...board} state={state} frame={false} variant={board.variant ?? "list"} />
  </DashboardWidget>
);
