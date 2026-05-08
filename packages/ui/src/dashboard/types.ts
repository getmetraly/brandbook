import type * as React from "react";
import type { StateBadgeState } from "../components/StateBadge";

export type DashboardWidgetSize = "sm" | "md" | "lg" | "xl";

export type DashboardLayoutItem = {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
  minW?: number;
  minH?: number;
  maxW?: number;
  maxH?: number;
  static?: boolean;
};

export type DashboardWidgetDefinition = {
  type: string;
  title: string;
  description: string;
  iconLabel?: string;
  state?: StateBadgeState;
  stateLabel?: string;
  tags?: string[];
  defaultLayout: Omit<DashboardLayoutItem, "i">;
  render?: () => React.ReactNode;
};

export type DashboardWidgetInstance = {
  id: string;
  type: string;
  title: string;
  description?: string;
  state?: StateBadgeState;
  stateLabel?: string;
  position: Omit<DashboardLayoutItem, "i">;
  settings?: Record<string, unknown>;
};
