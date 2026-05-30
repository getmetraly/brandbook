import type { Meta, StoryObj } from "@storybook/react";
import React from "react";
import { MoveMenuA11yExample } from "@metraly/ui";
import { MetralyStoryFrame, ProductPreview } from "../_shared/MetralyStoryFrame";

const meta: Meta = {
  title: "Dashboard/MoveMenuA11y",
  parameters: { layout: "fullscreen" },
};
export default meta;

type Story = StoryObj;

// MoveMenuA11yExample uses default widgets if `initial` is omitted.
// initial: MoveMenuA11yWidget[] where each widget has { id, title, subtitle?, position: { row, col } }

const INITIAL_WIDGETS = [
  { id: "lead-time",   title: "Lead time",        subtitle: "p50 last 14d",  position: { row: 0, col: 0 } },
  { id: "deploy-freq", title: "Deploy frequency",  subtitle: "per day",       position: { row: 0, col: 1 } },
  { id: "change-fail", title: "Change failure",    subtitle: "rolling 14d",   position: { row: 0, col: 2 } },
  { id: "mttr",        title: "MTTR",              subtitle: "rolling 14d",   position: { row: 1, col: 0 } },
  { id: "sla",         title: "SLA saturation",    subtitle: "core APIs",     position: { row: 1, col: 1 } },
];

export const Overview: Story = {
  render: () => (
    <MetralyStoryFrame
      category="Dashboard"
      title="MoveMenuA11y"
      description="Keyboard-driven widget re-ordering. Tab to a widget → open Move Menu → arrow keys reposition without mouse drag."
      status="stable"
      tags={["a11y", "keyboard", "dashboard"]}
      fullWidth
    >
      <ProductPreview>
        <div style={{ padding: 24 }}>
          <MoveMenuA11yExample initial={INITIAL_WIDGETS} rows={3} cols={3} />
        </div>
      </ProductPreview>
    </MetralyStoryFrame>
  ),
};
