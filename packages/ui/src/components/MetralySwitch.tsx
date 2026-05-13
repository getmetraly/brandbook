import * as React from "react";

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
  const helperText = description ?? hint;
  const generatedId = React.useId();
  const labelId = `${generatedId}-label`;
  const descriptionId = helperText ? `${generatedId}-description` : undefined;
  const isDisabled = disabled || loading;
  const classes = [
    "metraly-control-row",
    "metraly-switch-row",
    checked && "is-checked",
    isDisabled && "is-disabled",
    loading && "is-loading",
    accent === "purple" && "is-purple",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes} data-state={loading ? "loading" : isDisabled ? "disabled" : checked ? "checked" : "default"} data-accent={accent}>
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
      <span className="metraly-control-copy">
        <span id={labelId} className="metraly-control-label">
          {label}
        </span>
        {helperText ? <span id={descriptionId} className="metraly-control-description">{helperText}</span> : null}
      </span>
    </span>
  );
}

export default MetralySwitch;
