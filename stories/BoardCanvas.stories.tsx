import type { Meta, StoryObj } from "@storybook/react";
import {
  DashboardGrid,
  DashboardWidget,
  MetralyBadge,
  MetralyButton,
} from "@metraly/ui";

const widgets = [
  { id: "deploy-frequency", title: "Deployment frequency", state: "live" as const, value: "24/day" },
  { id: "lead-time", title: "Lead time", state: "stale" as const, value: "41h" },
  { id: "change-failure-rate", title: "Change failure rate", state: "error" as const, value: "4.2%" },
];

const layout = [
  { i: "deploy-frequency", x: 0, y: 0, w: 4, h: 2 },
  { i: "lead-time", x: 4, y: 0, w: 4, h: 2 },
  { i: "change-failure-rate", x: 8, y: 0, w: 4, h: 2 },
];

function BoardCanvasPreview({ empty = false }: { empty?: boolean }) {
  return (
    <div style={{ minHeight: 320, padding: 24, background: "var(--m-bg-0)" }}>
      <DashboardGrid
        widgets={empty ? [] : widgets}
        layout={layout}
        emptyState={(
          <div style={{ display: "grid", gap: 12 }}>
            <MetralyBadge variant="primary">board canvas</MetralyBadge>
            <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)" }}>
              Start with a telemetry widget to build the first dashboard slice.
            </div>
            <div>
              <MetralyButton variant="primary" size="sm">Add widget</MetralyButton>
            </div>
          </div>
        )}
        renderWidget={(widget) => (
          <DashboardWidget
            id={widget.id}
            title={widget.title}
            state={widget.state}
            stateLabel={widget.state === "stale" ? "Delayed" : undefined}
            fullWidth={widget.id === "change-failure-rate"}
            onDragStart={() => undefined}
          >
            <div style={{ padding: 12, fontFamily: "var(--m-font-mono)", fontSize: 22, color: "var(--m-fg-0)" }}>
              {widget.value}
            </div>
          </DashboardWidget>
        )}
      />
    </div>
  );
}

const meta: Meta<typeof BoardCanvasPreview> = {
  title: "Components/BoardCanvas",
  component: BoardCanvasPreview,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BoardCanvasPreview>;

export const Populated: Story = {
  render: () => <BoardCanvasPreview />,
};

export const Empty: Story = {
  render: () => <BoardCanvasPreview empty />,
};

export const NarrowViewport: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
  render: () => <BoardCanvasPreview />,
};
