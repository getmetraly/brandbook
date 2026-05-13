import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  WidgetPickerCard,
} from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { CodeBlock, ComponentPreview, DocsCardGrid, DocsRouteCard, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

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
          <div className="component-preview-stage is-wide">
            <div className="docs-dashboard-preview" style={{ width: "100%" }}>
              <DashboardToolbar
                title="Engineering board"
                description="Last updated 2m ago"
                meta="2 widgets · saved"
                tabs={[{ value: "delivery", label: "Delivery" }, { value: "dora", label: "DORA" }, { value: "flow", label: "Flow" }]}
                activeTab="delivery"
                searchValue=""
                syncState="live"
                editMode
              />
              <div className="docs-dashboard-preview-grid">
                <WidgetPickerCard title="Flow efficiency" description="Track delivery throughput and flow." selected />
                <WidgetPickerCard title="Review latency" description="Track PR waiting time." state="delayed" />
                <DashboardWidget id="flow" title="Flow efficiency" subtitle="Current sprint" state="live" selected>
                  <strong className="metric-value">81%</strong>
                </DashboardWidget>
                <DashboardWidget id="review" title="Review latency" subtitle="Median response" state="delayed">
                  <strong className="metric-value">4h</strong>
                </DashboardWidget>
                <DashboardDropZone state="idle" description="Default drop zones stay pulse-free." />
                <DashboardDropZone state="active" description="Release to add a widget." />
                <div className="panel" style={{ padding: 12, display: "grid", gap: 12 }}>
                  <DashboardResizeHandle direction="east" label="Resize width" active />
                  <DashboardResizeHandle direction="southeast" label="Resize corner" active />
                </div>
              </div>
            </div>
          </div>
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
