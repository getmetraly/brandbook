"use client";

import * as React from "react";
import { MetralyIcon } from "../components/MetralyIcon";
import { focusFirstElement, lockBodyScroll, restoreFocus, wrapFocus } from "./overlayFocus";

export type OverlayShellPlacement = "left" | "right" | "bottom" | "center";

export interface OverlayShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "children" | "title"> {
  children: React.ReactNode;
  open: boolean;
  onOpenChange?: (open: boolean) => void;
  title?: React.ReactNode;
  description?: React.ReactNode;
  placement?: OverlayShellPlacement;
  size?: number | string;
  closeLabel?: string;
  withGrabber?: boolean;
  floatingClose?: boolean;
  rootClassName?: string;
  scrimClassName?: string;
  headerClassName?: string;
  bodyClassName?: string;
}

function toCssLength(value: number | string | undefined, fallback: string) {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function OverlayShell({
  children,
  open,
  onOpenChange,
  title,
  description,
  placement = "right",
  size,
  closeLabel = "Close panel",
  withGrabber = false,
  floatingClose = false,
  rootClassName,
  scrimClassName,
  headerClassName,
  bodyClassName,
  className,
  style,
  ...rest
}: OverlayShellProps) {
  const titleId = React.useId();
  const descriptionId = React.useId();
  const panelRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (!open) return;

    const previouslyFocusedElement = document.activeElement;
    const unlockBodyScroll = lockBodyScroll();

    if (panelRef.current) {
      focusFirstElement(panelRef.current);
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        event.preventDefault();
        onOpenChange?.(false);
        return;
      }

      if (panelRef.current) {
        wrapFocus(event, panelRef.current);
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

  const defaultSize = placement === "bottom" ? "78dvh" : placement === "center" ? "min(520px, calc(100vw - 32px))" : "320px";
  const panelStyle = {
    ...style,
    "--m-overlay-size": toCssLength(size, defaultSize),
  } as React.CSSProperties;
  const classes = cx("metraly-overlay-shell", `metraly-overlay-shell--${placement}`, className);
  const hasHeader = Boolean(title || description);
  const providedAriaLabel = (rest as React.AriaAttributes)["aria-label"];
  const providedAriaLabelledBy = (rest as React.AriaAttributes)["aria-labelledby"];
  const providedAriaDescribedBy = (rest as React.AriaAttributes)["aria-describedby"];
  const dialogAriaLabel = title || providedAriaLabelledBy ? providedAriaLabel : providedAriaLabel ?? "Panel";

  return (
    <div className={cx("metraly-overlay-shell-root", rootClassName)} data-placement={placement}>
      <button
        type="button"
        className={cx("metraly-overlay-shell-scrim", scrimClassName)}
        aria-label={closeLabel}
        onClick={() => onOpenChange?.(false)}
      />
      <div
        {...rest}
        ref={panelRef}
        tabIndex={-1}
        className={classes}
        style={panelStyle}
        role="dialog"
        aria-modal="true"
        aria-label={dialogAriaLabel}
        aria-labelledby={title ? titleId : providedAriaLabelledBy}
        aria-describedby={description ? descriptionId : providedAriaDescribedBy}
      >
        {withGrabber ? <div className="metraly-overlay-shell__grabber" aria-hidden="true" /> : null}
        {hasHeader ? (
          <div className={cx("metraly-overlay-shell__header", headerClassName)}>
            <div className="metraly-overlay-shell__copy">
              {title ? <div id={titleId} className="metraly-overlay-shell__title">{title}</div> : null}
              {description ? <div id={descriptionId} className="metraly-overlay-shell__description">{description}</div> : null}
            </div>
            <button
              type="button"
              className="metraly-overlay-shell__close"
              aria-label={closeLabel}
              onClick={() => onOpenChange?.(false)}
            >
              <MetralyIcon name="x" size="sm" />
            </button>
          </div>
        ) : floatingClose ? (
          <button
            type="button"
            className="metraly-overlay-shell__close metraly-overlay-shell__close--floating"
            aria-label={closeLabel}
            onClick={() => onOpenChange?.(false)}
          >
            <MetralyIcon name="x" size="sm" />
          </button>
        ) : null}
        <div className={cx("metraly-overlay-shell__body", bodyClassName)}>{children}</div>
      </div>
    </div>
  );
}

export default OverlayShell;
