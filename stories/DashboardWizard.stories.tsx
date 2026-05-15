import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyBottomSheet,
  MetralyButton,
  MetralyIcon,
  MetralyInput,
  MetralyLogo,
  MetralyShell,
  MetralySidebar,
  MetralySidebarItem,
  MetralySidebarSection,
  MetralyTopbar,
  StatusBadge,
} from "@metraly/ui";

type WizardStage = "goal" | "role" | "review" | "error" | "success";
type MiniStepStatus = "done" | "current" | "next";

const templates = [
  {
    id: "cto",
    title: "CTO",
    description: "Synthetic health score, DORA overview, and team velocity trends",
    icon: "chart" as const,
    tone: "cyan",
  },
  {
    id: "vp-eng",
    title: "VP Engineering",
    description: "Synthetic sprint velocity, team load, and delivery risk preview",
    icon: "users" as const,
    tone: "purple",
  },
  {
    id: "team-lead",
    title: "Tech Lead",
    description: "Synthetic CI health, PR queue, and sprint burndown",
    icon: "gitPullRequest" as const,
    tone: "success",
  },
  {
    id: "devops",
    title: "DevOps / SRE",
    description: "Synthetic deploy frequency, MTTR, and incident tracking",
    icon: "settings" as const,
    tone: "warning",
  },
  {
    id: "my-dashboard",
    title: "My Dashboard",
    description: "Synthetic PRs, CI runs, review queue, and sprint tasks",
    icon: "sparkles" as const,
    tone: "purple",
  },
  {
    id: "blank",
    title: "Blank Canvas",
    description: "Start from scratch and add synthetic preview widgets one by one",
    icon: "plus" as const,
    tone: "neutral",
  },
];

const widgets = [
  { id: "dora", title: "DORA Overview", description: "Synthetic overview of the 4 key metrics", icon: "zap" as const, selected: false, tags: ["dora", "metrics"] },
  { id: "deploy", title: "Deploy Frequency", description: "Synthetic chart and current sample value", icon: "zap" as const, selected: true, tags: ["dora", "deploy"] },
  { id: "lead", title: "Lead Time", description: "Synthetic commit-to-deploy timing example", icon: "clock" as const, selected: false, tags: ["dora", "cycle"] },
  { id: "mttr", title: "MTTR Trend", description: "Synthetic incident recovery timing preview", icon: "activity" as const, selected: true, tags: ["ops", "incident"] },
  { id: "build", title: "Failing Builds", description: "Synthetic failure list preview", icon: "alertTri" as const, selected: true, warning: true, tags: ["ci", "failure"] },
  { id: "review", title: "PR Review Queue", description: "Synthetic open PR review queue", icon: "users" as const, selected: false, tags: ["pr", "review"] },
  { id: "cycle", title: "PR Cycle Time", description: "Synthetic time-to-merge trend", icon: "gitPullRequest" as const, selected: false, tags: ["pr", "flow"] },
  { id: "sprint", title: "Sprint Burndown", description: "Synthetic points remaining vs ideal", icon: "chart" as const, selected: false, warning: true, tags: ["sprint"] },
  { id: "blocked", title: "Blocked Tasks", description: "Synthetic blocked task examples", icon: "alertTri" as const, selected: false, warning: true, tags: ["team", "blockers"] },
  { id: "activity", title: "Team Activity Map", description: "Synthetic commit heatmap preview", icon: "sparkles" as const, selected: false, tags: ["team", "activity"] },
];

const selectedWidgets = widgets.filter((widget) => widget.selected);

function stepStatus(stage: WizardStage, step: "template" | "widgets" | "settings"): MiniStepStatus {
  if (stage === "goal" || stage === "role") {
    return step === "template" ? "current" : "next";
  }

  if (stage === "review" || stage === "error") {
    if (step === "template") return "done";
    if (step === "widgets") return "current";
    return "next";
  }

  if (step === "settings") return "current";
  return "done";
}

