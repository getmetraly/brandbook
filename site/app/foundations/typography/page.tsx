import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function TypographyPage() {
  return (
    <DocsShell currentPath="/foundations/typography" title="Typography" description="Typography rules for titles, labels, dense tables and dashboard copy." status="draft" related={getRelatedLinks(["/foundations/colors", "/components/primitives", "/components/data-display"])}>
      <DocsSection id="guidance" title="Guidance">
        <LegacyNotice>Typography rules are ready for expansion. Use the existing portal structure to align heading scale and dense UI text.</LegacyNotice>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Typography informs cards, tables and small-surface UI copy.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Colors", href: "/foundations/colors", description: "Primary text and semantic emphasis." }} />
          <DocsRouteCard item={{ title: "Primitives", href: "/components/primitives", description: "Card headings and metric values." }} />
          <DocsRouteCard item={{ title: "Data Display", href: "/components/data-display", description: "Table and badge copy." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
