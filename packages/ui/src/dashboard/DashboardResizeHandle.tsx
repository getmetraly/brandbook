import * as React from "react";

export interface DashboardResizeHandleProps {
  label?: string;
  className?: string;
}

export function DashboardResizeHandle({
  label = "Resize widget",
  className,
}: DashboardResizeHandleProps) {
  const classes = ["metraly-dashboard-resize-handle", "metraly-focus-ring", className]
    .filter(Boolean)
    .join(" ");

  return <span className={classes} role="separator" aria-label={label} tabIndex={0} />;
}

export default DashboardResizeHandle;
