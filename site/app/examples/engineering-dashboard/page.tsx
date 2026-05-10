import type { ReactNode } from "react";
import { DashboardToolbar, DashboardWidget, MetralyTable, StateBadge, type MetralyTableColumn } from "@metraly/ui";
import { MetralyAreaChart, MetralyChartCard } from "@metraly/ui/charts";
import DocsShell from "../../components/docs/DocsShell";
import { DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

type TeamRow = { team: string; flow: string; health: ReactNode };
const columns: MetralyTableColumn<TeamRow>[] = [
  { key: "team", header: "Team" },
  { key: "flow", header: "Flow" },
  { key: "health", header: "Health", align: "right" },
];
const rows: TeamRow[] = [
  { team: "Platform", flow: "86%", health: <StateBadge state="live" label="Live" /> },
  { team: "Product", flow: "74%", health: <StateBadge state="delayed" label="Delayed" /> },
  { team: "Data", flow: "—", health: <StateBadge state="noData" label="No data" /> },
];

const flowTrend = [
  { name: "Mon", flow: 72 },
  { name: "Tue", flow: 74 },
  { name: "Wed", flow: 77 },
  { name: "Thu", flow: 80 },
  { name: "Fri", flow: 82 },
];

export default function EngineeringDashboardExamplePage() {
  return (
    <DocsShell currentPath="/examples/engineering-dashboard" title="Engineering Dashboard" description="A realistic executive engineering dashboard assembled from @metraly/ui components." status="ready" related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/patterns/dashboard-layout"])}>
      <DocsSection id="dashboard" title="Overview">
        <div className="docs-dashboard-preview">
          <DashboardToolbar
            title="VP Engineering Overview"
            description="Delivery, review and DORA health across teams."
            meta="Updated 2 minutes ago"
            tabs={[
              { value: "delivery", label: "Delivery" },
              { value: "dora", label: "DORA" },
              { value: "flow", label: "Flow" },
            ]}
            activeTab="delivery"
            searchValue=""
            syncState="live"
            actions={<StateBadge state="live" label="Live" />}
          />
          <div className="docs-dashboard-preview-grid">
            <DashboardWidget title="Flow efficiency" subtitle="Current sprint" state="live"><strong className="metric-value">81%</strong><p className="metric-delta">+8% vs last sprint</p></DashboardWidget>
            <DashboardWidget title="Review latency" subtitle="Median age" state="delayed"><strong className="metric-value">4h</strong><p className="metric-delta">within target</p></DashboardWidget>
            <DashboardWidget title="Deploy success" subtitle="7 days" state="live"><strong className="metric-value">99.2%</strong><p className="metric-delta">healthy</p></DashboardWidget>
          </div>
          <MetralyChartCard
            title="Flow efficiency trend"
            description="Current sprint completion versus waiting time."
            summary="Flow efficiency rises from 72 percent to 82 percent across the week."
            badge={<StateBadge state="live" label="Chart wrapper" />}
          >
            <MetralyAreaChart
              data={flowTrend}
              xKey="name"
              ariaLabel="Flow efficiency trend area chart"
              summary="Flow efficiency rises from 72 percent to 82 percent across the week."
              series={[{ dataKey: "flow", name: "Flow efficiency", tone: "primary" }]}
            />
          </MetralyChartCard>
          <div className="panel" style={{ padding: 18 }}><MetralyTable columns={columns} data={rows} rowKey={(row) => row.team} /></div>
        </div>
      </DocsSection>
    </DocsShell>
  );
}
