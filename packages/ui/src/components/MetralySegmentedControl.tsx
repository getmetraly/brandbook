"use client";

import * as React from "react";
import { useRovingSelection } from "./useRovingSelection";

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
  const { selectedValue, selectValue, getItemProps } = useRovingSelection({
    items: options,
    value,
    defaultValue,
    mode: interactionMode === "radio" ? "select-on-focus" : "focus-only",
    onValueChange,
    onChange,
  });
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
        const rovingProps = getItemProps(index, { selectOnArrow: interactionMode === "radio" });
        return (
          <button
            key={option.value}
            ref={rovingProps.ref}
            type="button"
            className={selected ? "metraly-segmented-control__option is-selected" : "metraly-segmented-control__option"}
            role="radio"
            aria-checked={selected}
            data-state={option.disabled ? "disabled" : selected ? "selected" : "default"}
            disabled={option.disabled}
            tabIndex={rovingProps.tabIndex}
            onClick={() => {
              if (!option.disabled) selectValue(option.value);
            }}
            onKeyDown={rovingProps.onKeyDown}
          >
            <span className="metraly-segmented-control__label">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export default MetralySegmentedControl;
