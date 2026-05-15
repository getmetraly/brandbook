import React from "react";
import { FieldShell } from "./FieldShell";
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
    const resolvedIconLeft = iconLeft ?? (search ? <MetralyIcon name="search" size="sm" /> : undefined);
    const inputType = type ?? (search ? "search" : "text");

    return (
      <FieldShell
        as="div"
        layout="field"
        inputId={id}
        label={label}
        description={description}
        error={error}
        disabled={disabled}
        fullWidth={fullWidth}
        className={["metraly-input", fullWidth && "metraly-input--full", error && "metraly-input--error", disabled && "metraly-input--disabled", wrapperClassName].filter(Boolean).join(" ")}
      >
        {({ controlId, descriptionId, helperText, hasError }) => (
          <>
            {label ? <label className="metraly-control-label" htmlFor={controlId}>{label}</label> : null}
            <div className="metraly-input__control">
              {resolvedIconLeft && (
                <span className="metraly-input__icon" aria-hidden="true">
                  {resolvedIconLeft}
                </span>
              )}
              <input
                ref={ref}
                id={controlId}
                type={inputType}
                className={`metraly-input__field${className ? ` ${className}` : ""}`}
                disabled={disabled}
                aria-invalid={hasError ? true : undefined}
                aria-describedby={descriptionId}
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
                id={descriptionId}
                className={hasError ? "metraly-control-description is-error" : "metraly-control-description"}
                role={hasError ? "alert" : undefined}
              >
                {helperText}
              </div>
            ) : null}
          </>
        )}
      </FieldShell>
    );
  },
);

MetralyInput.displayName = "MetralyInput";
