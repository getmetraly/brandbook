import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { AppConnectorWizardScreen } from "../../packages/ui/src/app-kit/AppConnectorWizardScreen";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof AppConnectorWizardScreen> = {
  title: "AppKit/AppConnectorWizardScreen",
  component: AppConnectorWizardScreen,
  parameters: { layout: "fullscreen" },
};
export default meta;
type Story = StoryObj<typeof AppConnectorWizardScreen>;

export const StepReviewScope: Story = {
  name: "Step 3 — Review scope",
  render: () => <AppConnectorWizardScreen step={3} />,
};

export const StepAuthorize: Story = {
  name: "Step 2 — Authorize",
  render: () => <AppConnectorWizardScreen step={2} />,
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "fullscreen" },
  render: () => (
    <MetralyStoryFrame
      category="AppKit"
      title="AppConnectorWizardScreen"
      description="Connector setup wizard with step rail, permission review card, and sticky footer. Uses the top-stepper centered-card pattern for connector and source setup flows."
      status="Ready"
      tags={["wizard", "connector", "step-rail", "screen", "app-kit"]}
      fullWidth
      previewVariant="flush"
    >
      <div style={{ height: 700, overflow: "hidden" }}>
        <AppConnectorWizardScreen step={3} />
      </div>
    </MetralyStoryFrame>
  ),
};