function stageCopy(stage: WizardStage) {
  if (stage === "goal" || stage === "role") {
    return {
      panelTitle: "Start from a synthetic template",
      panelDescription: "Choose a sample layout for this preview, or start blank.",
      previewTitle: "Synthetic Dashboard — Preview",
      previewHint: "0 preview widgets",
      primary: "Continue",
    };
  }

  if (stage === "review" || stage === "error") {
    return {
      panelTitle: "Customize synthetic widgets",
      panelDescription: "Add or remove preview widgets. Selected: 4",
      previewTitle: "DevOps / SRE Preview — Preview",
      previewHint: "4 preview widgets",
      primary: "Preview Layout",
    };
  }

  return {
    panelTitle: "Preview settings",
    panelDescription: "Name the sample layout and arrange preview widgets. No dashboard is saved by this public demo.",
    previewTitle: "DevOps / SRE Preview — Preview",
    previewHint: "4 preview widgets",
    primary: "Go to Dashboard",
  };
}

function MiniStepper({ stage }: { stage: WizardStage }) {
  const steps = [
    { id: "template", label: "Template", status: stepStatus(stage, "template") },
    { id: "widgets", label: "Widgets", status: stepStatus(stage, "widgets") },
    { id: "settings", label: "Settings", status: stepStatus(stage, "settings") },
  ];
  const currentIndex = Math.max(0, steps.findIndex((step) => step.status === "current"));

  return (
    <div className="metraly-dashboard-wizard-recipe__mini-stepper" aria-label="Dashboard wizard progress">
      {steps.map((step, index) => (
        <React.Fragment key={step.id}>
          <div
            className={`metraly-dashboard-wizard-recipe__mini-step is-${step.status}`}
            aria-current={step.status === "current" ? "step" : undefined}
          >
            <span className="metraly-dashboard-wizard-recipe__mini-dot">
              {step.status === "done" ? <MetralyIcon name="check" size="xs" /> : index + 1}
            </span>
            <span className="metraly-dashboard-wizard-recipe__mini-label">{step.label}</span>
          </div>
          {index < steps.length - 1 ? (
            <span
              className={`metraly-dashboard-wizard-recipe__mini-line${index < currentIndex ? " is-complete" : ""}`}
              aria-hidden="true"
            />
          ) : null}
        </React.Fragment>
      ))}
    </div>
  );
}

function appSidebarHeader() {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 10, padding: "16px 12px 14px", borderBottom: "1px solid var(--m-line-faint)" }}>
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <MetralyLogo variant="mark" />
        <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
          <span style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 600, letterSpacing: "0.04em" }}>METRALY</span>
          <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>engineering intelligence</span>
        </div>
      </div>
      <StatusBadge status="Live" />
    </div>
  );
}

function AppShellSidebar({ id }: { id?: string }) {
  return (
    <MetralySidebar id={id} header={appSidebarHeader()} aria-label="Primary navigation">
      <MetralySidebarSection label="Dashboards">
        <MetralySidebarItem href="/dashboard/overview" icon={<MetralyIcon name="home" size={14} />} label="Overview" />
        <MetralySidebarItem href="/dashboard/vp" icon={<MetralyIcon name="users" size={14} />} label="VP Engineering" />
        <MetralySidebarItem href="/dashboard/tech-lead" icon={<MetralyIcon name="gitPR" size={14} />} label="Tech Lead" />
        <MetralySidebarItem active href="/dashboard/preview" icon={<MetralyIcon name="plus" size={14} />} label="Dashboard Preview" />
      </MetralySidebarSection>
      <MetralySidebarSection label="Analytics">
        <MetralySidebarItem href="/metrics" icon={<MetralyIcon name="bar2" size={14} />} label="Metrics Explorer" />
        <MetralySidebarItem
          href="/ai"
          icon={<MetralyIcon name="brain" size={14} />}
          label="AI Preview"
          meta={<StatusBadge status="Preview" size="sm" />}
        />
      </MetralySidebarSection>
      <MetralySidebarSection label="Configure">
        <MetralySidebarItem href="/plugins" icon={<MetralyIcon name="puzzle" size={14} />} label="Plugin Preview" />
        <MetralySidebarItem href="/connectors" icon={<MetralyIcon name="link" size={14} />} label="Connector Preview" />
      </MetralySidebarSection>
      <MetralySidebarSection label="System">
        <MetralySidebarItem href="/settings" icon={<MetralyIcon name="settings" size={14} />} label="Settings" />
      </MetralySidebarSection>
    </MetralySidebar>
  );
}

