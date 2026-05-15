import * as React from "react";
import { StateBadge, type StateBadgeProps, type StateBadgeState } from "./StateBadge";

export type StatusBadgeStatus =
  | "Live"
  | "Preview"
  | "Designed"
  | "Planned"
  | "In progress"
  | "Gated"
  | "Policy defined"
  | "Benchmark pending"
  | "Coming soon"
  | "Error"
  | "Delayed"
  | "No data";

export interface StatusBadgeProps extends Omit<StateBadgeProps, "state" | "label" | "ariaLabel"> {
  status: StatusBadgeStatus;
  label?: string;
  ariaLabel?: string;
}

const statusStateMap: Record<StatusBadgeStatus, StateBadgeState> = {
  Live: "live",
  Preview: "purple",
  Designed: "info",
  Planned: "disabled",
  "In progress": "info",
  Gated: "disabled",
  "Policy defined": "info",
  "Benchmark pending": "warning",
  "Coming soon": "disabled",
  Error: "error",
  Delayed: "delayed",
  "No data": "noData",
};

export function StatusBadge({
  status,
  label,
  ariaLabel,
  pulse = false,
  ...rest
}: StatusBadgeProps) {
  return (
    <StateBadge
      {...rest}
      state={statusStateMap[status]}
      label={label ?? status}
      ariaLabel={ariaLabel ?? label ?? status}
      pulse={pulse}
    />
  );
}

export default StatusBadge;
