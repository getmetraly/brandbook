import React from "react";

export type MetralyButtonVariant =
  | "primary"
  | "secondary"
  | "ghost"
  | "neutral"
  | "danger"
  | "dashed";

export type MetralyButtonSize = "sm" | "md" | "lg";

export interface MetralyButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, "children"> {
  variant?: MetralyButtonVariant;
  size?: MetralyButtonSize;
  loading?: boolean;
  fullWidth?: boolean;
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  children?: React.ReactNode;
}

export const MetralyButton = React.forwardRef<
  HTMLButtonElement,
  MetralyButtonProps
>(
  (
    {
      variant = "ghost",
      size = "md",
      loading = false,
      fullWidth = false,
      iconLeft,
      iconRight,
      disabled,
      children,
      className,
      type,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const iconOnly = !children && (iconLeft || iconRight || loading);

    const classes = [
      "metraly-button",
      `metraly-button--${variant}`,
      size !== "md" ? `metraly-button--${size}` : "",
      fullWidth ? "metraly-button--full" : "",
      iconOnly ? "metraly-button--icon-only" : "",
      className ?? "",
    ]
      .filter(Boolean)
      .join(" ");

    return (
      <button
        ref={ref}
        className={classes}
        disabled={isDisabled}
        aria-disabled={isDisabled || undefined}
        data-loading={loading ? "true" : "false"}
        type={type ?? "button"}
        {...props}
      >
        {loading ? (
          <span className="metraly-button__spinner" aria-hidden="true" />
        ) : (
          iconLeft
        )}
        {children}
        {!loading && iconRight}
      </button>
    );
  },
);

MetralyButton.displayName = "MetralyButton";
