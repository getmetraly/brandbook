import * as React from "react";

export interface MetralyCheckboxProps {
  id?: string;
  name?: string;
  value?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  defaultChecked?: boolean;
  indeterminate?: boolean;
  disabled?: boolean;
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
  checked,
  defaultChecked,
  indeterminate = false,
  disabled = false,
  error = false,
  className,
  onChange,
}: MetralyCheckboxProps) {
  const inputRef = React.useRef<HTMLInputElement>(null);
  const describedBy = description && id ? `${id}-description` : undefined;
  const classes = [
    "metraly-control-row",
    "metraly-checkbox",
    indeterminate && "is-indeterminate",
    disabled && "is-disabled",
    error && "is-error",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  React.useEffect(() => {
    if (inputRef.current) inputRef.current.indeterminate = indeterminate;
  }, [indeterminate]);

  return (
    <label className={classes}>
      <input
        ref={inputRef}
        id={id}
        name={name}
        value={value}
        type="checkbox"
        className="metraly-control-input"
        checked={checked}
        defaultChecked={defaultChecked}
        disabled={disabled}
        aria-checked={indeterminate ? "mixed" : undefined}
        aria-invalid={error || undefined}
        aria-describedby={describedBy}
        onChange={onChange}
        readOnly={(checked !== undefined || indeterminate) && !onChange ? true : undefined}
      />
      <span className="metraly-checkbox-box" aria-hidden="true" />
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

export default MetralyCheckbox;
