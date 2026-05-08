import * as React from "react";

export type StateBadgeState = "live" | "stale" | "delayed" | "disconnected" | "noData";

export interface StateBadgeProps {
  /** Semantic state determining colour and style. */
  state: StateBadgeState;
  /** Text label displayed inside the badge. When omitted, derived from state. */
  label?: string;
  /** Optional class names appended to the badge. */
  className?: string;
}

/**
 * A small pill‑shaped badge for communicating telemetry state.  States map to
 * semantic colours defined in the Metraly theme.  For example, "live" uses
 * success green, "delayed" uses warning orange.  This component should
 * accompany widgets and tables to indicate freshness or health.
 */
function defaultStateLabel(state: StateBadgeState): string {
  const spaced = state.replace(/([A-Z])/g, " $1").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function StateBadge({ state, label, className }: StateBadgeProps) {
  const resolvedLabel = label ?? defaultStateLabel(state);
  const classes = ["metraly-state-badge", `is-${state}`, className].filter(Boolean).join(" ");
  return (
    <span className={classes} role="status" aria-label={resolvedLabel}>
      <span className="metraly-state-pulse" aria-hidden="true" />
      <span>{resolvedLabel}</span>
    </span>
  );
}

export default StateBadge;