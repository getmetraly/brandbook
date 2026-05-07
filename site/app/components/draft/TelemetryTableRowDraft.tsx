import TelemetryCheckboxDraft from "./TelemetryCheckboxDraft";
import TelemetryStateBadgeDraft from "./TelemetryStateBadgeDraft";

type TelemetryTableRowDraftProps = {
  repository?: string;
  health?: "live" | "delayed" | "disconnected" | "no-data";
  selected?: boolean;
};

export default function TelemetryTableRowDraft({
  repository = "metraly/app",
  health = "live",
  selected = true,
}: TelemetryTableRowDraftProps) {
  const label = health === "no-data" ? "No data" : health[0].toUpperCase() + health.slice(1);

  return (
    <div className={selected ? "telemetry-table-row-draft is-selected" : "telemetry-table-row-draft"}>
      <TelemetryCheckboxDraft checked={selected} label="" />
      <strong>{repository}</strong>
      <span className="telemetry-table-health"><span className="telemetry-state-pulse" aria-hidden="true" />health</span>
      <span className="telemetry-table-muted">2 min ago</span>
      <span className="telemetry-table-sparkline" aria-hidden="true" />
      <TelemetryStateBadgeDraft state={health} label={label} />
    </div>
  );
}
