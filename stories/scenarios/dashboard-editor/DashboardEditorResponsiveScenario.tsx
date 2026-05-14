import * as React from "react";
import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  MetralyTable,
  StateBadge,
  WidgetPickerCard,
} from "@metraly/ui";

type IconName = "grid" | "metric" | "lightning" | "chart" | "log" | "refresh" | "bell" | "user" | "settings" | "search" | "check" | "menu" | "widgets" | "close";

function Icon({ name, size = 13 }: { name: IconName | string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    grid: (
      <>
        <rect x="1.5" y="1.5" width="4" height="4" rx="0.5" strokeWidth="1.35" />
        <rect x="8.5" y="1.5" width="4" height="4" rx="0.5" strokeWidth="1.35" />
        <rect x="1.5" y="8.5" width="4" height="4" rx="0.5" strokeWidth="1.35" />
        <rect x="8.5" y="8.5" width="4" height="4" rx="0.5" strokeWidth="1.35" />
      </>
    ),
    metric: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M1.5 10.5h2V7h2v3.5h2V5h2v5.5h2V2.5h2v8" />,
    lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" fill="currentColor" fillOpacity={0.2} d="M8.5 1.5 5 7h4.5l-3 6 6-7.5H8.5z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M1.5 10.5 4.5 7l2.5 2L10 4l3 3" />,
    log: <path strokeLinecap="round" strokeWidth="1.35" d="M2.5 4.5h9M2.5 7h6M2.5 9.5h8" />,
    refresh: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M11.5 4A5 5 0 1 0 12 7M11.5 1v3h-3" />,
    bell: (
      <>
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M4 8a3 3 0 0 1 6 0v3H4V8z" />
        <path strokeLinecap="round" strokeWidth="1.35" d="M5.5 11v.5a1.5 1.5 0 0 0 3 0V11" />
      </>
    ),
    user: (
      <>
        <circle cx="7" cy="5" r="2.5" strokeWidth="1.35" />
        <path strokeLinecap="round" strokeWidth="1.35" d="M2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />
      </>
    ),
    settings: (
      <>
        <circle cx="7" cy="7" r="2" strokeWidth="1.35" />
        <path strokeLinecap="round" strokeWidth="1.35" d="M7 2v1.5M7 11.5V13M2 7h1.5M11.5 7H13" />
      </>
    ),
    search: (
      <>
        <circle cx="6" cy="6" r="3.5" strokeWidth="1.35" />
        <path strokeLinecap="round" strokeWidth="1.35" d="M9 9 12 12" />
      </>
    ),
    check: <path strokeLinecap="round" strokeWidth="1.35" d="M2.5 7l3 3 6-6" />,
    menu: <path strokeLinecap="round" strokeWidth="1.35" d="M2 4h10M2 7h10M2 10h10" />,
    widgets: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M2 3.5h4v4H2zM8 3.5h4v2.8H8zM8 8.3h4v2.2H8zM2 9h4v1.5H2z" />,
    close: <path strokeLinecap="round" strokeWidth="1.35" d="m3.5 3.5 7 7M10.5 3.5l-7 7" />,
  };

  return (
    <svg viewBox="0 0 14 14" width={size} height={size} fill="none" stroke="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      {paths[name] ?? null}
    </svg>
  );
}

const sidebarNav = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "delivery", label: "Delivery", icon: "metric", active: true },
  { id: "dora", label: "DORA", icon: "lightning" },
  { id: "flow", label: "Flow & WIP", icon: "chart" },
  { id: "reviews", label: "Code review", icon: "log", badge: 3 },
  { id: "ci", label: "CI health", icon: "refresh" },
  { id: "incidents", label: "Incidents", icon: "bell" },
  { id: "teams", label: "Teams", icon: "user" },
];

const sidebarFooter = [
  { id: "settings", label: "Settings", icon: "settings" },
  { id: "user", label: "ops@metraly", icon: "user" },
];

const pickerItems = [
  { id: "deploy-freq", iconLabel: "lightning", title: "Deployment frequency", kind: "dora/deploy-freq", description: "Deploys per day, by service & team." },
  { id: "lead-time", iconLabel: "metric", title: "Lead time for changes", kind: "dora/lead-time", description: "PR opened → prod, p50 / p90.", selected: true },
  { id: "cfr", iconLabel: "chart", title: "Change failure rate", kind: "dora/cfr", description: "% of deploys that triggered a rollback." },
  { id: "mttr", iconLabel: "refresh", title: "MTTR", kind: "dora/mttr", description: "Time from incident open → resolved." },
  { id: "cycle-time", iconLabel: "chart", title: "Cycle time breakdown", kind: "flow/cycle", description: "Coding · review · merge · deploy." },
  { id: "review-lat", iconLabel: "metric", title: "PR review latency", kind: "review/latency", description: "First review response, by team." },
  { id: "ci-fail", iconLabel: "log", title: "CI failure rate", kind: "ci/fail", description: "Failed pipelines / total pipelines." },
  { id: "flaky", iconLabel: "lightning", title: "Flaky builds", kind: "ci/flaky", description: "Tests retried-then-passed in last 7d.", visualState: "new" as const },
  { id: "blocked", iconLabel: "bell", title: "Blocked work", kind: "flow/blocked", description: "Issues stalled > 3 days, by stage." },
  { id: "team-health", iconLabel: "user", title: "Team delivery health", kind: "team/health", description: "Composite score per squad." },
  { id: "dora-ov", iconLabel: "grid", title: "DORA overview", kind: "dora/overview", description: "All four DORA metrics on one card.", visualState: "new" as const },
  { id: "wip", iconLabel: "log", title: "WIP per engineer", kind: "flow/wip", description: "Source not connected.", disabled: true },
];

