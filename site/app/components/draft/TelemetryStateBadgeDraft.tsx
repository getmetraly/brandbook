import StateBadge, { type StateBadgeState } from "../../../../implementation-pack/react/StateBadge";

type TelemetryState = "live" | "stale" | "delayed" | "disconnected" | "no-data";

type TelemetryStateBadgeDraftProps = {
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

export default function TelemetryStateBadgeDraft({ state, label }: TelemetryStateBadgeDraftProps) {
  return <StateBadge state={stateMap[state]} label={label} />;
}
