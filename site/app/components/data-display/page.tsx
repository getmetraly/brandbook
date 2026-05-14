import type { ReactNode } from "react";
import { MetralyMetricCard, MetralyTable, StateBadge, type MetralyTableColumn } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, ComponentStateGrid, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

type ReviewRow = {
  team: string;
  open: string;
  response: string;
  health: ReactNode;
};

const columns: MetralyTableColumn<ReviewRow>[] = [
  { key: "team", header: "Team", width: "34%" },
  { key: "open", header: "Open PRs", align: "right", width: "18%" },
  { key: "response", header: "First response", align: "right", width: "24%" },
  { key: "health", header: "Status", align: "right", width: "24%" },
];

const data: ReviewRow[] = [
  { team: "Platform", open: "8", response: "2.4h", health: <StateBadge state="live" label="Live" /> },
  { team: "Growth", open: "14", response: "9.1h", health: <StateBadge state="delayed" label="Delayed" /> },
  { team: "Data", open: "12", response: "14.6h", health: <StateBadge state="stale" label="Stale" /> },
];

export default function DataDisplayPage() {
  return (
    <DocsShell currentPath="/components/data-display" title="Data Display" description="Tables, badges and metric cards for dense engineering analytics surfaces." status="ready" related={getRelatedLinks(["/components/dashboard", "/examples/engineering-dashboard"])}>
      <DocsSection id="states" title="State badges">
        <ComponentPreview title="StateBadge" description="Semantic telemetry states for rows, widgets and panels." states={["live", "delayed", "stale", "noData"]} code={'import { StateBadge } from "@metraly/ui";'}>
          <div className="component-row">
            <StateBadge state="live" />
            <StateBadge state="delayed" />
            <StateBadge state="stale" />
            <StateBadge state="noData" />
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="tables" title="Tables and metrics">
        <ComponentPreview title="MetralyTable" description="Display-only review queue table for dense engineering dashboards." states={["display-only", "selected", "empty", "loading"]} code={'import { MetralyTable } from "@metraly/ui";'}>
          <div className="component-preview-stage is-wide" style={{ display: "block", width: "100%" }}>
            <MetralyTable columns={columns} data={data} rowKey={(row) => row.team} selectedRowKeys={["Growth"]} liveRowKeys={["Platform"]} unreadRowKeys={["Data"]} ariaLabel="Review queue by team" />
          </div>
        </ComponentPreview>
        <ComponentPreview title="MetralyMetricCard" description="Compact KPI surface for dashboard overviews." states={["primary", "success", "warning"]}>
          <ComponentStateGrid>
            <MetralyMetricCard title="Flow efficiency" value="81%" description="Across merged work" footer="+8% vs last sprint" />
            <MetralyMetricCard title="Deploy success" value="99.2%" description="Production deploys" variant="success" footer="healthy" />
            <MetralyMetricCard title="Review latency" value="4h" description="Median first response" variant="warning" footer="watch trend" />
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>
    </DocsShell>
  );
}
