"use client";

import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  WidgetPickerCard,
} from "@metraly/ui";

export default function WidgetEditorPreview() {
  return (
    <div className="component-preview-stage is-wide">
      <div className="docs-dashboard-preview" style={{ width: "100%" }}>
        <DashboardToolbar
          tabs={[{ value: "delivery", label: "Delivery" }, { value: "dora", label: "DORA" }, { value: "flow", label: "Flow" }]}
          activeTab="delivery"
          searchValue=""
          syncState="live"
          editMode
          onToggleEdit={() => undefined}
          onAddWidget={() => undefined}
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
  );
}
