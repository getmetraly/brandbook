import * as React from "react";

export interface DashboardDropZoneProps {
  active?: boolean;
  label?: React.ReactNode;
  className?: string;
}

export function DashboardDropZone({
  active = false,
  label = "Drop widget here",
  className,
}: DashboardDropZoneProps) {
  const classes = ["metraly-dashboard-drop-zone", active && "is-active", className]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="status" aria-live="polite">
      <span className="metraly-dashboard-drop-zone-line" aria-hidden="true" />
      <span>{label}</span>
    </div>
  );
}

export default DashboardDropZone;
