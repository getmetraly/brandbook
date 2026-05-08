import type { ReactNode } from "react";
import RechartsShowcase from "../components/RechartsShowcase";
import RechartsTelemetryCardDraft from "../components/draft/RechartsTelemetryCardDraft";
import TelemetryActionMenuDraft from "../components/draft/TelemetryActionMenuDraft";
import TelemetryCheckboxDraft from "../components/draft/TelemetryCheckboxDraft";
import TelemetryCommandPaletteDraft from "../components/draft/TelemetryCommandPaletteDraft";
import TelemetryContextMenuDraft from "../components/draft/TelemetryContextMenuDraft";
import TelemetryDragOverlayDraft from "../components/draft/TelemetryDragOverlayDraft";
import TelemetryDropdownDraft from "../components/draft/TelemetryDropdownDraft";
import TelemetryEmptyStateDraft from "../components/draft/TelemetryEmptyStateDraft";
import TelemetryGridItemDraft from "../components/draft/TelemetryGridItemDraft";
import TelemetryIconGalleryDraft from "../components/draft/TelemetryIconGalleryDraft";
import TelemetryModalDraft from "../components/draft/TelemetryModalDraft";
import TelemetryNotificationCenterDraft from "../components/draft/TelemetryNotificationCenterDraft";
import TelemetryPopoverDraft from "../components/draft/TelemetryPopoverDraft";
import TelemetryRadioDraft from "../components/draft/TelemetryRadioDraft";
import TelemetrySearchDraft from "../components/draft/TelemetrySearchDraft";
import TelemetrySegmentedControlDraft from "../components/draft/TelemetrySegmentedControlDraft";
import TelemetrySidebarDraft from "../components/draft/TelemetrySidebarDraft";
import TelemetrySkeletonDraft from "../components/draft/TelemetrySkeletonDraft";
import TelemetryStateBadgeDraft from "../components/draft/TelemetryStateBadgeDraft";
import TelemetrySwitchDraft from "../components/draft/TelemetrySwitchDraft";
import TelemetryTableRowDraft from "../components/draft/TelemetryTableRowDraft";
import TelemetryTabsDraft from "../components/draft/TelemetryTabsDraft";
import TelemetryTimelineDraft from "../components/draft/TelemetryTimelineDraft";
import TelemetryToastDraft from "../components/draft/TelemetryToastDraft";
import TelemetryTooltipDraft from "../components/draft/TelemetryTooltipDraft";
import TelemetryTopbarDraft from "../components/draft/TelemetryTopbarDraft";
import TelemetryWidgetShellDraft from "../components/draft/TelemetryWidgetShellDraft";
import WidgetPickerCardDraft from "../components/draft/WidgetPickerCardDraft";

const metrics = [
  { label: "Flow efficiency", value: "81%", meta: "+8% vs last sprint", tone: "cyan" },
  { label: "Review latency", value: "4h", meta: "within target", tone: "purple" },
  { label: "Deploy success", value: "99.2%", meta: "+1.4% this week", tone: "green" },
  { label: "Incident MTTR", value: "38m", meta: "watch trend", tone: "orange" },
];

const widgetTypes = [
  {
    type: "stat-card",
    registryComponent: "StatCardWidget",
    metric: "81%",
    scope: "KPI",
    surface: "Single KPI summary for board overview and executive snapshots.",
    state: "live" as const,
  },
  {
    type: "metric-chart",
    registryComponent: "MetricChartWidget",
    metric: "2.4d",
    scope: "Trend",
    surface: "Time-series widget for cycle time, throughput and review latency.",
    state: "live" as const,
  },
  {
    type: "data-table",
    registryComponent: "DataTableWidget",
    metric: "24",
    scope: "Rows",
    surface: "Repository, team or incident rows with selectable health state.",
    state: "delayed" as const,
  },
  {
    type: "leaderboard",
    registryComponent: "LeaderboardWidget",
    metric: "12",
    scope: "Teams",
    surface: "Team comparison surface for delivery, review and quality rankings.",
    state: "live" as const,
  },
  {
    type: "dora-overview",
    registryComponent: "DoraOverviewWidget",
    metric: "A",
    scope: "DORA",
    surface: "Scorecard for deployment frequency, lead time, MTTR and failure rate.",
    state: "live" as const,
  },
  {
    type: "heatmap",
    registryComponent: "HeatmapWidget",
    metric: "7×5",
    scope: "Density",
    surface: "Calendar-like activity density for deploys, reviews or incidents.",
    state: "stale" as const,
  },
  {
    type: "sprint-burndown",
    registryComponent: "SprintBurndownWidget",
    metric: "62%",
    scope: "Planning",
    surface: "Sprint scope completion and delivery forecasting preview.",
    state: "delayed" as const,
  },
  {
    type: "anomaly-detector",
    registryComponent: "AnomalyDetectorWidget",
    metric: "3",
    scope: "Signals",
    surface: "Operational detector for latency, CI instability and delivery risk.",
    state: "live" as const,
  },
  {
    type: "ai-insight",
    registryComponent: "AiInsightWidget",
    metric: "5",
    scope: "Actions",
    surface: "Plain-English insight card with suggested next actions on owned data.",
    state: "no-data" as const,
  },
];


