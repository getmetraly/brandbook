import * as React from "react";
import { StateBlock, type StateBlockVariant } from "./StateBlock";

export type MetralyEmptyStateVariant = "default" | "gated" | "error" | "no-results";

export interface MetralyEmptyStateProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: MetralyEmptyStateVariant;
}

function toStateBlockVariant(variant: MetralyEmptyStateVariant): StateBlockVariant {
  return variant === "default" ? "empty" : variant;
}

export function MetralyEmptyState({
  title,
  description,
  action,
  icon,
  variant = "default",
  className,
  ...rest
}: MetralyEmptyStateProps) {
  return (
    <StateBlock
      {...rest}
      className={["metraly-empty-state", className].filter(Boolean).join(" ")}
      variant={toStateBlockVariant(variant)}
      title={title}
      description={description}
      action={action}
      icon={icon}
      data-variant={variant}
    />
  );
}

export default MetralyEmptyState;
