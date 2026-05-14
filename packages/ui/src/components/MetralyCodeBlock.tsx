import * as React from "react";

export type MetralyCodeBlockVariant = "block" | "inline";
export type MetralyCodeBlockAccent = "default" | "cyan" | "ok" | "warn" | "err";

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
    `metraly-code-block--${accent}`,
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
