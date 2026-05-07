import TelemetryCheckboxDraft from "./TelemetryCheckboxDraft";
import TelemetryStateBadgeDraft from "./TelemetryStateBadgeDraft";
import MetralyTable from "../../../../implementation-pack/react/MetralyTable";

type TelemetryTableRowDraftProps = {
  /** Repository name shown in the first column */
  repository?: string;
  /** Health state for the badge */
  health?: "live" | "delayed" | "disconnected" | "no-data";
  /** Whether the checkbox is checked */
  selected?: boolean;
  /** Relative updated time string */
  updatedAt?: string;
};

const healthLabel = {
  live: "Live",
  delayed: "Delay",
  disconnected: "Down",
  "no-data": "No data",
} as const;

/**
 * Draft table row component.  This implementation now renders the
 * underlying row via the generic MetralyTable component.  It preserves
 * the legacy API while delegating to the design system table for
 * consistent styling and behaviour.  Consumers can still pass
 * repository, health, selected and updatedAt props as before.
 */
export default function TelemetryTableRowDraft({
  repository = "metraly/app",
  health = "live",
  selected = true,
  updatedAt = "2m",
}: TelemetryTableRowDraftProps) {
  // Build a single-row dataset with React elements as cell values
  const rowData = [
    {
      selected: <TelemetryCheckboxDraft checked={selected} label="" />, 
      repository: <strong>{repository}</strong>,
      updatedAt: <span className="telemetry-table-muted">{updatedAt}</span>,
      sparkline: <span className="telemetry-table-sparkline" aria-hidden="true" />,
      status: <TelemetryStateBadgeDraft state={health} label={healthLabel[health]} />,
    },
  ];

  // Column definitions map to the properties of the row data
  const columns = [
    { key: "selected", header: "", width: "40px" },
    { key: "repository", header: "Repository" },
    { key: "updatedAt", header: "Updated", width: "80px" },
    { key: "sparkline", header: "", width: "60px" },
    { key: "status", header: "Status", width: "80px" },
  ];

  return (
    <MetralyTable
      columns={columns as any}
      data={rowData as any}
      loading={false}
      emptyText=""
      rowKey={() => "telemetry-row"}
      className={selected ? "telemetry-table-row-draft is-selected" : "telemetry-table-row-draft"}
    />
  );
}