const roleProfiles = [
  { role: "Developer", icon: "developer", signal: "PRs", detail: "Daily delivery, code review and personal flow." },
  { role: "Senior Engineer", icon: "seniorEngineer", signal: "Architecture", detail: "Technical direction, risk and code ownership." },
  { role: "Tech Lead", icon: "techLead", signal: "Team flow", detail: "Bottlenecks, ownership and delivery health." },
  { role: "Engineering Manager", icon: "manager", signal: "Team health", detail: "Planning, workload balance and feedback loops." },
  { role: "DevOps", icon: "devOps", signal: "Deploys", detail: "CI pipeline, incidents and runtime reliability." },
  { role: "Security Lead", icon: "securityLead", signal: "Risk", detail: "Vulnerability response and policy-sensitive alerts." },
  { role: "Product Manager", icon: "productManager", signal: "Scope", detail: "Roadmap progress, delivery confidence and trade-offs." },
  { role: "QA Engineer", icon: "qaEngineer", signal: "Quality", detail: "Regression risk, flaky tests and release readiness." },
  { role: "Data Engineer", icon: "dataEngineer", signal: "Pipelines", detail: "Ingestion health, freshness and data quality." },
  { role: "CTO", icon: "cto", signal: "Strategy", detail: "Roadmap confidence, technical debt and platform risk." },
  { role: "VP Engineering", icon: "vpEngineering", signal: "Org flow", detail: "Throughput, quality and predictability across teams." },
  { role: "CEO", icon: "ceo", signal: "Business", detail: "Delivery confidence without leaking engineering data." },
];

const productPages = [
  { title: "Board screen", body: "Load a board by route, refresh data, render widgets and show loading/error/not-found states.", badge: "current route" },
  { title: "Dashboard renderer", body: "Iterate layout JSON, resolve widget instances through registry and render each widget in the board grid.", badge: "core" },
  { title: "Dashboard editor", body: "Create, reorder, resize and save widgets through the board lifecycle.", badge: "edit mode" },
  { title: "Metrics explorer", body: "Compare PR throughput, cycle time, deployment health and CSV export readiness.", badge: "analytics" },
  { title: "Onboarding checklist", body: "Guide seeded auth, repository connection, CI source setup and first dashboard creation.", badge: "setup" },
  { title: "Notification channels", body: "Configure Slack and PagerDuty channels with status feedback and audit-friendly copy.", badge: "ops" },
  { title: "Plugin marketplace", body: "Preview custom data sources, dashboard widgets, notifiers and action plugins.", badge: "planned" },
  { title: "AI assistant", body: "Explain anomalies, summarize bottlenecks and suggest next actions on owned data.", badge: "planned" },
];

function DraftSection({ eyebrow, title, description, children }: {
  eyebrow: string;
  title: string;
  description: string;
  children: ReactNode;
}) {
  return (
    <section className="draft-review-section">
      <div className="section-head draft-review-section-head">
        <div>
          <span className="draft-review-kicker">{eyebrow}</span>
          <h2>{title}</h2>
          <span className="draft-pulse-line" aria-hidden="true" />
        </div>
        <p>{description}</p>
      </div>
      {children}
    </section>
  );
}

