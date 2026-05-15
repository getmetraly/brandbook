import * as React from "react";
import { FieldCopy, FieldShell } from "./FieldShell";

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
      loading={loading}
      state={loading ? "loading" : error ? "error" : disabled ? "disabled" : checked || indeterminate ? "checked" : "default"}
      className={["metraly-checkbox", indeterminate && "is-indeterminate", className].filter(Boolean).join(" ")}
    >
      {({ controlId, descriptionId, helperText, hasError, isDisabled }) => (
        <>
          <input
            id={controlId}
            name={name}
            value={value}
            type="checkbox"
            className="metraly-control-input"
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={isDisabled}
            aria-checked={indeterminate ? "mixed" : undefined}
            aria-invalid={hasError || undefined}
            aria-describedby={descriptionId}
            aria-busy={loading || undefined}
            onChange={loading ? undefined : onChange}
            readOnly={(checked !== undefined || indeterminate || loading) && !onChange ? true : undefined}
          />
          <span className="metraly-checkbox-box" aria-hidden="true">
            {loading ? <span className="metraly-control-spinner" /> : null}
          </span>
          <FieldCopy label={label} helperText={helperText} descriptionId={descriptionId} error={hasError} />
        </>
      )}
    </FieldShell>
  );
}

export default MetralyCheckbox;
