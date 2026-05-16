import React, { useState } from "react";
import "../styles/metraly-app-kit.css";
import { AppSidebar } from "./AppSidebar";
import { AppTopbar } from "./AppTopbar";
import { MetralyButton } from "../components/MetralyButton";
import { MetralyIcon } from "../components/MetralyIcon";
import { StatusBadge } from "../components/StatusBadge";

export interface AppConnectorWizardScreenProps {
  /** Current step (1-based). Default 2. */
  step?: number;
  brandName?: string;
  className?: string;
}

const STEPS = ["Choose source", "Authorize", "Review scope", "Sync & verify"] as const;

interface ReviewRow {
  icon: "database" | "gitPR" | "users" | "alertTri";
  label: string;
  value: string;
  gated?: boolean;
}

const REVIEW_ROWS: ReviewRow[] = [
  { icon: "database",  label: "Repository metadata",   value: "Names, topics, visibility, default branch", gated: false },
  { icon: "gitPR",     label: "Pull request history",  value: "Titles, authors, open/merge dates, labels",  gated: false },
  { icon: "users",     label: "Review activity",        value: "Reviewer assignments, approvals, comments", gated: false },
  { icon: "alertTri",  label: "Webhook events",         value: "Push, PR, and review events (read-only)",   gated: true  },
];

export function AppConnectorWizardScreen({
  step: initialStep = 2,
  brandName,
  className,
}: AppConnectorWizardScreenProps): React.ReactElement {
  const [step, setStep] = useState(initialStep);

  return (
    <div className={["metraly-app-shell", className].filter(Boolean).join(" ")}>
      <div className="metraly-app-shell__sidebar">
        <AppSidebar activeId="connectors" brandName={brandName} />
      </div>
      <div className="metraly-app-shell__topbar">
        <AppTopbar title="Connect GitHub" />
      </div>
      <main className="metraly-app-shell__main">
        <div className="metraly-app-wizard">
          <ol className="metraly-app-wizard__rail" role="list">
            {STEPS.map((s, i) => (
              <li
                key={s}
                className="metraly-app-wizard__step"
                aria-current={i + 1 === step ? "step" : undefined}
              >
                <span className="metraly-app-wizard__step-num">
                  Step {String(i + 1).padStart(2, "0")}
                </span>
                <span className="metraly-app-wizard__step-label">{s}</span>
              </li>
            ))}
          </ol>

          <section className="metraly-app-wizard__card" aria-labelledby="wiz-heading">
            <header style={{ display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12 }}>
              <div>
                <h2 id="wiz-heading" className="metraly-app-wizard__card-title">
                  Review GitHub scope
                </h2>
                <p className="metraly-app-wizard__card-desc">
                  Metraly will read repository metadata, pull request history, and review activity.
                  No write access is requested.
                </p>
              </div>
              <StatusBadge status="Live" label="Read-only" />
            </header>

            <div className="metraly-app-wizard__review-panel" role="list">
              {REVIEW_ROWS.map((row) => (
                <div key={row.label} className="metraly-app-wizard__review-row" role="listitem">
                  <span className="metraly-app-wizard__review-ic" aria-hidden="true">
                    <MetralyIcon name={row.icon} size="sm" />
                  </span>
                  <span className="metraly-app-wizard__review-row-label">{row.label}</span>
                  <span className="metraly-app-wizard__review-row-value">{row.value}</span>
                  <StatusBadge status={row.gated ? "Gated" : "Live"} />
                </div>
              ))}
            </div>

            <p style={{ font: "500 11px/1.5 var(--m-font-ui)", color: "var(--m-fg-3)", margin: 0 }}>
              Sync cadence will be set in the next step…
            </p>
          </section>

          <footer className="metraly-app-wizard__footer">
            <MetralyButton variant="ghost" onClick={() => setStep(Math.max(1, step - 1))}>
              Back
            </MetralyButton>
            <span className="metraly-app-wizard__footer-status">Last validated 2 minutes ago</span>
            <MetralyButton variant="primary" onClick={() => setStep(Math.min(4, step + 1))}>
              Continue
            </MetralyButton>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default AppConnectorWizardScreen;
