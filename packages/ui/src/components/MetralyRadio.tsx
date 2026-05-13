import * as React from "react";

export interface MetralyRadioProps {
  id?: string;
  name?: string;
  value?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Prototype-compatible alias for description. */
  hint?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  error?: boolean;
  className?: string;
  onChange?: React.ChangeEventHandler<HTMLInputElement>;
}

export function MetralyRadio({
  id,
  name,
  value,
  label = "Radio",
  description,
  hint,
  checked,
  defaultChecked,
  disabled = false,
  error = false,
  className,
  onChange,
}: MetralyRadioProps) {
  const helperText = description ?? hint;
  const describedBy = helperText && id ? `${id}-description` : undefined;
  const classes = [
    "metraly-control-row",
    "metraly-radio",
    disabled && "is-disabled",
    error && "is-error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes} data-state={error ? "error" : disabled ? "disabled" : checked ? "checked" : "default"}>
      <input
        id={id}
        name={name}
        value={value}
        type="radio"
        className="metraly-control-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        onChange={onChange}
        readOnly={checked !== undefined && !onChange ? true : undefined}
      />
      <span className="metraly-radio-dot" aria-hidden="true" />
      <span className="metraly-control-copy">
        <span className="metraly-control-label">{label}</span>
        {helperText ? (
          <span id={describedBy} className="metraly-control-description">
            {helperText}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export default MetralyRadio;
