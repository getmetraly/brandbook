import * as React from "react";
import {
  DashboardDropZone,
  DashboardToolbar,
  DashboardWidget,
  MetralyBottomSheet,
  MetralyDrawer,
  MetralyTable,
  StateBadge,
  WidgetPickerCard,
} from "@metraly/ui";

type IconName = "grid" | "metric" | "lightning" | "chart" | "log" | "refresh" | "bell" | "user" | "settings" | "search" | "check" | "menu" | "widgets" | "close";

type WidgetKind = "metric" | "error" | "deploys" | "table" | "drop";

type WidgetDef = {
  id: string;
  title: string;
  subtitle: string;
  state?: "live" | "error" | "new" | "stale" | "noData";
  stateLabel?: string;
  selected?: boolean;
  dragging?: boolean;
  resizable?: boolean;
  kind: WidgetKind;
  value?: string;
  delta?: string;
  span?: "small" | "wide" | "full";
};

type ReviewRow = {
  team: React.ReactNode;
  open: React.ReactNode;
  first: React.ReactNode;
  merge: React.ReactNode;
  stale: React.ReactNode;
};

function Icon({ name, size = 14 }: { name: IconName | string; size?: number }) {
  const paths: Record<string, React.ReactNode> = {
    grid: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M2 3.5h4v4H2zM8 3.5h4v4H8zM2 9h4v1.5H2zM8 9h4v1.5H8z" />,
    metric: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M1.5 10.5h2V7h2v3.5h2V5h2v5.5h2V2.5h2v8" />,
    lightning: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" fill="currentColor" fillOpacity={0.2} d="M8.5 1.5 5 7h4.5l-3 6 6-7.5H8.5z" />,
    chart: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M1.5 10.5 4.5 7l2.5 2L10 4l3 3" />,
    log: <path strokeLinecap="round" strokeWidth="1.35" d="M2.5 4.5h9M2.5 7h6M2.5 9.5h8" />,
    refresh: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M11.5 4A5 5 0 1 0 12 7M11.5 1v3h-3" />,
    bell: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M4 8a3 3 0 0 1 6 0v3H4V8zM5.5 11v.5a1.5 1.5 0 0 0 3 0V11" />,
    user: <path strokeLinecap="round" strokeWidth="1.35" d="M7 7.5a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5ZM2 13c0-2.8 2.2-5 5-5s5 2.2 5 5" />,
    settings: <path strokeLinecap="round" strokeWidth="1.35" d="M7 2v1.5M7 11.5V13M2 7h1.5M11.5 7H13M7 9a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z" />,
    search: <path strokeLinecap="round" strokeWidth="1.35" d="M9 9 12 12M9.5 6A3.5 3.5 0 1 1 2.5 6a3.5 3.5 0 0 1 7 0Z" />,
    check: <path strokeLinecap="round" strokeWidth="1.35" d="M2.5 7l3 3 6-6" />,
    menu: <path strokeLinecap="round" strokeWidth="1.35" d="M2 4h10M2 7h10M2 10h10" />,
    widgets: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.35" d="M2 3.5h4v4H2zM8 3.5h4v2.8H8zM8 8.3h4v2.2H8zM2 9h4v1.5H2z" />,
    close: <path strokeLinecap="round" strokeWidth="1.35" d="m3.5 3.5 7 7M10.5 3.5l-7 7" />,
  };

  return (
    <svg viewBox="0 0 14 14" width={size} height={size} fill="none" stroke="currentColor" aria-hidden="true">
      {paths[name] ?? null}
    </svg>
  );
}

const navItems = [
  { id: "overview", label: "Overview", icon: "grid" },
  { id: "delivery", label: "Delivery", icon: "metric", active: true },
  { id: "dora", label: "DORA", icon: "lightning" },
  { id: "flow", label: "Flow & WIP", icon: "chart" },
  { id: "reviews", label: "Code review", icon: "log", badge: 3 },
  { id: "ci", label: "CI health", icon: "refresh" },
  { id: "incidents", label: "Incidents", icon: "bell" },
  { id: "teams", label: "Teams", icon: "user" },
];

