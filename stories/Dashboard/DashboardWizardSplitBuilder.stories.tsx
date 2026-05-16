import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  DashboardWizardSplitBuilder,
  type DashboardWizardStepId,
  type DashboardWizardStep,
} from "../../packages/ui/src/dashboard/DashboardWizardSplitBuilder";
import { MetralyGauge } from "../../packages/ui/src/charts/MetralyGauge";
import { CardShell } from "../../packages/ui/src/components/CardShell";

const meta: Meta<typeof DashboardWizardSplitBuilder> = {
  title: "Dashboard/DashboardWizardSplitBuilder",
  component: DashboardWizardSplitBuilder,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof DashboardWizardSplitBuilder>;

const STEPS_BASE: DashboardWizardStep[] = [
  { id: "goal",     label: "Goal",       helper: "What is this dashboard for?" },
  { id: "role",     label: "Role",       helper: "Who is it for?" },
  { id: "template", label: "Template",   helper: "Start from a tested layout" },
  { id: "widgets",  label: "Widgets",    helper: "Adjust which widgets render" },
  { id: "filters",  label: "Filters",    helper: "Scope by team, source, range" },
  { id: "review",   label: "Review",     helper: "Confirm and save" },
];

function PreviewDORA() {
  return (
    <CardShell>
      <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 12 }}>
        {[
          { label: "Lead time", value: 78 },
          { label: "Deploy freq", value: 92 },
          { label: "Change fail", value: 41 },
          { label: "MTTR", value: 65 },
        ].map((m) => (
          <MetralyGauge
            key={m.label}
            label={m.label}
            value={m.value}
            unit="%"
            variant="compact"
            thresholds={[
              { value: 0, tone: "danger" },
              { value: 60, tone: "warning" },
              { value: 80, tone: "success" },
            ]}
          />
        ))}
      </div>
    </CardShell>
  );
}

export const Default: Story = {
  render: () => {
    const [active, setActive] = React.useState<DashboardWizardStepId>("template");
    const steps: DashboardWizardStep[] = STEPS_BASE.map((s, i) => ({
      ...s,
      complete: i < 2,
      locked: i > 4 && active !== "review",
    }));
    return (
      <div style={{ padding: 16, minHeight: 560 }}>
        <DashboardWizardSplitBuilder
          steps={steps}
          activeStepId={active}
          onSelectStep={setActive}
          stepBody={
            <div style={{ display: "grid", gap: 10 }}>
              <span style={{ fontSize: 13, color: "var(--m-fg-0)", fontWeight: 600 }}>Pick a template</span>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6 }}>
                {["DORA overview", "Source health board", "Sprint burndown", "Incident heatmap"].map((t, i) => (
                  <li key={t}>
                    <button
                      type="button"
                      style={{
                        width: "100%",
                        padding: "8px 10px",
                        borderRadius: 8,
                        border: "1px solid var(--m-line)",
                        background: i === 0 ? "color-mix(in oklch, var(--m-cyan) 14%, var(--m-bg-2))" : "var(--m-bg-2)",
                        color: "var(--m-fg-0)",
                        fontFamily: "inherit",
                        textAlign: "left",
                        cursor: "pointer",
                      }}
                    >
                      {t}
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          }
          preview={<PreviewDORA />}
          footer={
            <>
              <button type="button" style={btn()} onClick={() => setActive(prev(active))}>Back</button>
              <button type="button" style={btn("primary")} onClick={() => setActive(next(active))}>Continue</button>
            </>
          }
        />
      </div>
    );
  },
};

export const EmptyTemplate: Story = {
  render: () => {
    const [active, setActive] = React.useState<DashboardWizardStepId>("template");
    return (
      <div style={{ padding: 16, minHeight: 560 }}>
        <DashboardWizardSplitBuilder
          steps={STEPS_BASE}
          activeStepId={active}
          onSelectStep={setActive}
          stepBody={<div style={{ fontSize: 12.5, color: "var(--m-fg-2)" }}>Pick a starting template on the left.</div>}
          preview={null}
          previewState="empty"
        />
      </div>
    );
  },
};

export const ReviewStep: Story = {
  render: () => {
    const [active, setActive] = React.useState<DashboardWizardStepId>("review");
    const steps: DashboardWizardStep[] = STEPS_BASE.map((s, i) => ({ ...s, complete: i < 5 }));
    return (
      <div style={{ padding: 16, minHeight: 560 }}>
        <DashboardWizardSplitBuilder
          steps={steps}
          activeStepId={active}
          onSelectStep={setActive}
          stepBody={
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "grid", gap: 6, fontSize: 12.5 }}>
              {[
                ["Goal",     "Track DORA on the platform team"],
                ["Role",     "Engineering Manager"],
                ["Template", "DORA overview"],
                ["Widgets",  "4 gauges, 1 trend chart, 1 leaderboard"],
                ["Filters",  "team:platform · window:14d"],
              ].map(([k, v]) => (
                <li key={k} style={{ display: "grid", gridTemplateColumns: "100px 1fr", gap: 8 }}>
                  <span style={{ color: "var(--m-fg-3)", textTransform: "uppercase", letterSpacing: "0.04em", fontSize: 10 }}>{k}</span>
                  <span style={{ color: "var(--m-fg-0)" }}>{v}</span>
                </li>
              ))}
            </ul>
          }
          preview={<PreviewDORA />}
          footer={
            <>
              <button type="button" style={btn()} onClick={() => setActive("filters")}>Back</button>
              <button type="button" style={btn("primary")}>Save dashboard</button>
            </>
          }
        />
      </div>
    );
  },
};

