export default function TelemetryContextMenu() {
  return (
    <div className="telemetry-context-menu-draft">
      <button type="button">Inspect widget</button>
      <button type="button">Duplicate</button>
      <button type="button">Move to board</button>
      <button type="button" className="is-danger">Delete widget</button>
    </div>
  );
}
