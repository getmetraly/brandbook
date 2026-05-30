import type { Meta, StoryObj } from "@storybook/react-vite";
import { MetralyCodeBlock } from "./MetralyCodeBlock";

const meta = {
  component: MetralyCodeBlock,
  tags: ["ai-generated", "needs-work"],
} satisfies Meta<typeof MetralyCodeBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Block: Story = {
  args: {
    children: "kubectl rollout status deploy/api --watch",
  },
};

export const Inline: Story = {
  args: {
    children: "npm run build-storybook",
  },
  render: () => (
    <p>
      Run <MetralyCodeBlock variant="inline">npm run build-storybook</MetralyCodeBlock> before
      promoting the new UI package.
    </p>
  ),
};

export const WarningAccent: Story = {
  args: {
    accent: "warning",
    children: "Policy drift detected: review required before this connector sync can continue.",
  },
};
