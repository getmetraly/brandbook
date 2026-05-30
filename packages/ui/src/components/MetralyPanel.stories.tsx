import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetralyPanel } from "./MetralyPanel";

const meta = {
  component: MetralyPanel,
  tags: ["ai-generated", "needs-work"],
  args: {
    children: "Panels group supporting information without redefining the global card language.",
  },
} satisfies Meta<typeof MetralyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Padded: Story = {
  args: {
    padding: "lg",
    children: "Use larger padding for explanatory content or procedural checklists.",
  },
};

export const Focusable: Story = {
  args: {
    focusable: true,
    padding: "md",
    children: "Focusable panels can participate in keyboard-driven review workflows.",
  },
};
