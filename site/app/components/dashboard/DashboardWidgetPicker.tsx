"use client";

import { WidgetPickerCard, defaultDashboardWidgetRegistry, type DashboardWidgetDefinition } from "@metraly/ui";

export interface DashboardWidgetPickerProps {
  registry?: DashboardWidgetDefinition[];
  selectedType?: string;
  disabled?: boolean;
  onAdd: (type: string) => void;
}

export function DashboardWidgetPicker({
  registry = defaultDashboardWidgetRegistry,
  selectedType,
  disabled = false,
  onAdd,
}: DashboardWidgetPickerProps) {
  return (
    <section className="dashboard-widget-picker" aria-label="Widget picker">
      <div className="dashboard-widget-picker-head">
        <strong>Add widget</strong>
        <span>Pick a reusable telemetry surface.</span>
      </div>
      <div className="dashboard-widget-picker-list" role="listbox" aria-label="Available widgets">
        {registry.map((definition) => (
          <WidgetPickerCard
            key={definition.type}
            title={definition.title}
            description={definition.description}
            iconLabel={definition.iconLabel ?? definition.type}
            tags={definition.tags ?? []}
            state={definition.state ?? "live"}
            stateLabel={definition.stateLabel}
            selected={selectedType === definition.type}
            disabled={disabled}
            onSelect={() => onAdd(definition.type)}
          />
        ))}
      </div>
    </section>
  );
}

export default DashboardWidgetPicker;
