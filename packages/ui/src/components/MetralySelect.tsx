"use client";

import * as React from "react";

export interface MetralySelectOption {
  value: string;
  label: string;
  disabled?: boolean;
}

export interface MetralySelectProps {
  id?: string;
  name?: string;
  label?: React.ReactNode;
  value?: string;
  defaultValue?: string;
  options: MetralySelectOption[];
  placeholder?: string;
  disabled?: boolean;
  /** Visual loading state. Keeps the select non-interactive without changing layout. */
  loading?: boolean;
  error?: boolean;
  description?: React.ReactNode;
  /** Prototype-compatible alias for description. */
  hint?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
  className?: string;
  onChange?: (value: string) => void;
}

function firstEnabledIndex(options: MetralySelectOption[]) {
  return options.findIndex((option) => !option.disabled);
}

function selectedIndex(options: MetralySelectOption[], selectedValue?: string) {
  const index = options.findIndex((option) => option.value === selectedValue && !option.disabled);
  return index >= 0 ? index : firstEnabledIndex(options);
}

function nextEnabledIndex(options: MetralySelectOption[], currentIndex: number, direction: 1 | -1) {
  if (options.length === 0) return -1;

  let next = currentIndex;
  for (let attempts = 0; attempts < options.length; attempts += 1) {
    next = (next + direction + options.length) % options.length;
    if (!options[next]?.disabled) return next;
  }

  return currentIndex;
}

