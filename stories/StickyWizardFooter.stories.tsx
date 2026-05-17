import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { MetralyBadge, MetralyButton, StickyWizardFooter } from "@metraly/ui";

const stageStyle: React.CSSProperties = {
  padding: 32,
  background: "var(--m-bg-0)",
  color: "var(--m-fg-0)",
};

const frameStyle: React.CSSProperties = {
  width: "min(680px, 100%)",
};

// ─── Meta ─────────────────────────────────────────────────────────────────────

const meta: Meta<typeof StickyWizardFooter> = {
  title: "Components/StickyWizardFooter",
  component: StickyWizardFooter,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof StickyWizardFooter>;

// ─── Stories ──────────────────────────────────────────────────────────────────

/** Middle step: both Back and primary action visible. */
export const MiddleStep: Story = {
  name: "Middle step / Back + Continue",
  render: () => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <StickyWizardFooter
          back={
            <MetralyButton variant="ghost" onClick={() => {}}>
              Back
            </MetralyButton>
          }
          primary={
            <MetralyButton variant="primary" onClick={() => {}}>
              Continue
            </MetralyButton>
          }
        />
      </div>
    </div>
  ),
};

/** First step: no Back button — primary action takes the right slot. */
export const FirstStep: Story = {
  name: "First step / Primary only",
  render: () => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <StickyWizardFooter
          primary={
            <MetralyButton variant="primary" onClick={() => {}}>
              Get started
            </MetralyButton>
          }
        />
      </div>
    </div>
  ),
};

/** Last step: disabled primary while submitting. */
export const Submitting: Story = {
  name: "Last step / Submitting (disabled primary)",
  render: () => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <StickyWizardFooter
          back={
            <MetralyButton variant="ghost" disabled onClick={() => {}}>
              Back
            </MetralyButton>
          }
          primary={
            <MetralyButton variant="primary" disabled onClick={() => {}}>
              Creating…
            </MetralyButton>
          }
        />
      </div>
    </div>
  ),
};

/** With center status slot — e.g. a save-error badge. */
export const WithStatus: Story = {
  name: "With status / Save error feedback",
  render: () => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <StickyWizardFooter
          back={
            <MetralyButton variant="ghost" onClick={() => {}}>
              Back
            </MetralyButton>
          }
          status={
            <MetralyBadge variant="danger">Save failed — retry</MetralyBadge>
          }
          primary={
            <MetralyButton variant="primary" onClick={() => {}}>
              Retry
            </MetralyButton>
          }
        />
      </div>
    </div>
  ),
};

/** Mobile: verify position becomes static and buttons wrap on ≤560px. */
export const Mobile: Story = {
  name: "Mobile / Static position (≤560px)",
  parameters: { viewport: { defaultViewport: "mobile2" } },
  render: () => (
    <div style={{ ...stageStyle, maxWidth: 390 }}>
      <p style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-11)", marginBottom: 16 }}>
        On narrow viewports the footer loses sticky positioning and flows
        naturally below the wizard card.
      </p>
      <StickyWizardFooter
        back={
          <MetralyButton variant="ghost" onClick={() => {}}>
            Back
          </MetralyButton>
        }
        primary={
          <MetralyButton variant="primary" onClick={() => {}}>
            Continue
          </MetralyButton>
        }
      />
    </div>
  ),
};

/** Composed inside a WizardLayout footer slot — verifies the slot contract. */
export const InsideWizardFooterSlot: Story = {
  name: "Composed / WizardLayout footer slot",
  render: () => (
    <div style={stageStyle}>
      <div style={frameStyle}>
        <p style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-11)", marginBottom: 24 }}>
          Use <code>StickyWizardFooter</code> as the <code>footer</code> prop of{" "}
          <code>WizardLayout</code> to get the canonical Back / primary rhythm.
          The footer is rendered inside a <code>.metraly-wizard-layout-footer</code>{" "}
          wrapper that handles the full-width constraint.
        </p>
        <StickyWizardFooter
          back={
            <MetralyButton variant="ghost" onClick={() => {}}>
              Back
            </MetralyButton>
          }
          primary={
            <MetralyButton variant="primary" onClick={() => {}}>
              Save and continue
            </MetralyButton>
          }
        />
      </div>
    </div>
  ),
};
