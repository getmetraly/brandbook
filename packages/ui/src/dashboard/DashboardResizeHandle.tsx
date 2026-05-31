import * as React from "react";
import { HandlePrimitive } from "./HandlePrimitive";

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

  return (
    <HandlePrimitive
      kind="resize"
      label={resolvedLabel}
      direction={direction}
      active={active}
      focusable={active}
      className={["metraly-dashboard-resize-handle", className].filter(Boolean).join(" ")}
    />
  );
}

export default DashboardResizeHandle;
