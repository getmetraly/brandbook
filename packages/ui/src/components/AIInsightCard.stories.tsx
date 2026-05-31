import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { AIInsightCard } from "./AIInsightCard";

const actionableArgs = {
  title: "Build time regression detected",
  body: "Average CI duration increased from 4 min 20 s to 6 min 45 s since the cache policy changed.",
  action: "View builds",
} as const;

function ActionableAIInsightCard() {
  const [message, setMessage] = React.useState("Idle");

  return (
    <div>
      <AIInsightCard
        {...actionableArgs}
        onAction={() => setMessage("Action triggered")}
      />
      <p>{message}</p>
    </div>
  );
}

const meta = {
  component: AIInsightCard,
  tags: ["ai-generated"],
  decorators: [(Story: React.ComponentType) => (
    <div className="sb-story-card-frame"><Story /></div>
  )],
} satisfies Meta<typeof AIInsightCard>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "Deployment frequency dropped 40%",
    body: "The platform team shipped three times last week, down from five the week before the review policy update.",
    action: "Explore trend",
  },
};

export const Passive: Story = {
  args: {
    title: "No blocking issues found",
    body: "All connectors are healthy and the last 48 syncs completed without errors.",
    pulse: false,
  },
};

export const Actionable: Story = {
  args: actionableArgs,
  render: () => <ActionableAIInsightCard />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(canvas.getByRole("button", { name: /view builds/i }));
    await expect(canvas.getByText(/action triggered/i)).toBeVisible();
  },
};
