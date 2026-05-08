import TelemetrySelectDraft from "./TelemetrySelectDraft";
import TelemetrySwitchDraft from "./TelemetrySwitchDraft";

export default function TelemetryToolbarDraft() {
  return (
    <div className="telemetry-toolbar-draft">
      <div>
        <strong>Engineering board</strong>
        <p>Toolbar draft for board filters, sync state and actions.</p>
      </div>

      <div className="telemetry-toolbar-actions">
        <TelemetrySelectDraft
          label="Time range"
          value="7d"
          options={[
            { value: "24h", label: "24h" },
            { value: "7d", label: "7d" },
            { value: "30d", label: "30d" },
          ]}
        />
        <TelemetrySwitchDraft label="Live sync" />
        <button className="btn btn-primary" type="button">Add widget</button>
      </div>
    </div>
  );
}
