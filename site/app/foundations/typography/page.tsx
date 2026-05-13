import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function TypographyPage() {
  return (
    <DocsShell
      currentPath="/foundations/typography"
      title="Typography"
      description="Typography rules for titles, labels, dense tables and dashboard copy."
      status="draft"
      related={getRelatedLinks(["/foundations/colors", "/components/primitives", "/components/data-display"])}
    >
      <DocsSection id="guidance" title="Guidance">
        <p>Typography rules come from the prototype source. Use the existing portal structure to align heading scale, labels and dense UI text.</p>
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
