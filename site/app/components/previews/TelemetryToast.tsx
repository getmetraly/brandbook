type TelemetryToastProps = {
  title?: string;
  description?: string;
  state?: "live" | "delayed" | "disconnected";
};

export default function TelemetryToast({
  title = "Board synced",
  description = "All telemetry sources are healthy.",
  state = "live",
}: TelemetryToastProps) {
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
