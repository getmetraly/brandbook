import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBottomSheet,
  MetralyButton,
  MetralyIcon,
  MetralyInput,
  ThemeProvider,
  WidgetPickerCard,
} from "@metraly/ui";

const widgetItems = [
  {
    id: "deploy-frequency",
    title: "Deployment frequency",
    kind: "dora/deploy-frequency",
    description: "Deploys per day, by service and team.",
    iconLabel: "lightning",
  },
  {
    id: "lead-time",
    title: "Lead time for changes",
    kind: "dora/lead-time",
    description: "PR opened to prod, p50 and p90.",
    iconLabel: "metric",
    selected: true,
  },
  {
    id: "cycle-time",
    title: "Cycle time breakdown",
    kind: "flow/cycle-time",
    description: "Coding, review, merge and deploy stages.",
    iconLabel: "chart",
  },
  {
    id: "flaky-builds",
    title: "Flaky builds",
    kind: "ci/flaky-builds",
    description: "Tests retried then passed in the last 7 days.",
    iconLabel: "refresh",
    visualState: "new" as const,
  },
];

function BottomSheetPreview() {
  const [open, setOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <div style={{ minHeight: 640, background: "var(--m-bg-0)", padding: 24 }}>
        <MetralyButton variant="primary" iconLeft={<MetralyIcon name="boxes" size="sm" />} onClick={() => setOpen(true)}>
          Open widget library
        </MetralyButton>
        <MetralyBottomSheet
          open={open}
          onOpenChange={setOpen}
          title="Widget library"
          description="mobile utility panel"
        >
          <div style={{ padding: 12, display: "grid", gap: 10 }}>
            <MetralyInput search fullWidth placeholder="Filter widgets…" />
            <div
              aria-label="Widget categories"
              style={{
                display: "flex",
                gap: 6,
                overflowX: "auto",
                paddingBottom: 2,
              }}
            >
              {["Recommended", "DORA", "Flow", "CI"].map((label, index) => (
                <button
                  key={label}
                  type="button"
                  style={{
                    border: "1px solid var(--m-line-faint)",
                    background: index === 0 ? "var(--m-cyan-bg)" : "var(--m-bg-2)",
                    color: index === 0 ? "var(--m-cyan-400)" : "var(--m-fg-2)",
                    borderRadius: "999px",
                    padding: "6px 10px",
                    fontFamily: "var(--m-font-mono)",
                    fontSize: "var(--m-fs-9)",
                    whiteSpace: "nowrap",
                  }}
                >
                  {label}
                </button>
              ))}
            </div>
            <div role="listbox" aria-label="Available widgets" style={{ display: "grid", gap: 8, paddingBottom: 4 }}>
              {widgetItems.map((item) => (
                <WidgetPickerCard
                  key={item.id}
                  title={item.title}
                  description={item.description}
                  kind={item.kind}
                  iconLabel={item.iconLabel}
                  selected={item.selected}
                  visualState={item.visualState}
                />
              ))}
            </div>
          </div>
        </MetralyBottomSheet>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof BottomSheetPreview> = {
  title: "Patterns/MetralyBottomSheet",
  component: BottomSheetPreview,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof BottomSheetPreview>;

export const Default: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile2" },
  },
  render: () => <BottomSheetPreview />,
};
