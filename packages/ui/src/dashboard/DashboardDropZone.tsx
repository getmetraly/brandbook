import * as React from "react";

export type DashboardDropZoneState = "idle" | "hover" | "active" | "rejected" | "empty";

export interface DashboardDropZoneProps {
  state?: DashboardDropZoneState;
  active?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  className?: string;
}

function defaultDropZoneLabel(state: DashboardDropZoneState): string {
  if (state === "active") return "Release to add widget";
  if (state === "hover") return "Widget can land here";
  if (state === "rejected") return "Cannot drop here";
  if (state === "empty") return "Add the first widget";
  return "Drop widget here";
}

function dropZoneTone(state: DashboardDropZoneState): "neutral" | "cyan" | "danger" {
  if (state === "rejected") return "danger";
  if (state === "hover" || state === "active" || state === "empty") return "cyan";
  return "neutral";
}

export function DashboardDropZone({
  state,
  active = false,
  label,
  description,
  className,
}: DashboardDropZoneProps) {
  const resolvedState = state ?? (active ? "active" : "idle");
  const resolvedLabel = label ?? defaultDropZoneLabel(resolvedState);
  const ariaLabel = typeof resolvedLabel === "string" ? resolvedLabel : defaultDropZoneLabel(resolvedState);
  const tone = dropZoneTone(resolvedState);
  const classes = [
    "metraly-dashboard-drop-zone",
    `is-${resolvedState}`,
    `is-${tone}`,
    (active || resolvedState === "active") && "is-active",
    className,
  ]
    .filter(Boolean)
    .join(" ");
  const showLine = resolvedState === "hover" || resolvedState === "active" || resolvedState === "empty";

  return (
    <div
      className={classes}
      role="status"
      aria-live="polite"
      aria-label={ariaLabel}
      data-drop-zone-state={resolvedState}
      data-tone={tone}
      data-pulse="off"
    >
      <span className="metraly-dashboard-drop-zone-icon" aria-hidden="true">
        {resolvedState === "rejected" ? "×" : "+"}
      </span>
      {showLine ? <span className="metraly-dashboard-drop-zone-line" aria-hidden="true" /> : null}
      <span className="metraly-dashboard-drop-zone-copy">
        <strong>{resolvedLabel}</strong>
        {description ? <small>{description}</small> : null}
      </span>
    </div>
  );
}

export default DashboardDropZone;
