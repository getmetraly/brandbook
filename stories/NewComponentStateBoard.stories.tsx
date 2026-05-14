import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyBottomSheet,
  MetralyButton,
  MetralyCodeBlock,
  MetralyDrawer,
  MetralyIcon,
  MetralyInput,
  MetralyNavigationTree,
  MetralySegmentedControl,
  MetralySidebar,
  MetralySidebarItem,
  MetralySidebarSection,
  ThemeProvider,
} from "@metraly/ui";

function BoardSection({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section
      style={{
        display: "grid",
        gap: 10,
        minWidth: 0,
        padding: 12,
        border: "1px solid var(--m-line)",
        borderRadius: "var(--m-r-4)",
        background: "var(--m-bg-1)",
      }}
    >
      <div
        style={{
          color: "var(--m-fg-3)",
          fontFamily: "var(--m-font-mono)",
          fontSize: "var(--m-fs-9)",
          letterSpacing: "0.05em",
          textTransform: "uppercase",
        }}
      >
        {title}
      </div>
      {children}
    </section>
  );
}

function NewComponentStateBoard() {
  const [range, setRange] = React.useState("28d");
  const [toolbarRange, setToolbarRange] = React.useState("current");
  const [selectedMetric, setSelectedMetric] = React.useState("lead-time");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [sheetOpen, setSheetOpen] = React.useState(false);

  return (
    <ThemeProvider>
      <div style={{ minHeight: "100dvh", display: "grid", gap: 16, padding: 16, background: "var(--m-bg-0)", color: "var(--m-fg-1)" }}>
        <div style={{ display: "grid", gap: 4 }}>
          <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-18)", fontWeight: 600 }}>New component state board</div>
          <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-10)" }}>
            Canonical states for the newer public seams. Use this next to Scenarios / Component State Board.
          </div>
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: 12 }}>
          <BoardSection title="1. MetralyButton">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <MetralyButton variant="primary">Primary</MetralyButton>
              <MetralyButton variant="secondary">Secondary</MetralyButton>
              <MetralyButton variant="ghost">Ghost</MetralyButton>
              <MetralyButton variant="neutral">Neutral</MetralyButton>
              <MetralyButton variant="danger">Danger</MetralyButton>
              <MetralyButton variant="dashed">Dashed</MetralyButton>
              <MetralyButton variant="primary" loading>Saving</MetralyButton>
              <MetralyButton variant="primary" disabled>Disabled</MetralyButton>
            </div>
          </BoardSection>

          <BoardSection title="2. MetralyInput">
            <div style={{ display: "grid", gap: 8 }}>
              <MetralyInput fullWidth label="Repository" placeholder="frontend-app" />
              <MetralyInput search fullWidth placeholder="Search metrics" />
              <MetralyInput fullWidth label="Token" placeholder="••••••••" iconLeft={<MetralyIcon name="lock" size="sm" />} />
              <MetralyInput fullWidth label="Error" error="Token expired" placeholder="ghp_..." />
              <MetralyInput fullWidth label="Disabled" disabled placeholder="Managed by policy" />
            </div>
          </BoardSection>

          <BoardSection title="3. MetralyBadge">
            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
              <MetralyBadge variant="primary">primary</MetralyBadge>
              <MetralyBadge variant="secondary">secondary</MetralyBadge>
              <MetralyBadge variant="success">success</MetralyBadge>
              <MetralyBadge variant="warning">warning</MetralyBadge>
              <MetralyBadge variant="error">error</MetralyBadge>
              <MetralyBadge variant="info">info</MetralyBadge>
            </div>
          </BoardSection>

          <BoardSection title="4. MetralySegmentedControl">
            <div style={{ display: "grid", gap: 10 }}>
              <MetralySegmentedControl
                ariaLabel="Radio-like range"
                value={range}
                onValueChange={setRange}
                options={[
                  { value: "7d", label: "7d" },
                  { value: "28d", label: "28d" },
                  { value: "90d", label: "90d" },
                  { value: "12m", label: "12m", disabled: true },
                ]}
              />
              <MetralySegmentedControl
                ariaLabel="Toolbar comparison mode"
                size="sm"
                interactionMode="toolbar"
                value={toolbarRange}
                onValueChange={setToolbarRange}
                options={[
                  { value: "current", label: "Current" },
                  { value: "compare", label: "Compare" },
                ]}
              />
            </div>
          </BoardSection>

          <BoardSection title="5. MetralyNavigationTree">
            <MetralyNavigationTree
              ariaLabel="State-board navigation tree"
              value={selectedMetric}
              onValueChange={setSelectedMetric}
              defaultExpandedValues={["dora", "flow"]}
              items={[
                {
                  value: "dora",
                  label: "DORA metrics",
                  icon: <MetralyIcon name="zap" size="sm" />,
                  children: [
                    { value: "deploy-frequency", label: "Deployment frequency", tone: "primary", meta: "24/day" },
                    { value: "lead-time", label: "Lead time for changes", tone: "success", meta: "41h" },
                    { value: "change-failure-rate", label: "Change failure rate", tone: "warning", meta: "4.2%" },
                  ],
                },
                {
                  value: "flow",
                  label: "Flow and review",
                  icon: <MetralyIcon name="chart" size="sm" />,
                  children: [
                    { value: "review-latency", label: "Review latency", meta: "5.4h" },
                    { value: "blocked-work", label: "Blocked work", tone: "warning", meta: "9" },
                    { value: "disabled", label: "Disabled metric", disabled: true, meta: "locked" },
                  ],
                },
              ]}
            />
          </BoardSection>

          <BoardSection title="6. MetralyCodeBlock">
            <div style={{ display: "grid", gap: 8 }}>
              <MetralyCodeBlock accent="primary">{`metraly auth connect --provider github`}</MetralyCodeBlock>
              <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                <MetralyCodeBlock variant="inline" accent="success">success</MetralyCodeBlock>
                <MetralyCodeBlock variant="inline" accent="warning">warning</MetralyCodeBlock>
                <MetralyCodeBlock variant="inline" accent="error">error</MetralyCodeBlock>
                <MetralyCodeBlock variant="inline" accent="info">info</MetralyCodeBlock>
              </div>
            </div>
          </BoardSection>

          <BoardSection title="7. MetralyDrawer / MetralyBottomSheet">
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <MetralyButton variant="primary" onClick={() => setDrawerOpen(true)}>Open drawer</MetralyButton>
              <MetralyButton variant="secondary" onClick={() => setSheetOpen(true)}>Open sheet</MetralyButton>
            </div>
            <MetralyDrawer open={drawerOpen} onOpenChange={setDrawerOpen} title="Navigation drawer" description="full-height side context panel">
              <MetralySidebar style={{ width: "100%", height: "100%", borderRight: 0 }}>
                <MetralySidebarSection label="Views">
                  <MetralySidebarItem active icon={<MetralyIcon name="chart" size="sm" />} label="Metrics Explorer" />
                  <MetralySidebarItem icon={<MetralyIcon name="bar2" size="sm" />} label="Dashboard" />
                </MetralySidebarSection>
              </MetralySidebar>
            </MetralyDrawer>
            <MetralyBottomSheet open={sheetOpen} onOpenChange={setSheetOpen} title="Filters" description="mobile utility tray">
              <div style={{ display: "grid", gap: 10, padding: 12 }}>
                <MetralyInput search fullWidth placeholder="Filter widgets" />
                <MetralySegmentedControl fullWidth ariaLabel="Widget group" options={[{ value: "dora", label: "DORA" }, { value: "flow", label: "Flow" }]} />
              </div>
            </MetralyBottomSheet>
          </BoardSection>
        </div>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof NewComponentStateBoard> = {
  title: "Scenarios/New Component State Board",
  component: NewComponentStateBoard,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof NewComponentStateBoard>;

export const Default: Story = {
  render: () => <NewComponentStateBoard />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <NewComponentStateBoard />,
};
