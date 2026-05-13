import * as React from "react";
import { resolveChartTone, type MetralyChartState, type MetralyChartTone } from "./types";

export interface MetralySparklineProps {
  values: number[];
  width?: number;
  height?: number;
  tone?: MetralyChartTone;
  ariaLabel: string;
  state?: MetralyChartState;
  emptyText?: string;
  className?: string;
}

export function MetralySparkline({
  values,
  width = 160,
  height = 44,
  tone = "primary",
  ariaLabel,
  state = "default",
  emptyText = "No sparkline data",
  className,
}: MetralySparklineProps) {
  const resolvedState: MetralyChartState = state !== "default" ? state : values.length === 0 ? "empty" : "default";
  const classes = [
    "metraly-sparkline",
    resolvedState !== "default" && `is-${resolvedState}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (resolvedState === "loading" || resolvedState === "empty" || resolvedState === "noData" || resolvedState === "error") {
    const role = resolvedState === "error" ? "alert" : "status";
    const copy = resolvedState === "loading" ? "Loading sparkline" : resolvedState === "error" ? "Sparkline disconnected" : emptyText;
    return (
      <span
        className={classes}
        role={role}
        aria-label={ariaLabel}
        data-chart-type="sparkline"
        data-chart-state={resolvedState}
        data-point-count={values.length}
      >
        {copy}
      </span>
    );
  }

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const points = values
    .map((value, index) => {
      const x = values.length === 1 ? width / 2 : (index / (values.length - 1)) * width;
      const y = height - ((value - min) / range) * (height - 6) - 3;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    })
    .join(" ");

  return (
    <svg
      className={classes}
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${width} ${height}`}
      data-chart-type="sparkline"
      data-chart-state={resolvedState}
      data-point-count={values.length}
    >
      <polyline points={points} fill="none" stroke={resolveChartTone(tone)} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default MetralySparkline;
