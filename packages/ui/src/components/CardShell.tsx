import * as React from "react";
import { MetralyPanel } from "./MetralyPanel";

export type CardShellDensity = "comfortable" | "compact";
export type CardShellTone = "neutral" | "cyan" | "purple" | "success" | "warning" | "danger" | "info";
export type CardShellState =
  | "default"
  | "selected"
  | "loading"
  | "empty"
  | "error"
  | "stale"
  | "dragging"
  | "resizing";

export interface CardShellProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  /** Optional semantic state shared by cards, metric cards, and widget shells. */
  state?: CardShellState;
  /** Compact mode is used inside dense dashboard grids and narrow rails. */
  density?: CardShellDensity;
  /** Token-backed tone hook for semantic borders/background accents. */
  tone?: CardShellTone;
  /** Optional leading slot for icons, drag handles, or semantic glyphs. */
  leading?: React.ReactNode;
  /** Title slot for composed card headers. */
  title?: React.ReactNode;
  /** Subtitle / description slot for composed card headers. */
  subtitle?: React.ReactNode;
  /** Optional trailing slot for status badges, menus, or secondary metadata. */
  trailing?: React.ReactNode;
  /** Optional actions slot rendered after trailing content in the header. */
  actions?: React.ReactNode;
  /** Fully custom header. When provided, leading/title/subtitle/trailing/actions are ignored. */
  header?: React.ReactNode;
  /** Main body content. */
  children?: React.ReactNode;
  /** Optional bottom slot. CardShell pins this to the bottom in equal-height layouts. */
  footer?: React.ReactNode;
  /** Overlay / chrome slot for handles, selection borders, or resize affordances. */
  overlay?: React.ReactNode;
  /** Additional class names for the header/body/footer slots. */
  headerClassName?: string;
  bodyClassName?: string;
  footerClassName?: string;
  /** Additional class names for generated header sub-slots. */
  leadingClassName?: string;
  headingClassName?: string;
  titleClassName?: string;
  subtitleClassName?: string;
  trailingClassName?: string;
  actionsClassName?: string;
  /** Optional test id or semantic metadata for stateful consumers. */
  className?: string;
}

function cx(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function CardShell({
  state = "default",
  density = "comfortable",
  tone = "neutral",
  leading,
  title,
  subtitle,
  trailing,
  actions,
  header,
  children,
  footer,
  overlay,
  headerClassName,
  bodyClassName,
  footerClassName,
  leadingClassName,
  headingClassName,
  titleClassName,
  subtitleClassName,
  trailingClassName,
  actionsClassName,
  className,
  ...rest
}: CardShellProps) {
  const hasGeneratedHeader = Boolean(leading || title || subtitle || trailing || actions);
  const {
    ["data-state"]: dataState,
    ["data-density"]: dataDensity,
    ["data-tone"]: dataTone,
    ...panelProps
  } = rest as React.HTMLAttributes<HTMLDivElement> & {
    ["data-state"]?: string;
    ["data-density"]?: string;
    ["data-tone"]?: string;
  };
  const hasBody = children !== undefined && children !== null && children !== false;
  const classes = cx(
    "metraly-card-shell",
    state !== "default" && `is-${state}`,
    density !== "comfortable" && `metraly-card-shell--${density}`,
    tone !== "neutral" && `is-tone-${tone}`,
    className,
  );

  return (
    <MetralyPanel
      {...panelProps}
      className={classes}
      data-card-shell="true"
      data-state={dataState ?? state}
      data-density={dataDensity ?? density}
      data-tone={dataTone ?? tone}
    >
      {header ? (
        <div className={cx("metraly-card-shell__header", headerClassName)}>{header}</div>
      ) : hasGeneratedHeader ? (
        <header className={cx("metraly-card-shell__header", headerClassName)}>
          {leading ? <span className={cx("metraly-card-shell__leading", leadingClassName)}>{leading}</span> : null}
          {(title || subtitle) ? (
            <div className={cx("metraly-card-shell__heading", headingClassName)}>
              {title ? <div className={cx("metraly-card-shell__title", titleClassName)}>{title}</div> : null}
              {subtitle ? <div className={cx("metraly-card-shell__subtitle", subtitleClassName)}>{subtitle}</div> : null}
            </div>
          ) : null}
          {trailing ? <div className={cx("metraly-card-shell__trailing", trailingClassName)}>{trailing}</div> : null}
          {actions ? <div className={cx("metraly-card-shell__actions", actionsClassName)}>{actions}</div> : null}
        </header>
      ) : null}

      {hasBody ? <div className={cx("metraly-card-shell__body", bodyClassName)}>{children}</div> : null}

      {footer ? <div className={cx("metraly-card-shell__footer", footerClassName)}>{footer}</div> : null}
      {overlay ? <div className="metraly-card-shell__overlay">{overlay}</div> : null}
    </MetralyPanel>
  );
}

export default CardShell;
