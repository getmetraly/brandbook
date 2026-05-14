import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCard,
  MetralyCodeBlock,
  MetralyDrawer,
  MetralyIcon,
  MetralyPanel,
  ThemeProvider,
} from "@metraly/ui";

const steps = [
  { id: "sources", label: "Choose sources", status: "done" },
  { id: "auth", label: "Connect auth", status: "current" },
  { id: "review", label: "Review setup", status: "next" },
] as const;

type WizardMode = "desktop" | "tablet" | "mobile";

function WizardProgressBlock() {
  return (
    <div style={{ display: "grid", gap: 14 }}>
      <div style={{ display: "grid", gap: 4 }}>
        <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-13)", fontWeight: 600 }}>Onboarding wizard</div>
        <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)" }}>
          Step-indicator recipe kept out of public API until there is broader pressure.
        </div>
      </div>

      <div style={{ display: "grid", gap: 10 }}>
        {steps.map((step, index) => {
          const isCurrent = step.status === "current";
          const isDone = step.status === "done";

          return (
            <div key={step.id} style={{ display: "grid", gap: 10 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                <div
                  style={{
                    width: 22,
                    height: 22,
                    borderRadius: 999,
                    border: `1px solid ${isCurrent ? "var(--m-cyan-500)" : "var(--m-line)"}`,
                    background: isDone ? "var(--m-ok-bg)" : isCurrent ? "color-mix(in oklab, var(--m-cyan-500) 14%, var(--m-bg-2))" : "var(--m-bg-1)",
                    color: isDone ? "var(--m-ok)" : isCurrent ? "var(--m-cyan-500)" : "var(--m-fg-3)",
                    display: "grid",
                    placeItems: "center",
                    flexShrink: 0,
                  }}
                >
                  {isDone ? <MetralyIcon name="check" size="xs" /> : <span style={{ fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>{index + 1}</span>}
                </div>
                <div style={{ minWidth: 0, display: "grid", gap: 2 }}>
                  <span style={{ color: isCurrent ? "var(--m-fg-0)" : "var(--m-fg-2)", fontSize: "var(--m-fs-11)", fontWeight: 500 }}>
                    {step.label}
                  </span>
                  <span style={{ color: "var(--m-fg-3)", fontFamily: "var(--m-font-mono)", fontSize: "var(--m-fs-9)" }}>
                    {isDone ? "completed" : isCurrent ? "in progress" : "pending"}
                  </span>
                </div>
              </div>
              {index < steps.length - 1 ? (
                <div style={{ marginLeft: 10, width: 1, height: 18, background: "var(--m-line-faint)" }} />
              ) : null}
            </div>
          );
        })}
      </div>

      <div style={{ display: "grid", gap: 8, paddingTop: 4 }}>
        <MetralyBadge variant="cyan">recipe only</MetralyBadge>
        <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)" }}>
          The structure remains compositional until a third product wizard needs the same abstraction.
        </div>
      </div>
    </div>
  );
}

function WizardLayoutRecipe({ mode = "desktop" }: { mode?: WizardMode }) {
  const [selectedSource, setSelectedSource] = React.useState("github");
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const layoutColumns = mode === "desktop" ? "320px minmax(0, 1fr)" : "1fr";
  const sourceColumns = mode === "mobile" ? "1fr" : "repeat(3, minmax(0, 1fr))";
  const currentStep = steps.find((step) => step.status === "current") ?? steps[0];

  return (
    <ThemeProvider>
      <div style={{ minHeight: 820, background: "var(--m-bg-0)", padding: 24 }}>
        <div style={{ maxWidth: 1180, margin: "0 auto", display: "grid", gap: 16, gridTemplateColumns: layoutColumns }}>
          {mode === "mobile" ? null : (
            <MetralyPanel padding="md">
              <WizardProgressBlock />
            </MetralyPanel>
          )}

          <div style={{ display: "grid", gap: 12 }}>
            {mode === "mobile" ? (
              <div
                style={{
                  position: "sticky",
                  top: 0,
                  zIndex: 12,
                  marginBottom: -2,
                  marginLeft: -24,
                  marginRight: -24,
                  padding: "10px 12px",
                  border: "1px solid var(--m-line)",
                  borderRadius: 0,
                  borderLeft: 0,
                  borderRight: 0,
                  background: "var(--m-bg-1)",
                  boxShadow: "0 1px 0 color-mix(in oklab, var(--m-line) 72%, transparent)",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    gap: 10,
                  }}
                >
                  <div style={{ minWidth: 0, display: "flex", alignItems: "center", gap: 8 }}>
                    <MetralyBadge variant="cyan">2/{steps.length}</MetralyBadge>
                    <div style={{ minWidth: 0, display: "grid", gap: 1 }}>
                      <div
                        style={{
                          color: "var(--m-fg-3)",
                          fontFamily: "var(--m-font-mono)",
                          fontSize: "var(--m-fs-9)",
                          letterSpacing: "0.04em",
                          textTransform: "uppercase",
                        }}
                      >
                        Onboarding
                      </div>
                      <div
                        style={{
                          minWidth: 0,
                          color: "var(--m-fg-0)",
                          fontSize: "var(--m-fs-11)",
                          fontWeight: 500,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {currentStep.label}
                      </div>
                    </div>
                  </div>
                  <MetralyButton
                    variant="ghost"
                    size="sm"
                    iconLeft={<MetralyIcon name="menu" size="sm" />}
                    onClick={() => setDrawerOpen(true)}
                  >
                    Steps
                  </MetralyButton>
                </div>
              </div>
            ) : null}

            <MetralyPanel padding="md">
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, flexWrap: "wrap" }}>
                <div style={{ display: "grid", gap: 4 }}>
                  <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-13)", fontWeight: 600 }}>Connect your delivery sources</div>
                  <div style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)" }}>
                    Source selection and auth instructions assembled from current seams.
                  </div>
                </div>
                <MetralyButton variant="secondary" iconLeft={<MetralyIcon name="refresh" size="sm" />}>
                  Test connection
                </MetralyButton>
              </div>
            </MetralyPanel>

            <div style={{ display: "grid", gap: 12, gridTemplateColumns: sourceColumns }}>
              {[
                { id: "github", label: "GitHub", icon: "github" as const, note: "PRs, merges, deploy hooks" },
                { id: "gitlab", label: "GitLab", icon: "gitlab" as const, note: "MRs, pipelines, environments" },
                { id: "jira", label: "Jira", icon: "jira" as const, note: "Issue flow, cycle stages" },
              ].map((source) => (
                <MetralyCard
                  key={source.id}
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
                  <div style={{ color: "var(--m-fg-2)", fontSize: "var(--m-fs-10)" }}>
                    Choice-card recipe without promoting a new onboarding-specific primitive.
                  </div>
                </MetralyCard>
              ))}
            </div>

            <MetralyPanel padding="md">
              <div style={{ display: "grid", gap: 10 }}>
                <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
                  <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 600 }}>CLI authentication</div>
                  <MetralyBadge variant="ok">current step</MetralyBadge>
                </div>
                <MetralyCodeBlock accent="cyan">
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
          </div>
        </div>

        <MetralyDrawer
          open={mode === "mobile" && drawerOpen}
          onOpenChange={setDrawerOpen}
          title="Onboarding progress"
          description="Current step, completed steps, and onboarding context."
        >
          <div style={{ padding: 16 }}>
            <WizardProgressBlock />
          </div>
        </MetralyDrawer>
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