type WidgetDef = {
  id: string;
  title: string;
  kind: string;
  body: "metric" | "error" | "deployFreq" | "doraOverview" | "cycleTime" | "blocked" | "prTable";
  state?: "live" | "error" | "new" | "stale";
  selected?: boolean;
  dragging?: boolean;
  value?: string;
  delta?: string;
  deltaTone?: "ok" | "warn" | "err";
  spark?: number[];
  span: 3 | 4 | 8 | 12;
  rows?: 1 | 2;
};

type PRReviewRow = {
  team: React.ReactNode;
  open: React.ReactNode;
  first: React.ReactNode;
  merge: React.ReactNode;
  stale: React.ReactNode;
};

const widgets: WidgetDef[] = [
  { id: "deploy-freq", title: "Deployment frequency", kind: "dora/deploy-freq", body: "metric", value: "24 / day", delta: "▲ 18% vs −14d", deltaTone: "ok", spark: [4, 6, 5, 7, 8, 6, 9, 11, 10, 12, 14, 13, 15, 14, 12, 16, 18, 17, 15, 19, 21, 18, 22, 24], span: 3 },
  { id: "lead-time", title: "Lead time for changes", kind: "dora/lead-time", body: "metric", value: "41h", delta: "▼ 6h vs −14d", deltaTone: "ok", spark: [62, 60, 58, 56, 55, 54, 52, 50, 49, 48, 47, 46, 45, 44, 44, 43, 43, 42, 42, 42, 41, 41, 41, 41], selected: true, span: 3 },
  { id: "cfr", title: "Change failure rate", kind: "dora/cfr", body: "metric", value: "4.2%", delta: "▲ 0.8% vs −14d", deltaTone: "warn", spark: [3, 3.1, 3, 2.9, 3.2, 3.4, 3.3, 3.5, 3.6, 3.5, 3.7, 3.8, 3.9, 3.8, 4, 3.9, 4.1, 4, 4.2, 4.1, 4.3, 4.2, 4.2, 4.2], dragging: true, span: 3 },
  { id: "ci-status", title: "CI failure rate", kind: "ci/fail", body: "error", state: "error", span: 3 },
  { id: "deploy-chart", title: "Deploys / day · last 14d", kind: "dora/deploy-freq", body: "deployFreq", span: 8, rows: 2 },
  { id: "dora-overview", title: "DORA overview", kind: "dora/overview", body: "doraOverview", state: "new", span: 4, rows: 2 },
  { id: "cycle-time", title: "Cycle time breakdown", kind: "flow/cycle", body: "cycleTime", span: 4, rows: 2 },
  { id: "review-lat", title: "PR review latency · p50", kind: "review/latency", body: "metric", value: "5.4h", delta: "▼ 1.1h vs −14d", deltaTone: "ok", spark: [9, 8.5, 8, 7.5, 7.2, 7, 6.8, 6.6, 6.5, 6.3, 6.2, 6, 5.9, 5.8, 5.7, 5.6, 5.5, 5.5, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4], span: 4 },
  { id: "flaky", title: "Flaky builds · 7d", kind: "ci/flaky", body: "metric", value: "37", delta: "▲ 9 vs −7d", deltaTone: "warn", spark: [12, 14, 16, 15, 18, 20, 22, 24, 25, 28, 30, 32, 33, 34, 35, 36, 37, 37, 37, 37, 37, 37, 37, 37], span: 4 },
  { id: "blocked", title: "Blocked work", kind: "flow/blocked", body: "blocked", span: 4 },
  { id: "team-health", title: "Team delivery health", kind: "team/health", body: "metric", value: "78 / 100", delta: "▲ 4 vs −14d", deltaTone: "ok", spark: [70, 71, 71, 72, 72, 73, 73, 74, 74, 74, 75, 75, 76, 76, 76, 77, 77, 77, 77, 78, 78, 78, 78, 78], span: 4 },
  { id: "review-table", title: "PR review latency by team", kind: "review/by-team", body: "prTable", span: 12, rows: 2 },
];

const prReviewRows: PRReviewRow[] = [
  { team: "platform", open: 8, first: "2.4h", merge: "11h", stale: <span style={{ color: "var(--m-fg-2)" }}>0</span> },
  { team: "growth", open: 14, first: <span style={{ color: "var(--m-warn)" }}>9.1h</span>, merge: "31h", stale: <span style={{ color: "var(--m-warn)" }}>3</span> },
  { team: "billing", open: 6, first: "4.2h", merge: "18h", stale: <span style={{ color: "var(--m-warn)" }}>1</span> },
  { team: "search", open: 9, first: "1.8h", merge: "9h", stale: <span style={{ color: "var(--m-fg-2)" }}>0</span> },
  { team: "data-pipelines", open: 12, first: <span style={{ color: "var(--m-warn)" }}>14.6h</span>, merge: "44h", stale: <span style={{ color: "var(--m-warn)" }}>5</span> },
  { team: "mobile", open: 4, first: "3h", merge: "14h", stale: <span style={{ color: "var(--m-fg-2)" }}>0</span> },
];

const prReviewColumns = [
  { key: "team" as const, header: "Team", width: "34%" },
  { key: "open" as const, header: "Open PRs", align: "right" as const, width: "16%" },
  { key: "first" as const, header: "1st response", align: "right" as const, width: "18%" },
  { key: "merge" as const, header: "Time to merge", align: "right" as const, width: "18%" },
  { key: "stale" as const, header: "Stale > 3d", align: "right" as const, width: "14%" },
];

