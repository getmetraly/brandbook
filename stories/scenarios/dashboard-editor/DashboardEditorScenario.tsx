import * as React from "react";
import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  MetralyButton,
  MetralyIcon,
  MetralyInput,
  MetralyLogo,
  MetralyShell,
  MetralySidebar,
  MetralySidebarItem,
  MetralySidebarSection,
  MetralyTable,
  MetralyTopbar,
  StateBadge,
  WidgetPickerCard,
} from "@metraly/ui";

const sidebarNav = [
  { id: "overview", label: "Overview", icon: "home" as const },
  { id: "delivery", label: "Delivery", icon: "bar2" as const, active: true },
  { id: "dora", label: "DORA", icon: "zap" as const },
  { id: "flow", label: "Flow & WIP", icon: "chart" },
  { id: "reviews", label: "Code review", icon: "copy" as const, badge: 3 },
  { id: "ci", label: "CI health", icon: "refresh" },
  { id: "incidents", label: "Incidents", icon: "bell" },
  { id: "teams", label: "Teams", icon: "users" as const },
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
  position: { col: number; row: number; w: number; h: number };
};

type PRReviewRow = {
  team: React.ReactNode;
  open: React.ReactNode;
  first: React.ReactNode;
  merge: React.ReactNode;
  stale: React.ReactNode;
};

