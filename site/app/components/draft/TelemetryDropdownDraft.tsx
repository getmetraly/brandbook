export default function TelemetryDropdownDraft() {
  return (
    <div className="telemetry-dropdown-draft">
      <button type="button" className="telemetry-dropdown-trigger">
        Select source
        <span className="telemetry-select-indicator" aria-hidden="true" />
      </button>

      <div className="telemetry-dropdown-menu">
        <button type="button">GitHub</button>
        <button type="button">CI/CD</button>
        <button type="button">Incidents</button>
      </div>

      <span className="brand-badge brand-badge-warning">draft</span>
    </div>
  );
}
