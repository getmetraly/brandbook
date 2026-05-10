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
  metralyAxisProps,
  metralyChartMargin,
  resolveChartTone,
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
  height = 320,
  ariaLabel,
  summary,
  className,
}: MetralyComposedChartProps<TDatum>) {
  const gradientId = React.useId().replace(/:/g, "");

  return (
    <div className={["metraly-chart", className].filter(Boolean).join(" ")} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <ComposedChart data={data} margin={metralyChartMargin} title={ariaLabel}>
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
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} {...metralyAxisProps} />
          <YAxis {...metralyAxisProps} />
          <MetralyChartTooltip />
          {series.map((item, index) => {
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
                isAnimationActive={false}
              />
            );
          })}
        </ComposedChart>
      </ResponsiveContainer>
      <span className="metraly-chart-sr">{summary}</span>
    </div>
  );
}

export default MetralyComposedChart;
