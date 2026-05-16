/**
 * DashboardWizardSplitBuilder — dashboard creation wizard layout
 * ------------------------------------------------------------------
 * Distinct from the generic WizardLayout. This is a split-builder:
 * - left rail: goal → role → template → widget bundle → filters → review
 * - right canvas: live dashboard preview built from chosen choices
 *
 * Mobile: rail collapses to a sheet header; canvas takes full width.
 *
 * The layout is presentational. Caller decides which step is active
 * and which preview to render.
 */
import * as React from "react";
import { CardShell } from "../components/CardShell";
import { StatusBadge } from "../components/StatusBadge";
import { StateBlock } from "../components/StateBlock";
import "../styles/metraly-dashboard-wizard.css";

export type DashboardWizardStepId =
  | "goal"
  | "role"
  | "template"
  | "widgets"
  | "filters"
  | "review";

export interface DashboardWizardStep {
  id: DashboardWizardStepId;
  label: string;
  helper?: string;
  /** Has the user completed this step? */
  complete?: boolean;
  /** Is this step locked behind earlier steps? */
  locked?: boolean;
  /** Optional error message for this step. */
  errorText?: string;
}

export interface DashboardWizardSplitBuilderProps {
  steps: DashboardWizardStep[];
  activeStepId: DashboardWizardStepId;
  onSelectStep: (id: DashboardWizardStepId) => void;

  /** Title displayed above the rail (mobile + desktop). */
  title?: string;
  description?: string;

  /** Slot rendered as the active step body in the rail. */
  stepBody: React.ReactNode;

  /** Slot rendered as the right preview canvas. */
  preview: React.ReactNode;

  /** Preview state — drives empty/template-placeholder rendering. */
  previewState?: "preview" | "empty" | "loading" | "error";

  /** Empty/template helper line, when previewState === "empty". */
  emptyLabel?: string;

  /** Footer slot — typically Back / Next / Save. */
  footer?: React.ReactNode;

  className?: string;
  id?: string;
}

export const DashboardWizardSplitBuilder: React.FC<DashboardWizardSplitBuilderProps> = ({
  steps,
  activeStepId,
  onSelectStep,
  title = "Build a dashboard",
  description = "Pick a goal, a role, a starting template, then refine widgets and filters. The preview on the right reflects each choice immediately.",
  stepBody,
  preview,
  previewState = "preview",
  emptyLabel = "Pick a template to see the preview",
  footer,
  className,
  id,
}) => {
  const reactId = React.useId();
  const rootId = id ?? reactId;
  const activeIdx = steps.findIndex((s) => s.id === activeStepId);

  return (
    <div
      id={rootId}
      className={["m-dwiz", className ?? ""].filter(Boolean).join(" ")}
      role="region"
      aria-label={title}
    >
      <aside className="m-dwiz__rail" aria-label="Builder rail">
        <header className="m-dwiz__rail-head">
          <h2 className="m-dwiz__title">{title}</h2>
          {description ? <p className="m-dwiz__desc">{description}</p> : null}
        </header>

        <ol className="m-dwiz__steps" aria-label="Builder steps">
          {steps.map((s, i) => {
            const isActive = s.id === activeStepId;
            const isPast = i < activeIdx;
            return (
              <li
                key={s.id}
                className={[
                  "m-dwiz__step",
                  isActive ? "m-dwiz__step--active" : "",
                  s.complete ? "m-dwiz__step--complete" : "",
                  s.locked ? "m-dwiz__step--locked" : "",
                  s.errorText ? "m-dwiz__step--error" : "",
                ]
                  .filter(Boolean)
                  .join(" ")}
              >
                <button
                  type="button"
                  className="m-dwiz__step-btn"
                  onClick={() => !s.locked && onSelectStep(s.id)}
                  disabled={!!s.locked}
                  aria-current={isActive ? "step" : undefined}
                >
                  <span
                    className={[
                      "m-dwiz__step-marker",
                      s.complete ? "m-dwiz__step-marker--complete" : "",
                      isPast ? "m-dwiz__step-marker--past" : "",
                      s.errorText ? "m-dwiz__step-marker--error" : "",
                    ]
                      .filter(Boolean)
                      .join(" ")}
                    aria-hidden="true"
                  >
                    {s.complete ? "✓" : isActive ? "●" : i + 1}
                  </span>
                  <span className="m-dwiz__step-text">
                    <span className="m-dwiz__step-label">{s.label}</span>
                    {s.errorText ? (
                      <span className="m-dwiz__step-error">{s.errorText}</span>
                    ) : s.helper ? (
                      <span className="m-dwiz__step-helper">{s.helper}</span>
                    ) : null}
                  </span>
                  {s.locked ? (
                    <StatusBadge status="Preview" label="Locked" />
                  ) : null}
                </button>
              </li>
            );
          })}
        </ol>

        <CardShell>
          <div className="m-dwiz__body">{stepBody}</div>
        </CardShell>

        {footer ? <footer className="m-dwiz__rail-foot">{footer}</footer> : null}
      </aside>

      <section className="m-dwiz__canvas" aria-label="Dashboard preview">
        <header className="m-dwiz__canvas-head">
          <span className="m-dwiz__canvas-label">Preview</span>
          <StatusBadge status={previewState === "empty" ? "No data" : previewState === "error" ? "Error" : previewState === "loading" ? "Preview" : "Live"} label={previewState === "empty" ? "Pick a template" :
              previewState === "error" ? "Could not render" :
              previewState === "loading" ? "Loading" : "Live"} />
        </header>
        <div className="m-dwiz__canvas-frame">
          {previewState === "empty" ? (
            <StateBlock variant="empty" title={emptyLabel} description="Once a template is selected, the preview will render here." />
          ) : previewState === "error" ? (
            <StateBlock variant="error" title="Could not render preview" />
          ) : previewState === "loading" ? (
            <StateBlock variant="loading" title="Rendering preview" />
          ) : (
            preview
          )}
        </div>
      </section>
    </div>
  );
};

DashboardWizardSplitBuilder.displayName = "DashboardWizardSplitBuilder";

export default DashboardWizardSplitBuilder;
