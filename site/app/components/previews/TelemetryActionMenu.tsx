export default function TelemetryActionMenu() {
  return (
    <div className="telemetry-action-menu-draft">
      <div className="telemetry-action-menu-head">
        <strong>Widget actions</strong>
      </div>

      <button type="button">Edit widget</button>
      <button type="button">Duplicate</button>
      <button type="button">Move to board</button>
      <button type="button" className="is-danger">Remove widget</button>
    </div>
  );
}
