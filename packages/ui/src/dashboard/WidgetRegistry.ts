import type { DashboardLayoutItem, DashboardWidgetDefinition, DashboardWidgetInstance } from "./types";

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

type CreateDashboardWidgetInstanceOptions = Partial<
  Pick<DashboardWidgetInstance, "id" | "title" | "description" | "state" | "stateLabel" | "settings">
> & {
  position?: Partial<Omit<DashboardLayoutItem, "i">>;
};

export function createDashboardWidgetInstance(
  definition: DashboardWidgetDefinition,
  options: CreateDashboardWidgetInstanceOptions = {},
): DashboardWidgetInstance {
  return {
    id: options.id ?? `widget_${definition.type}_${Math.random().toString(36).slice(2, 10)}`,
    type: definition.type,
    title: options.title ?? definition.title,
    description: options.description ?? definition.description,
    state: options.state ?? definition.state,
    stateLabel: options.stateLabel ?? definition.stateLabel,
    position: {
      ...definition.defaultLayout,
      ...(options.position ?? {}),
    },
    settings: options.settings,
  };
}
