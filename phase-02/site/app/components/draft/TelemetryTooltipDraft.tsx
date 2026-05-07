export default function TelemetryTooltipDraft() {
  return (
    <div className="telemetry-tooltip-draft">
      <span className="telemetry-state-pulse" aria-hidden="true" />
      <span>Live sync is enabled</span>
      <span className="brand-badge brand-badge-warning">draft</span>
    </div>
  );
}
