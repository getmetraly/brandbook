import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCard,
  MetralyIcon,
  MetralyPanel,
  WidgetPickerCard,
  WizardLayout,
} from "@metraly/ui";

type WizardStage = "goal" | "role" | "review" | "error" | "success";

const steps = [
  { id: "goal", label: "Choose goal", status: "done" as const, detail: "Delivery overview" },
  { id: "role", label: "Select template", status: "current" as const, detail: "VP Eng starter bundle" },
  { id: "review", label: "Review widgets", status: "next" as const, detail: "Telemetry sources and defaults" },
  { id: "create", label: "Create dashboard", status: "next" as const, detail: "Persist and open editor" },
];

const roleTemplates = [
  {
    id: "vp-eng",
    title: "VP Engineering",
    subtitle: "Delivery health, DORA, review throughput, and incident rollups.",
    badge: "Recommended",
  },
  {
    id: "cto",
    title: "CTO",
    subtitle: "Cross-portfolio delivery posture with reliability and investment mix.",
    badge: "Executive",
  },
  {
    id: "team-lead",
    title: "Team lead",
    subtitle: "Team-level review latency, blocked work, and deploy outcomes.",
    badge: "Operational",
  },
];

const widgetBundle = [
  {
    id: "deploy-frequency",
    title: "Deployment frequency",
    kind: "dora/deploy-frequency",
    description: "Deploy cadence per service and team.",
    iconLabel: "lightning",
  },
  {
    id: "lead-time",
    title: "Lead time for changes",
    kind: "dora/lead-time",
    description: "PR opened to prod, p50 and p90.",
    iconLabel: "metric",
    selected: true,
  },
  {
    id: "review-latency",
    title: "PR review latency",
    kind: "review/latency",
    description: "First review response with team split.",
    iconLabel: "chart",
  },
  {
    id: "incident-rollup",
    title: "Incident rollup",
    kind: "ops/incidents",
    description: "PagerDuty source is not connected for this workspace yet.",
    iconLabel: "bell",
    disabled: true,
  },
];

function GoalStage() {
  const goals = [
    { id: "delivery", title: "Delivery overview", description: "Start with deploys, lead time, failures, and review flow.", active: true },
    { id: "exec", title: "Executive scorecard", description: "Weekly posture snapshot for leadership and planning reviews." },
    { id: "team", title: "Team operations", description: "Daily action board for managers and staff engineers." },
  ];

  return (
    <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
      {goals.map((goal) => (
        <MetralyCard
          key={goal.id}
          title={goal.title}
          subtitle={goal.description}
          icon={<MetralyIcon name="target" size="md" />}
          state={goal.active ? "selected" : "default"}
          footer={goal.active ? <MetralyBadge variant="primary">selected</MetralyBadge> : undefined}
        />
      ))}
    </div>
  );
}

function RoleStage() {
  return (
    <div style={{ display: "grid", gap: 10 }}>
      {roleTemplates.map((role) => (
        <MetralyPanel key={role.id} padding="md">
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
            <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
              <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>{role.title}</div>
              <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>{role.subtitle}</div>
            </div>
            <div style={{ display: "grid", gap: 8, justifyItems: "end" }}>
              <MetralyBadge variant={role.id === "vp-eng" ? "primary" : "info"}>{role.badge}</MetralyBadge>
              <MetralyButton variant={role.id === "vp-eng" ? "primary" : "ghost"} size="sm">
                {role.id === "vp-eng" ? "Selected" : "Use template"}
              </MetralyButton>
            </div>
          </div>
        </MetralyPanel>
      ))}
    </div>
  );
}

function ReviewStage({ error = false, success = false }: { error?: boolean; success?: boolean }) {
  return (
    <div style={{ display: "grid", gap: 12 }}>
      <MetralyPanel padding="md">
        <div style={{ display: "grid", gap: 8 }}>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>Starter widget bundle</div>
            <MetralyBadge variant="info">4 widgets</MetralyBadge>
          </div>
          <div style={{ display: "grid", gap: 8, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
            {widgetBundle.map((widget) => (
              <WidgetPickerCard
                key={widget.id}
                title={widget.title}
                description={widget.description}
                kind={widget.kind}
                iconLabel={widget.iconLabel}
                selected={Boolean(widget.selected)}
                disabled={Boolean(widget.disabled)}
                stateLabel={widget.disabled ? "Gated" : undefined}
              />
            ))}
          </div>
        </div>
      </MetralyPanel>

      <MetralyPanel padding="md">
        <div style={{ display: "grid", gap: 6 }}>
          <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>Creation result</div>
          {error ? (
            <>
              <MetralyBadge variant="danger">Create failed</MetralyBadge>
              <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                Workspace policy blocked dashboard creation until PagerDuty access is approved.
              </div>
            </>
          ) : success ? (
            <>
              <MetralyBadge variant="success">Dashboard created</MetralyBadge>
              <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                Delivery overview is ready. Open editor and continue with widget placement.
              </div>
            </>
          ) : (
            <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
              Connected sources: GitHub, Jira. Missing source: PagerDuty, so incident widget stays gated.
            </div>
          )}
        </div>
      </MetralyPanel>
    </div>
  );
}

function DashboardWizardScenario({ stage = "goal" }: { stage?: WizardStage }) {
  const resolvedSteps = steps.map((step) => {
    if (stage === "goal") {
      if (step.id === "goal") return { ...step, status: "current" as const, detail: "Pick a dashboard intent" };
      if (step.id === "role") return { ...step, status: "next" as const, detail: "Choose a role template" };
    }

    if (stage === "review" || stage === "error" || stage === "success") {
      if (step.id === "role") return { ...step, status: "done" as const, detail: "VP Eng starter bundle" };
      if (step.id === "review") return { ...step, status: "current" as const, detail: "Verify widgets and gating" };
      if (step.id === "create") return { ...step, status: "next" as const, detail: "Persist and open editor" };
    }

    if (stage === "success") {
      if (step.id === "review") return { ...step, status: "done" as const, detail: "Widget bundle confirmed" };
      if (step.id === "create") return { ...step, status: "done" as const, detail: "Dashboard created" };
    }

    if (stage === "error") {
      if (step.id === "review") return { ...step, status: "warning" as const, detail: "Policy approval required" };
    }

    return step;
  });

  return (
    <WizardLayout
      steps={resolvedSteps}
      eyebrow="Dashboard Wizard"
      title="Create a delivery dashboard"
      description="Goal, role template, widget bundle, and final creation gate before the editor opens."
      currentStepBadge={<MetralyBadge variant={stage === "error" ? "danger" : stage === "success" ? "success" : "primary"}>{stage === "error" ? "policy blocked" : stage === "success" ? "created" : "in progress"}</MetralyBadge>}
      headerActions={<MetralyButton variant="ghost" size="sm">Save draft</MetralyButton>}
      review={stage === "review" || stage === "error" || stage === "success" ? <ReviewStage error={stage === "error"} success={stage === "success"} /> : undefined}
      footer={(
        <MetralyPanel padding="sm">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <MetralyButton variant="ghost">Back</MetralyButton>
            <MetralyButton variant={stage === "success" ? "secondary" : "primary"}>
              {stage === "success" ? "Open editor" : "Continue"}
            </MetralyButton>
          </div>
        </MetralyPanel>
      )}
    >
      {stage === "goal" ? <GoalStage /> : null}
      {stage === "role" ? <RoleStage /> : null}
      {stage === "review" || stage === "error" || stage === "success" ? null : null}
    </WizardLayout>
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
