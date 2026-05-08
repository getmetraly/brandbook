import * as React from "react";

export interface MetralySwitchProps {
  label?: React.ReactNode;
  description?: React.ReactNode;
  checked?: boolean;
  disabled?: boolean;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

export function MetralySwitch({
  label = "Switch",
  description,
  checked = false,
  disabled = false,
  className,
  onClick,
}: MetralySwitchProps) {
  const classes = [
    "metraly-control-row",
    "metraly-switch-row",
    checked && "is-checked",
    disabled && "is-disabled",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <span className={classes}>
      <button
        type="button"
        className="metraly-switch"
        role="switch"
        aria-checked={checked}
        aria-label={typeof label === "string" ? label : undefined}
        disabled={disabled}
        onClick={onClick}
      >
        <span className="metraly-switch-track" aria-hidden="true">
          <span className="metraly-switch-pulse" />
        </span>
        <span className="metraly-switch-knob" aria-hidden="true" />
      </button>
      <span className="metraly-control-copy">
        <span className="metraly-control-label">{label}</span>
        {description ? <span className="metraly-control-description">{description}</span> : null}
      </span>
    </span>
  );
}

export default MetralySwitch;
