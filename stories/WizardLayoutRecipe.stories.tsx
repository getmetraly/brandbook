import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyBottomSheet,
  MetralyButton,
  MetralyCard,
  MetralyCodeBlock,
  MetralyIcon,
  MetralyPanel,
  ThemeProvider,
} from "@metraly/ui";

type StepStatus = "done" | "current" | "next" | "warning";

type WizardStep = {
  id: string;
  label: string;
  status: StepStatus;
  detail: string;
};

const steps: WizardStep[] = [
  { id: "sources", label: "Choose sources", status: "done", detail: "GitHub selected" },
  { id: "auth", label: "Connect auth", status: "current", detail: "Waiting for provider token" },
  { id: "review", label: "Review setup", status: "next", detail: "Confirm workspace mapping" },
];

const sources = [
  { id: "github", label: "GitHub", icon: "github" as const, note: "PRs, merges, deploy hooks" },
  { id: "gitlab", label: "GitLab", icon: "gitlab" as const, note: "MRs, pipelines, environments" },
  { id: "jira", label: "Jira", icon: "jira" as const, note: "Issue flow, cycle stages" },
];

type WizardMode = "desktop" | "tablet" | "mobile";

function stepTone(status: StepStatus) {
  if (status === "done") return { color: "var(--m-ok)", background: "var(--m-ok-bg)", border: "var(--m-ok)" };
  if (status === "current") return { color: "var(--m-cyan-500)", background: "color-mix(in oklab, var(--m-cyan-500) 14%, var(--m-bg-2))", border: "var(--m-cyan-500)" };
  if (status === "warning") return { color: "var(--m-warn)", background: "var(--m-warn-bg)", border: "var(--m-warn)" };
  return { color: "var(--m-fg-3)", background: "var(--m-bg-1)", border: "var(--m-line)" };
}

function statusLabel(status: StepStatus) {
  if (status === "done") return "completed";
  if (status === "current") return "in progress";
  if (status === "warning") return "needs review";
  return "pending";
}

