import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  MetralyBadge,
  MetralyButton,
  MetralyCard,
  MetralyCodeBlock,
  MetralyIcon,
  MetralyPanel,
  WizardLayout,
} from "@metraly/ui";

type StoryStep = {
  id: string;
  label: string;
  status: "done" | "current" | "next" | "warning";
  detail: string;
};

const steps: StoryStep[] = [
  { id: "sources", label: "Choose sources", status: "done", detail: "GitHub selected" },
  { id: "auth", label: "Connect auth", status: "current", detail: "Waiting for provider token" },
  { id: "review", label: "Review setup", status: "next", detail: "Confirm workspace mapping" },
];

const sources = [
  { id: "github", label: "GitHub", icon: "github" as const, note: "PRs, merges, deploy hooks" },
  { id: "gitlab", label: "GitLab", icon: "gitlab" as const, note: "MRs, pipelines, environments" },
  { id: "jira", label: "Jira", icon: "jira" as const, note: "Issue flow, cycle stages" },
];

type WizardStoryMode = "desktop" | "tablet" | "mobile";

function WizardLayoutStory({ mode = "desktop" }: { mode?: WizardStoryMode }) {
  const [selectedSource, setSelectedSource] = React.useState("github");
  const selectedSourceLabel = sources.find((source) => source.id === selectedSource)?.label ?? "GitHub";
  const sourceColumns = mode === "mobile" ? "1fr" : "repeat(3, minmax(0, 1fr))";

  return (
    <WizardLayout
      steps={steps}
      eyebrow="Onboarding"
      title="Connect your delivery sources"
      description="Source selection and auth instructions assembled from current seams."
      headerActions={(
        <MetralyButton variant="secondary" size="sm" iconLeft={<MetralyIcon name="refresh" size="sm" />}>
          Test connection
        </MetralyButton>
      )}
      currentStepBadge={<MetralyBadge variant="success">current step</MetralyBadge>}
      review={(
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
      )}
      footer={(
        <MetralyPanel padding="sm">
          <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
            <MetralyButton variant="ghost">Back</MetralyButton>
            <MetralyButton variant="primary">Continue</MetralyButton>
          </div>
        </MetralyPanel>
      )}
    >
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
            {`metraly auth connect \\
  --provider ${selectedSource} \\
  --workspace acme-core`}
          </MetralyCodeBlock>
        </div>
      </MetralyPanel>
    </WizardLayout>
  );
}

const meta: Meta<typeof WizardLayout> = {
  title: "Components/WizardLayout",
  component: WizardLayout,
  parameters: {
    layout: "fullscreen",
  },
};

export default meta;

type Story = StoryObj<typeof WizardLayout>;

export const Default: Story = {
  render: () => <WizardLayoutStory />,
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  render: () => <WizardLayoutStory mode="tablet" />,
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  render: () => <WizardLayoutStory mode="mobile" />,
};
