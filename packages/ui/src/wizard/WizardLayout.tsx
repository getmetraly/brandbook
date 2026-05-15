import * as React from "react";
import { MetralyBadge } from "../components/MetralyBadge";
import { MetralyBottomSheet } from "../shell/MetralyBottomSheet";
import { MetralyButton } from "../components/MetralyButton";
import { MetralyIcon } from "../components/MetralyIcon";
import { MetralyPanel } from "../components/MetralyPanel";

export type WizardLayoutStepStatus = "done" | "current" | "next" | "warning";
export type WizardLayoutProgressPlacement = "top" | "side";

export interface WizardLayoutStep {
  id: string;
  label: string;
  status: WizardLayoutStepStatus;
  detail?: string;
}

export interface WizardLayoutProps extends Omit<React.HTMLAttributes<HTMLDivElement>, "title"> {
  steps: WizardLayoutStep[];
  eyebrow?: React.ReactNode;
  title: React.ReactNode;
  description?: React.ReactNode;
  currentStepBadge?: React.ReactNode;
  headerActions?: React.ReactNode;
  review?: React.ReactNode;
  footer?: React.ReactNode;
  mobileSheetTitle?: string;
  mobileSheetDescription?: string;
  /**
   * `top` matches the current app wizard shell: centered horizontal progress,
   * focused setup card, and a separated action row.
   * `side` keeps the docs/prototype side rail for dense component examples.
   */
  progressPlacement?: WizardLayoutProgressPlacement;
  /** Comfortable content width for the centered app-like wizard card. */
  contentWidth?: number | string;
  children?: React.ReactNode;
}

function toCssLength(value: number | string | undefined, fallback: string) {
  if (value === undefined) return fallback;
  return typeof value === "number" ? `${value}px` : value;
}

function stepTone(status: WizardLayoutStepStatus) {
  if (status === "done") {
    return {
      color: "var(--m-bg-0)",
      background: "var(--m-cyan-500)",
      border: "var(--m-cyan-500)",
      line: "var(--m-cyan-500)",
    };
  }

  if (status === "current") {
    return {
      color: "var(--m-cyan-500)",
      background: "color-mix(in oklab, var(--m-cyan-500) 14%, var(--m-bg-1))",
      border: "var(--m-cyan-500)",
      line: "var(--m-line)",
    };
  }

  if (status === "warning") {
    return {
      color: "var(--m-warn)",
      background: "var(--m-warn-bg)",
      border: "var(--m-warn)",
      line: "var(--m-warn)",
    };
  }

  return {
    color: "var(--m-fg-3)",
    background: "var(--m-bg-1)",
    border: "var(--m-line)",
    line: "var(--m-line)",
  };
}

function statusLabel(status: WizardLayoutStepStatus) {
  if (status === "done") return "completed";
  if (status === "current") return "in progress";
  if (status === "warning") return "needs review";
  return "pending";
}

function WizardStepGlyph({ step, index }: { step: WizardLayoutStep; index: number }) {
  const tone = stepTone(step.status);
  const isDone = step.status === "done";

  return (
    <span
      className="metraly-wizard-step-glyph"
      style={{
        borderColor: tone.border,
        background: tone.background,
        color: tone.color,
      }}
      data-step-status={step.status}
      aria-hidden="true"
    >
      {isDone ? <MetralyIcon name="check" size="xs" /> : <span>{index + 1}</span>}
    </span>
  );
}

