export default function TelemetryPopoverDraft() {
  return (
    <div className="telemetry-popover-draft">
      <div className="telemetry-popover-head">
        <strong>Telemetry details</strong>
        <span className="brand-badge brand-badge-warning">draft</span>
      </div>

      <p>Popover surfaces should stay compact, calm and telemetry-focused.</p>

      <div className="telemetry-popover-actions">
        <button className="btn btn-secondary" type="button">Dismiss</button>
        <button className="btn btn-primary" type="button">Open board</button>
      </div>
    </div>
  );
}
