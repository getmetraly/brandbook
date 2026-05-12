"use client";

import type { ReactNode } from "react";
import {
  DashboardDropZone,
  DashboardEmptyState,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  MetralyCheckbox,
  MetralyLogo,
  MetralyRadio,
  MetralySelect,
  MetralySwitch,
  MetralyTable,
  MetralyTabs,
  StateBadge,
  WidgetPickerCard,
  type MetralyTableColumn,
} from "@metraly/ui";
import {
  MetralyAreaChart,
  MetralyChartCard,
  MetralyComposedChart,
  MetralySparkline,
} from "@metraly/ui/charts";

const sourceOptions = [
  { value: "github", label: "GitHub pull requests" },
  { value: "ci", label: "CI pipelines" },
  { value: "deployments", label: "Deployments" },
  { value: "blocked", label: "Blocked work", disabled: true },
];

const tabs = [
  { value: "delivery", label: "Delivery" },
  { value: "dora", label: "DORA" },
  { value: "flow", label: "Flow" },
  { value: "ci", label: "CI", disabled: true },
];

const tabCounts = [
  { value: "delivery", label: "Delivery", count: 11 },
  { value: "dora", label: "DORA", count: 4 },
  { value: "flow", label: "Flow", count: 6 },
  { value: "reviews", label: "Reviews", count: 5 },
  { value: "ci", label: "CI", count: 3 },
];

const chartData = [
  { name: "Mon", review: 8.4, deploys: 14, flow: 72, failure: 4.6 },
  { name: "Tue", review: 7.8, deploys: 17, flow: 74, failure: 4.1 },
  { name: "Wed", review: 6.2, deploys: 21, flow: 77, failure: 3.9 },
  { name: "Thu", review: 5.8, deploys: 20, flow: 80, failure: 4.2 },
  { name: "Fri", review: 5.4, deploys: 24, flow: 82, failure: 3.6 },
];

type ReviewRow = {
  team: string;
  open: string;
  response: string;
  status: ReactNode;
};

const reviewColumns: MetralyTableColumn<ReviewRow>[] = [
  { key: "team", header: "Team" },
  { key: "open", header: "Open PRs", align: "right" },
  { key: "response", header: "First response", align: "right" },
  { key: "status", header: "Status", align: "right" },
];

const reviewRows: ReviewRow[] = [
  { team: "Platform", open: "8", response: "2.4h", status: <StateBadge state="live" label="Live" /> },
  { team: "Growth", open: "14", response: "9.1h", status: <StateBadge state="delayed" label="Delayed" /> },
  { team: "Data", open: "12", response: "14.6h", status: <StateBadge state="stale" label="Stale" /> },
];

function Readiness({ children }: { children: ReactNode }) {
  return <span className="claude-readiness">{children}</span>;
}

function StateCell({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="claude-state-cell">
      <span className="claude-state-cell-label">{label}</span>
      <div>{children}</div>
    </div>
  );
}

function BoardGroup({
  title,
  readiness,
  children,
}: {
  title: string;
  readiness: "Ready" | "Visual-ready" | "Hardening" | "Preview-only";
  children: ReactNode;
}) {
  return (
    <section className="claude-state-group" aria-label={title}>
      <header className="claude-state-group-head">
        <strong>{title}</strong>
        <Readiness>{readiness}</Readiness>
      </header>
      <div className="claude-state-grid">{children}</div>
    </section>
  );
}

function LoadingBars() {
  return (
    <div className="claude-loading-bars" aria-label="Loading state">
      <span />
      <span />
      <span />
    </div>
  );
}

function MetricBody({ value, delta, values }: { value: string; delta: string; values: number[] }) {
  return (
    <div className="claude-widget-metric">
      <strong>{value}</strong>
      <span>{delta}</span>
      <MetralySparkline values={values} ariaLabel={`${value} sparkline`} />
    </div>
  );
}