function MetricBody({ value, delta, deltaTone = "ok", spark }: { value: string; delta: string; deltaTone?: "ok" | "warn" | "err"; spark?: number[] }) {
  return (
    <div className="de-metric-body">
      <div>
        <div className="de-metric-value">{value}</div>
        <div className={`de-metric-delta de-tone-${deltaTone}`}>{delta}</div>
      </div>
      {spark ? (
        <div className="de-spark" aria-hidden="true">
          {spark.slice(-12).map((point, index) => (
            <span key={index} style={{ height: `${Math.max(7, Math.min(30, point / 1.2))}px` }} data-accent={index > 7 ? "secondary" : "primary"} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

function DeployFreqBody() {
  const bars = [4, 6, 5, 7, 8, 6, 9, 11, 10, 12, 14, 13, 15, 14, 12, 16, 18, 17, 15, 19, 21, 18, 22, 24];
  const rollbacks = [0, 1, 0, 0, 1, 0, 1, 0, 0, 1, 0, 1, 0, 0, 0, 1, 1, 0, 0, 1, 0, 0, 1, 1];
  const width = bars.length * 14;
  const height = 100;

  return (
    <div className="de-chart-body">
      <div className="de-widget-kpi-row">
        <span className="de-widget-kpi">24/day</span>
        <span className="de-widget-kpi-delta">▲ 18% vs −14d</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" className="de-chart-svg" preserveAspectRatio="none" aria-label="Deployment frequency chart">
        {bars.map((value, index) => {
          const barHeight = (value / 24) * (height - 4);
          return <rect key={index} x={index * 14 + 1} y={height - barHeight} width={12} height={barHeight} rx={2} fill="var(--m-cyan-500)" opacity={0.65} />;
        })}
        {rollbacks.map((value, index) => value ? <circle key={index} cx={index * 14 + 7} cy={height - (bars[index] / 24) * (height - 4) - 5} r={3} fill="var(--m-purple-500)" opacity={0.9} /> : null)}
      </svg>
      <div className="de-legend">
        <span><i data-accent="primary" />deploys</span>
        <span><i data-accent="secondary" />rollbacks</span>
      </div>
    </div>
  );
}

function DoraOverviewBody() {
  const cells = [
    { label: "Deploy frequency", value: "24/day", trend: "▲ 18%", tone: "ok", tier: "Elite" },
    { label: "Lead time", value: "41h", trend: "▼ 6h", tone: "ok", tier: "High" },
    { label: "Change failure rate", value: "4.2%", trend: "▲ 0.8%", tone: "warn", tier: "High" },
    { label: "MTTR", value: "37m", trend: "▼ 12m", tone: "ok", tier: "Elite" },
  ];

  return (
    <div className="de-dora-grid">
      {cells.map((cell) => (
        <div key={cell.label} className="de-dora-cell">
          <div className="de-cell-label">{cell.label}</div>
          <div className="de-cell-value-row">
            <span>{cell.value}</span>
            <b data-tone={cell.tone}>{cell.trend}</b>
          </div>
          <div className="de-cell-tier">· {cell.tier}</div>
        </div>
      ))}
    </div>
  );
}

function CycleTimeBarsBody() {
  const segments = [
    { name: "Coding", hours: 14.2, accent: "primary" },
    { name: "Review", hours: 22.6, accent: "secondary" },
    { name: "Merge", hours: 3.1, accent: "primaryLight" },
    { name: "Deploy", hours: 1.4, accent: "secondaryLight" },
  ];
  const total = segments.reduce((sum, segment) => sum + segment.hours, 0);

  return (
    <div className="de-cycle-body">
      <div className="de-widget-kpi-row">
        <span className="de-widget-kpi">{total.toFixed(1)}h</span>
        <span className="de-widget-kpi-delta" data-tone="warn">▲ 3.2h vs −14d</span>
      </div>
      <div className="de-cycle-bar" aria-hidden="true">
        {segments.map((segment) => <i key={segment.name} data-accent={segment.accent} style={{ flex: segment.hours }} />)}
      </div>
      <div className="de-cycle-list">
        {segments.map((segment) => (
          <div key={segment.name}>
            <i data-accent={segment.accent} />
            <span>{segment.name}</span>
            <b>{segment.hours.toFixed(1)}h</b>
          </div>
        ))}
      </div>
    </div>
  );
}

function BlockedWorkBody() {
  const items = [
    { stage: "Review", severity: "warn", title: "feat/cohorts-v2 · waiting 5d", owner: "growth · alex" },
    { stage: "QA", severity: "warn", title: "fix/upload-retries · 4d", owner: "platform · sami" },
    { stage: "Review", severity: "error", title: "refactor/auth-tokens · 7d ↑", owner: "platform · jules" },
    { stage: "Deploy", severity: "warn", title: "perf/index-rebuild · 3d", owner: "search · noor" },
    { stage: "Triage", severity: "info", title: "chore/log-redaction · 3d", owner: "data · kai" },
  ];

  return (
    <div className="de-blocked-list">
      {items.map((item, index) => (
        <div key={item.title} data-severity={item.severity} data-active={index === 0 ? "true" : undefined}>
          <span>{item.stage} · {item.title}</span>
          <small>{item.owner}</small>
        </div>
      ))}
    </div>
  );
}

function PRReviewTableBody() {
  return (
    <div className="de-table-body">
      <MetralyTable
        columns={prReviewColumns}
        data={prReviewRows}
        rowKey={(row) => String(row.team)}
        ariaLabel="PR review latency by team"
        stickyHeader
        dense
      />
    </div>
  );
}

function renderWidgetBody(widget: WidgetDef) {
  switch (widget.body) {
    case "metric":
      return <MetricBody value={widget.value ?? "—"} delta={widget.delta ?? ""} deltaTone={widget.deltaTone} spark={widget.spark} />;
    case "error":
      return <div className="de-state-body"><StateBadge state="disconnected" label="Source disconnected" /></div>;
    case "deployFreq":
      return <DeployFreqBody />;
    case "doraOverview":
      return <DoraOverviewBody />;
    case "cycleTime":
      return <CycleTimeBarsBody />;
    case "blocked":
      return <BlockedWorkBody />;
    case "prTable":
      return <PRReviewTableBody />;
    default:
      return null;
  }
}

function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={`de-sidebar ${open ? "is-open" : ""}`} aria-label="Dashboard navigation" id="dashboard-editor-nav">
      <div className="de-sidebar-head">
        <div className="de-logo-mark">M</div>
        <div className="de-logo-title">METRALY</div>
        <div className="de-logo-subtitle">engineering intelligence</div>
        <button className="de-icon-button de-drawer-close" type="button" onClick={onClose} aria-label="Close navigation">
          <Icon name="close" size={14} />
        </button>
      </div>
      <nav className="de-nav-links">
        {sidebarNav.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={item.active ? "is-active" : undefined} onClick={onClose}>
            {item.active ? <span className="de-active-rail" /> : null}
            <Icon name={item.icon} size={13} />
            <span>{item.label}</span>
            {item.badge != null ? <b>{item.badge}</b> : null}
          </a>
        ))}
      </nav>
      <div className="de-sidebar-spacer" />
      <div className="de-nav-footer">
        {sidebarFooter.map((item) => (
          <a key={item.id} href={`#${item.id}`} onClick={onClose}>
            <Icon name={item.icon} size={13} />
            <span>{item.label}</span>
          </a>
        ))}
      </div>
    </aside>
  );
}

function Topbar({ onOpenNav, onOpenLibrary }: { onOpenNav: () => void; onOpenLibrary: () => void }) {
  return (
    <header className="de-topbar">
      <button className="de-icon-button de-nav-action" type="button" onClick={onOpenNav} aria-label="Open navigation" aria-controls="dashboard-editor-nav">
        <Icon name="menu" size={14} />
      </button>
      <div className="de-title-block">
        <div className="de-breadcrumb">Workspace / Acme / Dashboards / Delivery</div>
        <div className="de-title-line">
          <span>Delivery · all teams</span>
          <small>· 14d window · 6 teams</small>
        </div>
      </div>
      <div className="de-top-actions">
        <select aria-label="Time range">
          <option>Last 14 days</option>
        </select>
        <button type="button"><Icon name="refresh" size={12} /> Refresh</button>
        <button type="button" aria-label="Dashboard settings"><Icon name="settings" size={12} /></button>
        <button className="de-library-action" type="button" onClick={onOpenLibrary} aria-label="Open widget library" aria-controls="dashboard-editor-library">
          <Icon name="widgets" size={13} /> Widgets
        </button>
      </div>
    </header>
  );
}

function EditBanner() {
  return (
    <div className="de-edit-banner">
      <span>Edit mode</span>
      <small>· Drag widgets with grip dots · Resize from corner handles · Drag from library to add</small>
      <button type="button"><Icon name="check" size={11} /> Done</button>
    </div>
  );
}

function DashboardGrid() {
  return (
    <div className="de-dashboard-grid" id="dashboard-overview">
      {widgets.map((widget) => (
        <section key={widget.id} id={widget.id} className={`de-grid-cell de-span-${widget.span} de-rows-${widget.rows ?? 1}`}>
          <DashboardWidget id={widget.id} title={widget.title} subtitle={widget.kind} state={widget.state ?? "live"} selected={widget.selected} dragging={widget.dragging} resizable={widget.id !== "ci-status"}>
            {renderWidgetBody(widget)}
          </DashboardWidget>
        </section>
      ))}
      <section className="de-grid-cell de-span-12 de-drop-cell" aria-label="Dashboard drop zone">
        <DashboardDropZone state="idle" label="Drag a widget here · or click + Add widget" />
      </section>
      <div className="de-resize-row">
        <DashboardResizeHandle direction="east" label="Resize width" active />
        <DashboardResizeHandle direction="southeast" label="Resize corner" active />
      </div>
    </div>
  );
}

function WidgetLibrary({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <aside className={`de-library ${open ? "is-open" : ""}`} id="dashboard-editor-library" aria-label="Widget library">
      <div className="de-library-head">
        <Icon name="grid" size={13} />
        <span>Widget library</span>
        <button className="de-icon-button" type="button" onClick={onClose} aria-label="Close widget library">
          <Icon name="close" size={14} />
        </button>
      </div>
      <div className="de-library-search">
        <Icon name="search" size={12} />
        <input placeholder="Filter widgets…" readOnly aria-label="Filter widgets" />
      </div>
      <div className="de-library-tabs" aria-label="Widget categories">
        <button type="button" data-active="true">Recommended</button>
        <button type="button">DORA</button>
        <button type="button">Flow</button>
        <button type="button">CI</button>
      </div>
      <div className="de-library-list">
        {pickerItems.map((item) => (
          <WidgetPickerCard key={item.id} title={item.title} description={item.description} kind={item.kind} iconLabel={item.iconLabel} selected={item.selected} disabled={item.disabled} visualState={item.visualState} />
        ))}
      </div>
    </aside>
  );
}

function ResponsiveStyles() {
  return (
    <style>{`
      .de-shell {
        position: relative;
        display: grid;
        grid-template-columns: 204px minmax(0, 1fr) 324px;
        grid-template-areas: "sidebar main library";
        width: 100%;
        height: min(840px, 100dvh);
        min-height: 640px;
        overflow: hidden;
        background: var(--m-bg-0);
        color: var(--m-fg-1);
        font-family: var(--m-font-ui);
      }

      .de-sidebar,
      .de-library,
      .de-main {
        min-width: 0;
        min-height: 0;
      }

      .de-sidebar {
        grid-area: sidebar;
        display: flex;
        flex-direction: column;
        background: var(--m-bg-1);
        border-right: 1px solid var(--m-line);
        padding: 16px 8px;
        z-index: 20;
      }

      .de-sidebar-head {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        gap: 3px;
        padding: 6px 0 12px;
        margin-bottom: 10px;
        border-bottom: 1px solid var(--m-line-faint);
      }

      .de-logo-mark {
        width: 32px;
        height: 32px;
        border-radius: 8px;
        display: grid;
        place-items: center;
        background: var(--m-bg-2);
        border: 1px solid var(--m-cyan-500);
        color: var(--m-cyan-500);
        font-family: var(--m-font-mono);
        font-size: 14px;
        font-weight: 600;
      }

      .de-logo-title {
        font-size: 10px;
        color: var(--m-fg-1);
        font-weight: 500;
        letter-spacing: 0.04em;
      }

      .de-logo-subtitle,
      .de-breadcrumb,
      .de-cell-label,
      .de-library-tabs button,
      .de-logo-subtitle {
        font-family: var(--m-font-mono);
      }

      .de-logo-subtitle {
        font-size: 9px;
        color: var(--m-fg-3);
      }

      .de-nav-links,
      .de-nav-footer {
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .de-nav-links a,
      .de-nav-footer a {
        position: relative;
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        padding: 7px 10px;
        border-radius: var(--m-r-2);
        color: var(--m-fg-2);
        font-size: var(--m-fs-12);
        text-decoration: none;
      }

      .de-nav-links a:hover,
      .de-nav-footer a:hover,
      .de-nav-links a:focus-visible,
      .de-nav-footer a:focus-visible {
        color: var(--m-fg-0);
        background: var(--m-bg-2);
        outline: none;
      }

      .de-nav-links a.is-active {
        color: var(--m-cyan-500);
        background: var(--m-cyan-bg);
      }

      .de-nav-links a span:not(.de-active-rail),
      .de-nav-footer a span {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .de-nav-links a b {
        margin-left: auto;
        padding: 1px 4px;
        border: 1px solid var(--m-cyan-500);
        border-radius: 999px;
        color: var(--m-cyan-500);
        background: var(--m-cyan-bg);
        font-family: var(--m-font-mono);
        font-size: 8px;
        font-weight: 500;
      }

      .de-active-rail {
        position: absolute;
        left: 0;
        top: 6px;
        bottom: 6px;
        width: 2px;
        border-radius: 2px;
        background: var(--m-cyan-500);
      }

      .de-sidebar-spacer {
        flex: 1;
      }

      .de-nav-footer {
        padding-top: 12px;
        border-top: 1px solid var(--m-line-faint);
      }

      .de-main {
        grid-area: main;
        display: flex;
        flex-direction: column;
        overflow: hidden;
      }

      .de-topbar {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 10px 18px;
        border-bottom: 1px solid var(--m-line);
        background: var(--m-bg-1);
      }

      .de-title-block {
        flex: 1;
        min-width: 0;
        display: flex;
        flex-direction: column;
        gap: 1px;
      }

      .de-breadcrumb {
        overflow: hidden;
        color: var(--m-fg-3);
        font-size: 10px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .de-title-line {
        display: flex;
        align-items: center;
        gap: 10px;
        min-width: 0;
        color: var(--m-fg-0);
        font-size: var(--m-fs-16);
        font-weight: 500;
      }

      .de-title-line span,
      .de-title-line small {
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .de-title-line small {
        color: var(--m-fg-3);
        font-family: var(--m-font-mono);
        font-size: 10px;
        font-weight: 400;
        letter-spacing: 0.04em;
      }

      .de-top-actions {
        display: flex;
        align-items: center;
        gap: 6px;
        min-width: 0;
      }

      .de-top-actions button,
      .de-top-actions select,
      .de-edit-banner button {
        height: 30px;
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 0 10px;
        border: 1px solid var(--m-line);
        border-radius: var(--m-r-2);
        background: var(--m-bg-2);
        color: var(--m-fg-1);
        font-family: var(--m-font-ui);
        font-size: 11px;
        cursor: pointer;
      }

      .de-top-actions button:hover,
      .de-top-actions select:hover,
      .de-edit-banner button:hover,
      .de-icon-button:hover,
      .de-library-tabs button:hover {
        background: var(--m-bg-3);
        border-color: var(--m-line-strong);
      }

      .de-top-actions button:focus-visible,
      .de-top-actions select:focus-visible,
      .de-edit-banner button:focus-visible,
      .de-icon-button:focus-visible,
      .de-library-tabs button:focus-visible {
        outline: 1px solid var(--m-cyan-500);
        box-shadow: var(--m-glow-focus);
      }

      .de-icon-button {
        width: 30px;
        height: 30px;
        display: inline-grid;
        place-items: center;
        border: 1px solid var(--m-line);
        border-radius: var(--m-r-2);
        background: var(--m-bg-2);
        color: var(--m-fg-1);
        cursor: pointer;
      }

      .de-nav-action,
      .de-drawer-close,
      .de-library-action {
        display: none !important;
      }

      .de-content {
        flex: 1;
        min-width: 0;
        overflow: auto;
        padding: 14px;
        display: flex;
        flex-direction: column;
        gap: 10px;
        scrollbar-gutter: stable;
      }

      .de-edit-banner {
        display: flex;
        align-items: center;
        gap: 8px;
        min-width: 0;
        padding: 7px 10px;
        border: 1px dashed var(--m-cyan-500);
        border-radius: var(--m-r-2);
        background: var(--m-cyan-bg);
        color: var(--m-cyan-500);
        font-family: var(--m-font-mono);
        font-size: 10px;
        letter-spacing: 0.04em;
      }

      .de-edit-banner span {
        text-transform: uppercase;
      }

      .de-edit-banner small {
        min-width: 0;
        overflow: hidden;
        color: var(--m-fg-2);
        font-family: var(--m-font-ui);
        font-size: 10px;
        letter-spacing: 0;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .de-edit-banner button {
        height: 24px;
        margin-left: auto;
        padding: 0 8px;
        border-color: var(--m-cyan-500);
        background: transparent;
        color: var(--m-cyan-500);
        font-size: 10px;
      }

      .de-dashboard-grid {
        display: grid;
        grid-template-columns: repeat(12, minmax(0, 1fr));
        grid-auto-flow: dense;
        gap: 10px;
        min-width: 0;
      }

      .de-grid-cell {
        min-width: 0;
        min-height: 138px;
        display: flex;
      }

      .de-grid-cell > * {
        flex: 1;
        min-width: 0;
      }

      .de-rows-2 {
        min-height: 286px;
      }

      .de-span-3 { grid-column: span 3; }
      .de-span-4 { grid-column: span 4; }
      .de-span-8 { grid-column: span 8; }
      .de-span-12 { grid-column: 1 / -1; }

      .de-drop-cell {
        min-height: 86px;
      }

      .de-resize-row {
        grid-column: 1 / -1;
        display: flex;
        justify-content: flex-end;
        gap: 8px;
        min-width: 0;
      }

      .de-library {
        grid-area: library;
        width: 324px;
        display: flex;
        flex-direction: column;
        background: var(--m-bg-1);
        border-left: 1px solid var(--m-line);
        overflow: hidden;
        z-index: 22;
      }

      .de-library-head {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        padding: 10px 12px 8px;
        border-bottom: 1px solid var(--m-line-faint);
      }

      .de-library-head span {
        flex: 1;
        color: var(--m-fg-0);
        font-size: var(--m-fs-12);
        font-weight: 500;
      }

      .de-library-search {
        flex-shrink: 0;
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 8px 12px;
        height: var(--m-control-h);
        padding: 0 10px;
        border: 1px solid var(--m-line);
        border-radius: var(--m-r-2);
        background: var(--m-bg-2);
      }

      .de-library-search input {
        flex: 1;
        min-width: 0;
        border: none;
        outline: none;
        background: transparent;
        color: var(--m-fg-1);
        font-family: var(--m-font-ui);
        font-size: var(--m-fs-12);
      }

      .de-library-tabs {
        flex-shrink: 0;
        display: flex;
        gap: 4px;
        overflow-x: auto;
        padding: 0 12px 8px;
        border-bottom: 1px solid var(--m-line-faint);
      }

      .de-library-tabs button {
        flex: 0 0 auto;
        height: 24px;
        border: 1px solid var(--m-line);
        border-radius: 999px;
        background: var(--m-bg-2);
        color: var(--m-fg-2);
        font-size: 9px;
        letter-spacing: 0.04em;
        cursor: pointer;
      }

      .de-library-tabs button[data-active="true"] {
        color: var(--m-cyan-500);
        border-color: var(--m-cyan-500);
        background: var(--m-cyan-bg);
      }

      .de-library-list {
        flex: 1;
        min-height: 0;
        overflow: auto;
        padding: 10px;
        display: flex;
        flex-direction: column;
        gap: 8px;
      }

      .de-metric-body,
      .de-chart-body,
      .de-cycle-body {
        flex: 1;
        min-height: 0;
        display: flex;
        flex-direction: column;
      }

      .de-metric-body {
        justify-content: space-between;
        padding: 10px;
      }

      .de-metric-value,
      .de-widget-kpi,
      .de-cell-value-row span {
        color: var(--m-fg-0);
        font-family: var(--m-font-mono);
        font-weight: 500;
      }

      .de-metric-value {
        font-size: 22px;
        line-height: 1;
      }

      .de-metric-delta,
      .de-widget-kpi-delta,
      .de-cell-value-row b,
      .de-cell-tier {
        font-family: var(--m-font-mono);
        font-size: 10px;
        font-weight: 400;
      }

      .de-tone-ok,
      .de-widget-kpi-delta,
      .de-cell-value-row b[data-tone="ok"] {
        color: var(--m-ok);
      }

      .de-tone-warn,
      .de-widget-kpi-delta[data-tone="warn"],
      .de-cell-value-row b[data-tone="warn"] {
        color: var(--m-warn);
      }

      .de-tone-err {
        color: var(--m-err);
      }

      .de-spark {
        display: flex;
        align-items: end;
        gap: 2px;
        height: 32px;
      }

      .de-spark span {
        width: 5px;
        border-radius: 999px;
        opacity: 0.78;
        background: var(--m-cyan-500);
      }

      .de-spark span[data-accent="secondary"] {
        background: var(--m-purple-500);
      }

      .de-chart-body {
        gap: 7px;
        padding: 8px 10px;
      }

      .de-widget-kpi-row {
        display: flex;
        align-items: baseline;
        gap: 7px;
        min-width: 0;
      }

      .de-widget-kpi {
        font-size: 20px;
        line-height: 1;
      }

      .de-chart-svg {
        flex: 1;
        min-height: 0;
      }

      .de-legend {
        flex-shrink: 0;
        display: flex;
        gap: 12px;
        color: var(--m-fg-3);
        font-family: var(--m-font-mono);
        font-size: 9px;
      }

      .de-legend span,
      .de-cycle-list div {
        display: inline-flex;
        align-items: center;
        gap: 6px;
      }

      .de-legend i,
      .de-cycle-list i {
        width: 8px;
        height: 8px;
        border-radius: 2px;
        background: var(--m-cyan-500);
        opacity: 0.7;
      }

      .de-legend i[data-accent="secondary"],
      .de-cycle-list i[data-accent="secondary"],
      .de-cycle-bar i[data-accent="secondary"] {
        background: var(--m-purple-500);
      }

      .de-cycle-list i[data-accent="primaryLight"],
      .de-cycle-bar i[data-accent="primaryLight"] {
        background: var(--m-cyan-400);
      }

      .de-cycle-list i[data-accent="secondaryLight"],
      .de-cycle-bar i[data-accent="secondaryLight"] {
        background: var(--m-purple-400);
      }

      .de-dora-grid {
        flex: 1;
        min-height: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 160px), 1fr));
        gap: 6px;
        padding: 8px;
      }

      .de-dora-cell {
        display: flex;
        flex-direction: column;
        gap: 2px;
        min-width: 0;
        padding: 7px 8px;
        border: 1px solid var(--m-line-faint);
        border-radius: 6px;
        background: var(--m-bg-1);
      }

      .de-cell-label {
        color: var(--m-fg-3);
        font-size: 9px;
        letter-spacing: 0.04em;
        text-transform: uppercase;
      }

      .de-cell-value-row {
        display: flex;
        align-items: baseline;
        gap: 6px;
        min-width: 0;
      }

      .de-cell-value-row span {
        font-size: 16px;
      }

      .de-cell-tier {
        color: var(--m-cyan-500);
      }

      .de-cycle-body {
        gap: 10px;
        padding: 10px;
      }

      .de-cycle-bar {
        display: flex;
        height: 12px;
        overflow: hidden;
        border: 1px solid var(--m-line-faint);
        border-radius: 4px;
      }

      .de-cycle-bar i {
        background: var(--m-cyan-500);
        opacity: 0.7;
      }

      .de-cycle-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(min(100%, 120px), 1fr));
        gap: 5px;
      }

      .de-cycle-list div {
        min-width: 0;
        color: var(--m-fg-2);
        font-family: var(--m-font-mono);
        font-size: 9px;
      }

      .de-cycle-list span {
        flex: 1;
        min-width: 0;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .de-cycle-list b {
        color: var(--m-fg-1);
        font-weight: 400;
      }

      .de-blocked-list {
        flex: 1;
        min-height: 0;
        overflow: auto;
        display: flex;
        flex-direction: column;
        gap: 3px;
        padding: 6px;
      }

      .de-blocked-list div {
        display: flex;
        flex-direction: column;
        gap: 1px;
        min-width: 0;
        padding: 5px 8px;
        border-left: 2px solid var(--m-line);
        border-radius: 4px;
      }

      .de-blocked-list div[data-active="true"] {
        background: var(--m-bg-3);
      }

      .de-blocked-list div[data-severity="warn"] {
        border-left-color: var(--m-warn);
      }

      .de-blocked-list div[data-severity="error"] {
        border-left-color: var(--m-err);
      }

      .de-blocked-list span {
        overflow: hidden;
        color: var(--m-fg-1);
        font-size: 11px;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .de-blocked-list small {
        color: var(--m-fg-3);
        font-family: var(--m-font-mono);
        font-size: 9px;
      }

      .de-table-body {
        flex: 1;
        min-height: 0;
        overflow: auto;
      }

      .de-state-body {
        min-height: 72px;
        display: grid;
        place-items: center;
        padding: 12px;
      }

      .de-backdrop {
        display: none;
      }

      @media (max-width: 1180px) and (min-width: 761px) {
        .de-shell {
          grid-template-columns: minmax(0, 1fr);
          grid-template-rows: minmax(0, 1fr) minmax(250px, 34dvh);
          grid-template-areas:
            "main"
            "library";
        }

        .de-sidebar {
          position: absolute;
          inset: 0 auto 0 0;
          width: min(42vw, 286px);
          transform: translateX(-104%);
          transition: transform var(--m-dur-2) ease;
          box-shadow: var(--m-shadow-3);
        }

        .de-sidebar.is-open {
          transform: translateX(0);
        }

        .de-drawer-close,
        .de-nav-action {
          display: inline-grid !important;
        }

        .de-drawer-close {
          position: absolute;
          top: 4px;
          right: 4px;
        }

        .de-library {
          width: auto;
          border-left: 0;
          border-top: 1px solid var(--m-line);
        }

        .de-library-list {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(min(100%, 260px), 1fr));
          align-content: start;
        }

        .de-dashboard-grid {
          grid-template-columns: repeat(8, minmax(0, 1fr));
        }

        .de-span-12,
        .de-span-8 {
          grid-column: 1 / -1;
        }
      }

      @media (max-width: 980px) and (min-width: 761px) {
        .de-dashboard-grid {
          grid-template-columns: repeat(6, minmax(0, 1fr));
        }

        .de-span-4,
        .de-span-8,
        .de-span-12 {
          grid-column: 1 / -1;
        }

        .de-span-3 {
          grid-column: span 3;
        }
      }

      @media (max-width: 760px) {
        .de-shell {
          display: flex;
          height: 100dvh;
          min-height: 600px;
          overflow: hidden;
        }

        .de-main {
          width: 100%;
        }

        .de-sidebar {
          position: absolute;
          inset: 0 auto 0 0;
          width: min(84vw, 286px);
          transform: translateX(-104%);
          transition: transform var(--m-dur-2) ease;
          box-shadow: var(--m-shadow-3);
        }

        .de-sidebar.is-open {
          transform: translateX(0);
        }

        .de-library {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          width: auto;
          max-height: min(78dvh, 620px);
          border-left: 0;
          border-top: 1px solid var(--m-line);
          border-radius: var(--m-r-3) var(--m-r-3) 0 0;
          transform: translateY(104%);
          transition: transform var(--m-dur-2) ease;
          box-shadow: var(--m-shadow-3);
        }

        .de-library.is-open {
          transform: translateY(0);
        }

        .de-backdrop.is-open {
          position: absolute;
          inset: 0;
          z-index: 19;
          display: block;
          border: 0;
          background: color-mix(in srgb, var(--m-bg-0) 72%, transparent);
          cursor: pointer;
        }

        .de-library.is-open ~ .de-backdrop,
        .de-sidebar.is-open ~ .de-backdrop {
          display: block;
        }

        .de-drawer-close,
        .de-nav-action,
        .de-library-action {
          display: inline-grid !important;
        }

        .de-library-action {
          display: inline-flex !important;
        }

        .de-drawer-close {
          position: absolute;
          top: 4px;
          right: 4px;
        }

        .de-topbar {
          align-items: flex-start;
          gap: 8px;
          padding: 8px;
        }

        .de-title-line {
          flex-direction: column;
          align-items: flex-start;
          gap: 1px;
          font-size: 13px;
        }

        .de-breadcrumb {
          font-size: 9px;
        }

        .de-top-actions {
          flex: 0 0 auto;
          flex-wrap: wrap;
          justify-content: flex-end;
          max-width: 136px;
        }

        .de-top-actions select,
        .de-top-actions button:not(.de-library-action):not([aria-label="Dashboard settings"]) {
          display: none;
        }

        .de-content {
          padding: 8px;
          gap: 8px;
        }

        .de-edit-banner {
          align-items: flex-start;
          gap: 6px;
          flex-wrap: wrap;
          padding: 7px 8px;
        }

        .de-edit-banner small {
          flex-basis: 100%;
          white-space: normal;
        }

        .de-edit-banner button {
          margin-left: 0;
        }

        .de-dashboard-grid {
          grid-template-columns: minmax(0, 1fr);
          gap: 8px;
        }

        .de-grid-cell,
        .de-span-3,
        .de-span-4,
        .de-span-8,
        .de-span-12 {
          grid-column: 1 / -1;
          min-height: 132px;
        }

        .de-rows-2 {
          min-height: 220px;
        }

        .de-drop-cell {
          min-height: 82px;
        }

        .de-resize-row {
          justify-content: flex-start;
        }

        .de-library-list {
          padding-bottom: 16px;
        }

        .de-library-tabs {
          scrollbar-width: none;
        }

        .de-library-tabs::-webkit-scrollbar {
          display: none;
        }
      }

      @media (max-width: 420px) {
        .de-shell {
          min-height: 560px;
        }

        .de-widget-kpi-row,
        .de-cell-value-row {
          flex-wrap: wrap;
        }

        .de-dora-grid,
        .de-cycle-list {
          grid-template-columns: minmax(0, 1fr);
        }

        .de-metric-value {
          font-size: 20px;
        }
      }
    `}</style>
  );
}

export function DashboardEditorResponsiveScenario() {
  const [isNavOpen, setNavOpen] = React.useState(false);
  const [isLibraryOpen, setLibraryOpen] = React.useState(false);

  const closeDrawers = React.useCallback(() => {
    setNavOpen(false);
    setLibraryOpen(false);
  }, []);

  return (
    <div className="de-shell">
      <ResponsiveStyles />
      <Sidebar open={isNavOpen} onClose={() => setNavOpen(false)} />
      <div className="de-main">
        <Topbar onOpenNav={() => setNavOpen(true)} onOpenLibrary={() => setLibraryOpen(true)} />
        <main className="de-content">
          <DashboardToolbar
            tabs={[
              { value: "delivery", label: "Delivery", count: 11 },
              { value: "dora", label: "DORA", count: 4 },
              { value: "flow", label: "Flow", count: 6 },
              { value: "reviews", label: "Reviews", count: 5 },
              { value: "ci", label: "CI", count: 3 },
            ]}
            activeTab="delivery"
            searchValue=""
            syncState="live"
            syncLabel="Live · 30s"
            editMode
            onToggleEdit={() => undefined}
            onAddWidget={() => setLibraryOpen(true)}
            addWidgetLabel="Add widget"
          />
          <EditBanner />
          <DashboardGrid />
        </main>
      </div>
      <WidgetLibrary open={isLibraryOpen} onClose={() => setLibraryOpen(false)} />
      <button className={`de-backdrop ${isNavOpen || isLibraryOpen ? "is-open" : ""}`} type="button" aria-label="Close overlay" onClick={closeDrawers} />
    </div>
  );
}

export default DashboardEditorResponsiveScenario;
