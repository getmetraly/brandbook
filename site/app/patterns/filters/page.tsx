import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function FiltersPage() {
  return (
    <DocsShell currentPath="/patterns/filters" title="Filters" description="Filter composition for dashboard views, scoped search and segmented selection." status="draft" related={getRelatedLinks(["/components/forms", "/components/dashboard", "/examples/engineering-dashboard"])}>
      <DocsSection id="legacy" title="Preview pattern">
        <LegacyNotice>Extract the strongest filter examples from the preview component set, rewrite them against @metraly/ui, then delete the duplicate legacy blocks.</LegacyNotice>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Filter patterns should sit between forms and dashboard views.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Forms", href: "/components/forms", description: "Selection and choice controls." }} />
          <DocsRouteCard item={{ title: "Dashboard", href: "/components/dashboard", description: "Filter-driven board layouts." }} />
          <DocsRouteCard item={{ title: "Engineering Dashboard", href: "/examples/engineering-dashboard", description: "A realistic board to test filters." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
