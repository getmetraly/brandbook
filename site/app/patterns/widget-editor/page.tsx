import DocsShell from "../../components/docs/DocsShell";
import { CodeBlock, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function WidgetEditorPatternPage() {
  return (
    <DocsShell currentPath="/patterns/widget-editor" title="Widget Editor" description="Canonical lifecycle for create, arrange, resize, save and reload flows." status="ready" related={getRelatedLinks(["/editor", "/components/dashboard", "/examples/engineering-dashboard"])}>
      <DocsSection id="lifecycle" title="Required lifecycle">
        <CodeBlock code={`1. Open /editor\n2. Add widget\n3. Drag widget\n4. Resize widget\n5. Save\n6. Reload page\n7. Widget remains in the same position\n8. Widget content renders after reload`} />
        <LegacyNotice>The editor is intentionally Client-only. Avoid moving localStorage, react-grid-layout or event-heavy widgets into Server Components.</LegacyNotice>
      </DocsSection>
    </DocsShell>
  );
}
