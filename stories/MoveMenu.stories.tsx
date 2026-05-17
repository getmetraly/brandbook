import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { MoveMenu } from "@metraly/ui";

const meta: Meta<typeof MoveMenu> = {
  title: "Components/MoveMenu",
  component: MoveMenu,
  parameters: { layout: "fullscreen" },
};

export default meta;
type Story = StoryObj<typeof MoveMenu>;

function MoveMenuPreview(args: React.ComponentProps<typeof MoveMenu>) {
  const [lastAction, setLastAction] = React.useState("None");

  return (
    <div style={{ minHeight: 320, padding: 24, background: "var(--m-bg-0)", color: "var(--m-fg-0)", display: "grid", gap: 16, alignContent: "start" }}>
      <div style={{ width: "min(320px, 100%)" }}>
        <MoveMenu
          {...args}
          onMove={(direction) => {
            setLastAction(`Move ${direction}`);
            args.onMove(direction);
          }}
          onCancel={() => {
            setLastAction("Cancel");
            args.onCancel();
          }}
        />
      </div>
      <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)" }}>Last action: {lastAction}</div>
    </div>
  );
}

export const Default: Story = {
  args: {
    disabledDirections: [],
    onMove: () => undefined,
    onCancel: () => undefined,
  },
  render: (args) => <MoveMenuPreview {...args} />,
};

export const BoundaryState: Story = {
  args: {
    disabledDirections: ["up", "left"],
    onMove: () => undefined,
    onCancel: () => undefined,
  },
  render: (args) => <MoveMenuPreview {...args} />,
};
