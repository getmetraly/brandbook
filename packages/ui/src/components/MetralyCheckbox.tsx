import * as React from "react";

export interface MetralyCheckboxProps {
  id?: string;
  name?: string;
  value?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Prototype-compatible alias for description. */
  hint?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
  /** Visual loading state. Keeps the control non-interactive without losing layout. */
  loading?: boolean;
  error?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function MetralyCheckbox({
  id,
  name,
  value,
  label = "Checkbox",
  description,
  hint,
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  loading = false,
  error = false,
  className,
  onChange,
}: MetralyCheckboxProps) {
  const helperText = description ?? hint;
  const generatedId = React.useId();
  const descriptionId = helperText ? `${id ?? generatedId}-description` : undefined;
  const isDisabled = disabled || loading;
  const classes = [
    "metraly-control-row",
    "metraly-checkbox",
    indeterminate && "is-indeterminate",
    isDisabled && "is-disabled",
    loading && "is-loading",
    error && "is-error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} data-state={loading ? "loading" : error ? "error" : isDisabled ? "disabled" : checked || indeterminate ? "checked" : "default"}>
      <input
        id={id}
        name={name}
        value={value}
        type="checkbox"
        className="metraly-control-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={isDisabled}
        aria-checked={indeterminate ? "mixed" : undefined}
        aria-invalid={error || undefined}
        aria-describedby={descriptionId}
        aria-busy={loading || undefined}
        onChange={loading ? undefined : onChange}
        readOnly={(checked !== undefined || indeterminate || loading) && !onChange ? true : undefined}
      />
      <span className="metraly-checkbox-box" aria-hidden="true">
        {loading ? <span className="metraly-control-spinner" /> : null}
      </span>
      <span className="metraly-control-copy">
        <span className="metraly-control-label">{label}</span>
        {helperText ? (
          <span id={descriptionId} className="metraly-control-description">
            {helperText}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export default MetralyCheckbox;
