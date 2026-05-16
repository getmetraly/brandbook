import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyHeatmap,
  type MetralyHeatmapCell,
} from "../../packages/ui/src/charts/MetralyHeatmap";
import { WidgetStateMatrix } from "../../packages/ui/src/components/WidgetStateMatrix";
import { HeatmapWidgetExample } from "../../packages/ui/src/dashboard/DashboardWidgetExamples";

const meta: Meta<typeof MetralyHeatmap> = {
  title: "Charts/MetralyHeatmap",
  component: MetralyHeatmap,
  parameters: {
    layout: "padded",
    docs: {
      description: {
        component:
          "First-class heatmap primitive. Source-agnostic data shape; reusable across deploy density, incident heatmaps, PR aging, flaky-test patterns, and connector sync gaps. Includes keyboard cell navigation and accessible cell summaries.",
      },
    },
  },
};
export default meta;
type Story = StoryObj<typeof MetralyHeatmap>;

function HeatmapShowcase({
  children,
  width = 880,
}: {
  children: React.ReactNode;
  width?: number;
}) {
  return <div style={{ maxWidth: width }}>{children}</div>;
}

// ── realistic fixtures ─────────────────────────────────────────────────────

const HOURS = [
  "00",
  "02",
  "04",
  "06",
  "08",
  "10",
  "12",
  "14",
  "16",
  "18",
  "20",
  "22",
];
const WEEKDAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function genCells(
  rows: string[],
  cols: string[],
  seed: number,
  shape: (r: number, c: number) => number,
): MetralyHeatmapCell[] {
  const out: MetralyHeatmapCell[] = [];
  for (let r = 0; r < rows.length; r++) {
    for (let c = 0; c < cols.length; c++) {
      const v = Math.max(
        0,
        Math.round(shape(r, c) + ((seed * (r + 1) * (c + 1)) % 5) - 2),
      );
      out.push({ x: cols[c], y: rows[r], value: v });
    }
  }
  return out;
}

// deploys per weekday/hour — peak Tue–Thu mid-day
const deployCells = genCells(WEEKDAYS, HOURS, 7, (r, c) => {
  const dayWeight = [3, 7, 9, 8, 6, 1, 1][r] ?? 0;
  const hourWeight = c >= 4 && c <= 9 ? 5 : 0;
  return dayWeight + hourWeight;
});

const deployTooltipCells: MetralyHeatmapCell[] = deployCells.map((cell) => ({
  ...cell,
  description:
    cell.value === 0
      ? "No production deploys in this 2-hour bucket"
      : `${cell.value} production deploys landed in this bucket`,
  labels: {
    source: "deploy-events",
    environment: "prod",
    window: "2h",
    weekday: cell.y,
  },
}));

// ── deploy activity ────────────────────────────────────────────────────────

export const DeployActivity: Story = {
  args: {
    title: "Deploy activity",
    description:
      "Last 28 days · production deploys by weekday and 2-hour bucket",
    xLabels: HOURS,
    yLabels: WEEKDAYS,
    cells: deployTooltipCells,
    unit: "deploys",
    ariaLabel: "Deploy activity by weekday and 2-hour bucket",
    colorScale: { min: 0, max: 16, ramp: "cyan" },
  },
};

export const ColorRampSystem: Story = {
  render: () => (
    <HeatmapShowcase>
      <MetralyHeatmap
        title="Deploy activity — color ramp"
        description="Values stay out of cells by default; color encodes low to high intensity"
        xLabels={HOURS}
        yLabels={WEEKDAYS}
        cells={deployCells}
        unit="deploys"
        colorScale={{ min: 0, max: 16, ramp: "cyan" }}
        ariaLabel="Deploy activity heatmap with cyan intensity ramp"
      />
    </HeatmapShowcase>
  ),
};