function TemplateStage({ stage }: { stage: WizardStage }) {
  const selected = stage === "goal" ? "cto" : "devops";

  return (
    <div className="metraly-dashboard-wizard-recipe__template-list">
      {templates.map((template) => {
        const active = template.id === selected;
        return (
          <button
            key={template.id}
            type="button"
            className={[
              "metraly-dashboard-wizard-recipe__template-card",
              active && "is-selected",
              template.tone === "warning" && "is-warning",
            ].filter(Boolean).join(" ")}
          >
            <span className="metraly-dashboard-wizard-recipe__template-icon" aria-hidden="true">
              <MetralyIcon name={template.icon} size="sm" />
            </span>
            <span className="metraly-dashboard-wizard-recipe__template-copy">
              <span className="metraly-dashboard-wizard-recipe__template-title">{template.title}</span>
              <span className="metraly-dashboard-wizard-recipe__template-description">{template.description}</span>
            </span>
            <span className="metraly-dashboard-wizard-recipe__template-check" aria-hidden="true">
              <MetralyIcon name="check" size="xs" />
            </span>
          </button>
        );
      })}
    </div>
  );
}

function WidgetStage() {
  const [query, setQuery] = React.useState("");
  const normalizedQuery = query.trim().toLowerCase();
  const filteredWidgets = normalizedQuery
    ? widgets.filter((widget) => `${widget.title} ${widget.description} ${widget.tags.join(" ")}`.toLowerCase().includes(normalizedQuery))
    : widgets;

  return (
    <>
      <label className="metraly-dashboard-wizard-recipe__filter">
        <MetralyIcon name="search" size="sm" />
        <span className="metraly-visually-hidden">Search widgets</span>
        <input
          value={query}
          placeholder="Search widgets…"
          onChange={(event) => setQuery(event.target.value)}
        />
      </label>
      <div className="metraly-dashboard-wizard-recipe__tag-row" aria-label="Widget categories">
        {['All', 'DORA', 'CI/CD', 'PR', 'Sprint', 'Team', 'AI'].map((tag, index) => (
          <button key={tag} type="button" className={`metraly-dashboard-wizard-recipe__tag${index === 0 ? ' is-active' : ''}`}>{tag}</button>
        ))}
      </div>
      <div className="metraly-dashboard-wizard-recipe__widget-list">
        {filteredWidgets.map((widget) => (
          <button
            key={widget.id}
            type="button"
            className={[
              "metraly-dashboard-wizard-recipe__widget-row",
              widget.selected && "is-selected",
              widget.warning && "is-warning",
            ].filter(Boolean).join(" ")}
          >
            <span className="metraly-dashboard-wizard-recipe__widget-icon" aria-hidden="true">
              <MetralyIcon name={widget.icon} size="sm" />
            </span>
            <span className="metraly-dashboard-wizard-recipe__template-copy">
              <span className="metraly-dashboard-wizard-recipe__widget-title">{widget.title}</span>
              <span className="metraly-dashboard-wizard-recipe__template-description">{widget.description}</span>
            </span>
            <span className="metraly-dashboard-wizard-recipe__widget-check" aria-hidden="true">
              <MetralyIcon name="check" size="xs" />
            </span>
          </button>
        ))}
      </div>
    </>
  );
}

function SettingsStage() {
  return (
    <div className="metraly-dashboard-wizard-recipe__settings">
      <div className="metraly-dashboard-wizard-recipe__field">
        <label htmlFor="preview-name">Preview name *</label>
        <input id="preview-name" defaultValue="DevOps / SRE Preview" />
      </div>
      <div className="metraly-dashboard-wizard-recipe__field">
        <label htmlFor="preview-description">Description</label>
        <input id="preview-description" placeholder="Optional demo-only note" />
      </div>
      <div className="metraly-dashboard-wizard-recipe__field">
        <label>Default demo time range</label>
        <div className="metraly-dashboard-wizard-recipe__tag-row">
          {['7d', '14d', '30d', '90d'].map((tag) => <button key={tag} type="button" className={`metraly-dashboard-wizard-recipe__tag${tag === '30d' ? ' is-active' : ''}`}>{tag}</button>)}
        </div>
      </div>
      <div className="metraly-dashboard-wizard-recipe__field">
        <label htmlFor="preview-team">Synthetic team scope</label>
        <select id="preview-team" defaultValue="all"><option value="all">All demo teams</option></select>
      </div>
      <div className="metraly-dashboard-wizard-recipe__selected-list">
        <span className="metraly-dashboard-wizard-recipe__caption">Widget layout preview — reorder and toggle width</span>
        {selectedWidgets.map((widget) => (
          <div key={widget.id} className="metraly-dashboard-wizard-recipe__selected-row">
            <span className="metraly-dashboard-wizard-recipe__selected-icon" aria-hidden="true"><MetralyIcon name={widget.icon} size="sm" /></span>
            <span className="metraly-dashboard-wizard-recipe__selected-title">{widget.title}</span>
            <MetralyBadge variant={widget.warning ? "warning" : "info"}>{widget.id === "build" ? "Full" : "Half"}</MetralyBadge>
          </div>
        ))}
      </div>
    </div>
  );
}

