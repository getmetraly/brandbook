"use client";
import * as React from "react";

export interface MetralyTabItem {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
  count?: React.ReactNode;
}

export interface MetralyTabsProps {
  items: MetralyTabItem[];
  value?: string;
  defaultValue?: string;
  ariaLabel?: string;
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
  className,
  livePulse = false,
  onValueChange,
  onChange,
}: MetralyTabsProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(() => defaultValue ?? items[0]?.value);
  const activeValue = isControlled ? value : uncontrolledValue;
  const classes = ["metraly-tabs", livePulse && "has-live-pulse", className].filter(Boolean).join(" ");
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (isControlled) return;
    if (uncontrolledValue === undefined && items[0]?.value !== undefined) {
      setUncontrolledValue(items[0].value);
    }
  }, [isControlled, items, uncontrolledValue]);

  function handleSelect(nextValue: string) {
    if (!isControlled) {
      setUncontrolledValue(nextValue);
    }
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  }

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
    if (!items[next].disabled) handleSelect(items[next].value);
  }

  return (
    <div className={classes} role="tablist" aria-label={ariaLabel} data-live-pulse={livePulse ? "on" : "off"}>
      {items.map((item, index) => {
        const selected = item.value === activeValue;
        return (
          <button
            key={item.value}
            ref={(el) => {
              refs.current[index] = el;
            }}
            type="button"
            role="tab"
            className={selected ? "metraly-tab is-active" : "metraly-tab"}
            aria-selected={selected}
            data-state={item.disabled ? "disabled" : selected ? "selected" : "default"}
            data-live-pulse={selected && livePulse ? "on" : "off"}
            tabIndex={selected ? 0 : -1}
            disabled={item.disabled}
            onClick={!item.disabled ? () => handleSelect(item.value) : undefined}
            onKeyDown={(e) => handleKeyDown(e, index)}
          >
            <span className="metraly-tab-content">
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
