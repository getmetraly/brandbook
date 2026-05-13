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
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLSelectElement>;
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
  className,
  onChange,
}: MetralySelectProps) {
  const helperText = description ?? hint;
  const generatedId = React.useId();
  const descriptionId = helperText ? `${id ?? generatedId}-description` : undefined;
  const isDisabled = disabled || loading;
  const isEmpty = options.length === 0;
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
    <label className={classes} data-state={loading ? "loading" : error ? "error" : isDisabled ? "disabled" : isEmpty ? "empty" : value || defaultValue ? "selected" : "default"}>
      <span className="metraly-control-label">{label}</span>
      <span className="metraly-select-control">
        <select
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue ?? (placeholder ? "" : undefined)}
          disabled={isDisabled || isEmpty}
          aria-invalid={error || undefined}
          aria-describedby={descriptionId}
          aria-busy={loading || undefined}
          onChange={loading ? undefined : onChange}
        >
          {placeholder ? (
            <option value="" disabled>
              {placeholder}
            </option>
          ) : null}
          {isEmpty ? (
            <option value="">No options</option>
          ) : (
            options.map((option) => (
              <option key={option.value} value={option.value} disabled={option.disabled}>
                {option.label}
              </option>
            ))
          )}
        </select>
        <span className="metraly-select-indicator" aria-hidden="true">
          {loading ? <span className="metraly-control-spinner" /> : null}
        </span>
      </span>
      {helperText ? (
        <span id={descriptionId} className="metraly-control-description">
          {helperText}
        </span>
      ) : null}
    </label>
  );
}

export default MetralySelect;
