import TelemetryCheckboxDraft from "./TelemetryCheckboxDraft";

type TelemetryTableRowDraftProps = {
  repository?: string;
  health?: "live" | "delayed" | "disconnected" | "no-data";
  selected?: boolean;
  updatedAt?: string;
};

const healthLabel = {
  live: "Live",
  delayed: "Delay",
  disconnected: "Down",
  "no-data": "No data",
} as const;

export default function TelemetryTableRowDraft({
  repository = "metraly/app",
  health = "live",
  selected = true,
  updatedAt = "2m",
}: TelemetryTableRowDraftProps) {
  return (
    <div className={selected ? "telemetry-table-row-draft is-selected" : "telemetry-table-row-draft"}>
      <TelemetryCheckboxDraft checked={selected} label="" />
      <strong>{repository}</strong>
      <span className="telemetry-table-health">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        health
      </span>
      <span className="telemetry-table-muted">{updatedAt}</span>
      <span className="telemetry-table-sparkline" aria-hidden="true" />
      <span className={`telemetry-table-status is-${health}`}>{healthLabel[health]}</span>
    </div>
  );
}
