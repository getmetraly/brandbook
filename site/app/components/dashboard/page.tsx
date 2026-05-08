import {
  DashboardEmptyState,
  DashboardGrid,
  DashboardToolbar,
  DashboardWidget,
  WidgetPickerCard,
  type DashboardWidgetInstance,
} from "@metraly/ui";
import TelemetryEmptyState from "../../components/previews/TelemetryEmptyState";
import TelemetryGridItem from "../../components/previews/TelemetryGridItem";
import TelemetryWidgetShell from "../../components/previews/TelemetryWidgetShell";
import WidgetPickerCardPreview from "../../components/previews/WidgetPickerCard";
import DocsShell from "../../components/docs/DocsShell";
import { ComponentPreview, ComponentStateGrid, DocsSection } from "../../components/docs/DocsBlocks";
import { getRelatedLinks } from "../../lib/docs/navigation";

const widgets: DashboardWidgetInstance[] = [
  { id: "flow", type: "stat-card", title: "Flow efficiency", description: "Delivery flow this sprint", state: "live", position: { x: 0, y: 0, w: 4, h: 2 } },
  { id: "review", type: "metric-chart", title: "Review latency", description: "Median review age", state: "delayed", position: { x: 4, y: 0, w: 4, h: 2 } },
];

export default function DashboardComponentsPage() {
  return (
    <DocsShell currentPath="/components/dashboard" title="Dashboard" description="Dashboard-specific components for board layout, widget selection and editor surfaces." status="ready" related={getRelatedLinks(["/patterns/widget-editor", "/editor", "/examples/engineering-dashboard"])} toc={[{ title: "Widget shell", href: "#widgets" }, { title: "Grid", href: "#grid" }, { title: "Picker", href: "#picker" }]}> 
      <DocsSection id="widgets" title="Widget surfaces">
        <ComponentPreview title="DashboardToolbar / DashboardWidget" description="Toolbar and widget wrapper for dashboard editor pages." states={["selected", "resizable", "live", "delayed"]} code={'import { DashboardWidget } from "@metraly/ui";'}>
          <div className="docs-dashboard-preview">
            <DashboardToolbar title="Engineering board" description="Last updated 2m ago" meta="2 widgets · saved" actions={<span className="brand-badge brand-badge-primary">Editor</span>} />
            <ComponentStateGrid>
              <DashboardWidget id="flow" title="Flow efficiency" subtitle="Current sprint" state="live" selected><strong className="metric-value">81%</strong></DashboardWidget>
              <DashboardWidget id="deploy" title="Deployment health" subtitle="7 days" state="delayed"><strong className="metric-value">99.2%</strong></DashboardWidget>
            </ComponentStateGrid>
          </div>
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="grid" title="Grid and empty state">
        <ComponentPreview title="DashboardGrid" description="Display grid for dashboard previews. The editor uses a Client wrapper with react-grid-layout for drag and resize." states={["display", "empty", "layout"]}>
          <div className="component-preview-stage is-wide">
            <DashboardGrid widgets={widgets} renderWidget={(widget) => <DashboardWidget id={widget.id} title={widget.title} subtitle={widget.description} state={widget.state}>{widget.type === "stat-card" ? "81%" : "4h"}</DashboardWidget>} />
          </div>
        </ComponentPreview>
        <ComponentPreview title="DashboardEmptyState" description="First-run surface for new boards." states={["no widgets", "call to action"]}>
          <DashboardEmptyState action={<span className="btn btn-primary">Add widget</span>} />
        </ComponentPreview>
        <ComponentPreview title="TelemetryEmptyState" description="Legacy empty state preview used while the canonical board empty state is hardened." states={["empty", "call to action"]}>
          <TelemetryEmptyState />
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="picker" title="Widget picker">
        <ComponentPreview title="WidgetPickerCard" description="Selectable card for widget catalog and dashboard editor flows." states={["default", "selected", "disabled"]}>
          <ComponentStateGrid>
            <WidgetPickerCard title="Flow efficiency" description="Track delivery throughput and flow." selected />
            <WidgetPickerCard title="Review latency" description="Track PR waiting time." state="delayed" tags={["github", "review"]} />
          </ComponentStateGrid>
        </ComponentPreview>
        <ComponentPreview title="WidgetPickerCard / preview" description="Preview wrapper aligned with the canonical picker contract while the editor migrates." states={["selected", "delayed", "no-data"]}>
          <ComponentStateGrid>
            <WidgetPickerCardPreview />
            <WidgetPickerCardPreview title="Review latency" description="Track PR waiting time." state="delayed" tags={["github", "review"]} selected={false} />
          </ComponentStateGrid>
        </ComponentPreview>
      </DocsSection>
      <DocsSection id="shells" title="Widget shells" description="Reusable widget shells should stay readable inside cards and grid layouts.">
        <ComponentPreview title="TelemetryWidgetShell" description="Widget shell used for dashboard content, metrics and empty states." states={["live", "resizable", "selected"]}>
          <TelemetryWidgetShell />
        </ComponentPreview>
        <ComponentPreview title="TelemetryGridItem" description="Grid-item wrapper showing resize affordances and board-friendly spacing." states={["live", "resizable", "board"]}>
          <TelemetryGridItem />
        </ComponentPreview>
      </DocsSection>
    </DocsShell>
  );
}
