import type { ReactNode } from "react";
import * as React from "react";
import { DashboardWidget, MetralyTable, StateBadge, type DashboardWidgetInstance, type MetralyTableColumn } from "@metraly/ui";

export interface DashboardWidgetRendererProps {
  widget: DashboardWidgetInstance;
  selected?: boolean;
  onSelect?: (id: string) => void;
  onRemove?: (id: string) => void;
}

function StatCardBody() {
  return (
    <div className="dashboard-widget-stat-body">
      <strong>81%</strong>
      <span>Flow efficiency</span>
      <StateBadge state="live" label="Live" />
    </div>
  );
}

function MetricChartBody() {
  return (
    <div className="dashboard-widget-chart-body" aria-label="Metric trend placeholder">
      <span style={{ height: "34%" }} />
      <span style={{ height: "52%" }} />
      <span style={{ height: "44%" }} />
      <span style={{ height: "72%" }} />
      <span style={{ height: "61%" }} />
      <span style={{ height: "84%" }} />
    </div>
  );
}

type DataTableRow = {
  repository: string;
  health: ReactNode;
};

function DataTableBody() {
  const columns: MetralyTableColumn<DataTableRow>[] = [
    { key: "repository", header: "Repository" },
    { key: "health", header: "Health", align: "right" },
  ];
  const data: DataTableRow[] = [
    { repository: "metraly/app", health: <StateBadge state="live" label="Live" /> },
    { repository: "metraly/website", health: <StateBadge state="delayed" label="Delayed" /> },
  ];

  return <MetralyTable columns={columns} data={data} rowKey={(row) => row.repository} />;
}

function renderBody(widget: DashboardWidgetInstance): ReactNode {
  switch (widget.type) {
    case "metric-chart":
      return <MetricChartBody />;
    case "data-table":
      return <DataTableBody />;
    case "stat-card":
    default:
      return <StatCardBody />;
  }
}

export function DashboardWidgetRenderer({
  widget,
  selected = false,
  onSelect,
  onRemove,
}: DashboardWidgetRendererProps) {
  return (
    <DashboardWidget
      id={widget.id}
      title={widget.title}
      subtitle={widget.description}
      state={widget.state ?? "live"}
      stateLabel={widget.stateLabel}
      selected={selected}
      resizable
      onSelect={onSelect}
      onRemove={onRemove}
    >
      {renderBody(widget)}
    </DashboardWidget>
  );
}

export default DashboardWidgetRenderer;
