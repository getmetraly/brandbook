import React from "react";
import "../styles/metraly-app-kit.css";
import { AppSidebar, type AppSidebarNavSection } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { AppWidget, AppSparkline, AppMetric, AppMetricDelta } from "./AppWidget";

// ─── Defaults ────────────────────────────────────────────────────────────────

const DEFAULT_SECTIONS: AppSidebarNavSection[] = [
  {
    label: "Dashboards",
    items: [
      { id: "dashboard",   icon: "home",       label: "Overview", active: true },
      { id: "dash-vp",     icon: "trendingUp", label: "VP Engineering" },
      { id: "dash-tl",     icon: "gitPR",      label: "Tech Lead" },
      { id: "dash-devops", icon: "cpu",        label: "DevOps / SRE" },
      { id: "dash-ic",     icon: "activity",   label: "My Dashboard" },
      { id: "dash-wizard", icon: "plus",       label: "New dashboard", variant: "accent" as const },
    ],
  },
  {
    label: "Analytics",
    items: [
      { id: "metrics", icon: "bar2",  label: "Metrics Explorer" },
      { id: "ai",      icon: "brain", label: "AI Workspace", badge: "preview" as const },
    ],
  },
  {
    label: "Configure",
    items: [
      { id: "plugins",    icon: "puzzle", label: "Plugins",    badge: "gated" as const },
      { id: "connectors", icon: "link",   label: "Connectors" },
    ],
  },
  {
    label: "System",
    items: [{ id: "settings", icon: "settings", label: "Settings" }],
  },
];

const DEFAULT_USER = { initials: "JD", name: "Jamie Dev", role: "Admin" };

// ─── Service health table ─────────────────────────────────────────────────────

type Tone = "ok" | "warn" | "err";

function StatusChip({ tone, label }: { tone: Tone; label: string }): React.ReactElement {
  return (
    <span className={`metraly-app-status-chip is-${tone}`}>{label}</span>
  );
}

const SERVICES: Array<{ service: string; p50: string; p99: string; err: string; tone: Tone }> = [
  { service: "api-gateway",      p50: "42ms",  p99: "118ms", err: "0.02%", tone: "ok" },
  { service: "payments-svc",     p50: "88ms",  p99: "340ms", err: "0.41%", tone: "warn" },
  { service: "auth-svc",         p50: "19ms",  p99: "54ms",  err: "0.00%", tone: "ok" },
  { service: "data-pipeline",    p50: "210ms", p99: "820ms", err: "1.20%", tone: "err" },
  { service: "notification-svc", p50: "55ms",  p99: "180ms", err: "0.08%", tone: "ok" },
];

function ServiceHealthTable(): React.ReactElement {
  return (
    <table className="metraly-app-health-table">
      <thead>
        <tr>
          {["Service", "p50", "p99", "Error rate", "Status"].map((h) => (
            <th key={h}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {SERVICES.map((row) => (
          <tr key={row.service}>
            <td className="is-mono">{row.service}</td>
            <td className="is-mono">{row.p50}</td>
            <td className="is-mono">{row.p99}</td>
            <td className="is-mono">{row.err}</td>
            <td>
              <StatusChip
                tone={row.tone}
                label={row.tone === "ok" ? "Healthy" : row.tone === "warn" ? "Degraded" : "Incident"}
              />
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

// ─── At-risk PRs list ─────────────────────────────────────────────────────────

const AT_RISK_PRS: Array<{ id: string; title: string; age: string; tone: Tone }> = [
  { id: "#4821", title: "Refactor payments retry logic", age: "5d stale", tone: "err" },
  { id: "#4799", title: "Add MTLS to data pipeline",     age: "3d stale", tone: "warn" },
  { id: "#4756", title: "Upgrade auth-svc to Node 22",   age: "2d stale", tone: "warn" },
  { id: "#4740", title: "Feature: usage dashboard v2",   age: "8d stale", tone: "err" },
];

function AtRiskPRList(): React.ReactElement {
  return (
    <ul className="metraly-app-risk-list">
      {AT_RISK_PRS.map((pr) => (
        <li key={pr.id} className="metraly-app-risk-list__item">
          <span className="metraly-app-risk-list__id">{pr.id}</span>
          <span className="metraly-app-risk-list__title">{pr.title}</span>
          <StatusChip tone={pr.tone} label={pr.age} />
        </li>
      ))}
    </ul>
  );
}

// ─── AppDashboardScreen ───────────────────────────────────────────────────────

export interface AppDashboardScreenProps {
  /** Override the default nav sections */
  sections?: AppSidebarNavSection[];
  /** Active nav item id */
  activeId?: string;
  /** Called when nav item clicked */
  onNav?: (id: string) => void;
  /** Override default page title */
  title?: React.ReactNode;
  /** Override subtitle */
  subtitle?: React.ReactNode;
  /** Brand name in sidebar */
  brandName?: string;
  className?: string;
}

export function AppDashboardScreen({
  sections = DEFAULT_SECTIONS,
  activeId = "dash-vp",
  onNav,
  title,
  subtitle,
  brandName = "Metraly",
  className,
}: AppDashboardScreenProps): React.ReactElement {
  return (
    <div className={["metraly-app-shell", className].filter(Boolean).join(" ")}>
      <div className="metraly-app-shell__sidebar">
        <AppSidebar
          brandName={brandName}
          sections={sections}
          activeId={activeId}
          onNav={onNav}
          user={DEFAULT_USER}
        />
      </div>
      <div className="metraly-app-shell__topbar">
        <AppTopbar
          title={title ?? "VP Engineering"}
          subtitle={subtitle}
          searchPlaceholder="Search metrics, dashboards, plugins…"
          notifCount={2}
          onRefresh={() => {}}
        />
      </div>
      <main className="metraly-app-shell__main">
        <div className="metraly-app-board">
          {/* Deploy frequency */}
          <AppWidget title="Deploy frequency" health="live" span={3}>
            <AppMetric value="42" />
            <AppMetricDelta direction="up">▲ +18% vs prior 7d</AppMetricDelta>
            <AppSparkline data={[12, 18, 22, 14, 28, 31, 42]} />
          </AppWidget>

          {/* Lead time p50 */}
          <AppWidget title="Lead time p50" health="stale" healthLabel="Delayed" span={3}>
            <AppMetric value="2h 14m" />
            <AppMetricDelta direction="down">▼ +8h vs prior 7d</AppMetricDelta>
            <AppSparkline data={[8, 10, 12, 16, 18, 20, 22]} />
          </AppWidget>

          {/* Change failure rate */}
          <AppWidget title="Change failure rate" health="live" span={3}>
            <AppMetric value="3.1%" />
            <AppMetricDelta direction="flat">— no change vs prior 7d</AppMetricDelta>
          </AppWidget>

          {/* Open Sev-1 */}
          <AppWidget title="Open Sev-1" health="live" healthLabel="OK" span={3}>
            <AppMetric value="0" />
            <AppMetricDelta direction="up">▲ resolved 1 since yesterday</AppMetricDelta>
          </AppWidget>

          {/* Service health table */}
          <AppWidget title="Service health" span={8}>
            <ServiceHealthTable />
          </AppWidget>

          {/* At-risk PRs */}
          <AppWidget title="At-risk PRs" span={4}>
            <AtRiskPRList />
          </AppWidget>
        </div>
      </main>
    </div>
  );
}

export default AppDashboardScreen;
