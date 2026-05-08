import TelemetrySelect from "./TelemetrySelect";
import TelemetrySwitch from "./TelemetrySwitch";

export default function TelemetryDrawer() {
  return (
    <div className="telemetry-drawer-draft" role="dialog" aria-label="Telemetry drawer">
      <div className="telemetry-drawer-head">
        <div>
          <strong>Edit telemetry source</strong>
          <p>Drawer shell draft for board/widget configuration.</p>
        </div>

      </div>

      <div className="telemetry-drawer-content">
        <TelemetrySelect />
        <TelemetrySwitch label="Live sync" />

        <div className="telemetry-drag-preview">
          <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
          <span>Drag to move</span>
        </div>
      </div>
    </div>
  );
}