function ExampleCard({ title, description, children, span = false }: {
  title: string;
  description?: string;
  children: ReactNode;
  span?: boolean;
}) {
  return (
    <article className={span ? "component-card draft-example-card is-wide" : "component-card draft-example-card"}>
      <div className="draft-example-card-head">
        <div>
          <h3>{title}</h3>
          {description ? <p>{description}</p> : null}
        </div>
      </div>
      <div className="draft-example-card-body">{children}</div>
    </article>
  );
}

function MetricCard({ label, value, meta, tone }: { label: string; value: string; meta: string; tone: string }) {
  return (
    <div className={`draft-metric-card tone-${tone}`}>
      <span>{label}</span>
      <strong>{value}</strong>
      <small>{meta}</small>
    </div>
  );
}

function HeatmapPreview() {
  return (
    <div className="draft-heatmap-preview" aria-label="Deployment activity heatmap">
      {Array.from({ length: 35 }).map((_, index) => (
        <span
          key={index}
          data-level={(index * 7) % 5}
          className={index === 18 ? "is-active" : undefined}
        >
          {index === 18 ? (
            <span className="draft-heatmap-tooltip" role="tooltip">
              <strong>Thu · 14 deploys</strong>
              <small>Cycle time 2.4d · healthy</small>
            </span>
          ) : null}
        </span>
      ))}
    </div>
  );
}

function BurndownPreview() {
  return (
    <div className="draft-burndown-preview" aria-label="Sprint burndown preview">
      <svg viewBox="0 0 420 160" role="img" aria-label="Sprint burndown line chart">
        <path d="M24 28H396" className="grid-line" />
        <path d="M24 80H396" className="grid-line" />
        <path d="M24 132H396" className="grid-line" />
        <path d="M24 28L90 44L156 52L222 86L288 104L354 128L396 134" className="burn-line" />
        <path d="M24 28L396 134" className="ideal-line" />
      </svg>
    </div>
  );
}

function RegistryStatus({ state }: { state: "live" | "delayed" | "stale" | "no-data" }) {
  const label = state === "no-data" ? "No data" : state[0].toUpperCase() + state.slice(1);
  return <span className={`draft-registry-status is-${state}`}><span aria-hidden="true" />{label}</span>;
}

function WidgetTypeVisual({ type }: { type: string }) {
  const short = type.split("-").map((part) => part[0]).join("").slice(0, 3).toUpperCase();

  return (
    <span className={`draft-widget-type-visual is-${type}`} aria-hidden="true">
      <span className="draft-widget-type-wave" />
      <small>{short}</small>
    </span>
  );
}

