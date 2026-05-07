import TelemetrySelectDraft from "./TelemetrySelectDraft";
import TelemetrySwitchDraft from "./TelemetrySwitchDraft";

export default function TelemetryDrawerDraft() {
  return (
    <div className="telemetry-drawer-draft">
      <div className="telemetry-drawer-head">
        <div>
          <strong>Edit telemetry source</strong>
          <p>Drawer shell draft for board/widget configuration.</p>
        </div>

      </div>

      <div className="telemetry-drawer-content">
        <TelemetrySelectDraft />
        <TelemetrySwitchDraft label="Live sync" />

        <div className="telemetry-drag-preview">
          <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
          <span>Drag to move</span>
        </div>
      </div>
    </div>
  );
}
