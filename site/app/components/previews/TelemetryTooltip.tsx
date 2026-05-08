export default function TelemetryTooltip() {
  return (
    <div className="telemetry-tooltip-draft" role="tooltip" aria-label="Telemetry tooltip">
      <span className="telemetry-state-pulse" aria-hidden="true" />
      <span>Live sync is enabled</span>
    </div>
  );
}
