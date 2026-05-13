import type { Meta, StoryObj } from "@storybook/react";
import type { ReactNode } from "react";
import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  MetralyCard,
  MetralyCheckbox,
  MetralyMetricCard,
  MetralyRadio,
  MetralySelect,
  MetralySwitch,
  MetralyTable,
  MetralyTabs,
  StateBadge,
  WidgetPickerCard,
} from "@metraly/ui";

function BoardSection({ title, children }: { title: string; children: ReactNode }) {
  return (
    <section style={{ display: "grid", gap: 12 }}>
      <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)", textTransform: "uppercase", letterSpacing: "0.04em" }}>{title}</div>
      {children}
    </section>
  );
}

function StateBoardShowcase() {
  return (
    <div style={{ display: "grid", gap: 20, padding: 16, background: "var(--m-bg-0)", color: "var(--m-fg-1)" }}>
      <BoardSection title="State badge">
        <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
          <StateBadge state="live" />
          <StateBadge state="stale" />
          <StateBadge state="delayed" />
          <StateBadge state="disconnected" />
          <StateBadge state="noData" />
          <StateBadge state="new" />
          <StateBadge state="warning" />
          <StateBadge state="success" />
          <StateBadge state="info" />
        </div>
      </BoardSection>

      <BoardSection title="Forms">
        <div style={{ display: "grid", gap: 14, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <MetralyCheckbox checked label="Telemetry enabled" description="Use live repository signals." />
          <MetralyCheckbox disabled label="Disabled option" description="Locked by policy." />
          <MetralyRadio checked name="range" label="Current sprint" />
          <MetralyRadio disabled name="range" label="Last 30 days" />
          <MetralySwitch checked label="Auto-refresh" description="Refresh every 60 seconds." />
          <MetralySwitch disabled label="Frozen" description="Disabled toggle state." />
          <MetralySelect
            label="Metric source"
            defaultValue="github"
            options={[
              { value: "github", label: "GitHub" },
              { value: "ci", label: "CI/CD" },
              { value: "incidents", label: "Incidents" },
            ]}
          />
          <MetralyTabs
            ariaLabel="Dashboard sections"
            defaultValue="boards"
            items={[
              { value: "overview", label: "Overview" },
              { value: "boards", label: "Boards" },
              { value: "signals", label: "Signals", disabled: true },
              { value: "incidents", label: "Incidents" },
            ]}
          />
        </div>
      </BoardSection>

      <BoardSection title="Widget picker">
        <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <WidgetPickerCard title="Metric card" kind="metric/scalar" description="Single KPI with delta and sparkline." iconLabel="metric" selected />
          <WidgetPickerCard title="Time-series chart" kind="chart/line" description="Multi-series line, p50/p99 overlay." iconLabel="chart" />
          <WidgetPickerCard title="Flaky builds · 7d" kind="ci/flaky" description="Tests retried-then-passed." iconLabel="lightning" state="new" />
          <WidgetPickerCard title="WIP per engineer" kind="flow/wip" description="Source not connected." iconLabel="user" disabled />
        </div>
      </BoardSection>

      <BoardSection title="Dashboard controls">
        <DashboardToolbar
          tabs={[
            { value: "delivery", label: "Delivery", count: 11 },
            { value: "dora", label: "DORA", count: 4 },
            { value: "flow", label: "Flow", count: 6 },
          ]}
          activeTab="delivery"
          searchValue=""
          syncState="live"
          syncLabel="Live · 30s"
          editMode
          onToggleEdit={() => undefined}
          onAddWidget={() => undefined}
          addWidgetLabel="Add widget"
          actions={<button className="metraly-dashboard-toolbar-button is-primary" type="button">Save</button>}
        />
      </BoardSection>

      <BoardSection title="Widgets and editor affordances">
        <div style={{ display: "grid", gap: 12, gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
          <DashboardWidget id="flow" title="Flow efficiency" subtitle="Current sprint" state="live" selected>
            <MetralyMetricCard title="Flow efficiency" value="81%" variant="primary" footer="+8% vs last sprint" />
          </DashboardWidget>
          <DashboardWidget id="review" title="Review latency" subtitle="Median response" state="stale" dragging>
            <MetralyMetricCard title="Review latency" value="4h" variant="warning" footer="stale 4m ago" />
          </DashboardWidget>
          <DashboardWidget id="errors" title="Incident feed" subtitle="Disconnected" state="disconnected">
            <MetralyCard title="Disconnected source" state="error" emptyLabel="No data">
              Board source is offline.
            </MetralyCard>
          </DashboardWidget>
          <div style={{ display: "grid", gap: 10 }}>
            <DashboardDropZone state="idle" description="Default drop zones stay pulse-free." />
            <DashboardDropZone state="active" description="Release to add a widget." />
            <DashboardDropZone state="rejected" label="Cannot drop here" description="Invalid placement." />
            <div style={{ display: "grid", gap: 10, padding: 12, border: "1px solid var(--m-line)", borderRadius: "var(--m-r-3)", background: "var(--m-bg-1)" }}>
              <DashboardResizeHandle direction="east" label="Resize width" active />
              <DashboardResizeHandle direction="southeast" label="Resize corner" active />
            </div>
          </div>
        </div>
      </BoardSection>

      <BoardSection title="Tables">
        <MetralyTable
          dense
          stickyHeader
          columns={[
            { key: "team", header: "Team" },
            { key: "open", header: "Open PRs", align: "right" },
            { key: "response", header: "1st response", align: "right" },
            { key: "health", header: "Health" },
          ]}
          data={[
            { team: "Platform", open: "8", response: "2.4h", health: <StateBadge state="live" label="Live" /> },
            { team: "Growth", open: "14", response: "9.1h", health: <StateBadge state="stale" label="Stale" /> },
            { team: "Billing", open: "6", response: "4.2h", health: <StateBadge state="live" label="Live" /> },
          ]}
          rowKey={(row) => row.team}
        />
      </BoardSection>
    </div>
  );
}

const meta: Meta<typeof StateBoardShowcase> = {
  title: "Scenarios/Component State Board",
  component: StateBoardShowcase,
};

export default meta;
type Story = StoryObj<typeof StateBoardShowcase>;

export const Default: Story = {};
