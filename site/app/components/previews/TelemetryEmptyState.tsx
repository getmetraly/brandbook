export default function TelemetryEmptyState() {
  return (
    <div className="telemetry-empty-state-draft">
      <span className="telemetry-empty-divider" aria-hidden="true" />
      <strong>No telemetry widgets yet</strong>
      <p>Select a source and add your first board widget.</p>
      <button className="btn btn-primary" type="button">Add widget</button>
    </div>
  );
}
