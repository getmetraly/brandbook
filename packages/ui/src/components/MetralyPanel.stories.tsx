import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { MetralyPanel } from "./MetralyPanel";

const PanelStoryFrame = (Story: React.ComponentType) => (
  <div className="sb-story-panel-frame">
    <Story />
  </div>
);

const DefaultPanelContent = () => (
  <div className="sb-story-panel-content">
    <strong className="sb-story-panel-title">Realtime policy sync</strong>
    <p className="sb-story-panel-copy">
      Panels group supporting information without redefining the global card language.
    </p>
  </div>
);

const meta = {
  component: MetralyPanel,
  tags: ["ai-generated", "needs-work"],
  decorators: [PanelStoryFrame],
  args: {
    padding: "md",
    children: <DefaultPanelContent />,
  },
} satisfies Meta<typeof MetralyPanel>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const Padded: Story = {
  args: {
    padding: "lg",
    children: (
      <div className="sb-story-panel-content">
        <strong className="sb-story-panel-title">Review checkpoint</strong>
        <p className="sb-story-panel-copy">
          Use larger padding for explanatory content or procedural checklists.
        </p>
      </div>
    ),
  },
};

export const Focusable: Story = {
  args: {
    focusable: true,
    padding: "md",
    children: (
      <div className="sb-story-panel-content">
        <strong className="sb-story-panel-title">Keyboard review</strong>
        <p className="sb-story-panel-copy">
          Focusable panels can participate in keyboard-driven review workflows.
        </p>
      </div>
    ),
  },
};

export const UnpaddedComposition: Story = {
  args: {
    padding: "none",
    children: (
      <div className="sb-story-panel-inner-surface">
        Composed primitives can own their internal spacing while reusing the panel surface.
      </div>
    ),
  },
};
