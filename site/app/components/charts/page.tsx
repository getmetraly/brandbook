import RechartsShowcase from "../../components/RechartsShowcase";
import DocsShell from "../../components/docs/DocsShell";
import { DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function ChartsPage() {
  return (
    <DocsShell currentPath="/components/charts" title="Charts" description="Chart examples backed by Recharts. This page should later become @metraly/ui chart wrappers instead of raw chart usage." status="draft" related={getRelatedLinks(["/components/data-display", "/examples/engineering-dashboard"])}>
      <DocsSection id="recharts" title="Recharts previews">
        <LegacyNotice>Charts are still a draft layer. Keep raw Recharts usage contained while wrappers are designed.</LegacyNotice>
        <RechartsShowcase />
      </DocsSection>
    </DocsShell>
  );
}
