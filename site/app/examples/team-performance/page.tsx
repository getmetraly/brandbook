import { DashboardToolbar, DashboardWidget, StateBadge } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function TeamPerformanceExamplePage() {
  return (
    <DocsShell
      currentPath="/examples/team-performance"
      title="Team Performance"
      description="Team comparison and engineering flow surface scaffold."
      status="draft"
      related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/patterns/dashboard-layout"])}
    >
      <DocsSection id="preview" title="Preview scaffold">
        <div className="docs-dashboard-preview">
          <DashboardToolbar title="Team Performance" description="Example page prepared for the next content pass." actions={<StateBadge state="live" label="Preview" />} />
          <div className="docs-dashboard-preview-grid">
            <DashboardWidget title="Team throughput" state="live">
              <strong className="metric-value">12</strong>
            </DashboardWidget>
            <DashboardWidget title="Team latency" state="delayed">
              <strong className="metric-value">3.2h</strong>
            </DashboardWidget>
            <DashboardWidget title="Team reliability" state="stale">
              <strong className="metric-value">99%</strong>
            </DashboardWidget>
          </div>
        </div>
        <p>Build this example from the canonical dashboard primitives, then link it back to the relevant component and pattern pages.</p>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="This scenario should connect back to dashboard, table and layout guidance.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Dashboard", href: "/components/dashboard", description: "Editor-ready board primitives." }} />
          <DocsRouteCard item={{ title: "Data Display", href: "/components/data-display", description: "Tables and status summaries." }} />
          <DocsRouteCard item={{ title: "Dashboard Layout", href: "/patterns/dashboard-layout", description: "Page-level composition rules." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
