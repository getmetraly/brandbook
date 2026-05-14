"use client";

import * as React from "react";
import {
  Area,
  Bar,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { MetralyChartTooltip } from "./MetralyChartTooltip";
import {
  chartStateFromData,
  metralyChartMargin,
  resolveChartTone,
  useResponsiveChartAxisProps,
  type MetralyChartBaseProps,
  type MetralyChartDatum,
} from "./types";

export interface MetralyComposedChartSeries {
  dataKey: string;
  name?: string;
  tone?: string;
  kind?: "area" | "bar" | "line";
}

export interface MetralyComposedChartProps<TDatum extends MetralyChartDatum = MetralyChartDatum>
  extends Omit<MetralyChartBaseProps<TDatum>, "series"> {
  series: MetralyComposedChartSeries[];
}

export function MetralyComposedChart<TDatum extends MetralyChartDatum = MetralyChartDatum>({
  data,
  xKey = "name",
  series,
  width,
  height = 320,
  ariaLabel,
  summary,
  state = "default",
  className,
}: MetralyComposedChartProps<TDatum>) {
  const gradientId = React.useId().replace(/:/g, "");
  const resolvedState = chartStateFromData(state, data.length);
  const { containerRef, xAxisProps, yAxisProps } = useResponsiveChartAxisProps(width);
  const classes = ["metraly-chart", "is-composed", resolvedState !== "default" && `is-${resolvedState}`, className]
    .filter(Boolean)
    .join(" ");
  const chartProps = {
    "data-chart-type": "composed",
    "data-chart-state": resolvedState,
    "data-series-count": series.length,
    "data-point-count": data.length,
  };

  if (resolvedState === "empty" || resolvedState === "noData" || resolvedState === "loading" || resolvedState === "error") {
    const role = resolvedState === "error" ? "alert" : "status";
    const copy = resolvedState === "loading" ? "Loading chart" : resolvedState === "error" ? "Chart disconnected" : "No chart data";
    return (
      <div className={classes} role={role} aria-label={ariaLabel} {...chartProps}>
        <span className="metraly-chart-state-copy">{copy}</span>
        <span className="metraly-chart-sr">{summary}</span>
      </div>
    );
  }

  const gradients = (
    <defs>
      {series.filter((item) => (item.kind ?? "line") === "area").map((item, index) => {
        const color = resolveChartTone(item.tone ?? (index === 0 ? "primary" : "secondary"));
        return (
          <linearGradient key={item.dataKey} id={`${gradientId}-${item.dataKey}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor={color} stopOpacity={0.34} />
            <stop offset="95%" stopColor={color} stopOpacity={0.02} />
          </linearGradient>
        );
      })}
    </defs>
  );
  const composedSeries = series.map((item, index) => {
    const color = resolveChartTone(item.tone ?? (index === 0 ? "primary" : index === 1 ? "secondary" : "warning"));
    if (item.kind === "area") {
      return (
        <Area
          key={item.dataKey}
          type="monotone"
          dataKey={item.dataKey}
          name={item.name}
          stroke={color}
          fill={`url(#${gradientId}-${item.dataKey})`}
          strokeWidth={2}
          dot={false}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      );
    }
    if (item.kind === "bar") {
      return (
        <Bar
          key={item.dataKey}
          dataKey={item.dataKey}
          name={item.name}
          fill={color}
          radius={[8, 8, 0, 0]}
          activeBar={{ stroke: "rgba(0,229,204,0.42)", strokeWidth: 1, fillOpacity: 0.88 }}
          isAnimationActive={false}
        />
      );
    }
    return (
      <Line
        key={item.dataKey}
        type="monotone"
        dataKey={item.dataKey}
        name={item.name}
        stroke={color}
        strokeWidth={3}
        dot={false}
        activeDot={{ r: 5 }}
        isAnimationActive={false}
      />
    );
  });

  return (
    <div ref={containerRef} className={classes} role="img" aria-label={ariaLabel} {...chartProps}>
      {width ? (
        <ComposedChart width={width} height={height} data={data} margin={metralyChartMargin} title={ariaLabel}>
          {gradients}
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <MetralyChartTooltip />
          {composedSeries}
        </ComposedChart>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <ComposedChart data={data} margin={metralyChartMargin} title={ariaLabel}>
            {gradients}
            <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
            <XAxis dataKey={xKey} {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <MetralyChartTooltip />
            {composedSeries}
          </ComposedChart>
        </ResponsiveContainer>
      )}
      <span className="metraly-chart-sr">{summary}</span>
    </div>
  );
}

export default MetralyComposedChart;
