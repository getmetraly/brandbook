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
      title,
      "aria-label": ariaLabel,
      "aria-labelledby": ariaLabelledBy,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;
    const iconOnly = !children && (iconLeft || iconRight || loading);
    const accessibleName = ariaLabel || ariaLabelledBy || title;
    const fallbackIconLabel = iconOnly && !accessibleName ? "Icon button" : undefined;

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
        aria-label={ariaLabel || fallbackIconLabel}
        aria-labelledby={ariaLabelledBy}
        data-loading={loading ? "true" : "false"}
        title={title}
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
