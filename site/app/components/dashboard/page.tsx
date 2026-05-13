import {
  DashboardEmptyState,
  DashboardGrid,
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardWidget,
  WidgetPickerCard,
  type DashboardWidgetInstance,
} from "@metraly/ui";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, ComponentStateGrid, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";
import "./dashboard.css";
import DashboardToolbarPreview from "./DashboardToolbarPreview";

export const dynamic = "force-dynamic";

const widgets: DashboardWidgetInstance[] = [
  { id: "flow", type: "stat-card", title: "Flow efficiency", description: "Delivery flow this sprint", state: "live", position: { x: 0, y: 0, w: 4, h: 2 } },
  { id: "review", type: "metric-chart", title: "Review latency", description: "Median review age", state: "delayed", position: { x: 4, y: 0, w: 4, h: 2 } },
];

export default function DashboardComponentsPage() {
  return (
    <DocsShell
      currentPath="/components/dashboard"
      title="Dashboard"
      description="Dashboard-specific components for board layout, widget selection and editor surfaces."
      status="ready"
      related={getRelatedLinks(["/patterns/widget-editor", "/editor", "/examples/engineering-dashboard", "/patterns/dashboard-layout"])}
      toc={[{ title: "Widget surfaces", href: "#widgets" }, { title: "Grid", href: "#grid" }, { title: "Picker", href: "#picker" }, { title: "Frames", href: "#frames" }]}
    >
      <DocsSection id="widgets" title="Widget surfaces">
        <ComponentPreview title="DashboardToolbar / DashboardWidget" description="Toolbar and widget chrome for canonical dashboard pages and editor flows." states={["selected", "resizable", "live", "delayed"]} code={'import { DashboardWidget } from "@metraly/ui";'}>
          <div className="docs-dashboard-preview">
            <DashboardToolbarPreview />
            <ComponentStateGrid>
              <DashboardWidget id="flow" title="Flow efficiency" subtitle="Current sprint" state="live" selected>
                <strong className="metric-value">81%</strong>
              </DashboardWidget>
              <DashboardWidget id="deploy" title="Deployment health" subtitle="7 days" state="delayed">
                <strong className="metric-value">99.2%</strong>
              </DashboardWidget>
            </ComponentStateGrid>
          </div>
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="grid" title="Grid and empty state">
        <ComponentPreview title="DashboardGrid" description="Display-first grid for canonical dashboard pages. The editor keeps the same layout shape while drag and resize stay in the client adapter." states={["display", "empty", "layout"]}>
          <div className="component-preview-stage is-wide">
            <DashboardGrid widgets={widgets} renderWidget={(widget) => <DashboardWidget id={widget.id} title={widget.title} subtitle={widget.description} state={widget.state}>{widget.type === "stat-card" ? "81%" : "4h"}</DashboardWidget>} />
          </div>
        </ComponentPreview>
        <ComponentPreview title="DashboardEmptyState" description="First-run surface for new boards." states={["no widgets", "call to action"]}>
          <DashboardEmptyState action={<span className="docs-status docs-status-ready">Add widget</span>} />
        </ComponentPreview>
        <ComponentPreview title="DashboardDropZone / DashboardResizeHandle" description="Board edit affordances: dashed cyan drop targets and resize handles outside content rhythm." states={["idle", "drop-target", "rejected", "horizontal resize", "vertical resize"]}>
          <ComponentStateGrid>
            <DashboardDropZone state="idle" description="Default drop zones stay pulse-free." />
            <DashboardDropZone state="active" description="Release to add a delivery widget." />
            <DashboardDropZone state="rejected" label="Cannot drop here" description="Invalid placement." />
            <div className="panel" style={{ padding: 12, display: "grid", gap: 12 }}>
              <DashboardResizeHandle direction="east" label="Resize width" />
              <DashboardResizeHandle direction="south" label="Resize height" active />
              <DashboardResizeHandle direction="southeast" label="Resize corner" active />
            </div>
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="picker" title="Widget picker">
        <ComponentPreview title="WidgetPickerCard" description="Selectable card for widget catalog and dashboard editor flows." states={["default", "selected", "disabled"]}>
          <ComponentStateGrid>
            <WidgetPickerCard title="Flow efficiency" description="Track delivery throughput and flow." selected />
            <WidgetPickerCard title="Review latency" description="Track PR waiting time." state="delayed" />
            <WidgetPickerCard title="WIP per engineer" description="Source is not connected yet." disabled />
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>

      <DocsSection id="frames" title="Widget frames" description="Reusable widget frames should stay readable inside cards and grid layouts.">
        <ComponentPreview title="DashboardWidget" description="Canonical widget frame for dashboard content, metrics and empty states." states={["live", "resizable", "selected"]}>
          <DashboardWidget id="frame-flow" title="Flow efficiency" subtitle="Current sprint" state="live" selected>
            <strong className="metric-value">81%</strong>
            <p className="metric-delta">+8% vs last sprint</p>
          </DashboardWidget>
        </ComponentPreview>
        <ComponentPreview title="DashboardGrid" description="Display-first grid wrapper showing widget composition and layout snapshots." states={["layout", "empty", "display"]}>
          <DashboardGrid
            widgets={widgets}
            renderWidget={(widget) => (
              <DashboardWidget id={`frame-${widget.id}`} title={widget.title} subtitle={widget.description} state={widget.state}>
                {widget.type === "stat-card" ? <strong className="metric-value">81%</strong> : <strong className="metric-value">4h</strong>}
              </DashboardWidget>
            )}
          />
        </ComponentPreview>
      </DocsSection>
    </DocsShell>
  );
}