const pickerItems = [
  { id: "deploy-freq", iconLabel: "lightning", title: "Deployment frequency", kind: "dora/deploy-freq", description: "Deploys per day, by service & team." },
  { id: "lead-time", iconLabel: "metric", title: "Lead time for changes", kind: "dora/lead-time", description: "PR opened → prod, p50 / p90.", selected: true },
  { id: "cfr", iconLabel: "chart", title: "Change failure rate", kind: "dora/cfr", description: "% of deploys that triggered a rollback." },
  { id: "mttr", iconLabel: "refresh", title: "MTTR", kind: "dora/mttr", description: "Incident open → resolved." },
  { id: "cycle-time", iconLabel: "chart", title: "Cycle time breakdown", kind: "flow/cycle", description: "Coding · review · merge · deploy." },
  { id: "flaky", iconLabel: "lightning", title: "Flaky builds", kind: "ci/flaky", description: "Retried then passed in last 7d.", visualState: "new" as const },
];

const widgets: WidgetDef[] = [
  { id: "deploy-freq", title: "Deployment frequency", subtitle: "DORA/DEPLOY-FREQ", kind: "metric", value: "24 / day", delta: "▲ 18% vs −14d" },
  { id: "lead-time", title: "Lead time for changes", subtitle: "DORA/LEAD-TIME", kind: "metric", value: "41h", delta: "▼ 6h vs −14d", selected: true },
  { id: "cfr", title: "Change failure rate", subtitle: "DORA/CFR", kind: "metric", value: "4.2%", delta: "▲ 0.8% vs −14d", state: "stale", stateLabel: "Stale 4m", dragging: true },
  { id: "ci-status", title: "CI failure rate", subtitle: "CI/FAIL", kind: "error", state: "error", stateLabel: "Error", resizable: false },
  { id: "deploy-chart", title: "Deploys / day · last 14d", subtitle: "DORA/DEPLOY-FREQ", kind: "deploys", span: "wide" },
  { id: "team-health", title: "Team delivery health", subtitle: "TEAM/HEALTH", kind: "metric", value: "78 / 100", delta: "▲ 4 vs −14d" },
  { id: "review-table", title: "PR review latency by team", subtitle: "REVIEW/BY-TEAM", kind: "table", span: "full" },
  { id: "drop-zone", title: "Drop zone", subtitle: "EDITOR/DROP", kind: "drop", span: "full", state: "noData", resizable: false },
];

const reviewRows: ReviewRow[] = [
  { team: "platform", open: 8, first: "2.4h", merge: "11h", stale: 0 },
  { team: "growth", open: 14, first: <span className="des-warn">9.1h</span>, merge: "31h", stale: <span className="des-warn">3</span> },
  { team: "billing", open: 6, first: "4.2h", merge: "18h", stale: <span className="des-warn">1</span> },
  { team: "search", open: 9, first: "1.8h", merge: "9h", stale: 0 },
  { team: "data-pipelines", open: 12, first: <span className="des-warn">14.6h</span>, merge: "44h", stale: <span className="des-warn">5</span> },
  { team: "mobile", open: 4, first: "3h", merge: "14h", stale: 0 },
];


function useMediaQuery(query: string) {
  const [matches, setMatches] = React.useState(false);

  React.useEffect(() => {
    const mediaQuery = window.matchMedia(query);
    const updateMatches = () => setMatches(mediaQuery.matches);
    updateMatches();
    mediaQuery.addEventListener("change", updateMatches);
    return () => mediaQuery.removeEventListener("change", updateMatches);
  }, [query]);

  return matches;
}