export function ComponentStateBoard() {
  return (
    <section className="claude-state-board" aria-label="Claude Design component state board">
      <header className="claude-preview-section-head">
        <span className="draft-kicker">Component state board</span>
        <h2>Production primitives, reference states</h2>
        <p>
          The visual reference is translated into current Metraly primitives. Generic infrastructure signals
          were replaced with Engineering Intelligence states.
        </p>
      </header>

      <BoardGroup title="MetralyCheckbox" readiness="Ready">
        <StateCell label="default"><MetralyCheckbox label="Include review queue" /></StateCell>
        <StateCell label="hover"><MetralyCheckbox className="is-preview-hover" label="Watch blocked work" /></StateCell>
        <StateCell label="focus-visible"><MetralyCheckbox className="is-preview-focus" label="Keyboard focus" /></StateCell>
        <StateCell label="checked"><MetralyCheckbox label="Flow efficiency" checked /></StateCell>
        <StateCell label="checked focus"><MetralyCheckbox className="is-preview-focus" label="Focused selected" checked /></StateCell>
        <StateCell label="checked disabled"><MetralyCheckbox label="Locked policy" checked disabled /></StateCell>
        <StateCell label="unchecked disabled"><MetralyCheckbox label="Unavailable signal" disabled /></StateCell>
        <StateCell label="error"><MetralyCheckbox label="Source disconnected" error /></StateCell>
        <StateCell label="error checked"><MetralyCheckbox label="Broken required signal" checked error /></StateCell>
      </BoardGroup>

      <BoardGroup title="MetralyRadio" readiness="Ready">
        <StateCell label="default"><MetralyRadio name="range-preview-a" label="Current sprint" /></StateCell>
        <StateCell label="hover"><MetralyRadio className="is-preview-hover" name="range-preview-b" label="Last 30 days" /></StateCell>
        <StateCell label="focus-visible"><MetralyRadio className="is-preview-focus" name="range-preview-c" label="Keyboard focus" /></StateCell>
        <StateCell label="selected"><MetralyRadio name="range-preview-d" label="Last 14 days" checked /></StateCell>
        <StateCell label="selected disabled"><MetralyRadio name="range-preview-e" label="Locked range" checked disabled /></StateCell>
        <StateCell label="error"><MetralyRadio name="range-preview-f" label="Invalid range" error /></StateCell>
      </BoardGroup>

      <BoardGroup title="MetralySwitch" readiness="Ready">
        <StateCell label="off"><MetralySwitch label="Live sync" /></StateCell>
        <StateCell label="hover"><MetralySwitch className="is-preview-hover" label="Live sync" /></StateCell>
        <StateCell label="focus-visible"><MetralySwitch className="is-preview-focus" label="Keyboard focus" /></StateCell>
        <StateCell label="on"><MetralySwitch label="Live sync" checked /></StateCell>
        <StateCell label="on hover"><MetralySwitch className="is-preview-hover" label="Auto refresh" checked /></StateCell>
        <StateCell label="off disabled"><MetralySwitch label="Offline mode" disabled /></StateCell>
        <StateCell label="on disabled"><MetralySwitch label="Read-only board" checked disabled /></StateCell>
      </BoardGroup>

      <BoardGroup title="MetralySelect" readiness="Hardening">
        <StateCell label="default"><MetralySelect label="Signal source" defaultValue="github" options={sourceOptions} /></StateCell>
        <StateCell label="hover"><MetralySelect className="is-preview-hover" label="Signal source" defaultValue="deployments" options={sourceOptions} /></StateCell>
        <StateCell label="focus-visible"><MetralySelect className="is-preview-focus" label="Signal source" defaultValue="github" options={sourceOptions} /></StateCell>
        <StateCell label="error"><MetralySelect label="Signal source" defaultValue="github" options={sourceOptions} error /></StateCell>
        <StateCell label="disabled"><MetralySelect label="Signal source" defaultValue="ci" options={sourceOptions} disabled /></StateCell>
        <StateCell label="option disabled"><MetralySelect label="Signal source" defaultValue="blocked" options={sourceOptions} /></StateCell>
      </BoardGroup>

      <BoardGroup title="MetralyTabs" readiness="Hardening">
        <StateCell label="selected"><MetralyTabs ariaLabel="State board tabs" defaultValue="dora" items={tabs} /></StateCell>
        <StateCell label="with counts"><MetralyTabs ariaLabel="Count tabs" defaultValue="ci" items={tabCounts} /></StateCell>
        <StateCell label="disabled tab"><MetralyTabs ariaLabel="Disabled tab state" defaultValue="delivery" items={tabs} /></StateCell>
        <StateCell label="loading"><LoadingBars /></StateCell>
      </BoardGroup>

      <BoardGroup title="StateBadge / WidgetPickerCard" readiness="Visual-ready">
        <StateCell label="live"><StateBadge state="live" label="Live" /></StateCell>
        <StateCell label="stale"><StateBadge state="stale" label="Stale 4m" /></StateCell>
        <StateCell label="delayed"><StateBadge state="delayed" label="Delayed" /></StateCell>
        <StateCell label="disconnected"><StateBadge state="disconnected" label="Disconnected" /></StateCell>
        <StateCell label="no-data"><StateBadge state="noData" label="No data" /></StateCell>
        <StateCell label="new"><StateBadge state="live" label="New review" /></StateCell>
        <StateCell label="picker default"><WidgetPickerCard title="Cycle time breakdown" description="Coding, review, merge and deploy stages." iconLabel="cycle" tags={["flow", "cycle"]} /></StateCell>
        <StateCell label="picker selected"><WidgetPickerCard title="DORA overview" description="Deployment frequency, lead time, failure rate and MTTR." iconLabel="dora" tags={["dora", "exec"]} selected /></StateCell>
        <StateCell label="picker disabled"><WidgetPickerCard title="WIP per engineer" description="Source is not connected yet." iconLabel="wip" tags={["flow"]} disabled /></StateCell>
      </BoardGroup>

      <BoardGroup title="DashboardWidget / MetralyTable" readiness="Hardening">
        <StateCell label="widget default">
          <DashboardWidget title="Deployment frequency" subtitle="Last 14 days" state="live">
            <MetricBody value="24/day" delta="+18% vs previous window" values={[4, 6, 7, 8, 10, 12, 14]} />
          </DashboardWidget>
        </StateCell>
        <StateCell label="selected">
          <DashboardWidget title="Lead time for changes" subtitle="PR open to production" state="live" selected id="ltc" onDragStart={() => undefined}>
            <MetricBody value="41h" delta="-6h vs previous window" values={[62, 58, 55, 50, 46, 43, 41]} />
          </DashboardWidget>
        </StateCell>
        <StateCell label="dragging">
          <DashboardWidget title="Blocked work" subtitle="Stalled > 3 days" state="delayed" dragging id="blocked" onDragStart={() => undefined}>
            <MetricBody value="9" delta="+3 blocked items" values={[3, 4, 4, 6, 7, 8, 9]} />
          </DashboardWidget>
        </StateCell>
        <StateCell label="table selected"><MetralyTable columns={reviewColumns} data={reviewRows} rowKey={(row) => row.team} selectedRowKeys={["Growth"]} ariaLabel="Review queue table" /></StateCell>
        <StateCell label="table loading"><MetralyTable columns={reviewColumns} data={[]} loading ariaLabel="Loading review table" /></StateCell>
        <StateCell label="table empty"><MetralyTable columns={reviewColumns} data={[]} emptyText="No review data in this window." ariaLabel="Empty review table" /></StateCell>
      </BoardGroup>

      <BoardGroup title="DashboardToolbar / DropZone / ResizeHandle" readiness="Hardening">
        <StateCell label="toolbar">
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
        <StateCell label="drop idle"><DashboardDropZone state="idle" description="Neutral dashed frame, no pulse marker." /></StateCell>
        <StateCell label="drop target"><DashboardDropZone state="active" description="Dashed cyan border with subtle tint." /></StateCell>
        <StateCell label="drop rejected"><DashboardDropZone state="rejected" description="Invalid placement without visual noise." /></StateCell>
        <StateCell label="resize horizontal"><DashboardResizeHandle direction="east" label="Resize width" /></StateCell>
        <StateCell label="resize vertical"><DashboardResizeHandle direction="south" label="Resize height" active /></StateCell>
      </BoardGroup>
    </section>
  );
}

