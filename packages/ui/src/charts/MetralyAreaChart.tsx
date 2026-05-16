"use client";

import * as React from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
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

export function MetralyAreaChart<TDatum extends MetralyChartDatum = MetralyChartDatum>({
  data,
  xKey = "name",
  series,
  width,
  height = 260,
  ariaLabel,
  summary,
  state = "default",
  className,
}: MetralyChartBaseProps<TDatum>) {
  const gradientId = React.useId().replace(/:/g, "");
  const resolvedState = chartStateFromData(state, data.length);
  const { containerRef, xAxisProps, yAxisProps } = useResponsiveChartAxisProps(width);
  const classes = ["metraly-chart", "is-area", resolvedState !== "default" && `is-${resolvedState}`, className]
    .filter(Boolean)
    .join(" ");
  const chartProps = {
    "data-chart-type": "area",
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
      {series.map((item, index) => {
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
  const areas = series.map((item, index) => {
    const color = resolveChartTone(item.tone ?? (index === 0 ? "primary" : "secondary"));
    return (
      <Area
        key={item.dataKey}
        type="monotone"
        dataKey={item.dataKey}
        name={item.name}
        stroke={color}
        fill={`url(#${gradientId}-${item.dataKey})`}
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
        <AreaChart width={width} height={height} data={data} margin={metralyChartMargin} title={ariaLabel}>
          {gradients}
          <CartesianGrid stroke="var(--m-line)" vertical={false} />
          <XAxis dataKey={xKey} {...xAxisProps} />
          <YAxis {...yAxisProps} />
          <MetralyChartTooltip />
          {areas}
        </AreaChart>
      ) : (
        <ResponsiveContainer width="100%" height={height}>
          <AreaChart data={data} margin={metralyChartMargin} title={ariaLabel}>
            {gradients}
            <CartesianGrid stroke="var(--m-line)" vertical={false} />
            <XAxis dataKey={xKey} {...xAxisProps} />
            <YAxis {...yAxisProps} />
            <MetralyChartTooltip />
            {areas}
          </AreaChart>
        </ResponsiveContainer>
      )}
      <span className="metraly-chart-sr">{summary}</span>
    </div>
  );
}

export default MetralyAreaChart;
