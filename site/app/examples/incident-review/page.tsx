import { DashboardToolbar, DashboardWidget, StateBadge } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function IncidentReviewExamplePage() {
  return (
    <DocsShell currentPath="/examples/incident-review" title="Incident Review" description="Incident response and MTTR review surface scaffold." status="draft" related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/patterns/dashboard-layout"])}>
      <DocsSection id="preview" title="Preview scaffold">
        <div className="docs-dashboard-preview">
          <DashboardToolbar title="Incident Review" description="Example page prepared for the next content pass." actions={<StateBadge state="live" label="Draft" />} />
          <div className="docs-dashboard-preview-grid">
            <DashboardWidget title="Primary signal" state="live"><strong className="metric-value">81%</strong></DashboardWidget>
            <DashboardWidget title="Secondary signal" state="delayed"><strong className="metric-value">4h</strong></DashboardWidget>
            <DashboardWidget title="Reliability" state="stale"><strong className="metric-value">98%</strong></DashboardWidget>
          </div>
        </div>
        <LegacyNotice>Fill this example with a real dashboard scenario, then link it back to the relevant component and pattern pages.</LegacyNotice>
      </DocsSection>
    </DocsShell>
  );
}
