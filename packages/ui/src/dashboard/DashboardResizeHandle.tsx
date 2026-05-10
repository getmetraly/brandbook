import * as React from "react";

export type DashboardResizeHandleDirection = "east" | "south" | "southeast";

export interface DashboardResizeHandleProps {
  label?: string;
  direction?: DashboardResizeHandleDirection;
  active?: boolean;
  className?: string;
}

export function DashboardResizeHandle({
  label = "Resize widget",
  direction = "southeast",
  active = false,
  className,
}: DashboardResizeHandleProps) {
  const classes = [
    "metraly-dashboard-resize-handle",
    `is-${direction}`,
    active && "is-active",
    "metraly-focus-ring",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} role="separator" aria-label={label} tabIndex={0}>
      <span aria-hidden="true" />
    </span>
  );
}

export default DashboardResizeHandle;