const widgets: WidgetDef[] = [
  { id: "deploy-freq", title: "Deployment frequency", kind: "dora/deploy-freq", body: "metric", value: "24 / day", delta: "▲ 18% vs −14d", deltaTone: "ok", spark: [4, 6, 5, 7, 8, 6, 9, 11, 10, 12, 14, 13, 15, 14, 12, 16, 18, 17, 15, 19, 21, 18, 22, 24], position: { col: 1, row: 1, w: 3, h: 1 } },
  { id: "lead-time", title: "Lead time for changes", kind: "dora/lead-time", body: "metric", value: "41h", delta: "▼ 6h vs −14d", deltaTone: "ok", spark: [62, 60, 58, 56, 55, 54, 52, 50, 49, 48, 47, 46, 45, 44, 44, 43, 43, 42, 42, 42, 41, 41, 41, 41], selected: true, position: { col: 4, row: 1, w: 3, h: 1 } },
  { id: "cfr", title: "Change failure rate", kind: "dora/cfr", body: "metric", value: "4.2%", delta: "▲ 0.8% vs −14d", deltaTone: "warn", spark: [3, 3.1, 3, 2.9, 3.2, 3.4, 3.3, 3.5, 3.6, 3.5, 3.7, 3.8, 3.9, 3.8, 4, 3.9, 4.1, 4, 4.2, 4.1, 4.3, 4.2, 4.2, 4.2], dragging: true, position: { col: 7, row: 1, w: 3, h: 1 } },
  { id: "ci-status", title: "CI failure rate", kind: "ci/fail", body: "error", state: "error", position: { col: 10, row: 1, w: 3, h: 1 } },
  { id: "deploy-chart", title: "Deploys / day · last 14d", kind: "dora/deploy-freq", body: "deployFreq", position: { col: 1, row: 2, w: 8, h: 2 } },
  { id: "dora-overview", title: "DORA overview", kind: "dora/overview", body: "doraOverview", state: "new", position: { col: 9, row: 2, w: 4, h: 2 } },
  { id: "cycle-time", title: "Cycle time breakdown", kind: "flow/cycle", body: "cycleTime", position: { col: 1, row: 4, w: 4, h: 2 } },
  { id: "review-lat", title: "PR review latency · p50", kind: "review/latency", body: "metric", value: "5.4h", delta: "▼ 1.1h vs −14d", deltaTone: "ok", spark: [9, 8.5, 8, 7.5, 7.2, 7, 6.8, 6.6, 6.5, 6.3, 6.2, 6, 5.9, 5.8, 5.7, 5.6, 5.5, 5.5, 5.4, 5.4, 5.4, 5.4, 5.4, 5.4], position: { col: 5, row: 4, w: 4, h: 1 } },
  { id: "flaky", title: "Flaky builds · 7d", kind: "ci/flaky", body: "metric", value: "37", delta: "▲ 9 vs −7d", deltaTone: "warn", spark: [12, 14, 16, 15, 18, 20, 22, 24, 25, 28, 30, 32, 33, 34, 35, 36, 37, 37, 37, 37, 37, 37, 37, 37], position: { col: 9, row: 4, w: 4, h: 1 } },
  { id: "blocked", title: "Blocked work", kind: "flow/blocked", body: "blocked", position: { col: 5, row: 5, w: 4, h: 1 } },
  { id: "team-health", title: "Team delivery health", kind: "team/health", body: "metric", value: "78 / 100", delta: "▲ 4 vs −14d", deltaTone: "ok", spark: [70, 71, 71, 72, 72, 73, 73, 74, 74, 74, 75, 75, 76, 76, 76, 77, 77, 77, 77, 78, 78, 78, 78, 78], position: { col: 9, row: 5, w: 4, h: 1 } },
  { id: "review-table", title: "PR review latency by team", kind: "review/by-team", body: "prTable", position: { col: 1, row: 6, w: 12, h: 2 } },
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
    <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", justifyContent: "space-between", minHeight: 0 }}>
      <div>
        <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 22, color: "var(--m-fg-0)", lineHeight: 1, fontWeight: 500 }}>{value}</div>
        <div style={{ fontSize: 10, color: deltaTone === "warn" ? "var(--m-warn)" : deltaTone === "err" ? "var(--m-err)" : "var(--m-ok)", fontFamily: "var(--m-font-mono)", marginTop: 3 }}>{delta}</div>
      </div>
      {spark ? (
        <div style={{ display: "flex", alignItems: "end", gap: 2, height: 32 }}>
          {spark.slice(-12).map((point, index) => (
            <span key={index} style={{ width: 5, height: `${Math.max(7, Math.min(30, point / 1.2))}px`, background: index > 7 ? "var(--m-purple-500)" : "var(--m-cyan-500)", borderRadius: 999, opacity: 0.78 }} />
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
    <div style={{ flex: 1, padding: "8px 10px 8px", display: "flex", flexDirection: "column", gap: 7, minHeight: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 7 }}>
        <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 20, color: "var(--m-fg-0)", lineHeight: 1 }}>24/day</span>
        <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-ok)" }}>▲ 18% vs −14d</span>
      </div>
      <svg viewBox={`0 0 ${width} ${height}`} width="100%" style={{ flex: 1, minHeight: 0 }} preserveAspectRatio="none" aria-hidden="true">
        {bars.map((value, index) => {
          const barHeight = (value / 24) * (height - 4);
          return <rect key={index} x={index * 14 + 1} y={height - barHeight} width={12} height={barHeight} rx={2} fill="var(--m-cyan-500)" opacity={0.65} />;
        })}
        {rollbacks.map((value, index) => value ? <circle key={index} cx={index * 14 + 7} cy={height - (bars[index] / 24) * (height - 4) - 5} r={3} fill="var(--m-purple-500)" opacity={0.9} /> : null)}
      </svg>
      <div style={{ display: "flex", gap: 12, fontFamily: "var(--m-font-mono)", fontSize: 9, color: "var(--m-fg-3)", flexShrink: 0 }}>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 10, height: 8, background: "var(--m-cyan-500)", borderRadius: 2, opacity: 0.65 }} />deploys</span>
        <span style={{ display: "inline-flex", alignItems: "center", gap: 5 }}><span style={{ width: 8, height: 8, borderRadius: 999, background: "var(--m-purple-500)", opacity: 0.9 }} />rollbacks</span>
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
    <div style={{ flex: 1, padding: 8, display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 6, minHeight: 0 }}>
      {cells.map((cell) => (
        <div key={cell.label} style={{ background: "var(--m-bg-1)", border: "1px solid var(--m-line-faint)", borderRadius: 6, padding: "7px 8px", display: "flex", flexDirection: "column", gap: 2 }}>
          <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 9, color: "var(--m-fg-3)", letterSpacing: "0.04em", textTransform: "uppercase" }}>{cell.label}</div>
          <div style={{ display: "flex", alignItems: "baseline", gap: 6 }}>
            <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 16, color: "var(--m-fg-0)" }}>{cell.value}</span>
            <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: cell.tone === "warn" ? "var(--m-warn)" : "var(--m-ok)" }}>{cell.trend}</span>
          </div>
          <div style={{ fontFamily: "var(--m-font-mono)", fontSize: 9, color: "var(--m-cyan-500)" }}>· {cell.tier}</div>
        </div>
      ))}
    </div>
  );
}

