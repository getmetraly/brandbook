"use client";

import * as React from "react";

export interface MetralySegmentedControlOption {
  value: string;
  label: React.ReactNode;
  disabled?: boolean;
}

export type MetralySegmentedControlSize = "sm" | "md";
export type MetralySegmentedControlInteractionMode = "radio" | "toolbar";

export interface MetralySegmentedControlProps {
  options: MetralySegmentedControlOption[];
  value?: string;
  defaultValue?: string;
  size?: MetralySegmentedControlSize;
  ariaLabel?: string;
  className?: string;
  fullWidth?: boolean;
  /**
   * `radio` selects while navigating with arrows. `toolbar` only moves focus with arrows;
   * Enter/Space confirm selection. Use toolbar mode inside dense action toolbars.
   */
  interactionMode?: MetralySegmentedControlInteractionMode;
  onValueChange?: (value: string) => void;
  onChange?: (value: string) => void;
}

export function MetralySegmentedControl({
  options,
  value,
  defaultValue,
  size = "md",
  ariaLabel = "Segmented control",
  className,
  fullWidth = false,
  interactionMode = "radio",
  onValueChange,
  onChange,
}: MetralySegmentedControlProps) {
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(
    () => defaultValue ?? options.find((option) => !option.disabled)?.value,
  );
  const selectedValue = isControlled ? value : uncontrolledValue;
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  React.useEffect(() => {
    if (isControlled) return;
    if (uncontrolledValue !== undefined) return;
    const next = options.find((option) => !option.disabled)?.value;
    if (next !== undefined) setUncontrolledValue(next);
  }, [isControlled, options, uncontrolledValue]);

  function selectValue(nextValue: string) {
    if (!isControlled) setUncontrolledValue(nextValue);
    onValueChange?.(nextValue);
    onChange?.(nextValue);
  }

  function moveFocus(index: number, direction: 1 | -1) {
    const count = options.length;
    let next = index;

    do {
      next = (next + direction + count) % count;
    } while (options[next]?.disabled && next !== index);

    refs.current[next]?.focus();
    if (interactionMode === "radio" && !options[next]?.disabled) {
      selectValue(options[next].value);
    }
  }

  function focusByIndex(index: number) {
    if (index < 0 || options[index]?.disabled) return;
    refs.current[index]?.focus();
    if (interactionMode === "radio") selectValue(options[index].value);
  }

  const classes = [
    "metraly-segmented-control",
    `metraly-segmented-control--${size}`,
    fullWidth && "metraly-segmented-control--full",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} role="radiogroup" aria-label={ariaLabel} data-interaction-mode={interactionMode}>
      {options.map((option, index) => {
        const selected = option.value === selectedValue;
        return (
          <button
            key={option.value}
            ref={(node) => {
              refs.current[index] = node;
            }}
            type="button"
            className={selected ? "metraly-segmented-control__option is-selected" : "metraly-segmented-control__option"}
            role="radio"
            aria-checked={selected}
            data-state={option.disabled ? "disabled" : selected ? "selected" : "default"}
            disabled={option.disabled}
            tabIndex={selected || (!selectedValue && index === 0) ? 0 : -1}
            onClick={() => {
              if (!option.disabled) selectValue(option.value);
            }}
            onKeyDown={(event) => {
              if (event.key === "ArrowRight") {
                event.preventDefault();
                moveFocus(index, 1);
              } else if (event.key === "ArrowLeft") {
                event.preventDefault();
                moveFocus(index, -1);
              } else if (event.key === "Home") {
                event.preventDefault();
                focusByIndex(options.findIndex((item) => !item.disabled));
              } else if (event.key === "End") {
                event.preventDefault();
                for (let next = options.length - 1; next >= 0; next -= 1) {
                  if (!options[next].disabled) {
                    focusByIndex(next);
                    break;
                  }
                }
              } else if ((event.key === "Enter" || event.key === " ") && !option.disabled) {
                event.preventDefault();
                selectValue(option.value);
              }
            }}
          >
            <span className="metraly-segmented-control__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default MetralySegmentedControl;
