import * as React from "react";

export type DashboardResizeHandleDirection =
  | "northwest"
  | "north"
  | "northeast"
  | "east"
  | "southeast"
  | "south"
  | "southwest"
  | "west";

export const dashboardResizeHandleDirections: DashboardResizeHandleDirection[] = [
  "northwest",
  "north",
  "northeast",
  "east",
  "southeast",
  "south",
  "southwest",
  "west",
];

const directionLabels: Record<DashboardResizeHandleDirection, string> = {
  northwest: "Resize northwest",
  north: "Resize height from top",
  northeast: "Resize northeast",
  east: "Resize width",
  southeast: "Resize width and height",
  south: "Resize height",
  southwest: "Resize southwest",
  west: "Resize width from left",
};

export interface DashboardResizeHandleProps {
  label?: string;
  direction?: DashboardResizeHandleDirection;
  active?: boolean;
  className?: string;
}

export function DashboardResizeHandle({
  label,
  direction = "southeast",
  active = false,
  className,
}: DashboardResizeHandleProps) {
  const resolvedLabel = label ?? directionLabels[direction];
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
    <span
      className={classes}
      role="separator"
      aria-label={resolvedLabel}
      data-direction={direction}
      data-state={active ? "active" : "idle"}
      tabIndex={active ? 0 : undefined}
    >
      <span aria-hidden="true" />
    </span>
  );
}

export default DashboardResizeHandle;
