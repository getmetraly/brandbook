import type { Meta, StoryObj } from "@storybook/react";
import React, { useState } from "react";
import {
  DashboardWizardSplitBuilder,
  type DashboardWizardStep,
  type DashboardWizardStepId,
  MetralyButton,
  GaugeWidgetExample,
} from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Dashboard/WizardSplitBuilder",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

const STEPS: DashboardWizardStep[] = [
  { id: "goal",     label: "Goal",         helper: "What do you want to track?", complete: true },
  { id: "role",     label: "Role",         helper: "Who is this dashboard for?",  complete: true },
  { id: "template", label: "Template",     helper: "Start from a template",       complete: false },
  { id: "widgets",  label: "Widgets",      helper: "Add or remove widgets",       locked: true },
  { id: "filters",  label: "Filters",      helper: "Scope the data",             locked: true },
  { id: "review",   label: "Review",       helper: "Name and save",               locked: true },
];

function WizardDemo() {
  const [activeStep, setActiveStep] = useState<DashboardWizardStepId>("template");

  return (
    <DashboardWizardSplitBuilder
      steps={STEPS}
      activeStepId={activeStep}
      onSelectStep={(id) => setActiveStep(id)}
      title="Build a dashboard"
      stepBody={
        <div className="msf__wizard-note">
          Step body for "{activeStep}" renders here.
        </div>
      }
      preview={
        <div className="msf__split-pad">
          <GaugeWidgetExample
            title="DORA score"
            subtitle="Template preview"
            gauge={{ value: 88, max: 100, unit: "%", tone: "success", label: "DORA score", summary: "Good" }}
          />
          <GaugeWidgetExample
            title="Review queue"
            subtitle="Potential bottleneck"
            state="stale"
            gauge={{ value: 64, max: 100, unit: "%", tone: "warning", label: "Reviewer load", summary: "Delayed" }}
          />
        </div>
      }
      previewState="preview"
      footer={
        <div className="msf__actions-end">
          <MetralyButton variant="ghost">Back</MetralyButton>
          <MetralyButton variant="primary">Next</MetralyButton>
        </div>
      }
    />
  );
}

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Dashboard"
      title="DashboardWizardSplitBuilder"
      description="Multi-step split-panel wizard for creating a new dashboard. Left rail = step navigator; right canvas = live preview."
      status="stable"
      tags={["dashboard", "wizard", "interactive"]}
      fullWidth
    >
      <ProductPreview>
        <div className="msf__fixed-h-xl">
          <WizardDemo />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
};
