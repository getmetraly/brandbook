import { DashboardToolbar, DashboardWidget, StateBadge } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function IncidentReviewExamplePage() {
  return (
    <DocsShell currentPath="/examples/incident-review" title="Incident Review" description="Incident response and MTTR review surface scaffold." status="draft" related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/patterns/dashboard-layout"])}>
      <DocsSection id="preview" title="Preview scaffold">
        <div className="docs-dashboard-preview">
          <DashboardToolbar title="Incident Review" description="Example page prepared for the next content pass." actions={<StateBadge state="stale" label="Preview" />} />
          <div className="docs-dashboard-preview-grid">
            <DashboardWidget title="Primary signal" state="live"><strong className="metric-value">81%</strong></DashboardWidget>
            <DashboardWidget title="Secondary signal" state="delayed"><strong className="metric-value">4h</strong></DashboardWidget>
            <DashboardWidget title="Reliability" state="stale"><strong className="metric-value">98%</strong></DashboardWidget>
          </div>
        </div>
        <LegacyNotice>Fill this example with a real dashboard scenario, then link it back to the relevant component and pattern pages.</LegacyNotice>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Incident review should align with delivery health, status badges and dashboard composition.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Dashboard", href: "/components/dashboard", description: "Widget and board shell primitives." }} />
          <DocsRouteCard item={{ title: "Data Display", href: "/components/data-display", description: "Tables and state badges." }} />
          <DocsRouteCard item={{ title: "Dashboard Layout", href: "/patterns/dashboard-layout", description: "Page and toolbar composition." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
