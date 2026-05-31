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
  MetralyMetricCard,
  MetralyNavigationTree,
  MetralyPanel,
  MetralySegmentedControl,
  MetralySelect,
  MetralyShell,
  MetralySidebar,
  MetralySidebarItem,
  MetralySidebarSection,
  MetralyTable,
  MetralyTopbar,
  ThemeProvider,
} from "@metraly/ui";

type RecipeMode = "desktop" | "tablet" | "mobile";

const metricTree = [
  {
    value: "dora",
    label: "DORA metrics",
    icon: <MetralyIcon name="zap" size="sm" />,
    children: [
      { value: "deploy-frequency", label: "Deployment frequency", tone: "primary" as const, meta: "24/day" },
      { value: "lead-time", label: "Lead time for changes", tone: "success" as const, meta: "41h" },
      { value: "change-failure-rate", label: "Change failure rate", tone: "warning" as const, meta: "4.2%" },
      { value: "mttr", label: "MTTR", tone: "success" as const, meta: "37m" },
    ],
  },
  {
    value: "flow",
    label: "Flow and review",
    icon: <MetralyIcon name="chart" size="sm" />,
    children: [
      { value: "cycle-time", label: "Cycle time breakdown", meta: "4 stages" },
      { value: "review-latency", label: "Review latency", meta: "5.4h" },
      { value: "blocked-work", label: "Blocked work", tone: "warning" as const, meta: "9 items" },
    ],
  },
  {
    value: "ci",
    label: "Build and release",
    icon: <MetralyIcon name="refresh" size="sm" />,
    children: [
      { value: "ci-failure-rate", label: "CI failure rate", tone: "error" as const, meta: "8.1%" },
      { value: "flaky-builds", label: "Flaky builds", tone: "warning" as const, meta: "37" },
    ],
  },
];

type BreakdownRow = {
  team: React.ReactNode;
  deploys: React.ReactNode;
  leadTime: React.ReactNode;
  cfr: React.ReactNode;
  incidents: React.ReactNode;
};

const breakdownColumns = [
  { key: "team" as const, header: "Team", width: "34%" },
  { key: "deploys" as const, header: "Deploys", align: "right" as const, width: "16%" },
  { key: "leadTime" as const, header: "Lead time", align: "right" as const, width: "18%" },
  { key: "cfr" as const, header: "CFR", align: "right" as const, width: "14%" },
  { key: "incidents" as const, header: "Incidents", align: "right" as const, width: "18%" },
];

const breakdownRows: BreakdownRow[] = [
  { team: "platform", deploys: 42, leadTime: "29h", cfr: "2.8%", incidents: 1 },
  { team: "growth", deploys: 31, leadTime: "44h", cfr: <span style={{ color: "var(--m-warn)" }}>5.1%</span>, incidents: 2 },
  { team: "billing", deploys: 19, leadTime: "38h", cfr: "3.9%", incidents: 1 },
  { team: "search", deploys: 26, leadTime: "41h", cfr: "4.4%", incidents: 1 },
  { team: "data-platform", deploys: 14, leadTime: <span style={{ color: "var(--m-warn)" }}>57h</span>, cfr: "6.3%", incidents: 3 },
];

const metricGroups = [
  { value: "dora", label: "DORA" },
  { value: "flow", label: "Flow" },
  { value: "ci", label: "CI" },
] as const;

