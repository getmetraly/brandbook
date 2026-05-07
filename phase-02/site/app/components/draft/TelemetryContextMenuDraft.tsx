export default function TelemetryContextMenuDraft() {
  return (
    <div className="telemetry-context-menu-draft">
      <button type="button">Inspect widget</button>
      <button type="button">Duplicate</button>
      <button type="button">Move to board</button>
      <button type="button" className="is-danger">Delete widget</button>
      <span className="brand-badge brand-badge-warning">draft</span>
    </div>
  );
}
