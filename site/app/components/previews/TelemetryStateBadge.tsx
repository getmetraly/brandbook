import { StateBadge, type StateBadgeState } from "@metraly/ui";

type TelemetryState = "live" | "stale" | "delayed" | "disconnected" | "no-data";

type TelemetryStateBadgeProps = {
  state: TelemetryState;
  label: string;
};

const stateMap: Record<TelemetryState, StateBadgeState> = {
  live: "live",
  stale: "stale",
  delayed: "delayed",
  disconnected: "disconnected",
  "no-data": "noData",
};

export default function TelemetryStateBadge({ state, label }: TelemetryStateBadgeProps) {
  return <StateBadge state={stateMap[state]} label={label} />;
}
