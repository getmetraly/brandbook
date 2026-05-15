"use client";
import * as React from "react";
import { useRovingSelection } from "./useRovingSelection";

export interface MetralyTabItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  count?: React.ReactNode;
  /** Optional SVG icon element, 12x12 viewBox recommended. */
  icon?: React.ReactNode;
}

export interface MetralyTabsProps {
  items: MetralyTabItem[];
  value?: string;
  defaultValue?: string;
  ariaLabel?: string;
  idBase?: string;
  className?: string;
  /** Prototype-compatible selected-tab telemetry marker. */
  livePulse?: boolean;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
}

export function MetralyTabs({
  items,
  value,
  defaultValue,
  ariaLabel = "Tabs",
  idBase,
  className,
  livePulse = false,
  onValueChange,
  onChange,
}: MetralyTabsProps) {
  const classes = ["metraly-tabs", livePulse && "has-live-pulse", className].filter(Boolean).join(" ");
  const { selectedValue, selectValue, getItemProps } = useRovingSelection({
    items,
    value,
    defaultValue,
    mode: "select-on-focus",
    onValueChange,
    onChange,
  });

  return (
    <div className={classes} role="tablist" aria-label={ariaLabel} data-live-pulse={livePulse ? "on" : "off"}>
      {items.map((item, index) => {
        const selected = item.value === selectedValue;
        const tabId = idBase ? `${idBase}-tab-${item.value}` : undefined;
        const panelId = idBase ? `${idBase}-panel-${item.value}` : undefined;
        const rovingProps = getItemProps(index);
        return (
          <button
            key={item.value}
            ref={rovingProps.ref}
            type="button"
            role="tab"
            id={tabId}
            className={selected ? "metraly-tab is-active" : "metraly-tab"}
            aria-selected={selected}
            aria-controls={panelId}
            data-state={item.disabled ? "disabled" : selected ? "selected" : "default"}
            data-live-pulse={selected && livePulse ? "on" : "off"}
            tabIndex={rovingProps.tabIndex}
            disabled={item.disabled}
            onClick={!item.disabled ? () => selectValue(item.value) : undefined}
            onKeyDown={rovingProps.onKeyDown}
          >
            <span className="metraly-tab-content">
              {item.icon ? <span className="metraly-tab-icon" aria-hidden="true">{item.icon}</span> : null}
              <span className="metraly-tab-label">{item.label}</span>
              {item.count !== undefined ? <span className="metraly-tab-count">{item.count}</span> : null}
              {selected && livePulse ? <span className="metraly-tab-live-pulse" aria-hidden="true" /> : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default MetralyTabs;
