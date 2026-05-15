"use client";

import * as React from "react";
import { OverlayShell } from "./OverlayShell";

export type MetralyDrawerSide = "left" | "right";

export interface MetralyDrawerProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  side?: MetralyDrawerSide;
  width?: number | string;
  closeLabel?: string;
}

export function MetralyDrawer({
  children,
  open,
  onOpenChange,
  title,
  description,
  side = "left",
  width = 320,
  closeLabel = "Close panel",
  className,
  ...rest
}: MetralyDrawerProps) {
  return (
    <OverlayShell
      {...rest}
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      placement={side}
      size={width}
      closeLabel={closeLabel}
      floatingClose={!title && !description}
      rootClassName="metraly-drawer-root"
      scrimClassName="metraly-drawer-scrim"
      className={["metraly-drawer", `metraly-drawer--${side}`, className].filter(Boolean).join(" ")}
      headerClassName="metraly-drawer__header"
      bodyClassName="metraly-drawer__body"
    >
      {children}
    </OverlayShell>
  );
}

export default MetralyDrawer;