function PreviewPane({ stage }: { stage: WizardStage }) {
  const empty = stage === "goal" || stage === "role";

  return (
    <section className="metraly-dashboard-wizard-recipe__preview" aria-label="Dashboard preview">
      <div className="metraly-dashboard-wizard-recipe__preview-head">
        <div className="metraly-dashboard-wizard-recipe__preview-title">
          <span className="metraly-dashboard-wizard-recipe__preview-dot" aria-hidden="true" />
          {stageCopy(stage).previewTitle}
        </div>
        <span className="metraly-dashboard-wizard-recipe__hint">{stageCopy(stage).previewHint}</span>
      </div>
      {empty ? (
        <div className="metraly-dashboard-wizard-recipe__empty-preview">
          <div style={{ display: "grid", gap: 10, justifyItems: "center" }}>
            <MetralyIcon name="layers" size="lg" />
            <span>Add synthetic widgets to see a preview</span>
          </div>
        </div>
      ) : (
        <div className="metraly-dashboard-wizard-recipe__preview-body">
          <div className="metraly-dashboard-wizard-recipe__metric-grid">
            <MetricPreview title="Synthetic Deploy Frequency" value="4.2" unit="/day" />
            <MetricPreview title="Synthetic MTTR" value="18" unit="min" warning />
          </div>
          <div className="metraly-dashboard-wizard-recipe__list-card">
            <strong>Synthetic Build Failures</strong>
            {['sample-integration-tests', 'sample-container-build', 'sample-e2e-suite'].map((item, index) => (
              <div key={item} className="metraly-dashboard-wizard-recipe__list-row">
                <span style={{ display: "inline-flex", alignItems: "center", gap: 8 }}><span style={{ color: "var(--m-err)" }}>•</span>{item}</span>
                <span className="metraly-dashboard-wizard-recipe__hint">demo-{index === 0 ? 'api' : index === 1 ? 'monorepo' : 'frontend'} · {index === 0 ? '2h' : index === 1 ? '5h' : '9h'}</span>
              </div>
            ))}
          </div>
          <div className="metraly-dashboard-wizard-recipe__warning">
            Synthetic anomaly preview using scripted metric-change examples. Not live ML detection.
          </div>
        </div>
      )}
    </section>
  );
}

function MetricPreview({ title, value, unit, warning = false }: { title: string; value: string; unit: string; warning?: boolean }) {
  return (
    <div className="metraly-dashboard-wizard-recipe__metric-card">
      <div className="metraly-dashboard-wizard-recipe__preview-copy">
        <span className="metraly-dashboard-wizard-recipe__preview-subtitle">{title}</span>
        <span><span className="metraly-dashboard-wizard-recipe__metric-value">{value}</span><span className="metraly-dashboard-wizard-recipe__hint">{unit}</span></span>
      </div>
      <svg className={`metraly-dashboard-wizard-recipe__sparkline${warning ? " is-warning" : ""}`} viewBox="0 0 160 44" fill="none" aria-hidden="true">
        <path d="M2 35 C24 31 31 22 48 20 L66 31 L85 19 L104 25 L122 14 L141 24 L158 20" stroke="currentColor" strokeWidth="2" />
        <path d="M2 35 C24 31 31 22 48 20 L66 31 L85 19 L104 25 L122 14 L141 24 L158 20 V44 H2 Z" fill="currentColor" opacity="0.08" />
      </svg>
    </div>
  );
}

