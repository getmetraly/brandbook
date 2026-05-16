import React from "react";

export interface AppMetricStripItem {
  id: string;
  label: string;
  value: React.ReactNode;
  delta?: React.ReactNode;
  deltaDirection?: "up" | "down" | "flat";
}

export interface AppMetricStripProps {
  items: AppMetricStripItem[];
  className?: string;
}

export function AppMetricStrip({
  items,
  className,
}: AppMetricStripProps): React.ReactElement {
  const cls = ["metraly-app-metric-strip", className ?? ""]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cls}>
      {items.map(({ id, label, value, delta, deltaDirection }) => (
        <div key={id} className="metraly-app-metric-strip__item">
          <div className="metraly-app-metric-strip__label">{label}</div>
          <div className="metraly-app-metric-strip__value">{value}</div>
          {delta !== undefined && (
            <div
              className={[
                "metraly-app-metric-strip__delta",
                deltaDirection ? `is-${deltaDirection}` : "",
              ]
                .filter(Boolean)
                .join(" ")}
            >
              {delta}
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
