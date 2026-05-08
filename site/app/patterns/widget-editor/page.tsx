import TelemetryDrawer from "../../components/previews/TelemetryDrawer";
import TelemetryDragOverlay from "../../components/previews/TelemetryDragOverlay";
import TelemetryGridItem from "../../components/previews/TelemetryGridItem";
import TelemetryWidgetShell from "../../components/previews/TelemetryWidgetShell";
import DocsShell from "../../components/docs/DocsShell";
import { CodeBlock, ComponentPreview, ComponentStateGrid, DocsCardGrid, DocsRouteCard, DocsSection, LegacyNotice } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

export default function WidgetEditorPatternPage() {
  return (
    <DocsShell currentPath="/patterns/widget-editor" title="Widget Editor" description="Canonical lifecycle for create, arrange, resize, save and reload flows." status="ready" related={getRelatedLinks(["/editor", "/components/dashboard", "/components/feedback", "/examples/engineering-dashboard"])}>
      <DocsSection id="lifecycle" title="Required lifecycle">
        <CodeBlock code={`1. Open /editor\n2. Add widget\n3. Drag widget\n4. Resize widget\n5. Save\n6. Reload page\n7. Widget remains in the same position\n8. Widget content renders after reload`} />
        <LegacyNotice>The editor is intentionally Client-only. Avoid moving localStorage, react-grid-layout or event-heavy widgets into Server Components.</LegacyNotice>
      </DocsSection>
      <DocsSection id="board-edit" title="Board edit mode" description="The editor should show the selected widget, dragging state, drop target and resize affordances in one flow.">
        <ComponentPreview title="WidgetShell / GridItem / Drawer / DragOverlay" description="Board edit state surfaces used by the editor and dashboard workflows." states={["selected", "dragging", "drop target", "resizable"]}>
          <ComponentStateGrid>
            <TelemetryWidgetShell />
            <TelemetryGridItem />
            <TelemetryDrawer />
            <TelemetryDragOverlay />
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="related" title="Where this fits" description="This pattern connects editor actions with component previews and board surfaces.">
        <DocsCardGrid>
          <DocsRouteCard item={{ title: "Editor", href: "/editor", description: "The live client flow." }} />
          <DocsRouteCard item={{ title: "Dashboard", href: "/components/dashboard", description: "Widget shells and picker surfaces." }} />
          <DocsRouteCard item={{ title: "Feedback", href: "/components/feedback", description: "Drawers, menus and overlays." }} />
        </DocsCardGrid>
      </DocsSection>
    </DocsShell>
  );
}
