import type { Meta, StoryObj } from "@storybook/nextjs";
import { MoveMenuA11yExample } from "../../packages/ui/src/dashboard/MoveMenuA11yExample";
import * as React from "react";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof MoveMenuA11yExample> = {
  title: "Dashboard/MoveMenuA11yExample",
  component: MoveMenuA11yExample,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "P0 keyboard fallback for the dashboard editor. Demonstrates: Tab to select a widget, arrow keys to move, or use the MoveMenu — no drag required. The pulse-wave glyph is NEVER used as a drag handle; the neutral grip dots from HandlePrimitive are.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MoveMenuA11yExample>;

export const Default: Story = { args: { rows: 3, cols: 3 } };

export const FourByThree: Story = { args: { rows: 4, cols: 3 } };

export const NarrowMobile: Story = {
  args: { rows: 3, cols: 3 },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="Dashboard"
      title="MoveMenuA11yExample"
      description="Keyboard-accessible dashboard grid — Tab to select a widget, arrow keys to move, or use the MoveMenu. P0 keyboard fallback for the dashboard editor so no drag interaction is required."
      status="Ready"
      tags={["dashboard", "a11y", "keyboard", "move-menu", "grid"]}
    >
      <MoveMenuA11yExample rows={3} cols={3} />
    </MetralyStoryFrame>
  ),
};
