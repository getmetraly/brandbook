import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export const dynamic = "force-dynamic";

export default function AccessibilityPage() {
  return (
    <DocsShell
      currentPath="/foundations/accessibility"
      title="Accessibility"
      description="Accessibility guidance for keyboard behavior, focus states and readable contrast."
      status="draft"
      related={getRelatedLinks(["/foundations/colors", "/components/primitives", "/components/forms"])}
    >
      <DocsSection id="guidance" title="Guidance">
        <p>Accessibility rules are part of the current contract. Keep focus-visible, labels, contrast and keyboard behavior at the center of every component page.</p>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Accessibility influences all primitives and dashboard workflows.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Colors", href: "/foundations/colors", description: "Contrast and semantic emphasis." }} />
          <DocsRouteCard item={{ title: "Primitives", href: "/components/primitives", description: "Cards, panels and controls." }} />
          <DocsRouteCard item={{ title: "Forms", href: "/components/forms", description: "Keyboard-friendly input flows." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
