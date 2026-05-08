import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function MotionPage() {
  return (
    <DocsShell currentPath="/foundations/motion" title="Motion" description="Motion guidance for calm transitions, focus feedback and dashboard state changes." status="draft" related={getRelatedLinks(["/foundations/colors", "/components/primitives", "/patterns/dashboard-layout"])}>
      <DocsSection id="guidance" title="Guidance">
        <LegacyNotice>Motion rules are still being extracted from the brandbook source. Keep transitions subtle and task-oriented.</LegacyNotice>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Motion rules influence component feedback and board-level state changes.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Colors", href: "/foundations/colors", description: "Semantic tones that support motion state." }} />
          <DocsRouteCard item={{ title: "Primitives", href: "/components/primitives", description: "Cards and badges that animate carefully." }} />
          <DocsRouteCard item={{ title: "Dashboard Layout", href: "/patterns/dashboard-layout", description: "Page transitions and widget interactions." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
