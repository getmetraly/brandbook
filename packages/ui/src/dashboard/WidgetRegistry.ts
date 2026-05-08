import type { DashboardWidgetDefinition } from "./types";

export const defaultDashboardWidgetRegistry: DashboardWidgetDefinition[] = [
  {
    type: "stat-card",
    title: "Stat Card",
    description: "Compact KPI summary with current telemetry state.",
    iconLabel: "kpi",
    state: "live",
    tags: ["metric", "summary"],
    defaultLayout: { x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
  },
  {
    type: "metric-chart",
    title: "Metric Chart",
    description: "Time-series chart surface for delivery, CI or review metrics.",
    iconLabel: "chart",
    state: "live",
    tags: ["chart", "trend"],
    defaultLayout: { x: 4, y: 0, w: 5, h: 3, minW: 4, minH: 2 },
  },
  {
    type: "data-table",
    title: "Data Table",
    description: "Dense table surface for repositories, incidents or contributors.",
    iconLabel: "table",
    state: "delayed",
    tags: ["table", "entities"],
    defaultLayout: { x: 0, y: 3, w: 6, h: 3, minW: 4, minH: 2 },
  },
];

export function findDashboardWidgetDefinition(
  registry: DashboardWidgetDefinition[],
  type: string,
): DashboardWidgetDefinition | undefined {
  return registry.find((definition) => definition.type === type);
}
