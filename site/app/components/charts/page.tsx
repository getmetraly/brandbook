import RechartsShowcase from "../../components/RechartsShowcase";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function ChartsPage() {
  return (
    <DocsShell currentPath="/components/charts" title="Charts" description="Chart examples backed by Metraly Recharts wrappers for engineering intelligence signals." status="hardening" related={getRelatedLinks(["/components/data-display", "/examples/engineering-dashboard", "/patterns/dashboard-layout", "/components/previews"])}>
      <DocsSection id="recharts" title="Recharts previews">
        <LegacyNotice>Raw Recharts usage is contained inside `@metraly/ui/charts` wrappers for preview hardening.</LegacyNotice>
        <ComponentPreview title="Metraly chart wrappers" description="Current chart gallery uses wrapper components with dark panels, accessible summaries and static animation settings." states={["line", "bar", "area", "composed", "loading", "error", "no-data"]}>
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