export const WithLockedStep: Story = {
  render: () => {
    const [active, setActive] = React.useState<DashboardWizardStepId>("widgets");
    const steps: DashboardWizardStep[] = STEPS_BASE.map((s, i) => ({
      ...s,
      complete: i < 3,
      locked: i >= 4,
      errorText: s.id === "filters" ? "Pick at least one team" : undefined,
    }));
    return (
      <div style={{ padding: 16, minHeight: 560 }}>
        <DashboardWizardSplitBuilder
          steps={steps}
          activeStepId={active}
          onSelectStep={setActive}
          stepBody={<div style={{ fontSize: 12.5, color: "var(--m-fg-2)" }}>Adjust the widgets that ship in this template.</div>}
          preview={<PreviewDORA />}
        />
      </div>
    );
  },
};

// ────────────────────────────────────────────────────────────────────────────

function btn(variant: "primary" | "ghost" = "ghost"): React.CSSProperties {
  if (variant === "primary") {
    return {
      height: 28, padding: "0 12px", borderRadius: 6,
      border: "1px solid color-mix(in oklch, var(--m-cyan) 50%, transparent)",
      background: "color-mix(in oklch, var(--m-cyan) 18%, transparent)",
      color: "var(--m-cyan)", font: "inherit", fontSize: 12, cursor: "pointer",
    };
  }
  return {
    height: 28, padding: "0 12px", borderRadius: 6,
    border: "1px solid var(--m-line)",
    background: "var(--m-bg-2)",
    color: "var(--m-fg-1)", font: "inherit", fontSize: 12, cursor: "pointer",
  };
}

function next(a: DashboardWizardStepId): DashboardWizardStepId {
  const order: DashboardWizardStepId[] = ["goal", "role", "template", "widgets", "filters", "review"];
  const i = order.indexOf(a);
  return order[Math.min(order.length - 1, i + 1)];
}

function prev(a: DashboardWizardStepId): DashboardWizardStepId {
  const order: DashboardWizardStepId[] = ["goal", "role", "template", "widgets", "filters", "review"];
  const i = order.indexOf(a);
  return order[Math.max(0, i - 1)];
}
