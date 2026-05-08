import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function LoadingStatesPage() {
  return (
    <DocsShell currentPath="/patterns/loading-states" title="Loading States" description="Loading-state treatment for async board data, widget fetches and shell placeholders." status="draft" related={getRelatedLinks(["/components/dashboard", "/components/data-display", "/examples/engineering-dashboard"])}>
      <DocsSection id="legacy" title="Preview pattern">
        <LegacyNotice>Extract the strongest loading examples from the preview component set, rewrite them against @metraly/ui, then delete the duplicate legacy blocks.</LegacyNotice>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Loading states affect board shell, widget and data-display patterns.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Dashboard", href: "/components/dashboard", description: "Loading boards and widgets." }} />
          <DocsRouteCard item={{ title: "Data Display", href: "/components/data-display", description: "Tables and metrics while data loads." }} />
          <DocsRouteCard item={{ title: "Engineering Dashboard", href: "/examples/engineering-dashboard", description: "Real scenario with async content." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
