import { MetralyBadge, MetralyCard, MetralyLogo, MetralyMetricCard, MetralyPanel } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, ComponentStateGrid, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function PrimitivesPage() {
  return (
    <DocsShell currentPath="/components/primitives" title="Primitives" description="Low-level surfaces and identity elements used by higher-level dashboard components." status="ready" related={getRelatedLinks(["/components/forms", "/components/data-display", "/foundations/colors"])}>
      <DocsSection id="identity" title="Identity">
        <ComponentPreview title="MetralyLogo" description="Horizontal and mark variants for navigation, documentation and product shell." states={["horizontal", "mark"]} code={'import { MetralyLogo } from "@metraly/ui";'}>
          <ComponentStateGrid>
            <MetralyLogo />
            <MetralyLogo variant="mark" />
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="surfaces" title="Surfaces">
        <ComponentPreview title="MetralyCard" description="Universal card with title, subtitle, body, footer and state support." states={["default", "selected", "loading", "empty", "error"]} code={'import { MetralyCard } from "@metraly/ui";'}>
          <ComponentStateGrid>
            <MetralyCard title="PR cycle time" subtitle="Last 30 days" footer="-18% faster"><strong className="metric-value">2.4d</strong></MetralyCard>
            <MetralyCard title="Deployment health" subtitle="7 days" state="selected"><strong className="metric-value">99.2%</strong></MetralyCard>
            <MetralyCard title="Loading state" subtitle="Fetching" state="loading" />
            <MetralyCard title="Empty state" subtitle="No source connected" state="empty" />
          </ComponentStateGrid>
        </ComponentPreview>
        <ComponentPreview title="MetralyPanel / Badge / MetricCard" description="Composable primitives for small surfaces, status labels and metric summaries." states={["surface", "semantic", "metric"]}>
          <ComponentStateGrid>
            <MetralyPanel className="component-card"><h3>Panel</h3><p>Neutral surface for custom layouts.</p></MetralyPanel>
            <MetralyPanel padding="md" className="primitive-badge-surface" aria-label="Semantic badge examples">
              <div className="component-row">
                <MetralyBadge>Telemetry</MetralyBadge>
                <MetralyBadge variant="success">Healthy</MetralyBadge>
                <MetralyBadge variant="warning">Review</MetralyBadge>
              </div>
            </MetralyPanel>
            <MetralyMetricCard title="Review latency" value="4h" variant="primary" footer="within target" />
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>
    </DocsShell>
  );
}