function DashboardSidebar() {
  const items = ["Overview", "Delivery", "DORA", "Flow & WIP", "Code review", "CI health"];

  return (
    <aside className="claude-dashboard-sidebar" aria-label="Dashboard navigation">
      <div className="claude-dashboard-logo">
        <MetralyLogo variant="mark" title="Metraly" />
        <span>Engineering Intelligence</span>
      </div>
      <nav>
        {items.map((item) => (
          <button key={item} type="button" className={item === "Delivery" ? "is-active" : undefined} aria-current={item === "Delivery" ? "page" : undefined}>
            <span>{item.slice(0, 2).toUpperCase()}</span>
            {item}
          </button>
        ))}
      </nav>
    </aside>
  );
}

function WidgetPickerPanel() {
  return (
    <aside className="claude-widget-picker-panel" aria-label="Widget picker">
      <header>
        <strong>Widget library</strong>
        <span>Reference-only static picker states.</span>
      </header>
      <WidgetPickerCard title="Deployment frequency" description="Deploys per day, by team." iconLabel="deploy" tags={["dora", "delivery"]} selected />
      <WidgetPickerCard title="PR review latency" description="First response and merge waiting time." iconLabel="review" tags={["review"]} state="delayed" />
      <WidgetPickerCard title="Flaky builds" description="Tests retried then passed." iconLabel="flaky" tags={["ci"]} state="delayed" />
      <WidgetPickerCard title="WIP per engineer" description="Source not connected." iconLabel="wip" tags={["flow"]} disabled />
    </aside>
  );
}

