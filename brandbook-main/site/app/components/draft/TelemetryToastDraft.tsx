type TelemetryToastDraftProps = {
  title?: string;
  description?: string;
  state?: "live" | "delayed" | "disconnected";
};

export default function TelemetryToastDraft({
  title = "Board synced",
  description = "All telemetry sources are healthy.",
  state = "live",
}: TelemetryToastDraftProps) {
  return (
    <div className={`telemetry-toast-draft is-${state}`}>
      <span className="telemetry-state-pulse" aria-hidden="true" />

      <div className="telemetry-toast-copy">
        <strong>{title}</strong>
        <p>{description}</p>
      </div>

    </div>
  );
}