export const TooltipDetails: Story = {
  render: () => (
    <HeatmapShowcase>
      <MetralyHeatmap
        title="Deploy activity — tooltip details"
        description="Hover or keyboard-focus a cell to inspect value, status and labels"
        xLabels={HOURS}
        yLabels={WEEKDAYS}
        cells={deployTooltipCells}
        unit="deploys"
        colorScale={{ min: 0, max: 16, ramp: "cyan" }}
        ariaLabel="Deploy activity heatmap with cell tooltips"
      />
    </HeatmapShowcase>
  ),
};

export const WithCellValues: Story = {
  render: () => (
    <HeatmapShowcase>
      <MetralyHeatmap
        title="Deploy activity — values visible"
        description="Opt-in value labels for dense review/debug contexts"
        xLabels={HOURS}
        yLabels={WEEKDAYS}
        cells={deployCells}
        unit="deploys"
        showCellValues
        colorScale={{ min: 0, max: 16, ramp: "cyan" }}
        ariaLabel="Deploy activity heatmap with visible cell values"
      />
    </HeatmapShowcase>
  ),
};

export const SparseDeployActivity: Story = {
  render: () => (
    <HeatmapShowcase>
      <MetralyHeatmap
        title="Sparse deploy activity"
        description="Sparse cells stay compact and do not stretch to fill the full canvas"
        xLabels={HOURS}
        yLabels={WEEKDAYS}
        cells={deployCells.filter(
          (cell) => cell.value !== null && cell.value > 8,
        )}
        unit="deploys"
        colorScale={{ min: 0, max: 16, ramp: "cyan" }}
        ariaLabel="Sparse deploy activity heatmap"
      />
    </HeatmapShowcase>
  ),
};

// ── incidents by service / severity ────────────────────────────────────────

const SERVICES = [
  "core-api",
  "payments",
  "ingest",
  "scheduler",
  "search",
  "billing",
];
const SEVERITIES = ["sev0", "sev1", "sev2", "sev3"];

const incidentCells: MetralyHeatmapCell[] = (() => {
  const data: MetralyHeatmapCell[] = [];
  const matrix: number[][] = [
    [0, 1, 2, 4],
    [0, 0, 3, 6],
    [1, 2, 5, 8],
    [0, 0, 1, 3],
    [0, 1, 4, 5],
    [0, 0, 2, 4],
  ];
  SERVICES.forEach((svc, r) => {
    SEVERITIES.forEach((sev, c) => {
      const v = matrix[r][c];
      data.push({
        x: sev,
        y: svc,
        value: v,
        status:
          c === 0 && v > 0
            ? "danger"
            : c === 1 && v > 0
              ? "warning"
              : "neutral",
        description:
          v === 0
            ? "no incidents this window"
            : `${v} ${sev} incidents in 30 d`,
        labels: { service: svc, severity: sev, window: "30d" },
      });
    });
  });
  return data;
})();

export const IncidentHeatmap: Story = {
  args: {
    title: "Incidents by service & severity",
    description: "Trailing 30 d",
    xLabels: SEVERITIES,
    yLabels: SERVICES,
    cells: incidentCells,
    unit: "incidents",
    ariaLabel: "Incidents by service and severity",
    colorScale: { min: 0, max: 8, ramp: "semantic" },
  },
};

// ── PR aging ───────────────────────────────────────────────────────────────

const TEAMS = ["platform", "growth", "data", "billing", "infra"];
const WEEKS = ["W18", "W19", "W20", "W21", "W22"];
const prAgingCells: MetralyHeatmapCell[] = genCells(TEAMS, WEEKS, 3, (r, c) => {
  return [12, 18, 22, 14, 9][r] * (0.7 + (c % 3) * 0.1);
});

export const PRAgingByTeam: Story = {
  args: {
    title: "PR aging by team & week",
    description: "Median PR age in hours · lower is better",
    xLabels: WEEKS,
    yLabels: TEAMS,
    cells: prAgingCells,
    unit: "h",
    ariaLabel: "Median PR age by team and week",
    colorScale: { min: 0, max: 24, ramp: "danger" },
  },
};

