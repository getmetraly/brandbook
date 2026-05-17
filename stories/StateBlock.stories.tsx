import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { StateBlock } from "@metraly/ui";

const meta = {
  component: StateBlock,
  tags: ["ai-generated"],
  parameters: { layout: "centered" },
} satisfies Meta<typeof StateBlock>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Empty: Story = {
  args: {
    variant: "empty",
    title: "No data yet",
    description: "Connect a data source to see metrics here.",
  },
};

export const Error: Story = {
  args: {
    variant: "error",
    title: "Something went wrong",
    description: "Failed to load data. Please try again.",
  },
};

export const NoResults: Story = {
  args: {
    variant: "no-results",
    title: "No results found",
    description: "Try adjusting your filters.",
  },
};

export const Gated: Story = {
  args: {
    variant: "gated",
    title: "Upgrade required",
    description: "This feature is available on the Pro plan.",
  },
};

export const Loading: Story = {
  args: { variant: "loading", loadingLines: 3 },
};

export const Compact: Story = {
  args: {
    variant: "empty",
    density: "compact",
    title: "No items",
  },
};