function CycleTimeBarsBody() {
  const segments = [
    { name: "Coding", hours: 14.2, color: "var(--m-cyan-500)" },
    { name: "Review", hours: 22.6, color: "var(--m-purple-500)" },
    { name: "Merge", hours: 3.1, color: "var(--m-cyan-400)" },
    { name: "Deploy", hours: 1.4, color: "var(--m-purple-400)" },
  ];
  const total = segments.reduce((sum, segment) => sum + segment.hours, 0);

  return (
    <div style={{ flex: 1, padding: 10, display: "flex", flexDirection: "column", gap: 10, minHeight: 0 }}>
      <div style={{ display: "flex", alignItems: "baseline", gap: 8 }}>
        <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 21, color: "var(--m-fg-0)" }}>{total.toFixed(1)}h</span>
        <span style={{ fontSize: 10, color: "var(--m-warn)", fontFamily: "var(--m-font-mono)" }}>▲ 3.2h vs −14d</span>
      </div>
      <div style={{ display: "flex", height: 12, borderRadius: 4, overflow: "hidden", border: "1px solid var(--m-line-faint)" }}>
        {segments.map((segment) => <div key={segment.name} style={{ flex: segment.hours, background: segment.color, opacity: 0.7 }} />)}
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))", gap: 5 }}>
        {segments.map((segment) => (
          <div key={segment.name} style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 9, fontFamily: "var(--m-font-mono)", color: "var(--m-fg-2)" }}>
            <span style={{ width: 8, height: 8, background: segment.color, borderRadius: 2, opacity: 0.7, flexShrink: 0 }} />
            <span style={{ flex: 1 }}>{segment.name}</span>
            <span style={{ color: "var(--m-fg-1)" }}>{segment.hours.toFixed(1)}h</span>
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
  const severityColor = (severity: string) => severity === "error" ? "var(--m-err)" : severity === "warn" ? "var(--m-warn)" : "var(--m-line)";

  return (
    <div style={{ flex: 1, overflow: "auto", padding: 6, display: "flex", flexDirection: "column", gap: 3 }}>
      {items.map((item, index) => (
        <div key={item.title} style={{ display: "flex", alignItems: "center", gap: 8, padding: "5px 8px", background: index === 0 ? "var(--m-bg-3)" : "transparent", borderRadius: 4, borderLeft: `2px solid ${severityColor(item.severity)}` }}>
          <span style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <span style={{ fontSize: 11, color: "var(--m-fg-1)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>{item.stage} · {item.title}</span>
            <span style={{ fontSize: 9, color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)" }}>{item.owner}</span>
          </span>
        </div>
      ))}
    </div>
  );
}

function PRReviewTableBody() {
  return (
    <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
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

function ScenarioSidebar() {
  const header = (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 12px 14px", borderBottom: "1px solid var(--m-line-faint)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <MetralyLogo variant="mark" />
        <div style={{ minWidth: 0, display: "flex", flexDirection: "column", gap: 2 }}>
          <span style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 600, letterSpacing: "0.04em" }}>METRALY</span>
          <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>engineering intelligence</span>
        </div>
      </div>
      <div style={{ display: "inline-flex", alignItems: "center", gap: 6, width: "fit-content", borderRadius: 999, border: "1px solid var(--m-line-faint)", background: "var(--m-ok-bg)", padding: "4px 10px", color: "var(--m-ok)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>
        <span className="metraly-pulse-dot" style={{ width: 6, height: 6, borderRadius: 999, background: "currentColor" }} />
        All systems nominal
      </div>
    </div>
  );

  const footer = (
    <MetralySidebarSection>
      {sidebarFooter.map((item) => (
        <MetralySidebarItem
          key={item.id}
          icon={<MetralyIcon name={item.icon} size={14} />}
          label={item.label}
        />
      ))}
    </MetralySidebarSection>
  );

  return (
    <MetralySidebar expandedWidth={196} header={header} footer={footer} aria-label="Dashboard navigation">
      <MetralySidebarSection label="Dashboards">
        {sidebarNav.map((item) => (
          <MetralySidebarItem
            key={item.id}
            active={item.active}
            icon={<MetralyIcon name={item.icon} size={14} />}
            label={item.label}
            meta={item.badge != null ? <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 8, color: "inherit", background: "var(--m-cyan-bg)", padding: "1px 4px", borderRadius: 999, border: "1px solid currentColor" }}>{item.badge}</span> : undefined}
          />
        ))}
      </MetralySidebarSection>
    </MetralySidebar>
  );
}

function ScenarioTopbar() {
  return (
    <MetralyTopbar
      density="compact"
      breadcrumb="Workspace / Acme / Dashboards / Delivery"
      title={
        <span style={{ display: "inline-flex", alignItems: "center", gap: 10 }}>
          <span>Delivery · all teams</span>
          <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)", letterSpacing: "0.04em" }}>· 14d window · 6 teams</span>
        </span>
      }
      actions={
        <>
          <MetralyButton variant="ghost">Last 14 days</MetralyButton>
          <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="refresh" size={12} />}>Refresh</MetralyButton>
          <MetralyButton variant="ghost" aria-label="Dashboard settings" iconLeft={<MetralyIcon name="settings" size={12} />} />
        </>
      }
    />
  );
}

function ScenarioEditBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "var(--m-cyan-bg)", border: "1px dashed var(--m-cyan-500)", borderRadius: "var(--m-r-2)", fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-cyan-500)", letterSpacing: "0.04em" }}>
      <span style={{ textTransform: "uppercase" }}>Edit mode</span>
      <span style={{ color: "var(--m-fg-2)", textTransform: "none", letterSpacing: 0 }}>· Drag widgets with grip dots · Resize from corner handles · Drag from library to add</span>
      <span style={{ flex: 1 }} />
      <MetralyButton size="sm" variant="secondary" iconLeft={<MetralyIcon name="check" size={11} />}>Done</MetralyButton>
    </div>
  );
}

