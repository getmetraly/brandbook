type TelemetryState = "live" | "stale" | "delayed" | "disconnected" | "no-data";

type TelemetryStateBadgeDraftProps = {
  state: TelemetryState;
  label: string;
};

export default function TelemetryStateBadgeDraft({ state, label }: TelemetryStateBadgeDraftProps) {
  return (
    <span className={`telemetry-state-badge-draft is-${state}`}>
      <span className="telemetry-state-pulse" aria-hidden="true" />
      {label}
      <span className="brand-badge brand-badge-warning">draft</span>
    </span>
  );
}
