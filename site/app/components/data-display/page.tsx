import type { ReactNode } from "react";
import { MetralyMetricCard, MetralyTable, StateBadge, type MetralyTableColumn } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, ComponentStateGrid, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

type RepoRow = { repo: string; cycle: string; status: ReactNode };
const columns: MetralyTableColumn<RepoRow>[] = [
  { key: "repo", header: "Repository" },
  { key: "cycle", header: "Cycle time" },
  { key: "status", header: "Status", align: "right" },
];
const data: RepoRow[] = [
  { repo: "getmetraly/metraly", cycle: "2.4d", status: <StateBadge state="live" label="Live" /> },
  { repo: "getmetraly/website", cycle: "3.1d", status: <StateBadge state="delayed" label="Delayed" /> },
  { repo: "getmetraly/docs", cycle: "—", status: <StateBadge state="noData" label="No data" /> },
];

export default function DataDisplayPage() {
  return (
    <DocsShell currentPath="/components/data-display" title="Data Display" description="Tables, badges and metric cards for dense engineering analytics surfaces." status="ready" related={getRelatedLinks(["/components/dashboard", "/examples/engineering-dashboard"])}>
      <DocsSection id="states" title="State badges">
        <ComponentPreview title="StateBadge" description="Semantic telemetry states for rows, widgets and panels." states={["live", "delayed", "stale", "noData"]} code={'import { StateBadge } from "@metraly/ui";'}>
          <div className="component-row"><StateBadge state="live" /><StateBadge state="delayed" /><StateBadge state="stale" /><StateBadge state="noData" /></div>
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="tables" title="Tables and metrics">
        <ComponentPreview title="MetralyTable" description="Display-only table primitive. Interactive tables should be wrapped in Client Components." states={["display-only", "empty", "loading"]} code={'import { MetralyTable } from "@metraly/ui";'}>
          <div className="component-preview-stage is-wide"><MetralyTable columns={columns} data={data} rowKey={(row) => row.repo} /></div>
        </ComponentPreview>
        <ComponentPreview title="MetralyMetricCard" description="Compact KPI surface for dashboard overviews." states={["primary", "success", "warning"]}>
          <ComponentStateGrid>
            <MetralyMetricCard title="Flow efficiency" value="81%" footer="+8% vs last sprint" />
            <MetralyMetricCard title="Deploy success" value="99.2%" variant="success" footer="healthy" />
            <MetralyMetricCard title="Review latency" value="4h" variant="warning" footer="watch trend" />
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>
    </DocsShell>
  );
}
