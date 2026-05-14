import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function MotionPage() {
  return (
    <DocsShell
      currentPath="/foundations/motion"
      title="Motion"
      description="Motion guidance for calm transitions, focus feedback and dashboard state changes."
      status="draft"
      related={getRelatedLinks(["/foundations/colors", "/components/primitives", "/patterns/dashboard-layout"])}
    >
      <DocsSection id="guidance" title="Guidance">
        <p>Motion rules are taken from the prototype source. Keep transitions subtle, task-oriented and neutral under pointer and keyboard interaction.</p>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Motion affects chips, controls, overlays and board interactions.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Colors", href: "/foundations/colors", description: "Focus glow and semantic signal." }} />
          <DocsRouteCard item={{ title: "Primitives", href: "/components/primitives", description: "Cards and control interactions." }} />
          <DocsRouteCard item={{ title: "Dashboard Layout", href: "/patterns/dashboard-layout", description: "Board-level transitions." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
