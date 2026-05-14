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
  state?: MetralyChartState;
  className?: string;
}

export function chartStateFromData(state: MetralyChartState = "default", pointCount = 0): MetralyChartState {
  if (state !== "default") return state;
  return pointCount === 0 ? "empty" : "default";
}

export function resolveChartTone(tone: MetralyChartTone = "primary"): string {
  if (tone === "primary") return "var(--m-cyan-500)";
  if (tone === "secondary") return "var(--m-purple-500)";
  if (tone === "warning") return "var(--m-warn)";
  if (tone === "success") return "var(--m-ok)";
  if (tone === "error") return "var(--m-err)";
  return tone;
}

export const metralyAxisProps = {
  stroke: "oklch(0.66 0.012 250 / 0.55)",
  tickLine: false,
  axisLine: false,
  fontSize: 12,
} as const;

export const metralyChartMargin = { top: 18, right: 18, left: -18, bottom: 0 };