function BuilderPanel({ stage, className }: { stage: WizardStage; className?: string }) {
  const copy = stageCopy(stage);

  return (
    <section className={["metraly-dashboard-wizard-recipe__panel", className].filter(Boolean).join(" ")} aria-label="Dashboard wizard controls">
      <div className="metraly-dashboard-wizard-recipe__panel-head">
        <div className="metraly-dashboard-wizard-recipe__notice">
          <strong style={{ color: "var(--m-cyan-500)" }}>Synthetic dashboard builder preview.</strong>{" "}
          Templates, widgets, AI summaries, anomaly indicators, and saved layouts are scripted demo content only.
        </div>
        <MiniStepper stage={stage} />
      </div>
      <div className="metraly-dashboard-wizard-recipe__panel-body">
        <div className="metraly-dashboard-wizard-recipe__panel-copy">
          <div className="metraly-dashboard-wizard-recipe__panel-title">{copy.panelTitle}</div>
          <div className="metraly-dashboard-wizard-recipe__panel-subtitle">{copy.panelDescription}</div>
        </div>
        {stage === "goal" || stage === "role" ? <TemplateStage stage={stage} /> : null}
        {stage === "review" || stage === "error" ? <WidgetStage /> : null}
        {stage === "success" ? <SettingsStage /> : null}
        {stage === "error" ? <div className="metraly-dashboard-wizard-recipe__warning">Workspace policy blocks the incident widget until PagerDuty preview is approved.</div> : null}
      </div>
      <div className="metraly-dashboard-wizard-recipe__panel-footer">
        <MetralyButton variant="ghost">{stage === "goal" ? "Cancel" : "Back"}</MetralyButton>
        <MetralyButton variant={stage === "success" ? "secondary" : "primary"}>{copy.primary}</MetralyButton>
      </div>
    </section>
  );
}

function DashboardWizardScenario({ stage = "goal" }: { stage?: WizardStage }) {
  const [builderOpen, setBuilderOpen] = React.useState(false);
  const [sidebarOpen, setSidebarOpen] = React.useState(false);

  return (
    <div className="metraly-dashboard-wizard-app">
      <MetralyShell
        className={[
          "metraly-dashboard-wizard-app__shell",
          "metraly-shell--mobile-drawer",
          sidebarOpen && "is-sidebar-open",
        ].filter(Boolean).join(" ")}
      >
        <AppShellSidebar id="dashboard-wizard-primary-navigation" />
        <button
          type="button"
          className="metraly-shell__sidebar-scrim"
          aria-label="Close navigation"
          onClick={() => setSidebarOpen(false)}
        />
        <main className="metraly-dashboard-wizard-recipe">
          <MetralyTopbar
            breadcrumb="Workspace / Dashboards / Preview"
            title="Dashboard Preview"
            subtitle="Synthetic dashboard builder preview"
            actions={(
              <>
                <button
                  type="button"
                  className="metraly-shell-mobile-trigger"
                  aria-controls="dashboard-wizard-primary-navigation"
                  aria-expanded={sidebarOpen}
                  onClick={() => setSidebarOpen(true)}
                >
                  <MetralyIcon name="menu" size={13} />
                  Menu
                </button>
                <MetralyButton
                  variant="ghost"
                  className="metraly-dashboard-wizard-recipe__builder-trigger"
                  iconLeft={<MetralyIcon name="menu" size="sm" />}
                  onClick={() => setBuilderOpen(true)}
                >
                  Builder
                </MetralyButton>
                <div className="metraly-dashboard-wizard-recipe__topbar-search">
                  <MetralyInput fullWidth search placeholder="Quick search…" />
                </div>
              </>
            )}
          />
          <div className="metraly-dashboard-wizard-recipe__workspace">
            <BuilderPanel stage={stage} className="is-inline" />
            <PreviewPane stage={stage} />
          </div>
        </main>
      </MetralyShell>
      <MetralyBottomSheet
        open={builderOpen}
        onOpenChange={setBuilderOpen}
        title="Dashboard builder"
        description="Template, widget bundle, and settings"
      >
        <div className="metraly-dashboard-wizard-recipe__builder-sheet">
          <BuilderPanel stage={stage} className="is-sheet" />
        </div>
      </MetralyBottomSheet>
    </div>
  );
}

const meta: Meta<typeof DashboardWizardScenario> = {
  title: "Scenarios/DashboardWizard",
  component: DashboardWizardScenario,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof DashboardWizardScenario>;

export const ChooseGoal: Story = {
  render: () => <DashboardWizardScenario stage="goal" />,
};

export const ChooseRoleTemplate: Story = {
  render: () => <DashboardWizardScenario stage="role" />,
};

export const ReviewWidgetBundle: Story = {
  render: () => <DashboardWizardScenario stage="review" />,
};

export const CreateError: Story = {
  render: () => <DashboardWizardScenario stage="error" />,
};

export const SuccessState: Story = {
  render: () => <DashboardWizardScenario stage="success" />,
};