export function EngineeringDashboardEditorPreview() {
  return (
    <section className="claude-dashboard-editor-preview" aria-label="Engineering Dashboard Editor preview">
      <DashboardSidebar />
      <div className="claude-dashboard-workspace">
        <header className="claude-dashboard-topbar">
          <div>
            <span>Workspace / Delivery / All teams</span>
            <h2>Engineering Dashboard Editor</h2>
          </div>
          <div className="claude-dashboard-topbar-actions">
            <StateBadge state="live" label="Live sync" />
            <button type="button" className="btn btn-secondary">Share</button>
            <button type="button" className="btn btn-primary">Save layout</button>
          </div>
        </header>

        <main className="claude-dashboard-main">
          <DashboardToolbar
            title="Delivery health"
            description="Edit mode shows selected, dragging, drop and resize states."
            meta="14d window · 6 teams · saved 2m ago"
            tabs={tabs}
            activeTab="delivery"
            searchValue=""
            searchPlaceholder="Search delivery widgets"
            syncState="live"
            editMode
            onToggleEdit={() => undefined}
            onAddWidget={() => undefined}
          />

          <div className="claude-editor-note" role="note">
            <strong>Edit mode</strong>
            <span>Drag handle uses neutral grip dots. Drop zones use dashed cyan borders without pulse markers.</span>
          </div>

          <div className="claude-dashboard-grid-preview">
            <DashboardWidget title="Deployment frequency" subtitle="DORA / deploys" state="live" id="deploy" onDragStart={() => undefined}>
              <MetricBody value="24/day" delta="+18% vs previous window" values={[4, 6, 7, 8, 10, 12, 14, 15]} />
            </DashboardWidget>
            <DashboardWidget title="Lead time for changes" subtitle="PR open to production" state="live" selected id="ltc" onDragStart={() => undefined}>
              <MetricBody value="41h" delta="-6h vs previous window" values={[62, 60, 55, 52, 48, 44, 41]} />
            </DashboardWidget>
            <DashboardWidget title="CI failure rate" subtitle="Source disconnected" state="disconnected" id="ci" onDragStart={() => undefined}>
              <div className="claude-widget-error" role="alert">
                <strong>Pipeline source disconnected</strong>
                <span>Reconnect CI to restore failure-rate telemetry.</span>
              </div>
            </DashboardWidget>
            <DashboardWidget title="Blocked work" subtitle="Flow / WIP" state="delayed" dragging id="blocked" onDragStart={() => undefined}>
              <MetricBody value="9" delta="+3 blocked items" values={[3, 4, 5, 6, 6, 8, 9]} />
            </DashboardWidget>

            <MetralyChartCard
              title="Flow efficiency"
              description="Full-width chart widget."
              state="fullWidth"
              summary="Flow efficiency improved from 72 percent to 82 percent over the work week."
              badge={<StateBadge state="live" label="Full width" />}
              className="claude-editor-chart"
            >
              <MetralyAreaChart
                data={chartData}
                xKey="name"
                ariaLabel="Flow efficiency area chart"
                summary="Flow efficiency improved from 72 percent to 82 percent over the work week."
                series={[{ dataKey: "flow", name: "Flow efficiency", tone: "primary" }]}
              />
            </MetralyChartCard>

            <MetralyChartCard
              title="Delivery composite"
              description="Selected chart wrapper state."
              state="selected"
              summary="Deployments rose while change failure rate remained below five percent."
              badge={<StateBadge state="live" label="Selected" />}
              className="claude-editor-chart"
            >
              <MetralyComposedChart
                data={chartData}
                xKey="name"
                ariaLabel="Delivery composite chart"
                summary="Deployments rose while change failure rate remained below five percent."
                series={[
                  { dataKey: "flow", name: "Flow efficiency", kind: "area", tone: "primary" },
                  { dataKey: "deploys", name: "Deploys", kind: "bar", tone: "secondary" },
                  { dataKey: "failure", name: "Failure rate", kind: "line", tone: "warning" },
                ]}
              />
            </MetralyChartCard>

            <DashboardWidget title="PR review latency by team" subtitle="Selected row marks delayed queue" state="delayed" fullWidth>
              <MetralyTable columns={reviewColumns} data={reviewRows} rowKey={(row) => row.team} selectedRowKeys={["Growth"]} ariaLabel="PR review latency by team table" />
            </DashboardWidget>

            <DashboardDropZone
              state="active"
              label="Release to add widget"
              description="Dashed cyan border and subtle tint. No pulse-wave in default drop zones."
            />

            <div className="claude-resize-demo" aria-label="Resize handle states">
              <DashboardResizeHandle direction="east" label="Resize width" />
              <DashboardResizeHandle direction="south" label="Resize height" active />
              <DashboardResizeHandle direction="southeast" label="Resize width and height" active />
            </div>

            <DashboardEmptyState
              className="claude-empty-dashboard"
              title="Empty dashboard state"
              description="First-run boards explain what to add without generic SaaS decoration."
              action={<span className="btn btn-primary">Add delivery widget</span>}
            />
          </div>
        </main>
      </div>
      <WidgetPickerPanel />
    </section>
  );
}

export default function ClaudeDesignStateBoard() {
  return (
    <div className="claude-design-preview">
      <section className="claude-design-hero">
        <span className="draft-kicker">Claude Design visual reference integration</span>
        <p className="claude-preview-section-title">Metraly component hardening surface</p>
        <p>
          Static production-aligned implementation of the final visual reference. The zip remains a reference artifact;
          the real work lives in `@metraly/ui` primitives and preview routes.
        </p>
      </section>
      <ComponentStateBoard />
      <EngineeringDashboardEditorPreview />
    </div>
  );
}
