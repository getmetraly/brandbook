import * as React from "react";

export interface DashboardToolbarProps {
  title?: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  meta?: React.ReactNode;
  className?: string;
}

export function DashboardToolbar({
  title = "Dashboard editor",
  description = "Create, arrange and persist telemetry widgets.",
  actions,
  meta,
  className,
}: DashboardToolbarProps) {
  const classes = ["metraly-dashboard-toolbar", className].filter(Boolean).join(" ");

  return (
    <header className={classes}>
      <div className="metraly-dashboard-toolbar-copy">
        <strong>{title}</strong>
        <span>{description}</span>
        {meta ? <div className="metraly-dashboard-toolbar-meta">{meta}</div> : null}
      </div>
      {actions ? <div className="metraly-dashboard-toolbar-actions">{actions}</div> : null}
    </header>
  );
}

export default DashboardToolbar;
