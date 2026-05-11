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
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  function handleKeyDown(event: React.KeyboardEvent<HTMLButtonElement>, index: number) {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    const direction = event.key === "ArrowRight" ? 1 : -1;
    const count = items.length;
    let next = (index + direction + count) % count;
    while (items[next].disabled && next !== index) {
      next = (next + direction + count) % count;
    }
    refs.current[next]?.focus();
    if (!items[next].disabled) onValueChange?.(items[next].value);
  }

  return (
    <div className={classes} role="tablist" aria-label={ariaLabel}>
      {items.map((item, index) => {
        const selected = item.value === activeValue;
        return (
          <button
            key={item.value}
            ref={(el) => { refs.current[index] = el; }}
            type="button"
            role="tab"
            className={selected ? "metraly-tab is-active" : "metraly-tab"}
            aria-selected={selected}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            onClick={onValueChange && !item.disabled ? () => onValueChange(item.value) : undefined}
            onKeyDown={(e) => handleKeyDown(e, index)}
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
