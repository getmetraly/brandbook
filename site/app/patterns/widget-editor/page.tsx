import TelemetryDrawer from "../../components/previews/TelemetryDrawer";
import TelemetryDragOverlay from "../../components/previews/TelemetryDragOverlay";
import TelemetryGridItem from "../../components/previews/TelemetryGridItem";
import TelemetryDashboardWidget from "../../components/previews/TelemetryDashboardWidget";
import { EngineeringDashboardEditorPreview } from "../../components/previews/ClaudeDesignStateBoard";
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
        <ComponentPreview title="Engineering Dashboard Editor" description="Static board-edit matrix using Metraly primitives and the Claude Design reference as a visual check." states={["edit mode", "selected", "dragging", "drop target", "resize", "empty", "disconnected"]}>
          <div className="component-preview-stage is-wide">
            <EngineeringDashboardEditorPreview />
          </div>
        </ComponentPreview>
        <ComponentPreview title="Board edit state surfaces" description="Selected, dragging, drop-target and resize surfaces used by the editor and dashboard workflows." states={["selected", "dragging", "drop target", "resizable"]}>
          <ComponentStateGrid>
            <TelemetryDashboardWidget />
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
