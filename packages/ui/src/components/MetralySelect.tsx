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
  /** Visual loading state. Keeps the native select non-interactive without changing layout. */
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
  const descriptionId = helperText ? `${id ?? generatedId}-description` : undefined;
  const isDisabled = disabled || loading;
  const isEmpty = options.length === 0;
  const isControlled = value !== undefined;
  const [uncontrolledValue, setUncontrolledValue] = React.useState(defaultValue);
  const selectedValue = isControlled ? value : uncontrolledValue;
  const [uncontrolledOpen, setUncontrolledOpen] = React.useState(false);
  const open = openProp ?? uncontrolledOpen;
  const setOpen = onOpenChange ?? setUncontrolledOpen;
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

  const selectedOption = options.find((option) => option.value === selectedValue);
  const resolvedLabel = selectedOption?.label ?? placeholder ?? "Select";

  return (
    <div className={classes} data-state={loading ? "loading" : error ? "error" : isDisabled ? "disabled" : isEmpty ? "empty" : selectedValue ? "selected" : "default"}>
      <span className="metraly-control-label">{label}</span>
      <div className="metraly-select-shell">
        <button
          type="button"
          className="metraly-select-button"
          aria-haspopup="listbox"
          aria-expanded={open}
          aria-label={typeof label === "string" ? label : undefined}
          aria-invalid={error || undefined}
          aria-describedby={descriptionId}
          disabled={isDisabled}
          onClick={() => setOpen(!open)}
        >
          <span className="metraly-select-button-label">{loading ? "Loading…" : resolvedLabel}</span>
          <span className="metraly-select-button-icon" aria-hidden="true">▾</span>
        </button>
        {open && !isDisabled ? (
          <div className="metraly-select-list" role="listbox" aria-label={typeof label === "string" ? label : "Select options"}>
            {isEmpty ? (
              <div className="metraly-select-empty">No options</div>
            ) : (
              options.map((option) => {
                const selected = option.value === selectedValue;
                return (
                  <button
                    key={option.value}
                    type="button"
                    role="option"
                    aria-selected={selected}
                    className={selected ? "metraly-select-option is-selected" : "metraly-select-option"}
                    disabled={option.disabled}
                    onClick={() => {
                      if (option.disabled) return;
                      if (!isControlled) setUncontrolledValue(option.value);
                      onChange?.(option.value);
                      setOpen(false);
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
    </div>
  );
}

export default MetralySelect;
