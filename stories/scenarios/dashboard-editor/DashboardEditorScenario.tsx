import * as React from "react";
import {
  DashboardDropZone,
  DashboardResizeHandle,
  DashboardToolbar,
  DashboardWidget,
  StateBadge,
  WidgetPickerCard,
} from "@metraly/ui";

function Icon({ name, size = 13 }: { name: string; size?: number }) {
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
  };

  return (
    <svg viewBox="0 0 14 14" width={size} height={size} fill="none" stroke="currentColor" aria-hidden="true" style={{ flexShrink: 0 }}>
      {paths[name] ?? null}
    </svg>
  );
}

const shellStyle: React.CSSProperties = {
  display: "flex",
  width: "100%",
  height: 840,
  background: "var(--m-bg-0)",
  color: "var(--m-fg-1)",
  overflow: "hidden",
};

const ghostButtonStyle: React.CSSProperties = {
  height: 30,
  padding: "0 10px",
  background: "var(--m-bg-2)",
  border: "1px solid var(--m-line)",
  color: "var(--m-fg-1)",
  borderRadius: "var(--m-r-2)",
  fontSize: 11,
  fontFamily: "var(--m-font-ui)",
  display: "inline-flex",
  alignItems: "center",
  gap: 6,
  cursor: "pointer",
};

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
  position: { col: number; row: number; w: number; h: number };
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
    <div style={{ flex: 1, padding: 8, display: "grid", gridTemplateColumns: "1fr 1fr", gap: 6, minHeight: 0 }}>
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
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 5 }}>
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
  const rows = [
    { team: "platform", open: 8, first: 2.4, merge: "11h", stale: 0 },
    { team: "growth", open: 14, first: 9.1, merge: "31h", stale: 3 },
    { team: "billing", open: 6, first: 4.2, merge: "18h", stale: 1 },
    { team: "search", open: 9, first: 1.8, merge: "9h", stale: 0 },
    { team: "data-pipelines", open: 12, first: 14.6, merge: "44h", stale: 5 },
    { team: "mobile", open: 4, first: 3, merge: "14h", stale: 0 },
  ];
  const th: React.CSSProperties = { padding: "5px 8px", textAlign: "left", fontSize: 9, fontFamily: "var(--m-font-mono)", color: "var(--m-fg-3)", fontWeight: 600, letterSpacing: "0.04em", textTransform: "uppercase", borderBottom: "1px solid var(--m-line)", background: "var(--m-bg-1)" };
  const td: React.CSSProperties = { padding: "5px 8px", textAlign: "left", fontSize: 10, fontFamily: "var(--m-font-mono)", color: "var(--m-fg-1)", borderBottom: "1px solid var(--m-line-faint)" };

  return (
    <div style={{ flex: 1, overflow: "auto", minHeight: 0 }}>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            <th style={th}>Team</th>
            <th style={{ ...th, textAlign: "right" }}>Open PRs</th>
            <th style={{ ...th, textAlign: "right" }}>1st response</th>
            <th style={{ ...th, textAlign: "right" }}>Time to merge</th>
            <th style={{ ...th, textAlign: "right" }}>Stale &gt; 3d</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((row) => (
            <tr key={row.team}>
              <td style={td}>{row.team}</td>
              <td style={{ ...td, textAlign: "right" }}>{row.open}</td>
              <td style={{ ...td, textAlign: "right", color: row.first > 8 ? "var(--m-warn)" : "var(--m-fg-1)" }}>{row.first}h</td>
              <td style={{ ...td, textAlign: "right" }}>{row.merge}</td>
              <td style={{ ...td, textAlign: "right", color: row.stale > 0 ? "var(--m-warn)" : "var(--m-fg-2)" }}>{row.stale}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function ScenarioSidebar() {
  return (
    <aside style={{ width: 196, flexShrink: 0, background: "var(--m-bg-1)", borderRight: "1px solid var(--m-line)", display: "flex", flexDirection: "column", padding: "16px 8px" }}>
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 3, padding: "6px 0 12px", borderBottom: "1px solid var(--m-line-faint)", marginBottom: 10 }}>
        <div style={{ width: 32, height: 32, borderRadius: 8, background: "var(--m-bg-2)", border: "1px solid var(--m-cyan-500)", display: "grid", placeItems: "center", fontFamily: "var(--m-font-mono)", fontSize: 14, fontWeight: 600, color: "var(--m-cyan-500)" }}>M</div>
        <div style={{ fontSize: 10, color: "var(--m-fg-1)", fontWeight: 500, letterSpacing: "0.04em" }}>METRALY</div>
        <div style={{ fontSize: 9, color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)" }}>engineering intelligence</div>
      </div>
      <nav style={{ display: "flex", flexDirection: "column", gap: 1 }}>
        {sidebarNav.map((item) => (
          <div key={item.id} style={{ position: "relative", display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", borderRadius: "var(--m-r-2)", background: item.active ? "var(--m-cyan-bg)" : "transparent", color: item.active ? "var(--m-cyan-500)" : "var(--m-fg-2)", fontSize: "var(--m-fs-12)", cursor: "pointer" }}>
            {item.active ? <span style={{ position: "absolute", left: 0, top: 6, bottom: 6, width: 2, background: "var(--m-cyan-500)", borderRadius: 2 }} /> : null}
            <Icon name={item.icon} size={13} />
            <span style={{ flex: 1 }}>{item.label}</span>
            {item.badge != null ? <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 8, color: "var(--m-cyan-500)", background: "var(--m-cyan-bg)", padding: "1px 4px", borderRadius: 999, border: "1px solid var(--m-cyan-500)" }}>{item.badge}</span> : null}
          </div>
        ))}
      </nav>
      <div style={{ flex: 1 }} />
      <div style={{ display: "flex", flexDirection: "column", gap: 1, paddingTop: 12, borderTop: "1px solid var(--m-line-faint)" }}>
        {sidebarFooter.map((item) => (
          <div key={item.id} style={{ display: "flex", alignItems: "center", gap: 10, padding: "7px 10px", color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)", borderRadius: "var(--m-r-2)", cursor: "pointer" }}>
            <Icon name={item.icon} size={13} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}

function ScenarioTopbar() {
  return (
    <header style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 18px", borderBottom: "1px solid var(--m-line)", background: "var(--m-bg-1)", flexShrink: 0 }}>
      <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column", gap: 1 }}>
        <div style={{ fontSize: 10, color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", letterSpacing: "0.04em", textTransform: "uppercase" }}>Workspace / Acme / Dashboards / Delivery</div>
        <div style={{ fontSize: "var(--m-fs-16)", color: "var(--m-fg-0)", fontWeight: 500, display: "flex", alignItems: "center", gap: 10 }}>
          Delivery · all teams
          <span style={{ fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-fg-3)", letterSpacing: "0.04em" }}>· 14d window · 6 teams</span>
        </div>
      </div>
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        <select style={{ height: 30, padding: "0 8px", border: "1px solid var(--m-line)", borderRadius: "var(--m-r-2)", background: "var(--m-bg-2)", color: "var(--m-fg-1)", fontFamily: "var(--m-font-ui)", fontSize: 11 }}>
          <option>Last 14 days</option>
        </select>
        <button style={ghostButtonStyle}><Icon name="refresh" size={12} /> Refresh</button>
        <button style={ghostButtonStyle}><Icon name="settings" size={12} /></button>
      </div>
    </header>
  );
}

function ScenarioEditBanner() {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 8, padding: "7px 10px", background: "var(--m-cyan-bg)", border: "1px dashed var(--m-cyan-500)", borderRadius: "var(--m-r-2)", fontFamily: "var(--m-font-mono)", fontSize: 10, color: "var(--m-cyan-500)", letterSpacing: "0.04em" }}>
      <span style={{ textTransform: "uppercase" }}>Edit mode</span>
      <span style={{ color: "var(--m-fg-2)", textTransform: "none", letterSpacing: 0 }}>· Drag widgets with grip dots · Resize from corner handles · Drag from library to add</span>
      <span style={{ flex: 1 }} />
      <button style={{ ...ghostButtonStyle, height: 24, padding: "0 8px", fontSize: 10, color: "var(--m-cyan-500)", borderColor: "var(--m-cyan-500)", background: "transparent" }}><Icon name="check" size={11} /> Done</button>
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
        <Icon name="grid" size={13} />
        <span style={{ flex: 1, fontSize: "var(--m-fs-12)", color: "var(--m-fg-0)", fontWeight: 500 }}>Widget library</span>
        <button style={{ background: "transparent", border: "none", color: "var(--m-fg-3)", cursor: "pointer", padding: 4, borderRadius: 4, lineHeight: 1 }}>✕</button>
      </div>
      <div style={{ padding: "8px 12px", borderBottom: "1px solid var(--m-line-faint)", flexShrink: 0 }}>
        <div style={{ display: "flex", alignItems: "center", gap: 8, background: "var(--m-bg-2)", border: "1px solid var(--m-line)", borderRadius: "var(--m-r-2)", padding: "0 10px", height: "var(--m-control-h)" }}>
          <Icon name="search" size={12} />
          <input placeholder="Filter widgets…" readOnly style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "var(--m-fg-1)", fontFamily: "var(--m-font-ui)", fontSize: "var(--m-fs-12)" }} />
        </div>
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
    <div style={shellStyle}>
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
    </div>
  );
}

export default DashboardEditorScenario;
