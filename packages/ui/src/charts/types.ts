import * as React from "react";

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

export function resolveResponsiveAxisProps(width: number) {
  const compact = width > 0 && width <= 360;
  const narrow = width > 0 && width <= 520;

  return {
    xAxisProps: {
      ...metralyAxisProps,
      interval: compact ? 1 : 0,
      minTickGap: compact ? 28 : narrow ? 20 : 12,
      tickMargin: narrow ? 8 : 10,
    },
    yAxisProps: {
      ...metralyAxisProps,
      width: compact ? 28 : narrow ? 32 : 40,
    },
  };
}

export function useResponsiveChartAxisProps(fixedWidth?: number) {
  const containerRef = React.useRef<HTMLDivElement | null>(null);
  const [measuredWidth, setMeasuredWidth] = React.useState(fixedWidth ?? 0);

  React.useEffect(() => {
    if (fixedWidth) {
      setMeasuredWidth(fixedWidth);
      return;
    }

    const element = containerRef.current;
    if (!element) return;

    const updateWidth = () => {
      setMeasuredWidth(Math.max(0, Math.floor(element.getBoundingClientRect().width)));
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, [fixedWidth]);

  return {
    containerRef,
    measuredWidth,
    ...resolveResponsiveAxisProps(measuredWidth),
  };
}

export const metralyChartMargin = { top: 18, right: 18, left: -18, bottom: 0 };
