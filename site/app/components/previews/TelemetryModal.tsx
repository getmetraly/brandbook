export default function TelemetryModal() {
  return (
    <div className="telemetry-modal-draft" role="dialog" aria-label="Telemetry modal">
      <span className="telemetry-state-pulse" aria-hidden="true" />
      <strong>Remove telemetry source?</strong>
      <p>This modal shell keeps destructive actions calm, explicit and reversible in copy.</p>
      <div className="telemetry-modal-actions">
        <button className="btn btn-secondary" type="button">Cancel</button>
        <button className="btn btn-primary" type="button">Review impact</button>
      </div>
    </div>
  );
}
