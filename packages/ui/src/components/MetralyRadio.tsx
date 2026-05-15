import * as React from "react";
import { FieldCopy, FieldShell } from "./FieldShell";

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
  return (
    <FieldShell
      as="label"
      layout="control-row"
      inputId={id}
      label={label}
      description={description}
      hint={hint}
      error={error}
      disabled={disabled}
      state={error ? "error" : disabled ? "disabled" : checked ? "checked" : "default"}
      className={["metraly-radio", className].filter(Boolean).join(" ")}
    >
      {({ controlId, descriptionId, helperText, hasError }) => (
        <>
          <input
            id={controlId}
            name={name}
            value={value}
            type="radio"
            className="metraly-control-input"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            aria-invalid={hasError || undefined}
            aria-describedby={descriptionId}
            onChange={onChange}
            readOnly={checked !== undefined && !onChange ? true : undefined}
          />
          <span className="metraly-radio-dot" aria-hidden="true" />
          <FieldCopy label={label} helperText={helperText} descriptionId={descriptionId} error={hasError} />
        </>
      )}
    </FieldShell>
  );
}

export default MetralyRadio;
