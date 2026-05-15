import * as React from "react";
import { MetralyBadge } from "../components/MetralyBadge";
import { MetralyBottomSheet } from "../shell/MetralyBottomSheet";
import { MetralyButton } from "../components/MetralyButton";
import { MetralyIcon } from "../components/MetralyIcon";
import { MetralyPanel } from "../components/MetralyPanel";
import { StepRail } from "./StepRail";
import type { StepRailStep, StepRailStepStatus } from "./StepRail";

// ─── Re-exported types (backward compatibility) ───────────────────────────────

/** @deprecated Import `StepRailStepStatus` from StepRail directly. */
export type WizardLayoutStepStatus = StepRailStepStatus;
/** @deprecated Import `StepRailStep` from StepRail directly. */
export type WizardLayoutStep = StepRailStep;
export type WizardLayoutProgressPlacement = "top" | "side";

// ─── Props ────────────────────────────────────────────────────────────────────

export interface WizardLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  steps: WizardLayoutStep[];
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  currentStepBadge?: React.ReactNode;
  headerActions?: React.ReactNode;
  /** Content for the review slot at the bottom of the wizard card body. */
  review?: React.ReactNode;
  /**
   * Footer slot. Use `<StickyWizardFooter>` for the canonical Back / primary
   * action rhythm, or pass any ReactNode for custom footer content.
   */
  footer?: React.ReactNode;
  mobileSheetTitle?: string;
  mobileSheetDescription?: string;
  /**
   * `top` matches the current app wizard shell: centered horizontal progress,
   * focused setup card, and a separated action row below the card.
   * `side` keeps the docs/prototype side rail for dense component examples.
   */
  progressPlacement?: WizardLayoutProgressPlacement;
  /** Comfortable content width for the centered app-like wizard card. */
  contentWidth?: number | string;
  children?: React.ReactNode;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function toCssLength(value: number | string | undefined, fallback: string) {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

// ─── Component ────────────────────────────────────────────────────────────────

/**
 * Layout primitive for connector/source setup and onboarding wizards.
 *
 * Default (`progressPlacement="top"`) renders a horizontal step stepper above
 * a centered wizard card, matching the demo app wizard shell.
 * `progressPlacement="side"` renders a vertical rail — use only for
 * documentation or primitive-demonstration layouts, not product flows.
 *
 * Compose `StickyWizardFooter` in the `footer` slot for the canonical
 * Back / primary action rhythm.
 *
 * Dashboard creation wizards should use the `Scenarios/DashboardWizard` recipe
 * (AppShell-like split layout) instead of this component.
 */
export function WizardLayout({
  steps,
  eyebrow = "Onboarding",
  title,
  description,
  currentStepBadge,
  headerActions,
  review,
  footer,
  mobileSheetTitle = "Wizard progress",
  mobileSheetDescription = "Current step, completed steps, and onboarding context.",
  progressPlacement = "top",
  contentWidth = 760,
  children,
  className,
  style,
  ...rest
}: WizardLayoutProps) {
  const [stepsOpen, setStepsOpen] = React.useState(false);
  const currentStep = steps.find((step) => step.status === "current") ?? steps[0];
  const currentIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === currentStep?.id),
  );
  const classes = ["metraly-wizard-layout", className].filter(Boolean).join(" ");
  const layoutStyle = {
    ...style,
    "--m-wizard-content-width": toCssLength(contentWidth, "760px"),
  } as React.CSSProperties;
  const hasBody = Boolean(children || review);

  return (
    <div
      className={classes}
      data-progress-placement={progressPlacement}
      style={layoutStyle}
      {...rest}
    >
      {progressPlacement === "top" ? (
        <StepRail steps={steps} orientation="horizontal" />
      ) : null}

      <div className="metraly-wizard-layout-inner">
        {progressPlacement === "side" ? (
          <aside className="metraly-wizard-layout-aside">
            <MetralyPanel padding="md">
              <StepRail
                steps={steps}
                orientation="vertical"
                footnote={<MetralyBadge variant="primary">layout primitive</MetralyBadge>}
              />
            </MetralyPanel>
          </aside>
        ) : null}

        <div className="metraly-wizard-layout-main">
          <div className="metraly-wizard-layout-mobile-summary">
            <MetralyPanel padding="sm" style={{ position: "sticky", top: 0, zIndex: 12 }}>
              <div className="metraly-wizard-mobile-summary-row">
                <div className="metraly-wizard-mobile-summary-copy">
                  <MetralyBadge variant="primary">
                    {currentIndex + 1}/{steps.length}
                  </MetralyBadge>
                  <div className="metraly-wizard-mobile-summary-text">
                    <div className="metraly-wizard-mobile-summary-eyebrow">{eyebrow}</div>
                    <div className="metraly-wizard-mobile-summary-title">
                      {currentStep?.label}
                    </div>
                  </div>
                </div>
                <MetralyButton
                  variant="ghost"
                  size="sm"
                  iconLeft={<MetralyIcon name="menu" size="sm" />}
                  onClick={() => setStepsOpen(true)}
                >
                  Steps
                </MetralyButton>
              </div>
            </MetralyPanel>
          </div>

          <MetralyPanel padding="none" className="metraly-wizard-layout-card">
            <div className="metraly-wizard-layout-head">
              <div className="metraly-wizard-layout-head-copy">
                <div className="metraly-wizard-layout-eyebrow">{eyebrow}</div>
                <div className="metraly-wizard-layout-title">{title}</div>
                {description ? (
                  <div className="metraly-wizard-layout-description">{description}</div>
                ) : null}
              </div>
              <div className="metraly-wizard-layout-head-actions">
                {currentStepBadge}
                {headerActions}
              </div>
            </div>

            {hasBody ? (
              <div className="metraly-wizard-layout-body">
                {children}
                {review ? (
                  <div className="metraly-wizard-layout-review">{review}</div>
                ) : null}
              </div>
            ) : null}
          </MetralyPanel>

          {footer ? (
            <div className="metraly-wizard-layout-footer">{footer}</div>
          ) : null}
        </div>
      </div>

      <MetralyBottomSheet
        open={stepsOpen}
        onOpenChange={setStepsOpen}
        title={mobileSheetTitle}
        description={mobileSheetDescription}
      >
        <div className="metraly-wizard-layout-sheet">
          <StepRail steps={steps} orientation="vertical" />
        </div>
      </MetralyBottomSheet>
    </div>
  );
}

export default WizardLayout;
