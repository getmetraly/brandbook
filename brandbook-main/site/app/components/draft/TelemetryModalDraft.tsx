export default function TelemetryModalDraft() {
  return (
    <div className="telemetry-modal-draft" role="dialog" aria-label="Draft modal">
      <span className="telemetry-state-pulse" aria-hidden="true" />
      <strong>Remove telemetry source?</strong>
      <p>This draft modal shell keeps destructive actions calm, explicit and reversible in copy.</p>
      <div className="telemetry-modal-actions">
        <button className="btn btn-secondary" type="button">Cancel</button>
        <button className="btn btn-primary" type="button">Review impact</button>
      </div>
    </div>
  );
}
