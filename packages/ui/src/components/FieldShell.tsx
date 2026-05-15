import * as React from "react";

export type FieldShellLayout = "field" | "control-row" | "filter-chip";
export type FieldShellState = "default" | "checked" | "selected" | "loading" | "disabled" | "error" | "empty";
export type FieldShellElement = "div" | "label" | "span";

export interface FieldShellContext {
  controlId: string;
  labelId: string;
  descriptionId?: string;
  helperText?: React.ReactNode;
  hasError: boolean;
  isDisabled: boolean;
  label?: React.ReactNode;
}

export interface FieldShellProps extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  as?: FieldShellElement;
  layout?: FieldShellLayout;
  state?: FieldShellState;
  inputId?: string;
  label?: React.ReactNode;
  description?: React.ReactNode;
  /** Prototype-compatible alias for description. */
  hint?: React.ReactNode;
  error?: React.ReactNode | boolean;
  disabled?: boolean;
  loading?: boolean;
  fullWidth?: boolean;
  children: React.ReactNode | ((context: FieldShellContext) => React.ReactNode);
}

export interface FieldCopyProps {
  label?: React.ReactNode;
  helperText?: React.ReactNode;
  labelId?: string;
  descriptionId?: string;
  error?: boolean;
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

function resolveState({ state, error, disabled, loading }: Pick<FieldShellProps, "state" | "error" | "disabled" | "loading">): FieldShellState {
  if (state) return state;
  if (loading) return "loading";
  if (error) return "error";
  if (disabled) return "disabled";
  return "default";
}

export function FieldCopy({
  label,
  helperText,
  labelId,
  descriptionId,
  error = false,
  className,
}: FieldCopyProps) {
  if (!label && !helperText) return null;

  return (
    <span className={cx("metraly-control-copy", className)}>
      {label ? <span id={labelId} className="metraly-control-label">{label}</span> : null}
      {helperText ? (
        <span
          id={descriptionId}
          className={cx("metraly-control-description", error && "is-error")}
          role={error ? "alert" : undefined}
        >
          {helperText}
        </span>
      ) : null}
    </span>
  );
}

export const FieldShell = React.forwardRef<HTMLElement, FieldShellProps>(function FieldShell({
  as = "div",
  layout = "field",
  state,
  inputId,
  label,
  description,
  hint,
  error = false,
  disabled = false,
  loading = false,
  fullWidth = false,
  className,
  children,
  ...rest
}: FieldShellProps, ref) {
  const generatedId = React.useId();
  const controlId = inputId ?? `metraly-control-${generatedId}`;
  const labelId = `${controlId}-label`;
  const helperText = typeof error === "string" || React.isValidElement(error) ? error : description ?? hint;
  const descriptionId = helperText ? `${controlId}-description` : undefined;
  const hasError = Boolean(error);
  const isDisabled = Boolean(disabled || loading);
  const resolvedState = resolveState({ state, error: hasError, disabled: isDisabled, loading });
  const classes = cx(
    "metraly-field-shell",
    `metraly-field-shell--${layout}`,
    layout === "control-row" && "metraly-control-row",
    fullWidth && "metraly-field-shell--full",
    isDisabled && "is-disabled",
    loading && "is-loading",
    hasError && "is-error",
    className,
  );
  const context: FieldShellContext = {
    controlId,
    labelId,
    descriptionId,
    helperText,
    hasError,
    isDisabled,
    label,
  };
  const content = typeof children === "function" ? children(context) : children;

  if (as === "label") {
    return (
      <label {...(rest as React.LabelHTMLAttributes<HTMLLabelElement>)} ref={ref as React.Ref<HTMLLabelElement>} className={classes} data-state={resolvedState} data-layout={layout}>
        {content}
      </label>
    );
  }

  if (as === "span") {
    return (
      <span {...(rest as React.HTMLAttributes<HTMLSpanElement>)} ref={ref as React.Ref<HTMLSpanElement>} className={classes} data-state={resolvedState} data-layout={layout}>
        {content}
      </span>
    );
  }

  return (
    <div {...(rest as React.HTMLAttributes<HTMLDivElement>)} ref={ref as React.Ref<HTMLDivElement>} className={classes} data-state={resolvedState} data-layout={layout}>
      {content}
    </div>
  );
});

export default FieldShell;
