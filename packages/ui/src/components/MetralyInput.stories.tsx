import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { MetralyInput } from "./MetralyInput";

const meta = {
  component: MetralyInput,
  tags: ["ai-generated"],
} satisfies Meta<typeof MetralyInput>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Labeled: Story = {
  args: {
    defaultValue: "api-production",
    description: "Used to scope rate limits and connector health alerts.",
    label: "Connector name",
  },
};

export const Search: Story = {
  args: {
    label: "Search connectors",
    placeholder: "GitHub, Jira, Linear…",
    search: true,
  },
  play: async ({ canvas }) => {
    await expect(
      canvas.getByRole("searchbox", { name: /search connectors/i }),
    ).toBeVisible();
  },
};

export const ErrorState: Story = {
  args: {
    defaultValue: "metraly_",
    error: "Token must include a project suffix.",
    label: "Workspace token",
  },
};
