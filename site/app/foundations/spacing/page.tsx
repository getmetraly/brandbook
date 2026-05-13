import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function SpacingPage() {
  return (
    <DocsShell
      currentPath="/foundations/spacing"
      title="Spacing"
      description="Spacing rules for dense dashboard surfaces, component padding and board rhythm."
      status="draft"
      related={getRelatedLinks(["/foundations/colors", "/components/primitives", "/components/dashboard"])}
    >
      <DocsSection id="guidance" title="Guidance">
        <p>The spacing scale is extracted from the prototype source of truth and should stay dense, calm and stable across dashboard surfaces.</p>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Spacing decisions feed surface, card and dashboard layout pages.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Colors", href: "/foundations/colors", description: "Shared canvas and surface palette." }} />
          <DocsRouteCard item={{ title: "Primitives", href: "/components/primitives", description: "Cards, panels and metric surfaces." }} />
          <DocsRouteCard item={{ title: "Dashboard", href: "/components/dashboard", description: "Grid density and widget spacing." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
