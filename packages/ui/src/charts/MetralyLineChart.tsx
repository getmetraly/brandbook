"use client";

import * as React from "react";
import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
} from "recharts";
import { MetralyChartTooltip } from "./MetralyChartTooltip";
import {
  chartStateFromData,
  metralyAxisProps,
  metralyChartMargin,
  resolveChartTone,
  type MetralyChartBaseProps,
  type MetralyChartDatum,
} from "./types";

export function MetralyLineChart<TDatum extends MetralyChartDatum = MetralyChartDatum>({
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
  const resolvedState = chartStateFromData(state, data.length);
  const classes = ["metraly-chart", "is-line", resolvedState !== "default" && `is-${resolvedState}`, className]
    .filter(Boolean)
    .join(" ");
  const chartProps = {
    "data-chart-type": "line",
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

  const chart = width ? (
    <LineChart width={width} height={height} data={data} margin={metralyChartMargin} title={ariaLabel}>
      <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
      <XAxis dataKey={xKey} {...metralyAxisProps} />
      <YAxis {...metralyAxisProps} />
      <MetralyChartTooltip />
      {series.map((item) => (
        <Line
          key={item.dataKey}
          type="monotone"
          dataKey={item.dataKey}
          name={item.name}
          stroke={resolveChartTone(item.tone)}
          strokeWidth={3}
          dot={false}
          activeDot={{ r: 5 }}
          isAnimationActive={false}
        />
      ))}
    </LineChart>
  ) : (
    <ResponsiveContainer width="100%" height={height}>
      <LineChart data={data} margin={metralyChartMargin} title={ariaLabel}>
        <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
        <XAxis dataKey={xKey} {...metralyAxisProps} />
        <YAxis {...metralyAxisProps} />
        <MetralyChartTooltip />
        {series.map((item) => (
          <Line
            key={item.dataKey}
            type="monotone"
            dataKey={item.dataKey}
            name={item.name}
            stroke={resolveChartTone(item.tone)}
            strokeWidth={3}
            dot={false}
            activeDot={{ r: 5 }}
            isAnimationActive={false}
          />
        ))}
      </LineChart>
    </ResponsiveContainer>
  );

  return (
    <div className={classes} role="img" aria-label={ariaLabel} {...chartProps}>
      {chart}
      <span className="metraly-chart-sr">{summary}</span>
    </div>
  );
}

export default MetralyLineChart;
