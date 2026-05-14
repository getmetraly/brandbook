import React from "react";

export interface MetralyInputProps
  extends Omit<React.InputHTMLAttributes<HTMLInputElement>, "size"> {
  /** Renders a search icon and sets type to "search" by default */
  search?: boolean;
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
    const wrapClasses = [
      "m-input-wrap",
      fullWidth ? "m-input-wrap--full" : "",
      error ? "m-input-wrap--error" : "",
      disabled ? "m-input-wrap--disabled" : "",
      wrapperClassName ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    const inputType = type ?? (search ? "search" : "text");

    const descId = error && id ? `${id}-error` : undefined;

    return (
      <div style={{ display: fullWidth ? "block" : "inline-block" }}>
        <div className={wrapClasses}>
          {iconLeft && (
            <span className="m-input-wrap__icon" aria-hidden="true">
              {iconLeft}
            </span>
          )}
          <input
            ref={ref}
            id={id}
            type={inputType}
            className={`m-input-wrap__field${className ? ` ${className}` : ""}`}
            disabled={disabled}
            aria-invalid={error ? true : undefined}
            aria-describedby={descId}
            {...props}
          />
          {iconRight && (
            <span className="m-input-wrap__icon" aria-hidden="true">
              {iconRight}
            </span>
          )}
        </div>
        {error && (
          <div id={descId} className="m-input-error" role="alert">
            {error}
          </div>
        )}
      </div>
    );
  },
);

MetralyInput.displayName = "MetralyInput";
