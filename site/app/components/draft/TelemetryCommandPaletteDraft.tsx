export default function TelemetryCommandPaletteDraft() {
  return (
    <div className="telemetry-command-palette-draft">
      <div className="telemetry-command-input">
        <span aria-hidden="true">⌘</span>
        <input type="text" placeholder="Search commands, widgets or boards" />
      </div>

      <div className="telemetry-command-results">
        <button type="button">
          <strong>Create widget</strong>
          <span>Board actions</span>
        </button>

        <button type="button">
          <strong>Open incident board</strong>
          <span>Navigation</span>
        </button>

        <button type="button">
          <strong>Toggle live sync</strong>
          <span>Telemetry</span>
        </button>
      </div>

    </div>
  );
}
