import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { CardShell } from "@metraly/ui";

const meta = {
  component: CardShell,
  tags: ["ai-generated"],
  parameters: { layout: "padded" },
} satisfies Meta<typeof CardShell>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: { children: "Card surface" },
};

export const Compact: Story = {
  args: { density: "compact", children: "Compact card" },
};

export const Selected: Story = {
  args: { state: "selected", children: "Selected card" },
};

export const CyanTone: Story = {
  args: { tone: "cyan", children: "Cyan accent card" },
};

export const SuccessTone: Story = {
  args: { tone: "success", children: "Success tone" },
};

export const ErrorState: Story = {
  args: { state: "error", tone: "danger", children: "Error card" },
};

export const Loading: Story = {
  args: { state: "loading", children: "Loading..." },
};
