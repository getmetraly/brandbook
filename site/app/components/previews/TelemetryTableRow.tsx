import type { ReactNode } from "react";
import { MetralyTable } from "@metraly/ui";
import TelemetryCheckbox from "./TelemetryCheckbox";
import TelemetryStateBadge from "./TelemetryStateBadge";

type TelemetryTableRowProps = {
  repository?: string;
  health?: "live" | "delayed" | "disconnected" | "no-data";
  selected?: boolean;
  updatedAt?: string;
};

type RepositoryRow = {
  selected: ReactNode;
  repository: ReactNode;
  health: ReactNode;
  updatedAt: ReactNode;
  sparkline: ReactNode;
  status: ReactNode;
};

const healthLabel = {
  live: "Live",
  delayed: "Delay",
  disconnected: "Down",
  "no-data": "No data",
} as const;

const columns = [
  { key: "selected", header: "", width: "42px" },
  { key: "repository", header: "Repository" },
  { key: "health", header: "Health" },
  { key: "updatedAt", header: "Updated", width: "82px" },
  { key: "sparkline", header: "Trend", width: "84px" },
  { key: "status", header: "Status", width: "108px" },
] as const;

export default function TelemetryTableRow({
  repository = "metraly/app",
  health = "live",
  selected = true,
  updatedAt = "2m",
}: TelemetryTableRowProps) {
  const data: RepositoryRow[] = [
    {
      selected: <TelemetryCheckbox checked={selected} label="Select repository row" />,
      repository: <strong>{repository}</strong>,
      health: <span className="telemetry-table-health">health</span>,
      updatedAt: <span className="telemetry-table-muted">{updatedAt}</span>,
      sparkline: <span className="telemetry-table-sparkline" aria-hidden="true" />,
      status: <TelemetryStateBadge state={health} label={healthLabel[health]} />,
    },
  ];

  return (
    <MetralyTable
      columns={columns as any}
      data={data as any}
      rowKey={() => repository}
      selectedRowKeys={selected ? [repository] : []}
      className="telemetry-table-row-draft"
      ariaLabel="Repository health row"
    />
  );
}
