import * as React from "react";

export interface MetralyRadioProps {
  id?: string;
  name?: string;
  value?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
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
  checked,
  defaultChecked,
  disabled = false,
  error = false,
  className,
  onChange,
}: MetralyRadioProps) {
  const describedBy = description && id ? `${id}-description` : undefined;
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
    <label className={classes}>
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
      <span className="metraly-radio-dot" aria-hidden="true">
        <span className="metraly-radio-pulse" />
      </span>
      <span className="metraly-control-copy">
        <span className="metraly-control-label">{label}</span>
        {description ? (
          <span id={describedBy} className="metraly-control-description">
            {description}
          </span>
        ) : null}
      </span>
    </label>
  );
}

export default MetralyRadio;
