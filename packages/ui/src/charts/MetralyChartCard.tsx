import * as React from "react";
import type { MetralyChartState } from "./types";

export interface MetralyChartCardProps {
  title: React.ReactNode;
  description?: React.ReactNode;
  summary: React.ReactNode;
  state?: MetralyChartState;
  badge?: React.ReactNode;
  children?: React.ReactNode;
  className?: string;
}

function stateCopy(state: MetralyChartState): { title: string; body: string } | null {
  if (state === "loading") return { title: "Loading chart", body: "Fetching the latest delivery signal." };
  if (state === "empty" || state === "noData") return { title: "No chart data", body: "No engineering signal is available for this range." };
  if (state === "error") return { title: "Chart disconnected", body: "The source is unavailable. Retry the integration before promotion." };
  return null;
}

export function MetralyChartCard({
  title,
  description,
  summary,
  state = "default",
  badge,
  children,
  className,
}: MetralyChartCardProps) {
  const status = stateCopy(state);
  const classes = [
    "metraly-chart-card",
    state !== "default" && `is-${state}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <figure className={classes} aria-label={typeof title === "string" ? title : undefined} data-chart-state={state}>
      <figcaption className="metraly-chart-card-head">
        <span>
          <strong>{title}</strong>
          {description ? <small>{description}</small> : null}
        </span>
        {badge}
      </figcaption>
      <div className="metraly-chart-card-body">
        {status ? (
          <div className="metraly-chart-state" role={state === "error" ? "alert" : "status"}>
            <strong>{status.title}</strong>
            <span>{status.body}</span>
          </div>
        ) : children}
      </div>
      <p className="metraly-chart-summary">{summary}</p>
    </figure>
  );
}

export default MetralyChartCard;
