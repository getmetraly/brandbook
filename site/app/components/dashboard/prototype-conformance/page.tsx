"use client";
import {
  DashboardDropZone,
  DashboardEmptyState,
  DashboardToolbar,
  DashboardWidget,
  WidgetPickerCard,
} from "@metraly/ui";

const tabs = [
  { value: "delivery", label: "Delivery", count: 11 },
  { value: "dora", label: "DORA", count: 4 },
  { value: "flow", label: "Flow", count: 6 },
  { value: "ci", label: "CI", disabled: true },
];

function StateGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="claude-state-group" aria-label={title}>
      <header className="claude-state-group-head">
        <strong>{title}</strong>
        <span className="claude-readiness">Phase 2</span>
      </header>
      <div className="claude-state-grid">{children}</div>
    </section>
  );
}

function StateCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="claude-state-cell">
      <span className="claude-state-cell-label">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function MetricPreview({ value, detail }: { value: string; detail: string }) {
  return (
    <div className="claude-widget-metric">
      <strong>{value}</strong>
      <span>{detail}</span>
    </div>
  );
}

export default function DashboardPrototypeConformancePage() {
  return (
    <main className="claude-state-board" aria-label="Phase 2 dashboard prototype conformance examples">
      <header className="claude-preview-section-head">
        <span className="draft-kicker">Prototype conformance · Phase 2</span>
        <h1>Dashboard primitives and board-edit states</h1>
        <p>
          Visual examples for the dashboard/editor primitives that need to match the prototype: widget picker
          states, header grip dots, full resize geometry, drop zones and two-row toolbar structure.
        </p>
      </header>

      <StateGroup title="WidgetPickerCard states">
        <StateCell label="default">
          <WidgetPickerCard title="Cycle time" kind="flow/cycle-time" iconLabel="cycle" tags={["flow", "review"]} />
        </StateCell>
        <StateCell label="selected">
          <WidgetPickerCard title="DORA overview" kind="dora/overview" iconLabel="dora" selected tags={["dora", "exec"]} />
        </StateCell>
        <StateCell label="new">
          <WidgetPickerCard title="AI insight" kind="ai/insight" iconLabel="ai" visualState="new" tags={["ai", "new"]} />
        </StateCell>
        <StateCell label="loading">
          <WidgetPickerCard title="Deployment frequency" kind="dora/deploy-frequency" iconLabel="deploy" loading tags={["dora"]} />
        </StateCell>
        <StateCell label="dragging">
          <WidgetPickerCard title="Blocked work" kind="flow/blocked" iconLabel="block" dragging tags={["flow"]} />
        </StateCell>
        <StateCell label="disabled">
          <WidgetPickerCard title="WIP per engineer" kind="flow/wip" iconLabel="wip" disabled tags={["flow"]} />
        </StateCell>
      </StateGroup>

      <StateGroup title="DashboardWidget / WidgetShell states">
        <StateCell label="default">
          <DashboardWidget title="Deployment frequency" subtitle="Last 14 days" state="live">
            <MetricPreview value="24/day" detail="+18% vs previous window" />
          </DashboardWidget>
        </StateCell>
        <StateCell label="selected + 8 handles">
          <DashboardWidget id="lead-time" title="Lead time" subtitle="PR to production" state="live" selected onDragStart={() => undefined}>
            <MetricPreview value="41h" detail="-6h vs previous window" />
          </DashboardWidget>
        </StateCell>
        <StateCell label="dragging">
          <DashboardWidget id="blocked" title="Blocked work" subtitle="Stalled > 3 days" state="delayed" dragging onDragStart={() => undefined}>
            <MetricPreview value="9" detail="+3 blocked items" />
          </DashboardWidget>
        </StateCell>
        <StateCell label="full-width">
          <DashboardWidget id="overview" title="Engineering overview" subtitle="Full-width board section" state="live" selected fullWidth onDragStart={() => undefined}>
            <MetricPreview value="82%" detail="Flow efficiency" />
          </DashboardWidget>
        </StateCell>
      </StateGroup>

      <StateGroup title="DashboardDropZone states">
        <StateCell label="idle"><DashboardDropZone state="idle" description="Neutral dashed frame, no pulse marker." /></StateCell>
        <StateCell label="hover"><DashboardDropZone state="hover" description="Widget can land here." /></StateCell>
        <StateCell label="active"><DashboardDropZone state="active" description="Dashed cyan border with subtle tint." /></StateCell>
        <StateCell label="rejected"><DashboardDropZone state="rejected" description="Invalid placement without pulse noise." /></StateCell>
        <StateCell label="empty"><DashboardDropZone state="empty" description="First widget placement state." /></StateCell>
      </StateGroup>

      <StateGroup title="DashboardToolbar two-row layout">
        <StateCell label="edit mode on">
          <DashboardToolbar
            title="Delivery board"
            description="DORA, flow and review signals."
            tabs={tabs}
            activeTab="delivery"
            searchValue=""
            syncState="live"
            editMode
            onToggleEdit={() => undefined}
            onAddWidget={() => undefined}
          />
        </StateCell>
        <StateCell label="edit mode off + stale sync">
          <DashboardToolbar
            title="Delivery board"
            description="DORA, flow and review signals."
            tabs={tabs}
            activeTab="flow"
            searchValue="blocked"
            syncState="stale"
            syncLabel="Stale 4m"
            editMode={false}
            onToggleEdit={() => undefined}
            onAddWidget={() => undefined}
          />
        </StateCell>
      </StateGroup>

      <StateGroup title="Board-edit composition states">
        <StateCell label="empty dashboard">
          <DashboardEmptyState title="No widgets yet" description="Add the first delivery widget to start composing this board." action={<button type="button" className="btn btn-primary">Add delivery widget</button>} />
        </StateCell>
        <StateCell label="drop target + selected widget">
          <div className="claude-board-edit-composition">
            <DashboardWidget id="review" title="PR review latency" subtitle="By team" state="live" selected onDragStart={() => undefined}>
              <MetricPreview value="5.4h" detail="median first response" />
            </DashboardWidget>
            <DashboardDropZone state="active" />
          </div>
        </StateCell>
      </StateGroup>
    </main>
  );
}
