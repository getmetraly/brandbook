export default function TelemetryPopover() {
  return (
    <div className="telemetry-popover-draft" role="dialog" aria-label="Telemetry popover">
      <div className="telemetry-popover-head">
        <strong>Telemetry details</strong>
      </div>

      <p>Popover surfaces should stay compact, calm and telemetry-focused.</p>

      <div className="telemetry-popover-actions">
        <button className="btn btn-secondary" type="button">Dismiss</button>
        <button className="btn btn-primary" type="button">Open board</button>
      </div>
    </div>
  );
}