// ── flaky tests by suite/day ───────────────────────────────────────────────

const SUITES = ["unit", "integration", "e2e-web", "e2e-api", "perf"];
const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri"];
const flakyCells: MetralyHeatmapCell[] = genCells(SUITES, DAYS, 11, (r, c) => {
  return [0, 2, 6, 9, 4][r] + (c % 2 === 0 ? 2 : 0);
});

export const DivergingReviewLoad: Story = {
  render: () => {
    const teams = ["platform", "growth", "data", "billing", "infra"];
    const weeks = ["W18", "W19", "W20", "W21", "W22"];
    const values = [
      [-6, -2, 0, 4, 8],
      [-3, 1, 5, 7, 10],
      [-8, -4, 0, 2, 6],
      [2, 4, 7, 9, 12],
      [-2, 0, 3, 5, 9],
    ];
    const cells = teams.flatMap((team, row) =>
      weeks.map((week, col) => ({
        x: week,
        y: team,
        value: values[row][col],
        description: `${values[row][col]} h versus target`,
      })),
    );
    return (
      <HeatmapShowcase>
        <MetralyHeatmap
          title="Review load delta"
          description="Diverging ramp: purple below target, cyan above target"
          xLabels={weeks}
          yLabels={teams}
          cells={cells}
          unit="h"
          colorScale={{
            min: -12,
            mid: 0,
            max: 12,
            ramp: "cyan-purple-diverging",
          }}
          ariaLabel="Review load delta by team and week"
        />
      </HeatmapShowcase>
    );
  },
};

export const FlakyTestsBySuite: Story = {
  args: {
    title: "Flaky tests by suite & day",
    description: "Count of failures attributed to flakiness, not signal",
    xLabels: DAYS,
    yLabels: SUITES,
    cells: flakyCells,
    unit: "flakes",
    ariaLabel: "Flaky tests by suite and weekday",
    colorScale: { min: 0, max: 14, ramp: "semantic" },
  },
};

// ── connector sync gaps ────────────────────────────────────────────────────

const SOURCES = [
  "github-acme",
  "github-frontend",
  "jira-prod",
  "linear-platform",
];
const SYNC_DAYS = [
  "May 09",
  "May 10",
  "May 11",
  "May 12",
  "May 13",
  "May 14",
  "May 15",
];

const syncCells: MetralyHeatmapCell[] = (() => {
  const data: MetralyHeatmapCell[] = [];
  const matrix: Array<Array<number | null>> = [
    [0, 0, 0, 0, 0, 0, 0],
    [0, 0, 12, 0, 0, 0, 0],
    [0, 0, 0, 0, 35, 0, 0],
    [0, 0, 0, 0, 0, 0, null],
  ];
  SOURCES.forEach((s, r) => {
    SYNC_DAYS.forEach((d, c) => {
      const v = matrix[r][c];
      data.push({
        x: d,
        y: s,
        value: v,
        status:
          v === null
            ? "neutral"
            : v === 0
              ? "ok"
              : v > 20
                ? "danger"
                : "warning",
        description:
          v === null ? "no data" : v === 0 ? "no gap" : `${v} min gap`,
        labels: { source: s, day: d, sla: "≤ 5 min", status: v === null ? "missing" : v === 0 ? "healthy" : "gap" },
      });
    });
  });
  return data;
})();

export const ConnectorSyncGaps: Story = {
  args: {
    title: "Connector sync gaps",
    description: "Largest gap per day, in minutes. Zero is healthy.",
    xLabels: SYNC_DAYS,
    yLabels: SOURCES,
    cells: syncCells,
    unit: "min",
    ariaLabel: "Connector sync gaps by source and day",
    colorScale: { min: 0, max: 35, ramp: "semantic" },
  },
};

// ── compact dashboard widget ───────────────────────────────────────────────

