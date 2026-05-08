import * as React from "react";

export interface MetralyTabItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export interface MetralyTabsProps {
  items: MetralyTabItem[];
  value?: string;
  defaultValue?: string;
  ariaLabel?: string;
  className?: string;
  onValueChange?: (value: string) => void;
}

export function MetralyTabs({
  items,
  value,
  defaultValue,
  ariaLabel = "Tabs",
  className,
  onValueChange,
}: MetralyTabsProps) {
  const activeValue = value ?? defaultValue ?? items[0]?.value;
  const classes = ["metraly-tabs", className].filter(Boolean).join(" ");

  return (
    <div className={classes} role="tablist" aria-label={ariaLabel}>
      {items.map((item) => {
        const selected = item.value === activeValue;
        return (
          <button
            key={item.value}
            type="button"
            role="tab"
            className={selected ? "metraly-tab is-active" : "metraly-tab"}
            aria-selected={selected}
            disabled={item.disabled}
            onClick={onValueChange ? () => onValueChange(item.value) : undefined}
          >
            <span>{item.label}</span>
            {selected ? <span className="metraly-tab-pulse" aria-hidden="true" /> : null}
          </button>
        );
      })}
    </div>
  );
}

export default MetralyTabs;
