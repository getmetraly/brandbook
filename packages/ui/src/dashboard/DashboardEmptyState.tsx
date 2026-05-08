import * as React from "react";

export interface DashboardEmptyStateProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}

export function DashboardEmptyState({
  title = "No widgets yet",
  description = "Add a telemetry widget to start building this dashboard.",
  action,
  className,
}: DashboardEmptyStateProps) {
  const classes = ["metraly-dashboard-empty-state", className].filter(Boolean).join(" ");

  return (
    <section className={classes} aria-label="Empty dashboard">
      <div className="metraly-dashboard-empty-pulse" aria-hidden="true" />
      <div className="metraly-dashboard-empty-copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>
      {action ? <div className="metraly-dashboard-empty-action">{action}</div> : null}
    </section>
  );
}

export default DashboardEmptyState;
