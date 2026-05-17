import type { Meta, StoryObj } from "@storybook/nextjs";
import * as React from "react";
import { WidgetStateMatrix } from "../../packages/ui/src/components/WidgetStateMatrix";
import { MetralyGauge } from "../../packages/ui/src/charts/MetralyGauge";
import { MetralyStoryFrame } from "../_shared/MetralyStoryFrame";

const meta: Meta<typeof WidgetStateMatrix> = {
  title: "Components/WidgetStateMatrix",
  component: WidgetStateMatrix,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "Documentation utility. Renders a single widget-capable component under every WidgetState status so reviewers can confirm coverage at a glance.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof WidgetStateMatrix>;

export const GaugeMatrix: Story = {
  render: () => (
    <WidgetStateMatrix
      title="MetralyGauge — state coverage"
      description="Lead time score · same data, every state."
      columns={4}
      render={(s) => (
        <MetralyGauge
          label="Lead time score"
          value={s === "ready" || s === "partial" || s === "stale" ? 78 : undefined}
          unit="%"
          variant="compact"
          state={s}
          thresholds={[
            { value: 0, tone: "danger" },
            { value: 60, tone: "warning" },
            { value: 80, tone: "success" },
          ]}
        />
      )}
    />
  ),
};

export const ThreeColumnLayout: Story = {
  render: () => (
    <WidgetStateMatrix
      title="MetralyGauge — three column"
      columns={3}
      render={(s) => (
        <MetralyGauge
          label="Source health"
          value={s === "ready" || s === "partial" || s === "stale" ? 91 : undefined}
          unit="%"
          variant="compact"
          state={s}
        />
      )}
    />
  ),
};

export const ProductPreview: Story = {
  name: "Product Preview",
  parameters: { layout: "padded" },
  render: () => (
    <MetralyStoryFrame
      category="Components"
      title="WidgetStateMatrix"
      description="Documentation utility that renders any widget-capable component under every WidgetState status in a uniform grid."
      status="Ready"
      tags={["testing", "states", "matrix", "documentation"]}
    >
      <WidgetStateMatrix
        title="MetralyGauge — state coverage"
        description="Lead time score · same data, every state."
        columns={4}
        render={(s) => (
          <MetralyGauge
            label="Lead time score"
            value={s === "ready" || s === "partial" || s === "stale" ? 78 : undefined}
            unit="%"
            variant="compact"
            state={s}
            thresholds={[
              { value: 0, tone: "danger" },
              { value: 60, tone: "warning" },
              { value: 80, tone: "success" },
            ]}
          />
        )}
      />
    </MetralyStoryFrame>
  ),
};