function WizardProgressBlock() {
  return (
    <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
      <div style={{ display: "grid", gap: 4 }}>
        <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-13)", fontWeight: 600 }}>Onboarding wizard</div>
        <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
          Step indicator remains recipe-only until repeated product pressure proves a public API.
        </div>
      </div>

      <div style={{ display: "grid", gap: 9 }}>
        {steps.map((step, index) => {
          const tone = stepTone(step.status);
          const isDone = step.status === "done";

          return (
            <div key={step.id} style={{ display: "grid", gap: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10, minWidth: 0 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    border: `1px solid ${tone.border}`,
                    background: tone.background,
                    color: tone.color,
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {isDone ? <MetralyIcon name="check" size="xs" /> : <span style={{ fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>{index + 1}</span>}
                </div>
                <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
                  <span style={{ color: step.status === "current" ? "var(--m-fg-0)" : "var(--m-fg-2)", fontSize: "var(--m-fs-11)", fontWeight: 500, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {step.label}
                  </span>
                  <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                    {statusLabel(step.status)} · {step.detail}
                  </span>
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div style={{ marginLeft: 10, width: 1, height: 14, background: "var(--m-line-faint)" }} />
              ) : null}
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gap: 6, paddingTop: 2 }}>
        <MetralyBadge variant="primary">recipe only</MetralyBadge>
        <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
          The wizard owns flow logic product-side; the brandbook provides layout composition only.
        </div>
      </div>
    </div>
  );
}

function WizardLayoutRecipe({ mode = "desktop" }: { mode?: WizardMode }) {
  const [selectedSource, setSelectedSource] = React.useState("github");
  const [stepsOpen, setStepsOpen] = React.useState(false);
  const layoutColumns = mode === "desktop" ? "300px minmax(0, 1fr)" : "1fr";
  const sourceColumns = mode === "mobile" ? "1fr" : "repeat(3, minmax(0, 1fr))";
  const currentStep = steps.find((step) => step.status === "current") ?? steps[0];
  const selectedSourceLabel = sources.find((source) => source.id === selectedSource)?.label ?? "GitHub";

  return (
    <ThemeProvider>
      <div style={{ minHeight: "100dvh", background: "var(--m-bg-0)", padding: "clamp(12px, 3vw, 24px)", overflowX: "hidden" }}>
        <div style={{ maxWidth: 1120, margin: "0 auto", display: "grid", gap: 14, gridTemplateColumns: layoutColumns, minWidth: 0 }}>
          {mode === "mobile" ? null : (
            <MetralyPanel padding="md">
              <WizardProgressBlock />
            </MetralyPanel>
          )}

          <div style={{ display: "grid", gap: 12, minWidth: 0 }}>
            {mode === "mobile" ? (
              <MetralyPanel padding="sm" style={{ position: "sticky", top: 0, zIndex: 12 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, minWidth: 0 }}>
                  <div style={{ minWidth: 0, display: "flex", alignItems: "center", gap: 8 }}>
                    <MetralyBadge variant="primary">2/{steps.length}</MetralyBadge>
                    <div style={{ minWidth: 0, display: "grid", gap: 1 }}>
                      <div style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)", letterSpacing: "0.04em", textTransform: "uppercase" }}>
                        Onboarding
                      </div>
                      <div style={{ minWidth: 0, color: "var(--m-fg-0)", fontSize: "var(--m-fs-11)", fontWeight: 500, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        {currentStep.label}
                      </div>
                    </div>
                  </div>
                  <MetralyButton variant="ghost" size="sm" iconLeft={<MetralyIcon name="menu" size="sm" />} onClick={() => setStepsOpen(true)}>
                    Steps
                  </MetralyButton>
                </div>
              </MetralyPanel>
            ) : null}

            <MetralyPanel padding="md">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap", minWidth: 0 }}>
                <div style={{ display: "grid", gap: 4, minWidth: 0 }}>
                  <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-13)", fontWeight: 600 }}>Connect your delivery sources</div>
                  <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                    Source selection and auth instructions assembled from current seams.
                  </div>
                </div>
                <MetralyButton variant="secondary" size="sm" iconLeft={<MetralyIcon name="refresh" size="sm" />}>
                  Test connection
                </MetralyButton>
              </div>
            </MetralyPanel>

            <div style={{ display: "grid", gap: 10, gridTemplateColumns: sourceColumns, alignItems: "start" }}>
              {sources.map((source) => (
                <MetralyCard
                  key={source.id}
                  density="compact"
                  title={source.label}
                  subtitle={source.note}
                  icon={<MetralyIcon name={source.icon} size="md" />}
                  state={selectedSource === source.id ? "selected" : "default"}
                  footer={(
                    <MetralyButton
                      variant={selectedSource === source.id ? "primary" : "ghost"}
                      size="sm"
                      onClick={() => setSelectedSource(source.id)}
                    >
                      {selectedSource === source.id ? "Selected" : "Choose"}
                    </MetralyButton>
                  )}
                >
                  <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                    Choice-card recipe without promoting an onboarding-specific primitive.
                  </div>
                </MetralyCard>
              ))}
            </div>

            <MetralyPanel padding="md">
              <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>CLI authentication</div>
                  <MetralyBadge variant="success">current step</MetralyBadge>
                </div>
                <MetralyCodeBlock accent="primary">
                  {`metraly auth connect \
  --provider ${selectedSource} \
  --workspace acme-core`}
                </MetralyCodeBlock>
                <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <MetralyButton variant="ghost">Back</MetralyButton>
                  <MetralyButton variant="primary">Continue</MetralyButton>
                </div>
              </div>
            </MetralyPanel>

            <MetralyPanel padding="md">
              <div style={{ display: "grid", gap: 8, minWidth: 0 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
                  <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>Review snapshot</div>
                  <MetralyBadge variant="info">next step</MetralyBadge>
                </div>
                <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.45 }}>
                  {selectedSourceLabel} will stream delivery telemetry into `acme-core` after the auth command completes.
                </div>
              </div>
            </MetralyPanel>
          </div>
        </div>

        <MetralyBottomSheet
          open={mode === "mobile" && stepsOpen}
          onOpenChange={setStepsOpen}
          title="Onboarding progress"
          description="Current step, completed steps, and onboarding context."
        >
          <div style={{ padding: 12 }}>
            <WizardProgressBlock />
          </div>
        </MetralyBottomSheet>
      </div>
    </ThemeProvider>
  );
}

const meta: Meta<typeof WizardLayoutRecipe> = {
  title: "Patterns/Wizard Layout Recipe",
  component: WizardLayoutRecipe,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof WizardLayoutRecipe>;

export const Default: Story = {
  render: () => <WizardLayoutRecipe />,
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => <WizardLayoutRecipe mode="tablet" />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <WizardLayoutRecipe mode="mobile" />,
};
