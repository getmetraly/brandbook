"use client";

import { useState, type MouseEvent as ReactMouseEvent, type ReactNode } from "react";
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
  MetralyChartCard,
  MetralySparkline,
} from "@metraly/ui/charts";
import TelemetrySearch from "./TelemetrySearch";

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

type ChartTooltipItem = {
  label: string;
  value: string;
  tone: "primary" | "secondary" | "warning";
};

type ChartTooltipState = {
  index: number;
  label: string;
  left: number;
  top: number;
  cursorX: number;
  cursorY: number;
  placement: "above" | "below";
  items: ChartTooltipItem[];
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

function buildPath(values: number[], width: number, height: number, padX = 24, padY = 18) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const plotWidth = width - padX * 2;
  const plotHeight = height - padY * 2;
  return values
    .map((value, index) => {
      const x = padX + (plotWidth * index) / Math.max(1, values.length - 1);
      const y = padY + plotHeight - ((value - min) / range) * plotHeight;
      return `${index === 0 ? "M" : "L"} ${x.toFixed(1)} ${y.toFixed(1)}`;
    })
    .join(" ");
}

function projectPoint(value: number, values: number[], width: number, height: number, index: number, padX = 24, padY = 18) {
  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;
  const plotWidth = width - padX * 2;
  const plotHeight = height - padY * 2;
  const x = padX + (plotWidth * index) / Math.max(1, values.length - 1);
  const y = padY + plotHeight - ((value - min) / range) * plotHeight;
  return { x, y };
}

function ChartTooltip({
  state,
}: {
  state: ChartTooltipState | null;
}) {
  if (!state) return null;

  return (
    <div
      className="metraly-chart-tooltip claude-chart-tooltip"
      role="tooltip"
      style={{
        left: `${state.left}%`,
        top: `${state.top}%`,
        transform: state.placement === "above" ? "translate(-50%, -100%)" : "translate(-50%, 12px)",
      }}
    >
      <strong>{state.label}</strong>
      <div className="metraly-chart-tooltip-list">
        {state.items.map((item) => (
          <span key={item.label}>
            <i
              aria-hidden="true"
              style={{
                background:
                  item.tone === "primary"
                    ? "var(--metraly-cyan, #00e5cc)"
                    : item.tone === "secondary"
                      ? "var(--metraly-purple, #a855f7)"
                      : "var(--metraly-warning, #f59e0b)",
              }}
            />
            <span>{item.label}</span>
            <b>{item.value}</b>
          </span>
        ))}
      </div>
    </div>
  );
}

function DashboardAreaPreview() {
  const [tooltip, setTooltip] = useState<ChartTooltipState | null>(null);
  const values = chartData.map((point) => point.flow);
  const width = 680;
  const height = 260;
  const path = buildPath(values, width, height);
  const area = `${path} L ${width - 24} ${height - 18} L 24 ${height - 18} Z`;
  const points = chartData.map((point, index) => ({
    point,
    coords: projectPoint(point.flow, values, width, height, index),
  }));
  const showTooltip = (index: number, point: (typeof chartData)[number], coords: { x: number; y: number }) =>
    setTooltip({
      index,
      label: point.name,
      left: (coords.x / width) * 100,
      top: (coords.y / height) * 100,
      cursorX: coords.x,
      cursorY: coords.y,
      placement: coords.y < 96 ? "below" : "above",
      items: [{ label: "Flow efficiency", value: `${point.flow}%`, tone: "primary" }],
    });
  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / rect.width) * width;
    const nearest = points.reduce(
      (best, candidate) => {
        const distance = Math.abs(candidate.coords.x - localX);
        if (!best || distance < best.distance) {
          return { ...candidate, distance };
        }
        return best;
      },
      null as null | (typeof points)[number] & { distance: number },
    );

    if (!nearest) return;
    showTooltip(0, nearest.point, nearest.coords);
  };

  return (
    <div
      className="claude-dashboard-chart-frame"
      onMouseMove={handleMouseMove}
      onPointerLeave={() => setTooltip(null)}
      onMouseLeave={() => setTooltip(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Flow efficiency area chart"
        className="claude-dashboard-chart"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="flow-area-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00e5cc" stopOpacity="0.32" />
            <stop offset="100%" stopColor="#00e5cc" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1="24"
            x2={width - 24}
            y1={18 + line * 58}
            y2={18 + line * 58}
            stroke="rgba(240,244,248,0.08)"
            strokeWidth="1"
            pointerEvents="none"
          />
        ))}
        <path d={area} fill="url(#flow-area-fill)" stroke="none" pointerEvents="none" />
        <path d={path} fill="none" stroke="#00e5cc" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" pointerEvents="none" />
        {tooltip ? (
          <line
            x1={tooltip.cursorX}
            x2={tooltip.cursorX}
            y1={18}
            y2={height - 18}
            stroke="rgba(0,229,204,0.78)"
            strokeWidth="1.5"
            strokeLinecap="round"
            pointerEvents="none"
          />
        ) : null}
        {tooltip ? (
          <circle
            className="claude-chart-cursor-point"
            cx={tooltip.cursorX}
            cy={tooltip.cursorY}
            r="4.5"
            fill="#0b0f14"
            stroke="#00e5cc"
            strokeWidth="2"
            pointerEvents="none"
          />
        ) : null}
        {chartData.map((point, index) => {
          const coords = projectPoint(point.flow, values, width, height, index);
          return (
            <circle
              key={point.name}
              cx={coords.x}
              cy={coords.y}
              r="9"
              fill="rgba(0,0,0,0.001)"
              stroke="transparent"
              tabIndex={0}
              role="button"
              aria-label={`${point.name}: Flow efficiency ${point.flow}%`}
              pointerEvents="all"
              onPointerEnter={() => showTooltip(index, point, coords)}
              onMouseEnter={() => showTooltip(index, point, coords)}
              onMouseOver={() => showTooltip(index, point, coords)}
              onFocus={() => showTooltip(index, point, coords)}
            >
              <title>{`${point.name}: Flow efficiency ${point.flow}%`}</title>
            </circle>
          );
        })}
        {chartData.map((point, index) => {
          const x = 24 + ((width - 48) * index) / Math.max(1, chartData.length - 1);
          return (
            <text
              key={point.name}
              x={x}
              y={height - 2}
              textAnchor="middle"
              fill="rgba(240,244,248,0.46)"
              fontSize="10"
              fontFamily="var(--m-font-mono)"
            >
              {point.name}
            </text>
          );
        })}
      </svg>
      <ChartTooltip state={tooltip} />
    </div>
  );
}

