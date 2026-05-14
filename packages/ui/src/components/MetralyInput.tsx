import React from "react";
import { MetralyIcon } from "./MetralyIcon";

export interface MetralyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Renders a search icon and sets type to "search" by default */
  search?: boolean;
  label?: React.ReactNode;
  description?: React.ReactNode;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  error?: string;
  /** Make the wrapper full-width */
  fullWidth?: boolean;
  wrapperClassName?: string;
}

export const MetralyInput = React.forwardRef<
  HTMLInputElement,
  MetralyInputProps
>(
  (
    {
      search = false,
      label,
      description,
      iconLeft,
      iconRight,
      error,
      fullWidth = false,
      disabled,
      className,
      wrapperClassName,
      id,
      type,
      ...props
    },
    ref,
  ) => {
    const generatedId = React.useId();
    const inputId = id ?? `metraly-input-${generatedId}`;
    const helperText = error ?? description;
    const helperId = helperText ? `${inputId}-description` : undefined;
    const resolvedIconLeft = iconLeft ?? (search ? <MetralyIcon name="search" size="sm" /> : undefined);
    const rootClasses = [
      "metraly-input",
      fullWidth ? "metraly-input--full" : "",
      error ? "metraly-input--error" : "",
      disabled ? "metraly-input--disabled" : "",
      wrapperClassName ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const inputType = type ?? (search ? "search" : "text");

    return (
      <div className={rootClasses}>
        {label ? <label className="metraly-control-label" htmlFor={inputId}>{label}</label> : null}
        <div className="metraly-input__control">
          {resolvedIconLeft && (
            <span className="metraly-input__icon" aria-hidden="true">
              {resolvedIconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={inputId}
            type={inputType}
            className={`metraly-input__field${className ? ` ${className}` : ""}`}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={helperId}
            {...props}
          />
          {iconRight && (
            <span className="metraly-input__icon" aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>
        {helperText ? (
          <div
            id={helperId}
            className={error ? "metraly-control-description is-error" : "metraly-control-description"}
            role={error ? "alert" : undefined}
          >
            {helperText}
          </div>
        ) : null}
      </div>
    );
  },
);

MetralyInput.displayName = "MetralyInput";
