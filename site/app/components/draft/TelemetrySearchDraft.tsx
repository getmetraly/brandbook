export default function TelemetrySearchDraft() {
  return (
    <label className="telemetry-search-draft">
      <span className="telemetry-field-label">
        Search widgets
        <span className="brand-badge brand-badge-warning">draft</span>
      </span>

      <div className="telemetry-search-shell">
        <span className="telemetry-search-icon" aria-hidden="true">⌕</span>
        <input type="text" placeholder="Search telemetry widgets" />
      </div>
    </label>
  );
}
