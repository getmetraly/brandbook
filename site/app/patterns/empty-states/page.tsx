import TelemetryEmptyState from "../../components/previews/TelemetryEmptyState";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function EmptyStatesPage() {
  return (
    <DocsShell currentPath="/patterns/empty-states" title="Empty States" description="Empty-state treatment for first-run dashboards, no-data panels and fallback views." status="legacy" related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/examples/engineering-dashboard"])}>
      <DocsSection id="legacy" title="Legacy pattern">
        <LegacyNotice>Extract the strongest empty-state examples from the preview component set, rewrite them against @metraly/ui, then delete the duplicate legacy blocks.</LegacyNotice>
        <ComponentPreview title="TelemetryEmptyState" description="Compact empty state for first-run dashboards and no-data panels." states={["empty", "call to action"]}>
          <TelemetryEmptyState />
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
