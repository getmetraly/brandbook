"use client";

import * as React from "react";
import { MetralyIcon } from "../components/MetralyIcon";
import { focusFirstElement, lockBodyScroll, restoreFocus, wrapFocus } from "./overlayFocus";

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

function toCssLength(value: number | string | undefined, fallback: string) {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
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
  style,
  ...rest
}: MetralyDrawerProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const drawerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const previouslyFocusedElement = document.activeElement;
    const unlockBodyScroll = lockBodyScroll();

    if (drawerRef.current) {
      focusFirstElement(drawerRef.current);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange?.(false);
        return;
      }

      if (drawerRef.current) {
        wrapFocus(event, drawerRef.current);
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

  const classes = [
    "metraly-drawer",
    `metraly-drawer--${side}`,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  const drawerStyle = {
    ...style,
    "--m-drawer-width": toCssLength(width, "320px"),
  } as React.CSSProperties;

  return (
    <div className="metraly-drawer-root">
      <button
        type="button"
        className="metraly-drawer-scrim"
        aria-label={closeLabel}
        onClick={() => onOpenChange?.(false)}
      />
      <div
        {...rest}
        ref={drawerRef}
        tabIndex={-1}
        className={classes}
        style={drawerStyle}
        role="dialog"
        aria-modal="true"
        aria-labelledby={title ? titleId : undefined}
        aria-describedby={description ? descriptionId : undefined}
      >
        {title || description ? (
          <div className="metraly-drawer__header">
            <div className="metraly-drawer__copy">
              {title ? <div id={titleId} className="metraly-drawer__title">{title}</div> : null}
              {description ? <div id={descriptionId} className="metraly-drawer__description">{description}</div> : null}
            </div>
            <button
              type="button"
              className="metraly-drawer__close"
              aria-label={closeLabel}
              onClick={() => onOpenChange?.(false)}
            >
              <MetralyIcon name="x" size="sm" />
            </button>
          </div>
        ) : (
          <button
            type="button"
            className="metraly-drawer__close metraly-drawer__close--floating"
            aria-label={closeLabel}
            onClick={() => onOpenChange?.(false)}
          >
            <MetralyIcon name="x" size="sm" />
          </button>
        )}
        <div className="metraly-drawer__body">{children}</div>
      </div>
    </div>
  );
}

export default MetralyDrawer;
