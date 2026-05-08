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
  disabled?: boolean;
  error?: boolean;
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
  disabled = false,
  error = false,
  className,
  onChange,
}: MetralySelectProps) {
  const classes = [
    "metraly-select-field",
    disabled && "is-disabled",
    error && "is-error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <label className={classes}>
      <span className="metraly-control-label">{label}</span>
      <span className="metraly-select-control">
        <select
          id={id}
          name={name}
          value={value}
          defaultValue={defaultValue}
          disabled={disabled}
          aria-invalid={error || undefined}
          onChange={onChange}
        >
          {options.map((option) => (
            <option key={option.value} value={option.value} disabled={option.disabled}>
              {option.label}
            </option>
          ))}
        </select>
        <span className="metraly-select-indicator" aria-hidden="true" />
      </span>
    </label>
  );
}

export default MetralySelect;
