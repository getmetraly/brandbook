import * as React from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface StickyWizardFooterProps {
  /**
   * Back / previous-step button slot. Pass `null` or omit on the first step.
   * When present, renders on the left side.
   */
  back?: React.ReactNode;
  /**
   * Primary action slot (Continue / Submit / Create).
   * Renders on the right side.
   */
  primary: React.ReactNode;
  /**
   * Optional center slot for status feedback: save-error badge,
   * autosave indicator, form-level validation summary, etc.
   */
  status?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Sticky footer for wizard flows with a canonical Back / Primary action rhythm.
 *
 * Stays at the bottom of the viewport while the wizard card is taller than
 * the viewport. On narrow viewports (≤ 560 px) it becomes `position: static`
 * so it flows naturally below the wizard card instead of clipping content.
 *
 * Place this as the `footer` slot inside `WizardLayout`, or use it standalone
 * when building a wizard shell outside of `WizardLayout`.
 *
 * @example
 * ```tsx
 * <WizardLayout
 *   steps={steps}
 *   footer={
 *     <StickyWizardFooter
 *       back={<MetralyButton variant="ghost" onClick={onBack}>Back</MetralyButton>}
 *       primary={<MetralyButton variant="primary" onClick={onNext}>Continue</MetralyButton>}
 *     />
 *   }
 * >
 *   {children}
 * </WizardLayout>
 * ```
 */
export function StickyWizardFooter({
  back,
  primary,
  status,
  className,
  style,
}: StickyWizardFooterProps) {
  const classes = [
    "metraly-sticky-wizard-footer",
    !back ? "metraly-sticky-wizard-footer--no-back" : null,
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={classes} style={style}>
      {back ? (
        <div className="metraly-sticky-wizard-footer__back">{back}</div>
      ) : null}

      {status ? (
        <div className="metraly-sticky-wizard-footer__status">{status}</div>
      ) : null}

      <div className="metraly-sticky-wizard-footer__primary">{primary}</div>
    </div>
  );
}

export default StickyWizardFooter;