const reviewColumns = [
  { key: "team" as const, header: "Team", width: "34%" },
  { key: "open" as const, header: "Open…", align: "right" as const, width: "16%" },
  { key: "first" as const, header: "1st r…", align: "right" as const, width: "18%" },
  { key: "merge" as const, header: "Time…", align: "right" as const, width: "18%" },
  { key: "stale" as const, header: "Sta…", align: "right" as const, width: "14%" },
];

function MetricBody({ value, delta }: { value?: string; delta?: string }) {
  return (
    <div className="des-metric-body">
      <div>
        <div className="des-metric-value">{value}</div>
        <div className="des-delta">{delta}</div>
      </div>
      <div className="des-spark" aria-hidden="true">
        {Array.from({ length: 12 }).map((_, index) => <span key={index} data-accent={index > 7 ? "secondary" : "primary"} style={{ height: `${14 + (index % 5) * 3}px` }} />)}
      </div>
    </div>
  );
}

function DeployChartBody() {
  const bars = [10, 13, 11, 15, 14, 18, 19, 23, 22, 24, 21, 28, 30, 25, 32, 35, 29, 38, 34, 41, 46, 39, 50, 54];
  return (
    <div className="des-chart-body">
      <div className="des-widget-kpi-row"><span>24/day</span><b>▲ 18% vs −14d</b></div>
      <div className="des-bars" aria-hidden="true">
        {bars.map((height, index) => <span key={index} style={{ height }} data-accent={index % 6 === 0 ? "secondary" : "primary"} />)}
      </div>
      <div className="des-legend"><span><i />deploys</span><span><i data-accent="secondary" />rollbacks</span></div>
    </div>
  );
}

function renderWidgetBody(widget: WidgetDef) {
  switch (widget.kind) {
    case "metric":
      return <MetricBody value={widget.value} delta={widget.delta} />;
    case "error":
      return <div className="des-state-center"><StateBadge state="disconnected" label="Source disconnected" /></div>;
    case "deploys":
      return <DeployChartBody />;
    case "table":
      return <div className="des-table-wrap"><MetralyTable columns={reviewColumns} data={reviewRows} rowKey={(row) => String(row.team)} ariaLabel="PR review latency by team" stickyHeader dense /></div>;
    case "drop":
      return <DashboardDropZone state="idle" label="Drag a widget here · or click + Add widget" />;
    default:
      return null;
  }
}

function SidebarContent({ onClose }: { onClose: () => void }) {
  return (
    <>
      <div className="des-sidebar-head">
        <div className="des-logo-mark">M</div>
        <div className="des-logo-title">METRALY</div>
        <div className="des-logo-subtitle">engineering intelligence</div>
      </div>
      <nav className="des-nav-links">
        {navItems.map((item) => (
          <a key={item.id} href={`#${item.id}`} className={item.active ? "is-active" : undefined} onClick={onClose}>
            <Icon name={item.icon} />
            <span>{item.label}</span>
            {item.badge ? <b>{item.badge}</b> : null}
          </a>
        ))}
      </nav>
      <div className="des-sidebar-spacer" />
      <div className="des-nav-footer">
        <a href="#settings" onClick={onClose}><Icon name="settings" /><span>Settings</span></a>
        <a href="#user" onClick={onClose}><Icon name="user" /><span>ops@metraly</span></a>
      </div>
    </>
  );
}

function SidebarPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className="des-sidebar des-sidebar--static" aria-label="Dashboard navigation" id="dashboard-editor-nav">
      <SidebarContent onClose={onClose} />
    </aside>
  );
}

function Topbar({ onOpenNav, onOpenLibrary }: { onOpenNav: () => void; onOpenLibrary: () => void }) {
  return (
    <header className="des-topbar">
      <button className="des-icon-button" type="button" onClick={onOpenNav} aria-label="Open navigation" aria-controls="dashboard-editor-nav"><Icon name="menu" /></button>
      <div className="des-title-block">
        <div className="des-breadcrumb">Workspace / Acme / Dashboards</div>
        <div className="des-title-line"><span>Delivery · all teams</span><small>· 14d window · 6 teams</small></div>
      </div>
      <button className="des-icon-button des-settings-button" type="button" aria-label="Dashboard settings"><Icon name="settings" /></button>
      <button className="des-top-action" type="button" onClick={onOpenLibrary} aria-label="Open widget library" aria-controls="dashboard-editor-library"><Icon name="widgets" /> Widgets</button>
    </header>
  );
}

