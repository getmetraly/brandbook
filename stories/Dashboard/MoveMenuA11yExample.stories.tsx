import type { Meta, StoryObj } from "@storybook/react";
import { MoveMenuA11yExample } from "../../packages/ui/src/dashboard/MoveMenuA11yExample";

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
