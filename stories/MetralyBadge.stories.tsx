import type { Meta, StoryObj } from "@storybook/nextjs-vite";
import { expect } from "storybook/test";
import { MetralyBadge } from "@metraly/ui";

const meta = {
  component: MetralyBadge,
  tags: ["ai-generated"],
} satisfies Meta<typeof MetralyBadge>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Primary: Story = {
  args: { children: "Primary", variant: "primary" },
  play: async ({ canvas, canvasElement }) => {
    const badge = canvas.getByText("Primary");
    await expect(badge).toBeVisible();
    // The ThemeProvider decorator renders a child div with data-theme="dark" inside canvasElement.
    const wrapper = canvasElement.querySelector("[data-theme]") as HTMLElement;
    await expect(wrapper?.getAttribute("data-theme")).toBe("dark");
  },
};

// CssCheck: asserts that metraly-ui.css actually loaded — color-scheme:dark is only set when the
// theme CSS is present. This fails on an unstyled render.
export const CssCheck: Story = {
  args: { children: "CSS check", variant: "primary" },
  play: async ({ canvasElement }) => {
    // The ThemeProvider wraps the story content with [data-theme="dark"].
    // metraly-theme.css sets color-scheme:dark on [data-theme="dark"].
    const wrapper = canvasElement.querySelector("[data-theme]") as HTMLElement;
    await expect(getComputedStyle(wrapper).colorScheme).toBe("dark");
  },
};

export const Secondary: Story = {
  args: { children: "Beta", variant: "secondary" },
};

export const Success: Story = {
  args: { children: "Active", variant: "success" },
};

export const Warning: Story = {
  args: { children: "Review", variant: "warning" },
};

export const Error: Story = {
  args: { children: "Failed", variant: "error" },
};

export const Info: Story = {
  args: { children: "Notice", variant: "info" },
};
