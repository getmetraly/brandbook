import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MetralyBadge, StepRail } from "@metraly/ui";
import type { StepRailStep } from "@metraly/ui";

const stageStyle: React.CSSProperties = {
  padding: 32,
  background: "var(--m-bg-0)",
  color: "var(--m-fg-0)",
};

// ─── Sample step sets ─────────────────────────────────────────────────────────

const connectorSteps: StepRailStep[] = [
  { id: "source", label: "Select source", status: "done" },
  { id: "preview", label: "Preview connection", status: "current" },
  { id: "configure", label: "Configure", status: "next" },
  { id: "review", label: "Review", status: "next" },
];

const firstSteps: StepRailStep[] = [
  { id: "source", label: "Select source", status: "current" },
  { id: "preview", label: "Preview connection", status: "next" },
  { id: "configure", label: "Configure", status: "next" },
  { id: "review", label: "Review", status: "next" },
];

const lastSteps: StepRailStep[] = [
  { id: "source", label: "Select source", status: "done" },
  { id: "preview", label: "Preview connection", status: "done" },
  { id: "configure", label: "Configure", status: "done" },
  { id: "review", label: "Review", status: "current" },
];

const warningSteps: StepRailStep[] = [
  { id: "source", label: "Select source", status: "done" },
  { id: "preview", label: "Preview connection", status: "warning", detail: "auth failed" },
  { id: "configure", label: "Configure", status: "next" },
  { id: "review", label: "Review", status: "next" },
];

const twoSteps: StepRailStep[] = [
  { id: "setup", label: "Setup", status: "done" },
  { id: "confirm", label: "Confirm", status: "current" },
];

const verticalSteps: StepRailStep[] = [
  { id: "source", label: "Select source", status: "done", detail: "GitHub" },
  { id: "preview", label: "Preview connection", status: "current", detail: "verifying auth" },
  { id: "configure", label: "Configure", status: "next", detail: "pending" },
  { id: "review", label: "Review", status: "next" },
];

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof StepRail> = {
  title: "Components/StepRail",
  component: StepRail,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof StepRail>;

// ─── Horizontal stories ───────────────────────────────────────────────────────

export const HorizontalMiddleStep: Story = {
  name: "Horizontal / Middle step",
  render: () => (
    <div style={stageStyle}>
      <StepRail steps={connectorSteps} orientation="horizontal" />
    </div>
  ),
};

export const HorizontalFirstStep: Story = {
  name: "Horizontal / First step",
  render: () => (
    <div style={stageStyle}>
      <StepRail steps={firstSteps} orientation="horizontal" />
    </div>
  ),
};

export const HorizontalLastStep: Story = {
  name: "Horizontal / Last step (review)",
  render: () => (
    <div style={stageStyle}>
      <StepRail steps={lastSteps} orientation="horizontal" />
    </div>
  ),
};

export const HorizontalWarningStep: Story = {
  name: "Horizontal / Warning step",
  render: () => (
    <div style={stageStyle}>
      <StepRail steps={warningSteps} orientation="horizontal" />
    </div>
  ),
};

export const HorizontalTwoSteps: Story = {
  name: "Horizontal / Two steps (minimal)",
  render: () => (
    <div style={stageStyle}>
      <StepRail steps={twoSteps} orientation="horizontal" />
    </div>
  ),
};

/** Mobile: horizontal stepper should scroll horizontally below ~560px. */
export const HorizontalMobile: Story = {
  name: "Horizontal / Mobile (390px)",
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <div style={{ ...stageStyle, maxWidth: 390 }}>
      <StepRail steps={connectorSteps} orientation="horizontal" />
    </div>
  ),
};

// ─── Vertical stories ─────────────────────────────────────────────────────────

export const VerticalRail: Story = {
  name: "Vertical / Side rail (documentation mode)",
  render: () => (
    <div style={{ ...stageStyle, maxWidth: 340 }}>
      <StepRail
        steps={verticalSteps}
        orientation="vertical"
        footnote={<MetralyBadge variant="primary">layout primitive</MetralyBadge>}
      />
    </div>
  ),
};

export const VerticalRailNoFootnote: Story = {
  name: "Vertical / Side rail (no footnote)",
  render: () => (
    <div style={{ ...stageStyle, maxWidth: 300 }}>
      <StepRail steps={verticalSteps} orientation="vertical" />
    </div>
  ),
};

export const VerticalRailWarning: Story = {
  name: "Vertical / Warning step",
  render: () => (
    <div style={{ ...stageStyle, maxWidth: 300 }}>
      <StepRail steps={warningSteps} orientation="vertical" />
    </div>
  ),
};