function formatWidgetType(type: string) {
  return type
    .split("-")
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

function WidgetTypeMatrix() {
  return (
    <div className="draft-widget-registry-panel">
      <div className="draft-widget-registry-head">
        <span>Widget type</span>
        <span>Registry component</span>
        <span>Preview signal</span>
        <span>Status</span>
      </div>

      <div className="draft-widget-registry-list">
        {widgetTypes.map((widget) => (
          <article className={`draft-widget-registry-row is-${widget.state}`} key={widget.type}>
            <div className="draft-widget-registry-name">
              <WidgetTypeVisual type={widget.type} />
              <div>
                <strong>{formatWidgetType(widget.type)}</strong>
                <span>{widget.scope}</span>
              </div>
            </div>

            <code>{widget.registryComponent}</code>

            <div className="draft-widget-registry-signal">
              <b>{widget.metric}</b>
              <p>{widget.surface}</p>
            </div>

            <RegistryStatus state={widget.state} />
          </article>
        ))}
      </div>
    </div>
  );
}
function DragBoardPreview() {
  return (
    <div className="draft-dnd-board panel">
      <div className="draft-dnd-head">
        <div>
          <strong>Dashboard editor drag-and-drop</strong>
          <span>More dense DnD examples for react-grid-layout and dnd-kit review.</span>
        </div>
        <div className="draft-inline-actions">
          <button className="btn btn-secondary" type="button">Reset</button>
          <button className="btn btn-primary" type="button">Save layout</button>
        </div>
      </div>

      <div className="draft-dnd-canvas">
        <div className="draft-dnd-palette">
          <strong>Widget picker</strong>
          <WidgetPickerCardDraft title="PR velocity" description="Throughput, cycle time and review pressure." iconLabel="velocity" tags={["git", "board"]} />
          <WidgetPickerCardDraft title="CI stability" description="Flaky builds, failed jobs and deploy risk." selected={false} iconLabel="ci" tags={["ci", "health"]} state="delayed" />
          <WidgetPickerCardDraft title="AI insight" description="Bottleneck summary and recommended next action." selected={false} iconLabel="ai" tags={["insight", "local"]} state="no-data" />
        </div>

        <div className="draft-dnd-grid">
          <div className="draft-dnd-widget is-selected">
            <div className="draft-dnd-widget-head">
              <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
              <strong>Flow efficiency</strong>
              <TelemetryStateBadgeDraft state="live" label="Live" />
            </div>
            <div className="metric-value">81%</div>
            <p>Selected widget: cyan border, resize affordance and stable content.</p>
            <span className="telemetry-grid-resize telemetry-grid-resize-se" />
            <span className="telemetry-grid-resize telemetry-grid-resize-s" aria-hidden="true" />
            <span className="telemetry-height-handle" aria-hidden="true">height</span>
          </div>

          <div className="draft-dnd-widget is-dragging">
            <div className="draft-dnd-widget-head">
              <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
              <strong>Review latency</strong>
            </div>
            <div className="metric-value">4h</div>
            <p>Dragging state: no pulse before handle, only neutral grip.</p>
          </div>

          <div className="draft-dnd-dropzone">
            <span className="draft-pulse-line is-drop" aria-hidden="true" />
            <strong>Drop chart here</strong>
            <p>Available grid slot without layout collision.</p>
          </div>

          <div className="draft-dnd-widget is-wide">
            <div className="draft-dnd-widget-head">
              <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
              <strong>Deployment health trend</strong>
              <span className="brand-badge brand-badge-success">full width</span>
            </div>
            <RechartsTelemetryCardDraft />
            <span className="telemetry-grid-resize telemetry-grid-resize-s" aria-hidden="true" />
          </div>
        </div>
      </div>
    </div>
  );
}

function BoardEditModeRefinedPreview() {
  return (
    <div className="draft-board-edit-refined panel">
      <div className="draft-dnd-head">
        <div>
          <strong>Board edit mode</strong>
          <span>Selected, dragging, drop target, width resize and height resize states.</span>
        </div>
        <div className="draft-inline-actions">
          <button className="btn btn-secondary" type="button">Cancel</button>
          <button className="btn btn-primary" type="button">Save layout</button>
        </div>
      </div>

      <div className="draft-board-edit-grid">
        <article className="draft-board-edit-widget is-selected">
          <div className="draft-dnd-widget-head">
            <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
            <strong>Flow efficiency</strong>
            <TelemetryStateBadgeDraft state="live" label="Live" />
          </div>
          <div className="metric-value">81%</div>
          <p>Selected state uses the cyan border. Handles sit outside content rhythm and never overlap text.</p>
          <span className="telemetry-grid-resize telemetry-grid-resize-e" aria-hidden="true" />
          <span className="telemetry-grid-resize telemetry-grid-resize-s" aria-hidden="true" />
          <span className="telemetry-grid-resize telemetry-grid-resize-se" aria-hidden="true" />
        </article>

        <article className="draft-board-edit-widget is-dragging">
          <div className="draft-dnd-widget-head">
            <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
            <strong>Review latency</strong>
          </div>
          <div className="metric-value">4h</div>
          <p>Dragging is elevated and slightly transparent, but no pulse indicator is attached to the handle.</p>
        </article>

        <article className="draft-board-edit-dropzone">
          <span className="draft-pulse-line is-drop" aria-hidden="true" />
          <strong>Drop widget here</strong>
          <p>Dashed drop target stays readable without colliding with neighbouring cards.</p>
        </article>

        <article className="draft-board-edit-widget is-wide">
          <div className="draft-dnd-widget-head">
            <span className="telemetry-drag-grip" aria-hidden="true">⋮⋮</span>
            <strong>Deployment health</strong>
            <span className="brand-badge brand-badge-success">full width</span>
          </div>
          <span className="draft-pulse-line is-card" aria-hidden="true" />
          <p>Full-width widgets use a clear state badge and expose horizontal + vertical resizing.</p>
          <span className="telemetry-grid-resize telemetry-grid-resize-s" aria-hidden="true" />
        </article>
      </div>
    </div>
  );
}

function BoardLifecyclePreview() {
  return (
    <div className="draft-lifecycle-grid">
      {[
        ["1", "Create board", "Wizard creates widgets + layout JSON."],
        ["2", "Persist", "Fake/real repository saves the dashboard version."],
        ["3", "Fetch", "BoardScreen loads by route and handles loading/error."],
        ["4", "Render", "BoardRenderer resolves widget type through registry."],
      ].map(([step, title, body]) => (
        <div className="draft-lifecycle-card" key={step}>
          <span>{step}</span>
          <strong>{title}</strong>
          <p>{body}</p>
        </div>
      ))}
    </div>
  );
}

function ProductPageMatrix() {
  return (
    <div className="draft-product-page-grid">
      {productPages.map((page) => (
        <div className="draft-product-page-card" key={page.title}>
          <div>
            <strong>{page.title}</strong>
            <span className="brand-badge brand-badge-primary">{page.badge}</span>
          </div>
          <p>{page.body}</p>
        </div>
      ))}
    </div>
  );
}

function DashboardScenario() {
  return (
    <div className="draft-dashboard-shell panel">
      <TelemetrySidebarDraft />
      <div className="draft-dashboard-main">
        <TelemetryTopbarDraft />
        <div className="draft-dashboard-toolbar-row">
          <TelemetrySearchDraft />
          <TelemetrySegmentedControlDraft />
          <TelemetrySwitchDraft label="Live sync" />
          <button className="btn btn-primary" type="button">Add widget</button>
        </div>
        <div className="draft-metric-card-grid is-four">
          {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
        </div>
        <div className="draft-dashboard-content-grid">
          <div className="draft-dashboard-chart-panel component-card">
            <div className="draft-panel-head">
              <strong>Flow efficiency trend</strong>
              <TelemetryStateBadgeDraft state="live" label="Live" />
            </div>
            <RechartsTelemetryCardDraft />
          </div>
          <div className="component-card draft-table-card">
            <div className="draft-panel-head">
              <strong>Repository health</strong>
              <span className="brand-badge brand-badge-primary">data table</span>
            </div>
            <div className="draft-table-preview">
              <TelemetryTableRowDraft repository="metraly/app" selected health="live" />
              <TelemetryTableRowDraft repository="metraly/ingestion" selected={false} health="delayed" />
              <TelemetryTableRowDraft repository="metraly/worker" selected={false} health="disconnected" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function WebsitePatternGallery() {
  const roleCards = ["VP Engineering", "CTO", "Tech Lead", "DevOps", "Individual Contributor", "Dashboard Wizard"];
  const plans = ["Community", "Pro", "Enterprise"];
  const roadmap = ["Available today", "In progress", "Validation phase", "Future direction"];

  return (
    <div className="draft-website-patterns">
      <div className="draft-website-hero-card">
        <span className="draft-marketing-badge">Alpha · Open core · Self-hosted</span>
        <strong>Engineering intelligence that does not leak.</strong>
        <p>Marketing hero badge, CTA row, status pills and synthetic insight surfaces from the website.</p>
        <div className="draft-website-actions">
          <button className="btn btn-primary" type="button">Try synthetic demo</button>
          <button className="btn btn-secondary" type="button">Read docs</button>
        </div>
      </div>

      <div className="draft-website-card-grid">
        {roleCards.map((role) => (
          <article className="draft-website-card" key={role}>
            <span className="draft-registry-status is-live"><span aria-hidden="true" />Demo</span>
            <strong>{role}</strong>
            <p>Role dashboard card pattern for the synthetic demo entry points.</p>
          </article>
        ))}
      </div>

      <div className="draft-pricing-grid">
        {plans.map((plan) => (
          <article className={plan === "Pro" ? "draft-pricing-card is-featured" : "draft-pricing-card"} key={plan}>
            <span className="draft-marketing-badge">{plan === "Community" ? "Always free" : plan === "Pro" ? "Planned" : "Pilot"}</span>
            <strong>{plan}</strong>
            <p>{plan === "Community" ? "$0" : plan === "Pro" ? "$99/mo" : "From $15K/yr"}</p>
          </article>
        ))}
      </div>

      <div className="draft-roadmap-strip">
        {roadmap.map((item, index) => (
          <div key={item}>
            <span>0{index + 1}</span>
            <strong>{item}</strong>
          </div>
        ))}
      </div>
    </div>
  );
}


function RoleIcon({ name }: { name: string }) {
  const paths: Record<string, string> = {
    developer: "M5 7l-3 5 3 5 M19 7l3 5-3 5 M14 4l-4 16",
    seniorEngineer: "M4 18V6l8-4 8 4v12l-8 4-8-4Z M8 9h8 M8 13h8 M8 17h5",
    techLead: "M12 3l8 4v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z M8 12h8 M12 8v8",
    manager: "M4 20v-1a5 5 0 0 1 5-5h6a5 5 0 0 1 5 5v1 M8 7a4 4 0 1 1 8 0 4 4 0 0 1-8 0Z M3 11h4 M17 11h4",
    devOps: "M7 7a6 6 0 0 1 10 0l2-2v6h-6l2-2a3.5 3.5 0 0 0-6 2 M17 17a6 6 0 0 1-10 0l-2 2v-6h6l-2 2a3.5 3.5 0 0 0 6-2",
    securityLead: "M12 3l8 4v6c0 5-3.5 8-8 9-4.5-1-8-4-8-9V7l8-4Z M9 12l2 2 4-5",
    productManager: "M4 5h16v14H4V5Z M8 9h8 M8 13h5 M8 17h3",
    qaEngineer: "M4 4h16v16H4V4Z M8 12l2.5 2.5L16 9",
    dataEngineer: "M4 6a8 3 0 1 0 16 0a8 3 0 1 0-16 0Z M4 6v10a8 3 0 1 0 16 0V6 M4 11a8 3 0 1 0 16 0",
    cto: "M4 5h16v14H4V5Z M8 9h8 M8 13h5 M17 17l3 3 M16 16l4-4",
    vpEngineering: "M3 18l6-6 4 4 8-10 M15 6h6v6 M4 21h16",
    ceo: "M12 3l3 6 6 .8-4.5 4.2L17.8 21 12 17.5 6.2 21l1.3-7L3 9.8 9 9l3-6Z",
  };

  return (
    <svg className="draft-role-icon-svg" viewBox="0 0 24 24" aria-hidden="true">
      <path d={paths[name] || paths.developer} />
    </svg>
  );
}

function RoleIconGrid() {
  return (
    <div className="draft-role-icon-grid">
      {roleProfiles.map((profile) => (
        <article className="draft-role-card" key={profile.role}>
          <div className="draft-role-icon"><RoleIcon name={profile.icon} /></div>
          <div>
            <strong>{profile.role}</strong>
            <span>{profile.signal}</span>
          </div>
          <p>{profile.detail}</p>
        </article>
      ))}
    </div>
  );
}

function InteractionStatePreview() {
  return (
    <div className="draft-state-preview-grid">
      <button className="draft-state-control is-hovered" type="button">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        Hover
      </button>
      <button className="draft-state-control is-focused" type="button">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        Focus
      </button>
      <button className="draft-state-control is-disabled" type="button" disabled>
        <span className="telemetry-state-pulse" aria-hidden="true" />
        Disabled
      </button>
      <button className="draft-state-control is-unread" type="button">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        Unread
      </button>
      <button className="draft-state-control is-error" type="button">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        Error
      </button>
      <button className="draft-state-control is-loading" type="button">
        <span className="telemetry-state-pulse" aria-hidden="true" />
        Loading
      </button>
    </div>
  );
}

function ScreenOne() {
  return (
    <DraftSection
      eyebrow="Screen 01"
      title="Core controls and dashboard widgets"
      description="The draft page now uses /components as a baseline, adds dropdown coverage again and tests spacing inside a real engineering dashboard."
    >
      <div className="draft-review-grid">
        <ExampleCard title="Checkbox / Radio / Switch" description="Selection primitives aligned for widget picker, tables and settings.">
          <div className="draft-control-stack">
            <TelemetryCheckboxDraft checked label="Selected widget" />
            <TelemetryRadioDraft checked label="Primary repository" />
            <TelemetrySwitchDraft active label="Live telemetry" />
            <TelemetrySwitchDraft active={false} label="Manual sync" />
          </div>
        </ExampleCard>

        <ExampleCard title="Search / Tabs / Segmented" description="Filters and navigation with stable spacing and visible focus states.">
          <div className="draft-control-stack">
            <TelemetrySearchDraft />
            <TelemetryTabsDraft />
            <TelemetrySegmentedControlDraft />
          </div>
        </ExampleCard>

        <ExampleCard title="Dropdown" description="Dropdown is back as a dedicated menu pattern, separated from the old Metric source select example.">
          <TelemetryDropdownDraft />
        </ExampleCard>

        <ExampleCard title="Widget picker alignment" description="Icon, text, checkbox and status are aligned in one stable row.">
          <WidgetPickerCardDraft title="Deployment health" description="Track deploy frequency, failure rate and recovery windows." iconLabel="deploy" tags={["dora", "release"]} />
        </ExampleCard>

        <ExampleCard title="Widget shell / Grid item" description="Reusable board cards should not overlap at narrow widths.">
          <div className="draft-control-stack">
            <TelemetryWidgetShellDraft />
            <TelemetryGridItemDraft />
          </div>
        </ExampleCard>

        <ExampleCard title="Metric cards" description="Examples lifted from /components and expanded with engineering metrics.">
          <div className="draft-metric-card-grid">
            {metrics.map((metric) => <MetricCard key={metric.label} {...metric} />)}
          </div>
        </ExampleCard>

        <ExampleCard title="Real dashboard scenario" description="All primitives together in a product-like analytics board." span>
          <DashboardScenario />
        </ExampleCard>
      </div>
    </DraftSection>
  );
}

function ScreenTwo() {
  return (
    <DraftSection
      eyebrow="Screen 02"
      title="Charts, widgets and drag-and-drop"
      description="Additional examples from /components: line, bar, composed and area charts, plus more drag-and-drop states for the board editor."
    >
      <div className="draft-review-grid">
        <ExampleCard title="Recharts gallery from /components" description="Line, bar, composed and area chart primitives." span>
          <RechartsShowcase />
        </ExampleCard>

        <ExampleCard title="Heatmap widget" description="Activity heatmap candidate for engineering calendar and deploy density.">
          <HeatmapPreview />
        </ExampleCard>

        <ExampleCard title="Sprint burndown" description="Clean burndown preview with a visible dashed ideal line and readable actual line.">
          <BurndownPreview />
        </ExampleCard>

        <ExampleCard title="Widget registry coverage" description="Widget examples taken from the current getmetraly/metraly WidgetRegistry and WidgetType map." span>
          <WidgetTypeMatrix />
        </ExampleCard>

        <ExampleCard title="Icon system coverage" description="Current simple line icons plus role icons used across IT company personas." span>
          <TelemetryIconGalleryDraft />
        </ExampleCard>

        <ExampleCard title="Role icon examples" description="Unique simple role icons from developer to CEO." span>
          <RoleIconGrid />
        </ExampleCard>

        <ExampleCard title="Website surface patterns" description="Website surfaces represented in /draft: hero badge, CTA row, demo role cards, pricing cards and roadmap strip." span>
          <WebsitePatternGallery />
        </ExampleCard>

        <ExampleCard title="Drag-and-drop board editor" description="Picker, selected widget, dragging state, drop zone and full-width widget." span>
          <DragBoardPreview />
        </ExampleCard>

        <ExampleCard title="Board edit mode refined" description="Corrected handles, dashed drop-target borders and a dedicated height resize affordance." span>
          <BoardEditModeRefinedPreview />
        </ExampleCard>
      </div>
    </DraftSection>
  );
}

function ScreenThree() {
  return (
    <DraftSection
      eyebrow="Screen 03"
      title="Metraly product pages and states"
      description="Examples derived from getmetraly/metraly: board screen lifecycle, renderer contract, widget registry, implemented preview surfaces and planned product flows."
    >
      <div className="draft-review-grid">
        <ExampleCard title="Board lifecycle" description="Create, save, fetch and render flow that the UI must support." span>
          <BoardLifecyclePreview />
        </ExampleCard>

        <ExampleCard title="Product page coverage" description="Key surfaces to keep represented in the brandbook draft page." span>
          <ProductPageMatrix />
        </ExampleCard>

        <ExampleCard title="Board screen states" description="Loading, error, not found and refresh states from the BoardScreen flow.">
          <div className="draft-control-stack">
            <TelemetrySkeletonDraft />
            <TelemetryToastDraft title="Board refreshed" description="Dashboard data fetched from repository." state="live" />
            <TelemetryToastDraft title="Dashboard not found" description="Show empty/error state without breaking layout." state="disconnected" />
          </div>
        </ExampleCard>

        <ExampleCard title="Data rows and notifications" description="Repository rows, operational events and timeline surfaces.">
          <div className="draft-control-stack">
            <TelemetryNotificationCenterDraft />
            <TelemetryTimelineDraft />
          </div>
        </ExampleCard>

        <ExampleCard title="State badges" description="Semantic chips for telemetry states.">
          <div className="draft-badge-rack">
            <TelemetryStateBadgeDraft state="live" label="Live" />
            <TelemetryStateBadgeDraft state="stale" label="Stale" />
            <TelemetryStateBadgeDraft state="delayed" label="Delayed" />
            <TelemetryStateBadgeDraft state="disconnected" label="Disconnected" />
            <TelemetryStateBadgeDraft state="no-data" label="No data" />
          </div>
        </ExampleCard>

        <ExampleCard title="Interaction states" description="Static review examples for hover, focus, disabled, unread, error and loading states.">
          <InteractionStatePreview />
        </ExampleCard>

        <ExampleCard title="Overlays and actions" description="Menus, popovers, tooltips, modal and drag overlay.">
          <div className="draft-overlay-stack">
            <TelemetryActionMenuDraft />
            <TelemetryContextMenuDraft />
            <TelemetryPopoverDraft />
            <TelemetryTooltipDraft />
            <TelemetryModalDraft />
            <TelemetryDragOverlayDraft />
          </div>
        </ExampleCard>

        <ExampleCard title="Empty state" description="First-run dashboard surface.">
          <TelemetryEmptyStateDraft />
        </ExampleCard>

        <ExampleCard title="Command palette" description="Keyboard-first product navigation and action launcher.">
          <TelemetryCommandPaletteDraft />
        </ExampleCard>
      </div>
    </DraftSection>
  );
}

export default function DraftPage() {
  return (
    <main>
      <section className="shell hero component-hero draft-review-hero">
        <div>
          <div className="eyebrow"><span className="metraly-pulse-marker" />Draft laboratory</div>
          <h1>Legacy draft sandbox for migration review.</h1>
          <p className="lead">
            This page is intentionally retained as a temporary lab. Canonical previews now live in grouped pages under /components, /patterns and /examples.
          </p>
          <span className="draft-pulse-line is-hero" aria-hidden="true" />
          <div className="actions">
            <a className="btn btn-primary" href="/components">Canonical components</a>
            <a className="btn btn-secondary" href="/patterns">Patterns</a>
            <a className="brand-btn brand-btn-ghost" href="/examples">Examples</a>
          </div>
        </div>

        <aside className="panel draft-review-summary-card">
          <span className="draft-review-kicker">Rules</span>
          <strong>/draft is legacy. Grouped documentation pages are canonical.</strong>
          <p>Use this page only to compare migration candidates before moving them into @metraly/ui and deleting duplicate draft-only code.</p>
          <div className="draft-summary-list">
            <span>Controls</span>
            <span>Widgets</span>
            <span>Charts</span>
            <span>DnD</span>
            <span>Board flow</span>
            <span>States</span>
          </div>
        </aside>
      </section>

      <div className="shell">
        <div id="screen-01"><ScreenOne /></div>
        <div id="screen-02"><ScreenTwo /></div>
        <div id="screen-03"><ScreenThree /></div>
      </div>
    </main>
  );
}
