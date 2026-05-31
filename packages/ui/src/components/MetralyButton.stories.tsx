import type { Meta, StoryObj } from "@storybook/react-vite";
import { expect } from "storybook/test";
import { MetralyButton } from "./MetralyButton";
import { MetralyIcon } from "./MetralyIcon";

const meta = {
  component: MetralyButton,
  tags: ["ai-generated"],
} satisfies Meta<typeof MetralyButton>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: {
    children: "Deploy now",
    variant: "primary",
  },
};

export const Loading: Story = {
  args: {
    children: "Saving connector",
    loading: true,
    variant: "secondary",
  },
};

export const WithIcons: Story = {
  args: {
    children: "Add widget",
    iconLeft: <MetralyIcon name="plus" size="sm" />,
    iconRight: <MetralyIcon name="arrowRight" size="sm" />,
    variant: "primary",
  },
};

export const CssCheck: Story = {
  args: {
    children: "Submit",
    variant: "primary",
  },
  play: async ({ canvas }) => {
    const button = canvas.getByRole("button", { name: /submit/i });
    await expect(getComputedStyle(button).backgroundColor).toBe("oklch(0.78 0.13 200)");
  },
};
