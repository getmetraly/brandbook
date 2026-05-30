import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { expect } from "storybook/test";
import { MetralyButton } from "../components/MetralyButton";
import { MetralyCodeBlock } from "../components/MetralyCodeBlock";
import { MetralyDrawer } from "./MetralyDrawer";

type DrawerStoryProps = Omit<React.ComponentProps<typeof MetralyDrawer>, "children">;


function DrawerStory(args: DrawerStoryProps) {
  const [open, setOpen] = React.useState(args.open);

  return (
    <>
      <MetralyButton onClick={() => setOpen(true)}>Open review drawer</MetralyButton>
      <MetralyDrawer {...args} open={open} onOpenChange={setOpen}>
        <MetralyCodeBlock>
          {"kubectl annotate deployment/payments-api metraly.review=required"}
        </MetralyCodeBlock>
      </MetralyDrawer>
    </>
  );
}

const meta = {
  component: DrawerStory,
  tags: ["ai-generated", "needs-work"],
  args: {
    open: false,
    title: "Connector review",
    description: "Inspect elevated permissions before approving the rollout.",
    side: "right",
    width: 360,
  },
} satisfies Meta<typeof DrawerStory>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Interactive: Story = {
  play: async ({ canvas, userEvent }) => {
    await userEvent.click(
      canvas.getByRole("button", { name: /open review drawer/i }),
    );
    await expect(canvas.getByRole("dialog", { name: /connector review/i })).toBeVisible();
    await userEvent.click(canvas.getByRole("button", { name: /close panel/i }));
    await expect(canvas.queryByRole("dialog", { name: /connector review/i })).toBeNull();
  },
};

export const LeftAligned: Story = {
  args: {
    open: true,
    side: "left",
    title: "Deployment evidence",
    description: "Review traces and metrics side by side before acknowledging the alert.",
  },
};

export const FloatingClose: Story = {
  args: {
    open: true,
    title: undefined,
    description: undefined,
  },
};
