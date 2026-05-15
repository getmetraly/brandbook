import * as React from "react";
import { FieldCopy, FieldShell } from "./FieldShell";

export type MetralySwitchAccent = "cyan" | "purple";

export interface MetralySwitchProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Prototype-compatible alias for description. */
  hint?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  /** Visual loading state. Keeps the control non-interactive without losing layout. */
  loading?: boolean;
  accent?: MetralySwitchAccent;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function MetralySwitch({
  label = "Switch",
  description,
  hint,
  checked = false,
  disabled = false,
  loading = false,
  accent = "cyan",
  className,
  onClick,
}: MetralySwitchProps) {
  return (
    <FieldShell
      as="span"
      layout="control-row"
      label={label}
      description={description}
      hint={hint}
      disabled={disabled}
      loading={loading}
      state={loading ? "loading" : disabled ? "disabled" : checked ? "checked" : "default"}
      className={["metraly-switch-row", accent === "purple" && "is-purple", className].filter(Boolean).join(" ")}
      data-accent={accent}
    >
      {({ labelId, descriptionId, helperText, isDisabled }) => (
        <>
          <button
            type="button"
            className="metraly-switch"
            role="switch"
            aria-checked={checked}
            aria-labelledby={labelId}
            aria-describedby={descriptionId}
            aria-busy={loading || undefined}
            disabled={isDisabled}
            onClick={loading ? undefined : onClick}
          >
            <span className="metraly-switch-track" aria-hidden="true" />
            <span className="metraly-switch-knob" aria-hidden="true">
              {loading ? <span className="metraly-control-spinner" /> : null}
            </span>
          </button>
          <FieldCopy label={label} helperText={helperText} labelId={labelId} descriptionId={descriptionId} />
        </>
      )}
    </FieldShell>
  );
}

export default MetralySwitch;
