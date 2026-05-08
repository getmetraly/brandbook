"use client";

import { Responsive } from "react-grid-layout";
import {
  DashboardEmptyState,
  DashboardGrid,
  type DashboardLayoutItem,
  type DashboardWidgetInstance,
} from "@metraly/ui";
import { useEffect, useRef, useState, type ComponentProps } from "react";
import DashboardWidgetRenderer from "./DashboardWidgetRenderer";

type ResponsiveGridLayoutProps = ComponentProps<typeof Responsive>;

function useElementWidth<TElement extends HTMLElement>() {
  const ref = useRef<TElement | null>(null);
  const [width, setWidth] = useState(1200);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const updateWidth = () => {
      const nextWidth = Math.max(320, Math.floor(element.getBoundingClientRect().width));
      setWidth(nextWidth);
    };

    updateWidth();

    if (typeof ResizeObserver === "undefined") {
      window.addEventListener("resize", updateWidth);
      return () => window.removeEventListener("resize", updateWidth);
    }

    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, width };
}

function ResponsiveDashboardGrid(props: Omit<ResponsiveGridLayoutProps, "width">) {
  const { ref, width } = useElementWidth<HTMLDivElement>();

  return (
    <div ref={ref} className="dashboard-grid-width-provider">
      <Responsive {...props} width={width} />
    </div>
  );
}

export interface DashboardCanvasProps {
  widgets: DashboardWidgetInstance[];
  selectedWidgetId?: string | null;
  onSelectWidget: (id: string) => void;
  onRemoveWidget: (id: string) => void;
  onLayoutChange: (layout: DashboardLayoutItem[]) => void;
}

function toLayout(widgets: DashboardWidgetInstance[]): DashboardLayoutItem[] {
  return widgets.map((widget) => ({
    i: widget.id,
    x: widget.position.x,
    y: widget.position.y,
    w: widget.position.w,
    h: widget.position.h,
    minW: widget.position.minW,
    minH: widget.position.minH,
    maxW: widget.position.maxW,
    maxH: widget.position.maxH,
    static: widget.position.static,
  }));
}

export function DashboardCanvas({
  widgets,
  selectedWidgetId,
  onSelectWidget,
  onRemoveWidget,
  onLayoutChange,
}: DashboardCanvasProps) {
  if (widgets.length === 0) {
    return <DashboardGrid widgets={[]} renderWidget={() => null} emptyState={<DashboardEmptyState />} />;
  }

  const layout = toLayout(widgets);

  return (
    <ResponsiveDashboardGrid
      className="dashboard-grid dashboard-grid-rgl"
      layouts={{ lg: layout, md: layout, sm: layout, xs: layout, xxs: layout }}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 }}
      rowHeight={112}
      margin={[16, 16]}
      containerPadding={[0, 0]}
      draggableHandle=".metraly-widget-shell-drag-handle"
      resizeHandles={["se"]}
      compactType="vertical"
      preventCollision={false}
      onLayoutChange={(currentLayout: DashboardLayoutItem[]) => onLayoutChange(currentLayout)}
    >
      {widgets.map((widget) => (
        <div key={widget.id} className="metraly-dashboard-grid-shell">
          <DashboardWidgetRenderer
            widget={widget}
            selected={selectedWidgetId === widget.id}
            onSelect={onSelectWidget}
            onRemove={onRemoveWidget}
          />
        </div>
      ))}
    </ResponsiveDashboardGrid>
  );
}

export default DashboardCanvas;
