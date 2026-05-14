import { DashboardToolbar, DashboardWidget, StateBadge } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentStateGrid, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function DashboardLayoutPatternPage() {
  return (
    <DocsShell currentPath="/patterns/dashboard-layout" title="Dashboard Layout" description="Recommended page composition for engineering analytics dashboards." status="ready" related={getRelatedLinks(["/components/dashboard", "/examples/engineering-dashboard", "/editor"])}>
      <DocsSection id="layout" title="Layout composition">
        <div className="dashboard-layout-demo">
          <aside className="sidebar-demo panel">
            <div className="logo" style={{ marginBottom: 28 }}><span className="logo-mark">M</span><span>Metraly</span></div>
            {["Overview", "Boards", "Signals", "Incidents", "Settings"].map((item, index) => <div className={index === 1 ? "sidebar-item active" : "sidebar-item"} key={item}>{item}</div>)}
          </aside>
          <div className="dashboard-main-demo">
            <DashboardToolbar title="Engineering board" description="Last updated 2m ago" actions={<StateBadge state="live" label="Live" />} />
            <ComponentStateGrid>
              <DashboardWidget title="Flow efficiency" state="live"><strong className="metric-value">81%</strong></DashboardWidget>
              <DashboardWidget title="Review latency" state="delayed"><strong className="metric-value">4h</strong></DashboardWidget>
            </ComponentStateGrid>
          </div>
        </div>
      </DocsSection>
    </DocsShell>
  );
}