function DashboardCompositePreview() {
  const [tooltip, setTooltip] = useState<ChartTooltipState | null>(null);
  const width = 680;
  const height = 320;
  const flowValues = chartData.map((point) => point.flow);
  const deployValues = chartData.map((point) => point.deploys);
  const failureValues = chartData.map((point) => point.failure);
  const flowPath = buildPath(flowValues, width, height, 24, 20);
  const failurePath = buildPath(failureValues, width, height, 24, 20);
  const maxDeploy = Math.max(...deployValues) || 1;
  const barWidth = 44;
  const plotHeight = height - 40;
  const points = chartData.map((point, index) => ({
    point,
    x: 34 + index * 129 + barWidth / 2,
    y: height - 24 - (deployValues[index] / maxDeploy) * (plotHeight - 36),
  }));
  const showTooltip = (index: number, value: number, coords: { x: number; y: number }) =>
    setTooltip({
      index,
      label: chartData[index].name,
      left: (coords.x / width) * 100,
      top: ((coords.y - 8) / height) * 100,
      cursorX: coords.x,
      cursorY: coords.y,
      placement: coords.y < 120 ? "below" : "above",
      items: [
        { label: "Deployments", value: `${value}/day`, tone: "secondary" },
        { label: "Flow efficiency", value: `${flowValues[index]}%`, tone: "primary" },
        { label: "Failure rate", value: `${failureValues[index]}%`, tone: "warning" },
      ],
    });
  const handleMouseMove = (event: ReactMouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const localX = ((event.clientX - rect.left) / rect.width) * width;
    const nearest = points.reduce(
      (best, candidate) => {
        const distance = Math.abs(candidate.x - localX);
        if (!best || distance < best.distance) {
          return { ...candidate, distance };
        }
        return best;
      },
      null as null | (typeof points)[number] & { distance: number },
    );

    if (!nearest) return;
    showTooltip(chartData.indexOf(nearest.point), nearest.point.deploys, { x: nearest.x, y: nearest.y });
  };

  return (
    <div
      className="claude-dashboard-chart-frame"
      onMouseMove={handleMouseMove}
      onPointerLeave={() => setTooltip(null)}
      onMouseLeave={() => setTooltip(null)}
    >
      <svg
        viewBox={`0 0 ${width} ${height}`}
        role="img"
        aria-label="Delivery composite chart"
        className="claude-dashboard-chart"
        style={{ display: "block", width: "100%", height: "auto" }}
      >
        <defs>
          <linearGradient id="flow-composite-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#00e5cc" stopOpacity="0.26" />
            <stop offset="100%" stopColor="#00e5cc" stopOpacity="0.02" />
          </linearGradient>
        </defs>
        {[0, 1, 2, 3].map((line) => (
          <line
            key={line}
            x1="24"
            x2={width - 24}
            y1={20 + line * 72}
            y2={20 + line * 72}
            stroke="rgba(240,244,248,0.08)"
            strokeWidth="1"
            pointerEvents="none"
          />
        ))}
        {tooltip ? (
          <rect
            className="claude-chart-hover-band"
            x={Math.max(24, Math.min(width - 24 - 64, tooltip.cursorX - 32))}
            y={20}
            width="64"
            height={height - 40}
            rx="10"
            fill="rgba(0,229,204,0.08)"
            pointerEvents="none"
          />
        ) : null}
        {deployValues.map((value, index) => {
          const x = 34 + index * 129;
          const barHeight = (value / maxDeploy) * (plotHeight - 36);
          const y = height - 24 - barHeight;
          const coords = { x: x + barWidth / 2, y };
          return (
            <rect
              key={chartData[index].name}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx="8"
              fill="#a855f7"
              opacity="0.7"
              tabIndex={0}
              role="button"
              aria-label={`${chartData[index].name}: Deployments ${value}/day, Flow efficiency ${flowValues[index]}%, Failure rate ${failureValues[index]}%`}
              pointerEvents="all"
              onPointerEnter={() => showTooltip(index, value, coords)}
              onMouseEnter={() => showTooltip(index, value, coords)}
              onMouseOver={() => showTooltip(index, value, coords)}
              onFocus={() => showTooltip(index, value, coords)}
            >
              <title>{`${chartData[index].name}: Deployments ${value}/day, Flow efficiency ${flowValues[index]}%, Failure rate ${failureValues[index]}%`}</title>
            </rect>
          );
        })}
        <path d={flowPath} fill="none" stroke="#00e5cc" strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" pointerEvents="none" />
        <path d={`${flowPath} L ${width - 24} ${height - 20} L 24 ${height - 20} Z`} fill="url(#flow-composite-fill)" stroke="none" pointerEvents="none" />
        <path d={failurePath} fill="none" stroke="#f59e0b" strokeWidth="2.5" strokeLinejoin="round" strokeLinecap="round" pointerEvents="none" />
        {chartData.map((point, index) => {
          const x = 24 + ((width - 48) * index) / Math.max(1, chartData.length - 1);
          return (
            <text
              key={point.name}
              x={x}
              y={height - 2}
              textAnchor="middle"
              fill="rgba(240,244,248,0.46)"
              fontSize="10"
              fontFamily="var(--m-font-mono)"
            >
              {point.name}
            </text>
          );
        })}
      </svg>
      <ChartTooltip state={tooltip} />
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
        <StateCell label="indeterminate"><MetralyCheckbox label="Some sources" indeterminate /></StateCell>
        <StateCell label="indeterminate focus"><MetralyCheckbox className="is-preview-focus" label="Partial selection" indeterminate /></StateCell>
        <StateCell label="checked focus"><MetralyCheckbox className="is-preview-focus" label="Focused selected" checked /></StateCell>
        <StateCell label="checked disabled"><MetralyCheckbox label="Locked policy" checked disabled /></StateCell>
        <StateCell label="unchecked disabled"><MetralyCheckbox label="Unavailable signal" disabled /></StateCell>
        <StateCell label="error"><MetralyCheckbox label="Source disconnected" error /></StateCell>
        <StateCell label="error checked"><MetralyCheckbox label="Broken required signal" checked error /></StateCell>
        <StateCell label="error mixed"><MetralyCheckbox label="Some sources failed" indeterminate error /></StateCell>
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

      <BoardGroup title="Widget library" readiness="Visual-ready">
        <StateCell label="default"><WidgetPickerCard title="Metric card" kind="metric/scalar" iconLabel="metric" description="Single KPI with delta and sparkline." /></StateCell>
        <StateCell label="selected"><WidgetPickerCard title="Time-series chart" kind="chart/line" iconLabel="chart" description="Multi-series line, p50/p99 overlay." selected /></StateCell>
        <StateCell label="new"><WidgetPickerCard title="Flaky builds · 7d" kind="ci/flaky" iconLabel="lightning" description="Tests retried-then-passed." visualState="new" state="new" /></StateCell>
        <StateCell label="disabled"><WidgetPickerCard title="WIP per engineer" kind="flow/wip" iconLabel="user" description="Source not connected." disabled /></StateCell>
        <StateCell label="loading"><WidgetPickerCard title="Server pool" kind="metric/cluster" iconLabel="server" loading /></StateCell>
        <StateCell label="dragging"><WidgetPickerCard title="Time-series chart" kind="chart/line" iconLabel="chart" description="Multi-series line, p50/p99 overlay." dragging /></StateCell>
      </BoardGroup>

      <BoardGroup title="Widget surface" readiness="Hardening">
        <StateCell label="default · live">
          <DashboardWidget title="Deployment frequency" subtitle="DORA / deploys" state="live" id="deploy" onDragStart={() => undefined}>
            <MetricBody value="24/day" delta="+18% vs previous window" values={[4, 6, 7, 8, 10, 12, 14, 15]} />
          </DashboardWidget>
        </StateCell>
        <StateCell label="selected">
          <DashboardWidget title="Lead time for changes" subtitle="PR open to production" state="live" selected id="ltc" onDragStart={() => undefined}>
            <MetricBody value="41h" delta="▼ 6h vs −14d" values={[62, 60, 55, 52, 48, 44, 41]} />
          </DashboardWidget>
        </StateCell>
        <StateCell label="dragging">
          <DashboardWidget title="Lead time for changes" subtitle="PR open to production" state="live" dragging id="ltc-drag" onDragStart={() => undefined}>
            <MetricBody value="41h" delta="▼ 6h vs −14d" values={[41, 44, 46, 48, 50, 55, 60]} />
          </DashboardWidget>
        </StateCell>
        <StateCell label="resizing">
          <DashboardWidget title="Change failure rate" subtitle="DORA / incidents" state="stale" selected resizable id="cfr" onDragStart={() => undefined}>
            <MetricBody value="4.2%" delta="▲ 0.8% vs −14d" values={[3.0, 3.1, 3.0, 2.9, 3.2, 3.4, 3.3]} />
          </DashboardWidget>
        </StateCell>
        <StateCell label="loading">
          <DashboardWidget title="MTTR" subtitle="Recovery time" state="info" stateLabel="Loading" id="mttr" onDragStart={() => undefined} />
        </StateCell>
        <StateCell label="empty">
          <DashboardWidget title="CI failure rate" subtitle="No telemetry source" state="noData" stateLabel="Empty" id="ci-empty" onDragStart={() => undefined} />
        </StateCell>
        <StateCell label="stale">
          <DashboardWidget title="Change failure rate" subtitle="Stale 4m" state="stale" id="cfr-stale" onDragStart={() => undefined}>
            <MetricBody value="4.2%" delta="last 4m ago" values={[3.0, 3.1, 3.0, 2.9, 3.2, 3.4, 3.3]} />
          </DashboardWidget>
        </StateCell>
        <StateCell label="error · disconnected">
          <DashboardWidget title="Flaky builds" subtitle="Source disconnected" state="error" id="flaky" onDragStart={() => undefined} />
        </StateCell>
        <StateCell label="unread / new">
          <div style={{ gridColumn: "span 2" }}>
            <DashboardWidget title="Blocked work" subtitle="Issues stalled > 3 days" state="new" stateLabel="New" id="blocked" onDragStart={() => undefined}>
              <div style={{ padding: 14, display: "flex", flexDirection: "column", gap: 8 }}>
                <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 11 }}>3 new blocked issues</div>
                <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)" }}>↳ feat/cohorts-v2 · review 5d</div>
                <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)" }}>↳ refactor/auth-tokens · blocked</div>
              </div>
            </DashboardWidget>
          </div>
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
    <aside className="claude-widget-picker-panel" aria-label="Widget library">
      <header>
        <strong>Widget library</strong>
        <span>Reference-only widget picker states.</span>
      </header>
      <TelemetrySearch />
      <WidgetPickerCard title="Deployment frequency" description="Deploys per day, by service & team." iconLabel="lightning" kind="dora/deploy-freq" tags={["dora", "delivery"]} selected />
      <WidgetPickerCard title="Lead time for changes" description="PR opened → prod, p50 / p90." iconLabel="metric" kind="dora/lead-time" tags={["dora", "flow"]} loading />
      <WidgetPickerCard title="Change failure rate" description="% of deploys that triggered a rollback or incident." iconLabel="chart" kind="dora/cfr" tags={["dora", "ops"]} />
      <WidgetPickerCard title="Flaky builds · 7d" description="Tests retried-then-passed." iconLabel="lightning" kind="ci/flaky" tags={["ci"]} state="new" visualState="new" />
      <WidgetPickerCard title="Blocked work" description="Issues stalled > 3 days, by stage." iconLabel="bell" kind="flow/blocked" tags={["flow"]} state="delayed" />
      <WidgetPickerCard title="WIP per engineer" description="Source not connected." iconLabel="table" kind="flow/wip" tags={["flow"]} disabled />
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
              <DashboardAreaPreview />
            </MetralyChartCard>

            <MetralyChartCard
              title="Delivery composite"
              description="Selected chart wrapper state."
              state="selected"
              summary="Deployments rose while change failure rate remained below five percent."
              badge={<StateBadge state="live" label="Selected" />}
              className="claude-editor-chart"
            >
              <DashboardCompositePreview />
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
