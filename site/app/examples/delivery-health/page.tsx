import { DashboardToolbar, DashboardWidget, StateBadge } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function DeliveryHealthExamplePage() {
  return (
    <DocsShell
      currentPath="/examples/delivery-health"
      title="Delivery Health"
      description="Deployment and review health surface composed from current primitives."
      status="draft"
      related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/patterns/dashboard-layout"])}
    >
      <DocsSection id="preview" title="Preview scaffold">
        <div className="docs-dashboard-preview">
          <DashboardToolbar title="Delivery Health" description="Example page prepared for the next content pass." actions={<StateBadge state="stale" label="Preview" />} />
          <div className="docs-dashboard-preview-grid">
            <DashboardWidget title="Primary signal" state="live">
              <strong className="metric-value">81%</strong>
            </DashboardWidget>
            <DashboardWidget title="Secondary signal" state="delayed">
              <strong className="metric-value">4h</strong>
            </DashboardWidget>
            <DashboardWidget title="Reliability" state="stale">
              <strong className="metric-value">98%</strong>
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
