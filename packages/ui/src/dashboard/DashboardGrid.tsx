import * as React from "react";
import type { DashboardLayoutItem } from "./types";
import { DashboardEmptyState } from "./DashboardEmptyState";

export interface DashboardGridProps<TWidget extends { id: string }> {
  widgets: TWidget[];
  layout?: DashboardLayoutItem[];
  renderWidget: (widget: TWidget, layoutItem?: DashboardLayoutItem) => React.ReactNode;
  emptyState?: React.ReactNode;
  className?: string;
}

export function DashboardGrid<TWidget extends { id: string }>({
  widgets,
  layout = [],
  renderWidget,
  emptyState = <DashboardEmptyState />,
  className,
}: DashboardGridProps<TWidget>) {
  const classes = ["metraly-dashboard-grid", className].filter(Boolean).join(" ");

  if (widgets.length === 0) {
    return <div className={classes}>{emptyState}</div>;
  }

  return (
    <div className={classes} data-widget-count={widgets.length}>
      {widgets.map((widget) => {
        const item = layout.find((layoutItem) => layoutItem.i === widget.id);
        return (
          <div
            key={widget.id}
            className="metraly-dashboard-grid-item"
            style={
              {
                ["--m-dashboard-grid-span" as const]: String(item ? Math.max(1, item.w) : 4),
                minHeight: item ? `${Math.max(1, item.h) * 96}px` : undefined,
              } as React.CSSProperties
            }
          >
            {renderWidget(widget, item)}
          </div>
        );
      })}
    </div>
  );
}

export default DashboardGrid;