function MetricsExplorerRecipe({ mode = "desktop" }: { mode?: RecipeMode }) {
  const [selectedMetric, setSelectedMetric] = React.useState("deploy-frequency");
  const [range, setRange] = React.useState("28d");
  const [compareEnabled, setCompareEnabled] = React.useState("compare-off");
  const [metricGroup, setMetricGroup] = React.useState("dora");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [filterSheetOpen, setFilterSheetOpen] = React.useState(false);
  const showSidebar = mode === "desktop";
  const metricColumns = mode === "desktop" ? "repeat(4, minmax(0, 1fr))" : mode === "tablet" ? "repeat(2, minmax(0, 1fr))" : "1fr";
  const contentColumns = mode === "desktop" ? "minmax(0, 1.5fr) minmax(320px, 0.8fr)" : "1fr";
  const selectedMetricLabel = React.useMemo(() => {
    for (const group of metricTree) {
      for (const item of group.children ?? []) {
        if (item.value === selectedMetric) return item.label;
      }
    }
    return "Selected metric";
  }, [selectedMetric]);

  const sidebarHeader = (
    <div
      style={{
        display: "grid",
        gap: 12,
        padding: "16px 12px 14px",
        borderBottom: "1px solid var(--m-line-faint)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <div
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--m-r-3)",
            border: "1px solid var(--m-line)",
            background: "linear-gradient(180deg, var(--m-bg-2), var(--m-bg-3))",
            display: "grid",
            placeItems: "center",
            color: "var(--m-cyan-500)",
          }}
        >
          <MetralyIcon name="search" size="md" />
        </div>
        <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
          <span style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 600 }}>Metrics Explorer</span>
          <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>
            telemetry navigation recipe
          </span>
        </div>
      </div>
      <MetralyInput
        search
        fullWidth
        placeholder="Search metrics"
        description="Demonstrates tree search placement without introducing a dedicated explorer component."
      />
    </div>
  );

  const metricSwitcherContent = (
    <div style={{ display: "grid", gap: 10, padding: 12 }}>
      <MetralyInput search fullWidth placeholder="Search metrics" />
      <MetralySegmentedControl
        ariaLabel="Metric groups"
        size="sm"
        value={metricGroup}
        onValueChange={setMetricGroup}
        options={metricGroups}
      />
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          gap: 10,
          padding: "10px 12px",
          border: "1px solid var(--m-line)",
          borderRadius: "var(--m-r-3)",
          background: "var(--m-bg-2)",
        }}
      >
        <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
          <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>
            Current selection
          </span>
          <span style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 500 }}>
            {selectedMetricLabel}
          </span>
        </div>
        <MetralyBadge variant="primary">Live</MetralyBadge>
      </div>
      <MetralyNavigationTree
        ariaLabel="Metric navigation"
        items={metricTree}
        value={selectedMetric}
        defaultExpandedValues={["dora", "flow", "ci"]}
        onValueChange={(value) => {
          setSelectedMetric(value);
          setDrawerOpen(false);
        }}
      />
    </div>
  );

  const filterControls = (
    <>
      <div style={{ width: mode === "mobile" ? "100%" : 164 }}>
        <MetralySelect
          label="Team"
          defaultValue="all-teams"
          options={[
            { value: "all-teams", label: "All teams" },
            { value: "platform", label: "Platform" },
            { value: "growth", label: "Growth" },
            { value: "search", label: "Search" },
          ]}
        />
      </div>
      <div style={{ width: mode === "mobile" ? "100%" : 164 }}>
        <MetralySelect
          label="Repository"
          defaultValue="all-repos"
          options={[
            { value: "all-repos", label: "All repositories" },
            { value: "frontend", label: "frontend-app" },
            { value: "platform", label: "platform-core" },
            { value: "data", label: "data-pipelines" },
          ]}
        />
      </div>
      <MetralySegmentedControl
        ariaLabel="Comparison mode"
        size="sm"
        value={compareEnabled}
        onValueChange={setCompareEnabled}
        interactionMode={mode === "mobile" ? "toolbar" : "radio"}
        fullWidth={mode === "mobile"}
        options={[
          { value: "compare-off", label: "Current only" },
          { value: "compare-on", label: "Compare to prev." },
        ]}
      />
    </>
  );

  return (
    <ThemeProvider>
      <div style={{ height: 820, background: "var(--m-bg-0)" }}>
        <MetralyShell>
          {showSidebar ? (
            <MetralySidebar collapsed={false} header={sidebarHeader}>
              <MetralySidebarSection label="Views">
                <MetralySidebarItem active icon={<MetralyIcon name="chart" size="sm" />} label="Metrics Explorer" />
                <MetralySidebarItem icon={<MetralyIcon name="bar2" size="sm" />} label="Dashboards" />
              </MetralySidebarSection>
              <MetralySidebarSection label="Metric tree">
                <div style={{ padding: "4px 6px 8px" }}>
                  <MetralyNavigationTree
                    ariaLabel="Metric navigation"
                    items={metricTree}
                    value={selectedMetric}
                    defaultExpandedValues={["dora", "flow", "ci"]}
                    onValueChange={setSelectedMetric}
                  />
                </div>
              </MetralySidebarSection>
            </MetralySidebar>
          ) : null}

          <div style={{ flex: 1, minWidth: 0, display: "flex", flexDirection: "column" }}>
            <MetralyTopbar
              title="Metrics Explorer"
              subtitle={mode === "mobile" ? "Narrow telemetry recipe." : "Recipe assembled from shell, navigation, control, data-display and code seams."}
              breadcrumb={mode === "mobile" ? "Analytics / Metrics" : "Workspace / Analytics / Metrics Explorer"}
              actions={
                <>
                  {mode !== "desktop" ? (
                    <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="menu" size="sm" />} onClick={() => setDrawerOpen(true)}>
                      Metrics
                    </MetralyButton>
                  ) : null}
                  <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="download" size="sm" />}>
                    Export CSV
                  </MetralyButton>
                  {mode !== "mobile" ? (
                    <MetralyButton variant="secondary" iconLeft={<MetralyIcon name="copy" size="sm" />}>
                      Save view
                    </MetralyButton>
                  ) : null}
                </>
              }
            />

            <main
              style={{
                flex: 1,
                minWidth: 0,
                overflow: "auto",
                padding: 16,
                display: "grid",
                gap: 12,
                alignContent: "start",
              }}
            >
              <MetralyPanel padding="md">
                <div
                  style={{
                    display: "flex",
                    gap: 10,
                    alignItems: "flex-end",
                    justifyContent: "space-between",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flex: 1 }}>
                    <div style={{ width: 200 }}>
                      <MetralySelect
                        label="Time range"
                        defaultValue="28d"
                        value={range}
                        onValueChange={setRange}
                        options={[
                          { value: "7d", label: "Last 7 days" },
                          { value: "14d", label: "Last 14 days" },
                          { value: "28d", label: "Last 28 days" },
                          { value: "90d", label: "Last 90 days" },
                        ]}
                      />
                    </div>
                    {mode === "mobile" ? (
                      <MetralyButton variant="ghost" onClick={() => setFilterSheetOpen(true)}>
                        Filters
                      </MetralyButton>
                    ) : (
                      <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flex: 1 }}>
                        {filterControls}
                      </div>
                    )}
                  </div>
                  <MetralyButton variant="ghost" iconLeft={<MetralyIcon name="settings" size="sm" />} />
                </div>
              </MetralyPanel>

              <div style={{ display: "grid", gridTemplateColumns: metricColumns, gap: 12 }}>
                <MetralyMetricCard
                  label="Deployment frequency"
                  value="24"
                  unit="/day"
                  change={12}
                  trend="up"
                  icon={<MetralyIcon name="zap" size="md" />}
                  tone="primary"
                />
                <MetralyMetricCard
                  label="Lead time for changes"
                  value="41"
                  unit="h"
                  change={-8}
                  trend="down"
                  icon={<MetralyIcon name="clock" size="md" />}
                  tone="success"
                />
                <MetralyMetricCard
                  label="Change failure rate"
                  value="4.2"
                  unit="%"
                  change={2}
                  trend="up"
                  icon={<MetralyIcon name="alert" size="md" />}
                  tone="warning"
                />
                <MetralyMetricCard
                  label="MTTR"
                  value="37"
                  unit="m"
                  change={-15}
                  trend="down"
                  icon={<MetralyIcon name="shield" size="md" />}
                  tone="success"
                />
              </div>

              <div style={{ display: "grid", gridTemplateColumns: contentColumns, gap: 16 }}>
                <MetralyPanel padding="md">
                  <MetralyCodeBlock
                    language="json"
                    code={JSON.stringify(
                      {
                        metric: selectedMetricLabel,
                        granularity: "daily",
                        aggregation: "mean",
                        sample: [
                          { date: "2025-05-27", value: 22.1 },
                          { date: "2025-05-28", value: 24.3 },
                          { date: "2025-05-29", value: 23.8 },
                        ],
                      },
                      null,
                      2
                    )}
                    accent="primary"
                  />
                </MetralyPanel>

                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                  <MetralyPanel padding="md" style={{ flex: 1, display: "grid", gap: 10, alignContent: "start" }}>
                    <div style={{ display: "grid", gap: 10 }}>
                      <h3 style={{ fontSize: "var(--m-fs-11)", fontWeight: 600, margin: 0, color: "var(--m-fg-0)" }}>
                        About this metric
                      </h3>
                      <p style={{ margin: 0, fontSize: "var(--m-fs-10)", color: "var(--m-fg-3)", lineHeight: 1.5 }}>
                        Deployment frequency measures how often code is released. Higher frequency indicates mature CI/CD practices.
                      </p>
                      <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                        <MetralyBadge variant="secondary">dora</MetralyBadge>
                        <MetralyBadge variant="secondary">velocity</MetralyBadge>
                      </div>
                    </div>
                  </MetralyPanel>
                  <MetralyPanel padding="md" style={{ minHeight: 200 }}>
                    <div style={{ display: "grid", gap: 10, height: "100%", alignContent: "start" }}>
                      <h3 style={{ fontSize: "var(--m-fs-11)", fontWeight: 600, margin: 0, color: "var(--m-fg-0)" }}>
                        Breakdown by team
                      </h3>
                      <MetralyTable
                        columns={breakdownColumns}
                        rows={breakdownRows}
                        striped={true}
                        compact={true}
                        style={{ fontSize: "var(--m-fs-10)" }}
                      />
                    </div>
                  </MetralyPanel>
                </div>
              </div>
            </main>
          </div>

          {/* Metric switcher drawer */}
          <MetralyDrawer open={drawerOpen} onOpenChange={setDrawerOpen}>
            <div style={{ padding: 0 }}>{metricSwitcherContent}</div>
          </MetralyDrawer>

          {/* Mobile filters bottom sheet */}
          <MetralyBottomSheet open={filterSheetOpen} onOpenChange={setFilterSheetOpen}>
            <div style={{ padding: "16px 12px 12px", display: "grid", gap: 12 }}>
              <div style={{ display: "grid", gap: 2 }}>
                <h3 style={{ fontSize: "var(--m-fs-11)", fontWeight: 600, margin: 0, color: "var(--m-fg-0)" }}>
                  Filters
                </h3>
                <p style={{ margin: 0, fontSize: "var(--m-fs-10)", color: "var(--m-fg-3)" }}>
                  Refine your view
                </p>
              </div>
              <div style={{ display: "grid", gap: 10 }}>{filterControls}</div>
            </div>
          </MetralyBottomSheet>
        </MetralyShell>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof MetricsExplorerRecipe> = {
  title: "Recipes / Metrics Explorer",
  render: () => <MetricsExplorerRecipe />,
};

export default meta;

type Story = StoryObj<typeof MetricsExplorerRecipe>;

export const Default: Story = {
  render: () => <MetricsExplorerRecipe />,
};

export const Tablet: Story = {
  render: () => <MetricsExplorerRecipe mode="tablet" />,
  parameters: {
    viewport: {
      defaultViewport: "tablet",
    },
  },
};

export const Mobile: Story = {
  render: () => <MetricsExplorerRecipe mode="mobile" />,
  parameters: {
    viewport: {
      defaultViewport: "mobile1",
    },
  },
};
