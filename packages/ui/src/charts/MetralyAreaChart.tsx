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
  metralyAxisProps,
  metralyChartMargin,
  resolveChartTone,
  type MetralyChartBaseProps,
  type MetralyChartDatum,
} from "./types";

export function MetralyAreaChart<TDatum extends MetralyChartDatum = MetralyChartDatum>({
  data,
  xKey = "name",
  series,
  height = 260,
  ariaLabel,
  summary,
  className,
}: MetralyChartBaseProps<TDatum>) {
  const gradientId = React.useId().replace(/:/g, "");

  return (
    <div className={["metraly-chart", className].filter(Boolean).join(" ")} role="img" aria-label={ariaLabel}>
      <ResponsiveContainer width="100%" height={height}>
        <AreaChart data={data} margin={metralyChartMargin} title={ariaLabel}>
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
          <CartesianGrid stroke="rgba(255,255,255,0.08)" vertical={false} />
          <XAxis dataKey={xKey} {...metralyAxisProps} />
          <YAxis {...metralyAxisProps} />
          <MetralyChartTooltip />
          {series.map((item, index) => {
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
                isAnimationActive={false}
              />
            );
          })}
        </AreaChart>
      </ResponsiveContainer>
      <span className="metraly-chart-sr">{summary}</span>
    </div>
  );
}

export default MetralyAreaChart;
