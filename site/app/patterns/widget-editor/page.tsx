import {
} from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { CodeBlock, ComponentPreview, DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";
import "../../components/dashboard/dashboard.css";
import WidgetEditorPreview from "./WidgetEditorPreview";

export const dynamic = "force-dynamic";

export default function WidgetEditorPatternPage() {
  return (
    <DocsShell
      currentPath="/patterns/widget-editor"
      title="Widget Editor"
      description="Canonical lifecycle for create, arrange, resize, save and reload flows."
      status="ready"
      related={getRelatedLinks(["/editor", "/components/dashboard", "/examples/engineering-dashboard"])}
    >
      <DocsSection id="lifecycle" title="Required lifecycle">
        <CodeBlock
          code={`1. Open /editor
2. Add widget
3. Drag widget
4. Resize widget
5. Save
6. Reload page
7. Widget remains in the same position
8. Widget content renders after reload`}
        />
        <p>The editor stays client-side for drag, resize and persistence. The surrounding route can still render server-side.</p>
      </DocsSection>

      <DocsSection id="board-edit" title="Board edit mode" description="The editor should show the selected widget, dragging state, drop target and resize affordances in one flow.">
        <ComponentPreview title="Engineering Dashboard Editor" description="Canonical board-edit matrix using Metraly primitives." states={["edit mode", "selected", "dragging", "drop target", "resize", "empty", "disconnected"]}>
          <WidgetEditorPreview />
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="related" title="Where this fits" description="This pattern connects editor actions with component and board surfaces.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Editor", href: "/editor", description: "The live client flow." }} />
          <DocsRouteCard item={{ title: "Dashboard", href: "/components/dashboard", description: "Widget shells and picker surfaces." }} />
          <DocsRouteCard item={{ title: "Data Display", href: "/components/data-display", description: "Tables, badges and metrics." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