function renderWidgetBody(widget: WidgetDef) {
  switch (widget.body) {
    case "metric":
      return <MetricBody value={widget.value ?? "—"} delta={widget.delta ?? ""} deltaTone={widget.deltaTone} spark={widget.spark} />;
    case "error":
      return <div style={{ padding: 12, display: "grid", placeItems: "center", minHeight: 72 }}><StateBadge state="disconnected" label="Source disconnected" /></div>;
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

function ScenarioDashboardGrid() {
  return (
    <div style={{ display: "grid", gridTemplateColumns: "repeat(12, 1fr)", gridAutoRows: "minmax(138px, auto)", gap: 10 }}>
      {widgets.map((widget) => (
        <div key={widget.id} style={{ gridColumn: `${widget.position.col} / span ${widget.position.w}`, gridRow: `${widget.position.row} / span ${widget.position.h}` }}>
          <DashboardWidget id={widget.id} title={widget.title} subtitle={widget.kind} state={widget.state ?? "live"} selected={widget.selected} dragging={widget.dragging} resizable={widget.id !== "ci-status"}>
            {renderWidgetBody(widget)}
          </DashboardWidget>
        </div>
      ))}
      <div style={{ gridColumn: "1 / span 12" }}>
        <DashboardDropZone state="idle" label="Drag a widget here · or click + Add widget" />
      </div>
      <div style={{ gridColumn: "1 / span 12", display: "flex", justifyContent: "flex-end", gap: 8 }}>
        <DashboardResizeHandle direction="east" label="Resize width" active />
        <DashboardResizeHandle direction="southeast" label="Resize corner" active />
      </div>
    </div>
  );
}

function ScenarioWidgetLibrary() {
  return (
    <aside style={{ width: 320, flexShrink: 0, background: "var(--m-bg-1)", borderLeft: "1px solid var(--m-line)", display: "flex", flexDirection: "column" }}>
      <div style={{ padding: "10px 12px 8px", display: "flex", alignItems: "center", gap: 8, borderBottom: "1px solid var(--m-line-faint)", flexShrink: 0 }}>
        <MetralyIcon name="boxes" size={13} />
        <span style={{ flex: 1, fontSize: "var(--m-fs-12)", color: "var(--m-fg-0)", fontWeight: 500 }}>Widget library</span>
        <MetralyButton variant="neutral" size="sm" aria-label="Close widget library" iconLeft={<MetralyIcon name="x" size={12} />} />
      </div>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--m-line-faint)", flexShrink: 0 }}>
        <MetralyInput
          search
          readOnly
          value=""
          placeholder="Filter widgets…"
          fullWidth
          iconLeft={<MetralyIcon name="search" size={12} />}
        />
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 10, display: "flex", flexDirection: "column", gap: 8 }}>
        {pickerItems.map((item) => (
          <WidgetPickerCard key={item.id} title={item.title} description={item.description} kind={item.kind} iconLabel={item.iconLabel} selected={item.selected} disabled={item.disabled} visualState={item.visualState} />
        ))}
      </div>
    </aside>
  );
}

export function DashboardEditorScenario() {
  return (
    <MetralyShell style={{ height: 840 }}>
      <ScenarioSidebar />
      <div style={{ flex: 1, display: "flex", flexDirection: "column", minWidth: 0 }}>
        <ScenarioTopbar />
        <main style={{ flex: 1, overflow: "auto", padding: 14, display: "flex", flexDirection: "column", gap: 10, minWidth: 0 }}>
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
            onAddWidget={() => undefined}
            addWidgetLabel="Add widget"
          />
          <ScenarioEditBanner />
          <ScenarioDashboardGrid />
        </main>
      </div>
      <ScenarioWidgetLibrary />
    </MetralyShell>
  );
}

export default DashboardEditorScenario;
