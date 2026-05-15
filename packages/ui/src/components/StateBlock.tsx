import * as React from "react";
import { MetralySkeleton } from "./MetralySkeleton";

export type StateBlockVariant = "empty" | "error" | "gated" | "no-results" | "loading" | "disconnected";
export type StateBlockDensity = "comfortable" | "compact";
export type StateBlockAlign = "start" | "center";

export interface StateBlockProps extends Omit<React.HTMLAttributes<HTMLElement>, "title"> {
  title?: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  icon?: React.ReactNode;
  variant?: StateBlockVariant;
  density?: StateBlockDensity;
  align?: StateBlockAlign;
  loadingLines?: number;
}

function defaultTitle(variant: StateBlockVariant) {
  if (variant === "error") return "Unable to load";
  if (variant === "gated") return "Access required";
  if (variant === "no-results") return "No results";
  if (variant === "loading") return "Loading";
  if (variant === "disconnected") return "Source disconnected";
  return "No data";
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function StateBlock({
  title,
  description,
  action,
  icon,
  variant = "empty",
  density = "comfortable",
  align = "center",
  loadingLines = 3,
  className,
  ...rest
}: StateBlockProps) {
  const resolvedTitle = title ?? defaultTitle(variant);
  const isLoading = variant === "loading";
  const ariaLabel = (rest as { ["aria-label"]?: string })["aria-label"] ?? (typeof resolvedTitle === "string" ? resolvedTitle : "State");
  const classes = cx(
    "metraly-state-block",
    `is-${variant}`,
    density !== "comfortable" && `metraly-state-block--${density}`,
    align !== "center" && `is-align-${align}`,
    className,
  );

  return (
    <section
      {...rest}
      className={classes}
      data-variant={variant}
      data-density={density}
      data-align={align}
      aria-label={ariaLabel}
      aria-busy={isLoading || undefined}
    >
      {isLoading ? <MetralySkeleton variant="text" lines={loadingLines} aria-label="Loading state" /> : icon ? (
        <div className="metraly-state-block__icon" aria-hidden="true">{icon}</div>
      ) : null}
      {!isLoading ? (
        <div className="metraly-state-block__copy">
          <strong>{resolvedTitle}</strong>
          {description ? <p>{description}</p> : null}
        </div>
      ) : null}
      {action ? <div className="metraly-state-block__action">{action}</div> : null}
    </section>
  );
}

export default StateBlock;
