import * as React from "react";
import { StateBlock } from "../components/StateBlock";

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
  return (
    <StateBlock
      className={["metraly-dashboard-empty-state", className].filter(Boolean).join(" ")}
      variant="empty"
      title={title}
      description={description}
      action={action}
      icon={<span className="metraly-dashboard-empty-pulse" aria-hidden="true" />}
      aria-label="Empty dashboard"
    />
  );
}

export default DashboardEmptyState;
