import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { MetralyBadge, MetralyTabs } from "@metraly/ui";

const baseItems = [
  { value: "overview", label: "Overview" },
  { value: "signals", label: "Signals", count: 12 },
  { value: "evidence", label: "Evidence" },
  { value: "history", label: "History", disabled: true },
] as const;

const meta: Meta<typeof MetralyTabs> = {
  title: "Components/MetralyTabs",
  component: MetralyTabs,
  parameters: { layout: "fullscreen" },
  args: {
    ariaLabel: "Metrics sections",
    items: baseItems as unknown as { value: string; label: React.ReactNode; disabled?: boolean; count?: React.ReactNode }[],
    defaultValue: "overview",
    idBase: "metrics-tabs",
  },
};

export default meta;
type Story = StoryObj<typeof MetralyTabs>;

function TabsPreview(args: React.ComponentProps<typeof MetralyTabs>) {
  const [value, setValue] = React.useState(args.defaultValue ?? args.items[0]?.value);
  const active = args.items.find((item) => item.value === value);

  return (
    <div style={{ minHeight: 360, padding: 24, background: "var(--m-bg-0)", color: "var(--m-fg-0)" }}>
      <div style={{ display: "grid", gap: 16, width: "min(760px, 100%)" }}>
        <MetralyTabs {...args} value={value} onValueChange={setValue} />
        {args.items.map((item) => {
          const selected = item.value === value;
          const panelId = args.idBase ? `${args.idBase}-panel-${item.value}` : undefined;
          const tabId = args.idBase ? `${args.idBase}-tab-${item.value}` : undefined;
          return (
            <section
              key={item.value}
              id={panelId}
              role="tabpanel"
              aria-labelledby={tabId}
              hidden={!selected}
              style={{
                display: selected ? "grid" : "none",
                gap: 10,
                minHeight: 120,
                padding: 16,
                border: "1px solid var(--m-line)",
                borderRadius: "var(--m-r-4)",
                background: "var(--m-bg-2)",
              }}
            >
              <strong style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-14)" }}>{item.label}</strong>
              <span style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-12)" }}>
                Active tabpanel content for {item.value}. ArrowLeft / ArrowRight, Home, and End should move focus and selection.
              </span>
              {item.value === "signals" ? <MetralyBadge variant="info">Dense data panel</MetralyBadge> : null}
            </section>
          );
        })}
        <div
          style={{
            display: "grid",
            gap: 6,
            padding: 12,
            border: "1px dashed var(--m-line-strong)",
            borderRadius: "var(--m-r-3)",
            color: "var(--m-fg-2)",
            fontSize: "var(--m-fs-11)",
          }}
        >
          <strong style={{ color: "var(--m-fg-1)" }}>Route navigation is not tabs.</strong>
          <span>Use tabs only for in-page panel switching. Primary app sections like Dashboard, Metrics Explorer, AI Workspace, Plugins, and Connectors must remain links, not pseudo-tabs.</span>
        </div>
      </div>
    </div>
  );
}

export const Default: Story = {
  render: (args) => <TabsPreview {...args} />,
};

export const Overflow: Story = {
  args: {
    items: [
      { value: "overview", label: "Overview" },
      { value: "review-latency", label: "Review latency", count: 4 },
      { value: "incident-correlation", label: "Incident correlation" },
      { value: "deployment-frequency", label: "Deployment frequency" },
      { value: "change-failure-rate", label: "Change failure rate" },
      { value: "historical-benchmarking", label: "Historical benchmarking" },
    ],
    defaultValue: "incident-correlation",
    idBase: "overflow-tabs",
  },
  render: (args) => <TabsPreview {...args} />,
};

export const LivePulse: Story = {
  args: {
    items: [
      { value: "live", label: "Live sync" },
      { value: "stale", label: "Recent" },
      { value: "history", label: "History" },
    ],
    defaultValue: "live",
    livePulse: true,
    idBase: "live-pulse-tabs",
  },
  render: (args) => <TabsPreview {...args} />,
};
