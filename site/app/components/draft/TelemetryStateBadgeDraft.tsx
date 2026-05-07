// NOTE: This file acts as a shim between the legacy draft component API
// and the new Metraly design system.  It preserves the existing API
// (accepting `state` and `label` props) but delegates rendering to
// the production-ready StateBadge component from the implementation
// pack.  This allows us to gradually migrate code without breaking
// consumers of TelemetryStateBadgeDraft.

import StateBadge from "../../../../implementation-pack/react/StateBadge";

// Legacy state definition.  The new StateBadge component uses camelCase
// for the "noData" state, so we map the hyphenated legacy value.
export type TelemetryState = "live" | "stale" | "delayed" | "disconnected" | "no-data";

export type TelemetryStateBadgeDraftProps = {
  state: TelemetryState;
  label: string;
};

export default function TelemetryStateBadgeDraft({ state, label }: TelemetryStateBadgeDraftProps) {
  // Convert legacy "no-data" to camelCase "noData" expected by StateBadge
  const normalizedState = state === "no-data" ? ("noData" as const) : (state as any);
  return <StateBadge state={normalizedState} label={label} />;
}
