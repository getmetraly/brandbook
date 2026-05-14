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
  withPulse?: boolean;
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
  withPulse,
  className,
  ...rest
}: StateBadgeProps) {
  const resolvedLabel = label ?? defaultStateLabel(state);
  const resolvedPulse = pulse ?? withPulse ?? shouldPulseByDefault(state);
  const classes = [
    "metraly-state-badge",
    `is-${state}`,
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