export const CompactDashboardWidget: Story = {
  render: () => (
    <div style={{ maxWidth: 380 }}>
      <HeatmapWidgetExample
        title="Deploy activity"
        subtitle="last 28 d"
        heatmap={{
          xLabels: HOURS,
          yLabels: WEEKDAYS,
          cells: deployCells,
          unit: "deploys",
          density: "dashboard",
          colorScale: { min: 0, max: 16, ramp: "cyan" },
          ariaLabel: "Compact dashboard deploy activity heatmap",
        }}
        onDrilldown={() => {}}
      />
    </div>
  ),
};

// ── keyboard focus + drilldown ────────────────────────────────────────────

export const SelectedCellDrilldown: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<string>(
      "No cell selected yet",
    );
    return (
      <HeatmapShowcase>
        <MetralyHeatmap
          title="Connector sync gaps"
          description="Use Tab, arrow keys, Enter or click to inspect a cell"
          xLabels={SYNC_DAYS}
          yLabels={SOURCES}
          cells={syncCells}
          unit="min"
          colorScale={{ min: 0, max: 35, ramp: "semantic" }}
          ariaLabel="Interactive connector sync gaps heatmap"
          onCellFocus={(cell) =>
            setSelected(
              cell ? `Focused ${cell.y} · ${cell.x}` : "No cell focused",
            )
          }
          onCellActivate={(cell) =>
            setSelected(
              `Open drilldown for ${cell.y} · ${cell.x}: ${cell.value ?? "no data"} min`,
            )
          }
        />
        <p
          style={{
            margin: "10px 0 0",
            color: "var(--m-fg-2)",
            font: "500 12px/1.4 var(--m-font-ui)",
          }}
        >
          {selected}
        </p>
      </HeatmapShowcase>
    );
  },
};

// ── states ────────────────────────────────────────────────────────────────

export const Loading: Story = {
  args: {
    xLabels: HOURS,
    yLabels: WEEKDAYS,
    cells: [],
    state: "loading",
    title: "Deploy activity",
  },
};
export const Empty: Story = {
  args: {
    xLabels: HOURS,
    yLabels: WEEKDAYS,
    cells: [],
    state: "empty",
    title: "Deploy activity",
  },
};
export const ErrorState: Story = {
  args: {
    xLabels: HOURS,
    yLabels: WEEKDAYS,
    cells: [],
    state: "error",
    title: "Deploy activity",
  },
};
export const Stale: Story = {
  args: { ...DeployActivity.args!, state: "stale" },
};
export const Partial: Story = {
  args: { ...DeployActivity.args!, state: "partial" },
};
export const RateLimited: Story = {
  args: { ...DeployActivity.args!, state: "rate_limited" },
};

// ── widget state matrix ────────────────────────────────────────────────────

export const FullStateMatrix: Story = {
  render: () => (
    <WidgetStateMatrix
      title="MetralyHeatmap — widget state matrix"
      columns={4}
      render={(s) => (
        <MetralyHeatmap
          xLabels={HOURS.slice(0, 6)}
          yLabels={WEEKDAYS.slice(0, 4)}
          cells={
            s === "ready" || s === "partial" || s === "stale"
              ? deployCells.slice(0, 24)
              : []
          }
          state={s}
          compact
          density="compact"
          showLegend={false}
          colorScale={{ min: 0, max: 16, ramp: "cyan" }}
        />
      )}
    />
  ),
};

// ── mobile narrow ──────────────────────────────────────────────────────────

export const MobileNarrow: Story = {
  args: {
    title: "Deploy activity",
    xLabels: HOURS,
    yLabels: WEEKDAYS,
    cells: deployCells,
    compact: true,
    density: "compact",
    showLegend: false,
    colorScale: { min: 0, max: 16, ramp: "cyan" },
  },
  parameters: { viewport: { defaultViewport: "mobile1" } },
};
