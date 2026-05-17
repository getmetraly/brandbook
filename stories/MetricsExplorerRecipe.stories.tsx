import type { Meta, StoryObj } from "@storybook/nextjs";
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
                    flexWrap: "wrap",
                  }}
                >
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-end", flexWrap: "wrap" }}>
                    <MetralySegmentedControl
                      ariaLabel="Time range"
                      value={range}
                      onValueChange={setRange}
                      options={[
                        { value: "7d", label: "7d" },
                        { value: "28d", label: "28d" },
                        { value: "90d", label: "90d" },
                        { value: "12m", label: "12m" },
                      ]}
                    />
                    {mode === "mobile" ? (
                      <MetralyButton variant="secondary" iconLeft={<MetralyIcon name="settings" size="sm" />} onClick={() => setFilterSheetOpen(true)}>
                        Filters
                      </MetralyButton>
                    ) : (
                      filterControls
                    )}
                  </div>
                </div>
              </MetralyPanel>

              <div style={{ display: "grid", gap: 12, gridTemplateColumns: metricColumns }}>
                <MetralyMetricCard
                  title="Deployment frequency"
                  value="24 / day"
                  description="Across 18 services in production"
                  icon={<MetralyIcon name="zap" size="md" />}
                  badge={<MetralyBadge variant="success">Elite</MetralyBadge>}
                  footer={<span style={{ color: "var(--m-ok)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>▲ 18% vs prev. window</span>}
                />
                <MetralyMetricCard
                  title="Lead time for changes"
                  value="41h"
                  description="p50 PR open to deploy"
                  icon={<MetralyIcon name="gitPullRequest" size="md" />}
                  badge={<MetralyBadge variant="primary">Healthy</MetralyBadge>}
                  footer={<span style={{ color: "var(--m-ok)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>▼ 6h vs prev. window</span>}
                />
                <MetralyMetricCard
                  title="Change failure rate"
                  value="4.2%"
                  description="Rollback-triggering deploys"
                  icon={<MetralyIcon name="alertTri" size="md" />}
                  variant="warning"
                  badge={<MetralyBadge variant="warning">Watch</MetralyBadge>}
                  footer={<span style={{ color: "var(--m-warn)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>▲ 0.8% vs prev. window</span>}
                />
                <MetralyMetricCard
                  title="MTTR"
                  value="37m"
                  description="Incident open to resolved"
                  icon={<MetralyIcon name="refresh" size="md" />}
                  variant="info"
                  badge={<MetralyBadge variant="success">Elite</MetralyBadge>}
                  footer={<span style={{ color: "var(--m-ok)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>▼ 12m vs prev. window</span>}
                />
              </div>

              <div style={{ display: "grid", gap: 12, gridTemplateColumns: contentColumns }}>
                <MetralyPanel padding="md">
                  <div style={{ display: "grid", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                      <div style={{ minWidth: 0, flex: "1 1 260px" }}>
                        <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>
                          Deployment frequency trend
                        </div>
                        <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>
                          `MetralyChartCard` can replace this placeholder later without changing recipe structure.
                        </div>
                      </div>
                      <MetralyBadge variant="primary" style={{ maxWidth: "100%" }}>selected: {selectedMetric}</MetralyBadge>
                    </div>
                    <div
                      style={{
                        height: 240,
                        borderRadius: "var(--m-r-4)",
                        border: "1px solid var(--m-line)",
                        background:
                          "linear-gradient(180deg, color-mix(in oklab, var(--m-cyan-500) 12%, transparent), transparent 28%), var(--m-bg-1)",
                        position: "relative",
                        overflow: "hidden",
                      }}
                    >
                      <svg viewBox="0 0 720 240" width="100%" height="100%" preserveAspectRatio="none" aria-hidden="true">
                        <path
                          d="M0 180 C60 170 100 120 140 128 S220 176 280 148 S360 90 420 98 S520 158 580 144 S660 96 720 84"
                          fill="none"
                          stroke="var(--m-cyan-500)"
                          strokeWidth="3"
                          strokeLinecap="round"
                        />
                        <path
                          d="M0 210 L0 180 C60 170 100 120 140 128 S220 176 280 148 S360 90 420 98 S520 158 580 144 S660 96 720 84 L720 240 L0 240 Z"
                          fill="color-mix(in oklab, var(--m-cyan-500) 12%, transparent)"
                        />
                      </svg>
                    </div>
                  </div>
                </MetralyPanel>

                <MetralyPanel padding="md">
                  <div style={{ display: "grid", gap: 10 }}>
                    <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                      <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>Custom formula</div>
                      <MetralyButton variant="primary" size="sm">Run formula</MetralyButton>
                    </div>
                    <MetralyCodeBlock accent="primary">
                      {`ratio(
  deploys(status = "success"),
  deploys(environment = "prod")
)`}
                    </MetralyCodeBlock>
                    <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)" }}>
                      Recipe proof: formula surfaces do not need a dedicated explorer-only component.
                    </div>
                  </div>
                </MetralyPanel>
              </div>

              <MetralyPanel padding="md">
                <div style={{ display: "grid", gap: 10 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                    <div>
                      <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>Breakdown by team</div>
                      <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>
                        Dense table composition with no explorer-specific table API.
                      </div>
                    </div>
                    <MetralyButton variant="ghost" size="sm" iconLeft={<MetralyIcon name="download" size="sm" />}>
                      Export
                    </MetralyButton>
                  </div>
                  <MetralyTable
                    columns={breakdownColumns}
                    data={breakdownRows}
                    rowKey={(row) => String(row.team)}
                    ariaLabel="Breakdown by team"
                    dense
                    stickyHeader
                  />
                </div>
              </MetralyPanel>
            </main>
          </div>
        </MetralyShell>
        {mode === "mobile" ? (
          <>
            <MetralyBottomSheet
              open={drawerOpen}
              onOpenChange={setDrawerOpen}
              title="Switch metric"
              description="quick telemetry jump"
            >
              {metricSwitcherContent}
            </MetralyBottomSheet>
            <MetralyBottomSheet
              open={filterSheetOpen}
              onOpenChange={setFilterSheetOpen}
              title="Filters"
              description="team, repository, and comparison mode"
            >
              <div style={{ display: "grid", gap: 10, padding: 12 }}>{filterControls}</div>
            </MetralyBottomSheet>
          </>
        ) : (
          <MetralyDrawer
            open={mode === "tablet" && drawerOpen}
            onOpenChange={setDrawerOpen}
            title="Switch metric"
            description="compact metric switcher"
            width={320}
          >
            {metricSwitcherContent}
          </MetralyDrawer>
        )}
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof MetricsExplorerRecipe> = {
  title: "Patterns/Metrics Explorer Recipe",
  component: MetricsExplorerRecipe,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof MetricsExplorerRecipe>;

export const Default: Story = {
  render: () => <MetricsExplorerRecipe />,
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => <MetricsExplorerRecipe mode="tablet" />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <MetricsExplorerRecipe mode="mobile" />,
};
