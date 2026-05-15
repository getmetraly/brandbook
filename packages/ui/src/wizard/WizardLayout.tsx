import * as React from "react";
import { MetralyBadge } from "../components/MetralyBadge";
import { MetralyBottomSheet } from "../shell/MetralyBottomSheet";
import { MetralyButton } from "../components/MetralyButton";
import { MetralyIcon } from "../components/MetralyIcon";
import { MetralyPanel } from "../components/MetralyPanel";

export type WizardLayoutStepStatus = "done" | "current" | "next" | "warning";

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
  children?: React.ReactNode;
}

function stepTone(status: WizardLayoutStepStatus) {
  if (status === "done") {
    return {
      color: "var(--m-ok)",
      background: "var(--m-ok-bg)",
      border: "var(--m-ok)",
    };
  }

  if (status === "current") {
    return {
      color: "var(--m-cyan-500)",
      background: "color-mix(in oklab, var(--m-cyan-500) 14%, var(--m-bg-2))",
      border: "var(--m-cyan-500)",
    };
  }

  if (status === "warning") {
    return {
      color: "var(--m-warn)",
      background: "var(--m-warn-bg)",
      border: "var(--m-warn)",
    };
  }

  return {
    color: "var(--m-fg-3)",
    background: "var(--m-bg-1)",
    border: "var(--m-line)",
  };
}

function statusLabel(status: WizardLayoutStepStatus) {
  if (status === "done") return "completed";
  if (status === "current") return "in progress";
  if (status === "warning") return "needs review";
  return "pending";
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
        {steps.map((step, index) => {
          const tone = stepTone(step.status);
          const isDone = step.status === "done";

          return (
            <div className="metraly-wizard-progress-item" key={step.id}>
              <div className="metraly-wizard-progress-row">
                <div
                  className="metraly-wizard-progress-bullet"
                  style={{
                    borderColor: tone.border,
                    background: tone.background,
                    color: tone.color,
                  }}
                  aria-hidden="true"
                >
                  {isDone ? (
                    <MetralyIcon name="check" size="xs" />
                  ) : (
                    <span className="metraly-wizard-progress-index">{index + 1}</span>
                  )}
                </div>
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
          );
        })}
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
  children,
  className,
  ...rest
}: WizardLayoutProps) {
  const [stepsOpen, setStepsOpen] = React.useState(false);
  const currentStep = steps.find((step) => step.status === "current") ?? steps[0];
  const currentIndex = Math.max(
    0,
    steps.findIndex((step) => step.id === currentStep?.id),
  );
  const classes = ["metraly-wizard-layout", className].filter(Boolean).join(" ");

  return (
    <div className={classes} {...rest}>
      <div className="metraly-wizard-layout-inner">
        <aside className="metraly-wizard-layout-aside">
          <MetralyPanel padding="md">
            <WizardProgressRail steps={steps} />
          </MetralyPanel>
        </aside>

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

          <MetralyPanel padding="md">
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
          </MetralyPanel>

          <div className="metraly-wizard-layout-body">{children}</div>
          {review ? <div className="metraly-wizard-layout-review">{review}</div> : null}
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
