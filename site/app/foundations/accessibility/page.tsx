import DocsShell from "../../components/docs/DocsShell";
import { DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function AccessibilityPage() {
  return (
    <DocsShell currentPath="/foundations/accessibility" title="Accessibility" description="Foundation guidance page prepared for the next content hardening pass." status="draft" related={getRelatedLinks(["/foundations/colors", "/components/primitives"])}>
      <DocsSection id="guidance" title="Guidance">
        <LegacyNotice>This page is intentionally small for now. The structure is ready, and detailed rules should be filled from the brandbook documents during the next cleanup pass.</LegacyNotice>
      </DocsSection>
    </DocsShell>
  );
}
