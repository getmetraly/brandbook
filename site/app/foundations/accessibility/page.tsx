import DocsShell from "../../components/docs/DocsShell";
import { DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function AccessibilityPage() {
  return (
    <DocsShell currentPath="/foundations/accessibility" title="Accessibility" description="Accessibility guidance for keyboard behavior, focus states and readable contrast." status="draft" related={getRelatedLinks(["/foundations/colors", "/components/primitives", "/components/forms"])}>
      <DocsSection id="guidance" title="Guidance">
        <LegacyNotice>Accessibility rules still need full extraction. Keep focus-visible, labels and contrast at the center of the component contract.</LegacyNotice>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="Accessibility spans every interaction surface in the portal.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Colors", href: "/foundations/colors", description: "Contrast and semantic state color usage." }} />
          <DocsRouteCard item={{ title: "Primitives", href: "/components/primitives", description: "Card, badge and logo interaction states." }} />
          <DocsRouteCard item={{ title: "Forms", href: "/components/forms", description: "Inputs, toggles and selection controls." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
