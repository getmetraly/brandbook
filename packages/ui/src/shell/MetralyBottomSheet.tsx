"use client";

import * as React from "react";
import { MetralyIcon } from "../components/MetralyIcon";
import { focusFirstElement, lockBodyScroll, restoreFocus, wrapFocus } from "./overlayFocus";

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

function toCssLength(value: number | string | undefined, fallback: string) {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
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
  style,
  ...rest
}: MetralyBottomSheetProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const sheetRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const previouslyFocusedElement = document.activeElement;
    const unlockBodyScroll = lockBodyScroll();

    if (sheetRef.current) {
      focusFirstElement(sheetRef.current);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange?.(false);
        return;
      }

      if (sheetRef.current) {
        wrapFocus(event, sheetRef.current);
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      unlockBodyScroll();
      restoreFocus(previouslyFocusedElement);
    };
  }, [open, onOpenChange]);

  if (!open) return null;

  const classes = ["metraly-bottom-sheet", className].filter(Boolean).join(" ");
  const sheetStyle = {
    ...style,
    "--m-bottom-sheet-max-height": toCssLength(maxHeight, "78dvh"),
  } as React.CSSProperties;

  return (
    <div className="metraly-bottom-sheet-root">
      <button
        type="button"
        className="metraly-bottom-sheet-scrim"
        aria-label={closeLabel}
        onClick={() => onOpenChange?.(false)}
      />
      <div
        {...rest}
        ref={sheetRef}
        tabIndex={-1}
        className={classes}
        style={sheetStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
      >
        <div className="metraly-bottom-sheet__grabber" aria-hidden="true" />
        {title || description ? (
          <div className="metraly-bottom-sheet__header">
            <div className="metraly-bottom-sheet__copy">
              {title ? <div id={titleId} className="metraly-bottom-sheet__title">{title}</div> : null}
              {description ? <div id={descriptionId} className="metraly-bottom-sheet__description">{description}</div> : null}
            </div>
            <button
              type="button"
              className="metraly-bottom-sheet__close"
              aria-label={closeLabel}
              onClick={() => onOpenChange?.(false)}
            >
              <MetralyIcon name="x" size="sm" />
            </button>
          </div>
        ) : null}
        <div className="metraly-bottom-sheet__body">{children}</div>
      </div>
    </div>
  );
}

export default MetralyBottomSheet;