function EditBanner() {
  return (
    <div className="des-edit-banner">
      <span>Edit mode</span>
      <small>· Drag widgets with grip dots · Resize from corner handles · Drag from library to add</small>
      <button type="button"><Icon name="check" size={11} /> Done</button>
    </div>
  );
}

function WidgetLibraryContent({ onClose, showHeader = true }: { onClose: () => void; showHeader?: boolean }) {
  return (
    <>
      {showHeader ? (
        <div className="des-library-head">
          <Icon name="grid" />
          <span>Widget library</span>
          <button className="des-icon-button" type="button" onClick={onClose} aria-label="Close widget library"><Icon name="close" /></button>
        </div>
      ) : null}
      <div className="des-library-list">
        {pickerItems.map((item) => <WidgetPickerCard key={item.id} {...item} />)}
      </div>
    </>
  );
}

function WidgetLibraryPanel({ onClose }: { onClose: () => void }) {
  return (
    <aside className="des-library des-library--static" id="dashboard-editor-library" aria-label="Widget library">
      <WidgetLibraryContent onClose={onClose} />
    </aside>
  );
}

function DashboardGrid() {
  return (
    <div className="des-dashboard-grid">
      {widgets.map((widget) => (
        <section key={widget.id} className={`des-grid-cell des-span-${widget.span ?? "small"}`}>
          <DashboardWidget id={widget.id} title={widget.title} subtitle={widget.subtitle} state={widget.state ?? "live"} stateLabel={widget.stateLabel ?? "Live"} selected={widget.selected} dragging={widget.dragging} resizable={widget.resizable !== false}>
            {renderWidgetBody(widget)}
          </DashboardWidget>
        </section>
      ))}
    </div>
  );
}

export function DashboardEditorStoryScenario() {
  const [navOpen, setNavOpen] = React.useState(false);
  const [libraryOpen, setLibraryOpen] = React.useState(false);
  const useOverlayPanels = useMediaQuery("(max-width: 1180px)");

  const closeOverlays = React.useCallback(() => {
    setNavOpen(false);
    setLibraryOpen(false);
  }, []);

  return (
    <div className="des-shell">
      <SidebarPanel onClose={() => setNavOpen(false)} />
      <div className="des-main">
        <Topbar onOpenNav={() => setNavOpen(true)} onOpenLibrary={() => setLibraryOpen(true)} />
        <main className="des-content">
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
      <WidgetLibraryPanel onClose={() => setLibraryOpen(false)} />
      <MetralyDrawer
        open={useOverlayPanels && navOpen}
        onOpenChange={setNavOpen}
        title="Workspace sections"
        description="Dashboard navigation"
        width="min(100vw, 286px)"
        className="des-nav-drawer"
      >
        <div className="des-overlay-sidebar">
          <SidebarContent onClose={() => setNavOpen(false)} />
        </div>
      </MetralyDrawer>
      <MetralyBottomSheet
        open={useOverlayPanels && libraryOpen}
        onOpenChange={setLibraryOpen}
        title="Widget library"
        description="Drag or select a widget to add"
      >
        <div className="des-overlay-library">
          <WidgetLibraryContent onClose={() => setLibraryOpen(false)} showHeader={false} />
        </div>
      </MetralyBottomSheet>
      <button className={`des-backdrop ${!useOverlayPanels && (navOpen || libraryOpen) ? "is-open" : ""}`} type="button" aria-label="Close overlay" onClick={closeOverlays} />
    </div>
  );
}

export default DashboardEditorStoryScenario;
