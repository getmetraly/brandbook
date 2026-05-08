import RechartsShowcase from "../../components/RechartsShowcase";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function ChartsPage() {
  return (
    <DocsShell currentPath="/components/charts" title="Charts" description="Chart examples backed by Recharts. This page remains a draft layer until chart wrappers are promoted into @metraly/ui." status="draft" related={getRelatedLinks(["/components/data-display", "/examples/engineering-dashboard", "/patterns/dashboard-layout"])}>
      <DocsSection id="recharts" title="Recharts previews">
        <LegacyNotice>Charts are still a draft layer. Keep raw Recharts usage contained while wrappers are designed.</LegacyNotice>
        <ComponentPreview title="RechartsShowcase" description="Current chart gallery used as a temporary bridge while wrapper components are designed." states={["line", "bar", "area", "donut"]}>
          <RechartsShowcase />
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Charts should sit alongside data-display surfaces and dashboard examples.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Data Display", href: "/components/data-display", description: "Tables, badges and metric cards." }} />
          <DocsRouteCard item={{ title: "Engineering Dashboard", href: "/examples/engineering-dashboard", description: "Realistic chart usage in a board." }} />
          <DocsRouteCard item={{ title: "Dashboard Layout", href: "/patterns/dashboard-layout", description: "How chart cards live in page composition." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