function WizardProgressStepper({ steps }: { steps: WizardLayoutStep[] }) {
  return (
    <nav className="metraly-wizard-stepper" aria-label="Wizard progress">
      <ol
        className="metraly-wizard-stepper-list"
        style={{ ["--m-wizard-step-count" as const]: String(steps.length) } as React.CSSProperties}
      >
        {steps.map((step, index) => {
          const tone = stepTone(step.status);
          const nextStep = steps[index + 1];
          const afterLine = step.status === "done" && nextStep?.status !== "next"
            ? "var(--m-cyan-500)"
            : "var(--m-line)";

          return (
            <li
              key={step.id}
              className="metraly-wizard-stepper-item"
              data-step-status={step.status}
              aria-current={step.status === "current" ? "step" : undefined}
            >
              {index > 0 ? (
                <span
                  className="metraly-wizard-stepper-line metraly-wizard-stepper-line--before"
                  style={{ background: tone.line }}
                  aria-hidden="true"
                />
              ) : null}
              <div className="metraly-wizard-stepper-node">
                <WizardStepGlyph step={step} index={index} />
                <span className="metraly-wizard-stepper-label">{step.label}</span>
              </div>
              {index < steps.length - 1 ? (
                <span
                  className="metraly-wizard-stepper-line metraly-wizard-stepper-line--after"
                  style={{ background: afterLine }}
                  aria-hidden="true"
                />
              ) : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

function WizardProgressRail({ steps }: { steps: WizardLayoutStep[] }) {
  return (
    <div className="metraly-wizard-progress" aria-label="Wizard steps">
      <div className="metraly-wizard-progress-copy">
        <div className="metraly-wizard-progress-title">Wizard progress</div>
        <div className="metraly-wizard-progress-description">
          The layout owns navigation structure and mobile fallback. Product flows keep step content and validation.
        </div>
      </div>

      <div className="metraly-wizard-progress-list">
        {steps.map((step, index) => (
          <div className="metraly-wizard-progress-item" key={step.id} data-step-status={step.status}>
            <div className="metraly-wizard-progress-row">
              <WizardStepGlyph step={step} index={index} />
              <div className="metraly-wizard-progress-text">
                <span className="metraly-wizard-progress-label">{step.label}</span>
                {step.detail ? (
                  <span className="metraly-wizard-progress-detail">
                    {statusLabel(step.status)} · {step.detail}
                  </span>
                ) : (
                  <span className="metraly-wizard-progress-detail">{statusLabel(step.status)}</span>
                )}
              </div>
            </div>
            {index < steps.length - 1 ? <div className="metraly-wizard-progress-line" aria-hidden="true" /> : null}
          </div>
        ))}
      </div>

      <div className="metraly-wizard-progress-footnote">
        <MetralyBadge variant="primary">layout primitive</MetralyBadge>
      </div>
    </div>
  );
}

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
      {progressPlacement === "top" ? <WizardProgressStepper steps={steps} /> : null}

      <div className="metraly-wizard-layout-inner">
        {progressPlacement === "side" ? (
          <aside className="metraly-wizard-layout-aside">
            <MetralyPanel padding="md">
              <WizardProgressRail steps={steps} />
            </MetralyPanel>
          </aside>
        ) : null}

        <div className="metraly-wizard-layout-main">
          <div className="metraly-wizard-layout-mobile-summary">
            <MetralyPanel padding="sm" style={{ position: "sticky", top: 0, zIndex: 12 }}>
              <div className="metraly-wizard-mobile-summary-row">
                <div className="metraly-wizard-mobile-summary-copy">
                  <MetralyBadge variant="primary">{currentIndex + 1}/{steps.length}</MetralyBadge>
                  <div className="metraly-wizard-mobile-summary-text">
                    <div className="metraly-wizard-mobile-summary-eyebrow">{eyebrow}</div>
                    <div className="metraly-wizard-mobile-summary-title">{currentStep?.label}</div>
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
                {description ? <div className="metraly-wizard-layout-description">{description}</div> : null}
              </div>
              <div className="metraly-wizard-layout-head-actions">
                {currentStepBadge}
                {headerActions}
              </div>
            </div>

            {hasBody ? (
              <div className="metraly-wizard-layout-body">
                {children}
                {review ? <div className="metraly-wizard-layout-review">{review}</div> : null}
              </div>
            ) : null}
          </MetralyPanel>

          {footer ? <div className="metraly-wizard-layout-footer">{footer}</div> : null}
        </div>
      </div>

      <MetralyBottomSheet
        open={stepsOpen}
        onOpenChange={setStepsOpen}
        title={mobileSheetTitle}
        description={mobileSheetDescription}
      >
        <div className="metraly-wizard-layout-sheet">
          <WizardProgressRail steps={steps} />
        </div>
      </MetralyBottomSheet>
    </div>
  );
}

export default WizardLayout;
