"use client";

import * as React from "react";
import { OverlayShell } from "./OverlayShell";

export interface MetralyBottomSheetProps
  extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  maxHeight?: number | string;
  closeLabel?: string;
}

export function MetralyBottomSheet({
  children,
  open,
  onOpenChange,
  title,
  description,
  maxHeight = "78dvh",
  closeLabel = "Close panel",
  className,
  ...rest
}: MetralyBottomSheetProps) {
  return (
    <OverlayShell
      {...rest}
      open={open}
      onOpenChange={onOpenChange}
      title={title}
      description={description}
      placement="bottom"
      size={maxHeight}
      closeLabel={closeLabel}
      withGrabber
      rootClassName="metraly-bottom-sheet-root"
      scrimClassName="metraly-bottom-sheet-scrim"
      className={["metraly-bottom-sheet", className].filter(Boolean).join(" ")}
      headerClassName="metraly-bottom-sheet__header"
      bodyClassName="metraly-bottom-sheet__body"
    >
      {children}
    </OverlayShell>
  );
}

export default MetralyBottomSheet;
