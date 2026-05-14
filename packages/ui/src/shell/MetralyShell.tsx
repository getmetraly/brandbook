import * as React from "react";

export interface MetralyShellProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  stackOnMobile?: boolean;
}

export function MetralyShell({
  children,
  className,
  stackOnMobile = false,
  ...rest
}: MetralyShellProps) {
  const classes = [
    "metraly-shell",
    stackOnMobile && "metraly-shell--stack-mobile",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div {...rest} className={classes}>
      {children}
    </div>
  );
}

export default MetralyShell;
