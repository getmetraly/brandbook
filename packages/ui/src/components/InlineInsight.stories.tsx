import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { InlineInsight } from "./InlineInsight";

const actionableArgs = {
  text: "Deploy failures cluster around the same CODEOWNERS rule update.",
  action: "Review diff",
} as const;

function ActionableInlineInsight() {
  const [message, setMessage] = React.useState("No action yet");

  return (
    <div>
      <InlineInsight
        {...actionableArgs}
        onAction={() => setMessage("Review opened")}
      />
      <p>{message}</p>
    </div>
  );
}

const meta = {
  component: InlineInsight,
  tags: ["ai-generated"],
} satisfies Meta<typeof InlineInsight>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    action: "Open evidence",
    text: "Cycle time improved after the flaky integration test was quarantined.",
  },
};

export const WithoutAction: Story = {
  args: {
    text: "No new review bottlenecks were detected in the last 24 hours.",
  },
};

export const Actionable: Story = {
  args: actionableArgs,
  render: () => <ActionableInlineInsight />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /review diff/i }));
    await expect(canvas.getByText(/review opened/i)).toBeVisible();
  },
};
