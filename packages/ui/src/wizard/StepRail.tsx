import * as React from "react";
import { MetralyIcon } from "../components/MetralyIcon";

// ─── Types ────────────────────────────────────────────────────────────────────

export type StepRailStepStatus = "done" | "current" | "next" | "warning";
export type StepRailOrientation = "horizontal" | "vertical";

export interface StepRailStep {
  id: string;
  label: string;
  status: StepRailStepStatus;
  /** Detail line shown in vertical orientation only. */
  detail?: string;
}

export interface StepRailProps {
  steps: StepRailStep[];
  /**
   * `horizontal` renders a top-aligned progress stepper (default).
   * `vertical`   renders a side progress rail for documentation layouts.
   */
  orientation?: StepRailOrientation;
  /** Accessible label for the `<nav>` / landmark. */
  ariaLabel?: string;
  /**
   * Optional footnote node rendered below the step list in vertical orientation.
   * Useful for adding a "layout primitive" badge in documentation scenarios.
   */
  footnote?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function stepTone(status: StepRailStepStatus) {
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

function statusLabel(status: StepRailStepStatus) {
  if (status === "done") return "completed";
  if (status === "current") return "in progress";
  if (status === "warning") return "needs review";
  return "pending";
}

// ─── Internal glyph ───────────────────────────────────────────────────────────

function StepGlyph({ step, index }: { step: StepRailStep; index: number }) {
  const tone = stepTone(step.status);
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
      {step.status === "done" ? (
        <MetralyIcon name="check" size="xs" />
      ) : (
        <span>{index + 1}</span>
      )}
    </span>
  );
}

// ─── Horizontal stepper ───────────────────────────────────────────────────────

function HorizontalStepper({
  steps,
  ariaLabel,
}: {
  steps: StepRailStep[];
  ariaLabel: string;
}) {
  return (
    <nav className="metraly-wizard-stepper" aria-label={ariaLabel}>
      <ol
        className="metraly-wizard-stepper-list"
        style={
          { ["--m-wizard-step-count"]: String(steps.length) } as React.CSSProperties
        }
      >
        {steps.map((step, index) => {
          const tone = stepTone(step.status);
          const nextStep = steps[index + 1];
          const afterLine =
            step.status === "done" && nextStep?.status !== "next"
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
                <StepGlyph step={step} index={index} />
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

// ─── Vertical rail ────────────────────────────────────────────────────────────

function VerticalRail({
  steps,
  ariaLabel,
  footnote,
}: {
  steps: StepRailStep[];
  ariaLabel: string;
  footnote?: React.ReactNode;
}) {
  return (
    <div
      className="metraly-wizard-progress metraly-step-rail--vertical"
      aria-label={ariaLabel}
      role="navigation"
    >
      <div className="metraly-wizard-progress-list">
        {steps.map((step, index) => (
          <div
            className="metraly-wizard-progress-item"
            key={step.id}
            data-step-status={step.status}
            aria-current={step.status === "current" ? "step" : undefined}
          >
            <div className="metraly-wizard-progress-row">
              <StepGlyph step={step} index={index} />
              <div className="metraly-wizard-progress-text">
                <span className="metraly-wizard-progress-label">{step.label}</span>
                {step.detail ? (
                  <span className="metraly-wizard-progress-detail">
                    {statusLabel(step.status)} · {step.detail}
                  </span>
                ) : (
                  <span className="metraly-wizard-progress-detail">
                    {statusLabel(step.status)}
                  </span>
                )}
              </div>
            </div>
            {index < steps.length - 1 ? (
              <div className="metraly-wizard-progress-line" aria-hidden="true" />
            ) : null}
          </div>
        ))}
      </div>

      {footnote ? (
        <div className="metraly-wizard-progress-footnote">{footnote}</div>
      ) : null}
    </div>
  );
}

// ─── Public component ─────────────────────────────────────────────────────────

/**
 * Renders a progress indicator for wizard/onboarding flows.
 *
 * `orientation="horizontal"` (default) renders the top stepper used by the
 * connector/setup wizard. `orientation="vertical"` renders the sidebar rail
 * used by documentation layouts and the `progressPlacement="side"` variant.
 *
 * Composes with `WizardLayout` — WizardLayout renders StepRail internally.
 * Can also be used standalone when the wizard chrome is built by the product.
 */
export function StepRail({
  steps,
  orientation = "horizontal",
  ariaLabel = "Wizard progress",
  footnote,
  className,
  style,
}: StepRailProps) {
  if (orientation === "vertical") {
    return (
      <div
        className={["metraly-step-rail", className].filter(Boolean).join(" ")}
        style={style}
      >
        <VerticalRail steps={steps} ariaLabel={ariaLabel} footnote={footnote} />
      </div>
    );
  }

  return (
    <div
      className={["metraly-step-rail", className].filter(Boolean).join(" ")}
      style={style}
    >
      <HorizontalStepper steps={steps} ariaLabel={ariaLabel} />
    </div>
  );
}

export default StepRail;
