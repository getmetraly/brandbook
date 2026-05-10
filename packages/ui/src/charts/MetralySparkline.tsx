import * as React from "react";
import { resolveChartTone, type MetralyChartTone } from "./types";

export interface MetralySparklineProps {
  values: number[];
  width?: number;
  height?: number;
  tone?: MetralyChartTone;
  ariaLabel: string;
  className?: string;
}

export function MetralySparkline({
  values,
  width = 160,
  height = 44,
  tone = "primary",
  ariaLabel,
  className,
}: MetralySparklineProps) {
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
      className={["metraly-sparkline", className].filter(Boolean).join(" ")}
      role="img"
      aria-label={ariaLabel}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline points={points} fill="none" stroke={resolveChartTone(tone)} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

export default MetralySparkline;