export function MetralySelect({
  id,
  name,
  label = "Select",
  value,
  defaultValue,
  options,
  placeholder,
  disabled = false,
  loading = false,
  error = false,
  description,
  hint,
  open: openProp,
  onOpenChange,
  className,
  onChange,
}: MetralySelectProps) {
  const helperText = description ?? hint;
  const generatedId = React.useId();
  const resolvedId = id ?? generatedId;
  const buttonId = `${resolvedId}-button`;
  const listboxId = `${resolvedId}-listbox`;
  const descriptionId = helperText ? `${resolvedId}-description` : undefined;
  const optionId = (optionValue: string) => `${resolvedId}-option-${optionValue}`;
  const isDisabled = disabled || loading;
  const isEmpty = options.length === 0;
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const selectedValue = isControlled ? value : uncontrolledValue;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = openProp ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;
  const [activeIndex, setActiveIndex] = React.useState(() => selectedIndex(options, selectedValue));
  const rootRef = React.useRef<HTMLDivElement | null>(null);
  const buttonRef = React.useRef<HTMLButtonElement | null>(null);
  const optionRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const selectedOption = options.find((option) => option.value === selectedValue);
  const resolvedLabel = selectedOption?.label ?? placeholder ?? "Select";
  const activeOption = activeIndex >= 0 ? options[activeIndex] : undefined;

  React.useEffect(() => {
    if (!open) return;
    const nextIndex = selectedIndex(options, selectedValue);
    setActiveIndex(nextIndex);
    window.requestAnimationFrame(() => optionRefs.current[nextIndex]?.focus({ preventScroll: true }));
  }, [open, options, selectedValue]);

  React.useEffect(() => {
    if (!open) return;

    function handlePointerDown(event: PointerEvent) {
      if (rootRef.current?.contains(event.target as Node)) return;
      setOpen(false);
    }

    window.addEventListener("pointerdown", handlePointerDown);
    return () => window.removeEventListener("pointerdown", handlePointerDown);
  }, [open, setOpen]);

  function selectOption(option: MetralySelectOption) {
    if (option.disabled) return;
    if (!isControlled) setUncontrolledValue(option.value);
    onChange?.(option.value);
    setOpen(false);
    window.requestAnimationFrame(() => buttonRef.current?.focus({ preventScroll: true }));
  }

  function openAndFocus(index = selectedIndex(options, selectedValue)) {
    if (isDisabled || isEmpty) return;
    setActiveIndex(index);
    setOpen(true);
  }

  function focusOption(index: number) {
    if (index < 0) return;
    setActiveIndex(index);
    optionRefs.current[index]?.focus({ preventScroll: true });
  }

  const classes = [
    "metraly-select-field",
    isDisabled && "is-disabled",
    loading && "is-loading",
    isEmpty && "is-empty",
    error && "is-error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div
      ref={rootRef}
      className={classes}
      data-state={loading ? "loading" : error ? "error" : isDisabled ? "disabled" : isEmpty ? "empty" : selectedValue ? "selected" : "default"}
    >
      <span className="metraly-control-label">{label}</span>
      <div className="metraly-select-shell">
        <button
          id={buttonId}
          ref={buttonRef}
          type="button"
          className="metraly-select-button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-controls={open ? listboxId : undefined}
          aria-activedescendant={open && activeOption ? optionId(activeOption.value) : undefined}
          aria-label={typeof label === "string" ? label : undefined}
          aria-invalid={error || undefined}
          aria-describedby={descriptionId}
          disabled={isDisabled}
          onClick={() => (open ? setOpen(false) : openAndFocus())}
          onKeyDown={(event) => {
            if (event.key === "ArrowDown") {
              event.preventDefault();
              if (!open) {
                openAndFocus();
              } else {
                focusOption(nextEnabledIndex(options, activeIndex, 1));
              }
            } else if (event.key === "ArrowUp") {
              event.preventDefault();
              if (!open) {
                openAndFocus(selectedIndex(options, selectedValue));
              } else {
                focusOption(nextEnabledIndex(options, activeIndex, -1));
              }
            } else if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              open ? activeOption && selectOption(activeOption) : openAndFocus();
            } else if (event.key === "Escape" && open) {
              event.preventDefault();
              setOpen(false);
            }
          }}
        >
          <span className="metraly-select-button-label">{loading ? "Loading…" : resolvedLabel}</span>
          <span className="metraly-select-button-icon" aria-hidden="true">▾</span>
        </button>
        {open && !isDisabled ? (
          <div
            id={listboxId}
            className="metraly-select-list"
            role="listbox"
            aria-labelledby={buttonId}
            tabIndex={-1}
          >
            {isEmpty ? (
              <div className="metraly-select-empty">No options</div>
            ) : (
              options.map((option, index) => {
                const selected = option.value === selectedValue;
                const active = index === activeIndex;
                return (
                  <button
                    id={optionId(option.value)}
                    key={option.value}
                    ref={(node) => {
                      optionRefs.current[index] = node;
                    }}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={[
                      "metraly-select-option",
                      selected && "is-selected",
                      active && "is-active",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    disabled={option.disabled}
                    onClick={() => selectOption(option)}
                    onFocus={() => setActiveIndex(index)}
                    onKeyDown={(event) => {
                      if (event.key === "ArrowDown") {
                        event.preventDefault();
                        focusOption(nextEnabledIndex(options, index, 1));
                      } else if (event.key === "ArrowUp") {
                        event.preventDefault();
                        focusOption(nextEnabledIndex(options, index, -1));
                      } else if (event.key === "Home") {
                        event.preventDefault();
                        focusOption(firstEnabledIndex(options));
                      } else if (event.key === "End") {
                        event.preventDefault();
                        for (let next = options.length - 1; next >= 0; next -= 1) {
                          if (!options[next].disabled) {
                            focusOption(next);
                            break;
                          }
                        }
                      } else if (event.key === "Enter" || event.key === " ") {
                        event.preventDefault();
                        selectOption(option);
                      } else if (event.key === "Escape") {
                        event.preventDefault();
                        setOpen(false);
                        buttonRef.current?.focus({ preventScroll: true });
                      } else if (event.key === "Tab") {
                        setOpen(false);
                      }
                    }}
                  >
                    <span>{option.label}</span>
                    {selected ? <span aria-hidden="true">✓</span> : null}
                  </button>
                );
              })
            )}
          </div>
        ) : null}
      </div>
      {helperText ? <span id={descriptionId} className="metraly-control-description">{helperText}</span> : null}
      {name && selectedValue ? <input type="hidden" name={name} value={selectedValue} /> : null}
    </div>
  );
}

export default MetralySelect;
