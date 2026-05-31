import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { AIWorkspaceLayout } from "./AIWorkspaceLayout";
import type { ChatMessage } from "./AIWorkspaceLayout";

const seedMessages: ChatMessage[] = [
  {
    role: "user",
    text: "Why did deployment frequency drop this week?",
  },
  {
    role: "assistant",
    text: "Review wait time rose after the new CODEOWNERS policy landed. The same window also shows fewer merged pull requests.",
    evidence: [
      {
        metricId: "review-queue",
        label: "Review queue",
        value: "+37% median wait",
      },
    ],
  },
];

const quickPrompts = [
  "Summarize deployment regressions",
  "Show connector health risks",
];

const baseArgs = {
  messages: seedMessages,
  onSend: () => {},
  quickPrompts,
  disclaimer: "AI summaries are advisory and require operator review.",
};

function InteractiveAIWorkspaceLayout() {
  const [messages, setMessages] = React.useState<ChatMessage[]>(seedMessages);

  return (
    <AIWorkspaceLayout
      {...baseArgs}
      messages={messages}
      onSend={(text) => {
        setMessages((current) => [...current, { role: "user", text }]);
      }}
    />
  );
}

const meta = {
  component: AIWorkspaceLayout,
  tags: ["ai-generated"],
} satisfies Meta<typeof AIWorkspaceLayout>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: baseArgs,
};

export const Loading: Story = {
  args: {
    ...baseArgs,
    loading: true,
  },
};

export const Composer: Story = {
  args: baseArgs,
  render: () => <InteractiveAIWorkspaceLayout />,
  play: async ({ canvas, userEvent }) => {
    await userEvent.type(canvas.getByRole("textbox", { name: /ask ai workspace/i }), "Show the highest-risk connector");
    await userEvent.click(canvas.getByRole("button", { name: /send/i }));
    await expect(await canvas.findByText(/show the highest-risk connector/i)).toBeVisible();
  },
};
