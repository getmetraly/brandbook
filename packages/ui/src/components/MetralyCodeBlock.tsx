import * as React from "react";

export type MetralyCodeBlockVariant = "block" | "inline";
export type MetralyCodeBlockAccent =
  | "default"
  | "primary"
  | "secondary"
  | "success"
  | "warning"
  | "error"
  | "info"
  /** @deprecated Use "primary". */
  | "cyan"
  /** @deprecated Use "success". */
  | "ok"
  /** @deprecated Use "warning". */
  | "warn"
  /** @deprecated Use "error". */
  | "err";

function normalizeAccent(accent: MetralyCodeBlockAccent) {
  switch (accent) {
    case "cyan":
      return "primary";
    case "ok":
      return "success";
    case "warn":
      return "warning";
    case "err":
      return "error";
    default:
      return accent;
  }
}

export interface MetralyCodeBlockProps
  extends Omit<React.HTMLAttributes<HTMLElement>, "children"> {
  children: React.ReactNode;
  variant?: MetralyCodeBlockVariant;
  accent?: MetralyCodeBlockAccent;
}

export function MetralyCodeBlock({
  children,
  variant = "block",
  accent = "default",
  className,
  ...rest
}: MetralyCodeBlockProps) {
  const classes = [
    "metraly-code-block",
    `metraly-code-block--${variant}`,
    `metraly-code-block--${normalizeAccent(accent)}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  if (variant === "inline") {
    return (
      <code {...rest} className={classes}>
        {children}
      </code>
    );
  }

  return (
    <pre {...rest} className={classes}>
      <code>{children}</code>
    </pre>
  );
}

export default MetralyCodeBlock;
