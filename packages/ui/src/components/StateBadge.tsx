import * as React from "react";

export type StateBadgeState = "live" | "stale" | "delayed" | "disconnected" | "noData";
export type StateBadgeSize = "sm" | "md";

export interface StateBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  /** Semantic state determining colour and style. */
  state: StateBadgeState;
  /** Text label displayed inside the badge. When omitted, derived from state. */
  label?: string;
  /** Accessible label. Defaults to the visible label. */
  ariaLabel?: string;
  /** Compact display size for dense tables and dashboard rows. */
  size?: StateBadgeSize;
  /** Whether to render the small state indicator dot. */
  showIndicator?: boolean;
  /** Optional class names appended to the badge. */
  className?: string;
}

/**
 * A small pill-shaped badge for communicating telemetry state.
 *
 * States map to semantic colours defined in the Metraly theme. Use this
 * component inside widgets, cards, tables and compact dashboard rows to
 * communicate freshness or health without relying on colour alone.
 */
function defaultStateLabel(state: StateBadgeState): string {
  const spaced = state.replace(/([A-Z])/g, " $1").toLowerCase();
  return spaced.charAt(0).toUpperCase() + spaced.slice(1);
}

export function StateBadge({
  state,
  label,
  ariaLabel,
  size = "md",
  showIndicator = true,
  className,
  ...rest
}: StateBadgeProps) {
  const resolvedLabel = label ?? defaultStateLabel(state);
  const classes = [
    "metraly-state-badge",
    `is-${state}`,
    size !== "md" ? `metraly-state-badge--${size}` : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span
      {...rest}
      className={classes}
      data-state={state}
      data-size={size}
      role={rest.role ?? "status"}
      aria-label={ariaLabel ?? resolvedLabel}
    >
      {showIndicator ? <span className="metraly-state-pulse" aria-hidden="true" /> : null}
      <span>{resolvedLabel}</span>
    </span>
  );
}

export default StateBadge;
