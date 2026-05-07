export default function TelemetryTopbarDraft() {
  return (
    <header className="telemetry-topbar-draft">
      <div>
        <strong>Engineering board</strong>
        <p>Last updated 2m ago</p>
      </div>

      <div className="telemetry-topbar-actions">
        <button className="btn btn-secondary" type="button">Search</button>
        <button className="btn btn-primary" type="button">Add widget</button>
      </div>

      <span className="brand-badge brand-badge-warning">draft</span>
    </header>
  );
}
