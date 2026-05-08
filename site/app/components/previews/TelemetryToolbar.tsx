import TelemetrySelect from "./TelemetrySelect";
import TelemetrySwitch from "./TelemetrySwitch";

export default function TelemetryToolbar() {
  return (
    <div className="telemetry-toolbar-draft">
      <div>
        <strong>Engineering board</strong>
        <p>Toolbar draft for board filters, sync state and actions.</p>
      </div>

      <div className="telemetry-toolbar-actions">
        <TelemetrySelect
          label="Time range"
          value="7d"
          options={[
            { value: "24h", label: "24h" },
            { value: "7d", label: "7d" },
            { value: "30d", label: "30d" },
          ]}
        />
        <TelemetrySwitch label="Live sync" />
        <button className="btn btn-primary" type="button">Add widget</button>
      </div>
    </div>
  );
}
