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
      iconLeft,
      iconRight,
      disabled,
      children,
      className,
      ...props
    },
    ref,
  ) => {
    const isDisabled = disabled || loading;

    const classes = [
      "m-btn",
      `m-btn--${variant}`,
      size !== "md" ? `m-btn--${size}` : "",
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
        {...props}
      >
        {loading ? (
          <span className="m-btn__spinner" aria-hidden="true" />
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
