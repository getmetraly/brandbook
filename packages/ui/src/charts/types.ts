import type * as React from "react";

export type MetralyChartDatum = Record<string, string | number>;

export type MetralyChartTone = "primary" | "secondary" | "warning" | "success" | "error" | string;

export type MetralyChartState =
  | "default"
  | "selected"
  | "dragging"
  | "resizing"
  | "fullWidth"
  | "empty"
  | "loading"
  | "error"
  | "noData";

export interface MetralyChartSeries {
  dataKey: string;
  name?: string;
  tone?: MetralyChartTone;
}

export interface MetralyChartBaseProps<TDatum extends MetralyChartDatum = MetralyChartDatum> {
  data: TDatum[];
  xKey?: string;
  series: MetralyChartSeries[];
  width?: number;
  height?: number;
  ariaLabel: string;
  summary: React.ReactNode;
  className?: string;
}

export function resolveChartTone(tone: MetralyChartTone = "primary"): string {
  if (tone === "primary") return "var(--metraly-graph-1, #00e5cc)";
  if (tone === "secondary") return "var(--metraly-graph-3, #a855f7)";
  if (tone === "warning") return "var(--metraly-warning, #f59e0b)";
  if (tone === "success") return "var(--metraly-success, #22c55e)";
  if (tone === "error") return "var(--metraly-error, #ef4444)";
  return tone;
}

export const metralyAxisProps = {
  stroke: "rgba(240,244,248,0.48)",
  tickLine: false,
  axisLine: false,
  fontSize: 12,
} as const;

export const metralyChartMargin = { top: 18, right: 18, left: -18, bottom: 0 };
