import { DashboardEmptyState } from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function EmptyStatesPage() {
  return (
    <DocsShell
      currentPath="/patterns/empty-states"
      title="Empty States"
      description="Empty-state treatment for first-run dashboards, no-data panels and fallback views."
      status="draft"
      related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/examples/engineering-dashboard"])}
    >
      <DocsSection id="pattern" title="Current pattern">
        <ComponentPreview title="DashboardEmptyState" description="Compact empty state for first-run dashboards and no-data panels." states={["empty", "call to action"]}>
          <DashboardEmptyState action={<span className="docs-status docs-status-ready">Add widget</span>} />
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="related" title="Where this fits" description="Empty states belong next to dashboard scaffolds and data-display surfaces.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Dashboard", href: "/components/dashboard", description: "No-widget and first-run board surfaces." }} />
          <DocsRouteCard item={{ title: "Data Display", href: "/components/data-display", description: "Tables and state badges for no-data cases." }} />
          <DocsRouteCard item={{ title: "Engineering Dashboard", href: "/examples/engineering-dashboard", description: "Realistic board scenario with fallback views." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
