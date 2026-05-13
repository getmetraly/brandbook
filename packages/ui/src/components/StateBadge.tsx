import * as React from "react";

export type StateBadgeState =
  | "live"
  | "ok"
  | "new"
  | "purple"
  | "disabled"
  | "stale"
  | "delayed"
  | "disconnected"
  | "noData"
  | "error"
  | "warning"
  | "success"
  | "info";
export type StateBadgeSize = "sm" | "md";
export type StateBadgeTone = "subtle" | "solid";

export interface StateBadgeProps extends Omit<React.HTMLAttributes<HTMLSpanElement>, "children"> {
  state: StateBadgeState;
  label?: string;
  ariaLabel?: string;
  size?: StateBadgeSize;
  tone?: StateBadgeTone;
  showIndicator?: boolean;
  /**
   * Controls semantic pulse motion. Defaults to true only for live/new states.
   * This keeps prototype conformance: pulse means live or unread/new signal,
   * not generic decoration.
   */
  pulse?: boolean;
  className?: string;
}

const stateLabels: Record<StateBadgeState, string> = {
  live: "Live",
  ok: "OK",
  new: "New",
  purple: "Beta",
  disabled: "N/A",
  stale: "Stale",
  delayed: "Delayed",
  disconnected: "Disconnected",
  noData: "No data",
  error: "Error",
  warning: "Warning",
  success: "Success",
  info: "Info",
};

const visualStateAliases: Record<StateBadgeState, StateBadgeState> = {
  live: "live",
  ok: "success",
  new: "live",
  purple: "info",
  disabled: "noData",
  stale: "stale",
  delayed: "delayed",
  disconnected: "disconnected",
  noData: "noData",
  error: "error",
  warning: "warning",
  success: "success",
  info: "info",
};

function defaultStateLabel(state: StateBadgeState): string {
  return stateLabels[state];
}

function shouldPulseByDefault(state: StateBadgeState): boolean {
  return state === "live" || state === "new";
}

export function StateBadge({
  state,
  label,
  ariaLabel,
  size = "md",
  tone = "subtle",
  showIndicator = true,
  pulse,
  className,
  ...rest
}: StateBadgeProps) {
  const resolvedLabel = label ?? defaultStateLabel(state);
  const resolvedPulse = pulse ?? shouldPulseByDefault(state);
  const visualState = visualStateAliases[state] ?? state;
  const classes = [
    "metraly-state-badge",
    `is-${visualState}`,
    visualState !== state ? `is-${state}` : null,
    resolvedPulse ? "is-pulsing" : "is-static",
    `metraly-state-badge--tone-${tone}`,
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
      data-visual-state={visualState}
      data-size={size}
      data-tone={tone}
      data-pulse={resolvedPulse ? "on" : "off"}
      role={rest.role ?? "status"}
      aria-label={ariaLabel ?? resolvedLabel}
    >
      {showIndicator ? <span className="metraly-state-pulse" aria-hidden="true" /> : null}
      <span>{resolvedLabel}</span>
    </span>
  );
}

export default StateBadge;
