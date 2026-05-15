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

const connectionSteps: StoryStep[] = [
  { id: "sources", label: "Select Sources", status: "current", detail: "Choose mock providers" },
  { id: "preview", label: "Preview Connection", status: "next", detail: "Synthetic auth check" },
  { id: "configure", label: "Configure", status: "next", detail: "Demo settings" },
  { id: "review", label: "Review", status: "next", detail: "Confirm setup" },
];

const sideRailSteps: StoryStep[] = [
  { id: "sources", label: "Choose sources", status: "done", detail: "GitHub selected" },
  { id: "auth", label: "Connect auth", status: "current", detail: "Waiting for provider token" },
  { id: "review", label: "Review setup", status: "next", detail: "Confirm workspace mapping" },
];

const sources = [
  { id: "github", label: "GitHub", icon: "github" as const, note: "Synthetic repo, PR, and CI preview" },
  { id: "jira", label: "Jira", icon: "jira" as const, note: "Synthetic issues, sprints, and backlog preview" },
  { id: "gitlab", label: "GitLab", icon: "gitlab" as const, note: "Synthetic merge request and pipeline preview" },
  { id: "linear", label: "Linear", icon: "arrowRight" as const, note: "Synthetic projects, cycles, and issue preview" },
  { id: "slack", label: "Slack", icon: "sparkles" as const, note: "Synthetic team communication preview" },
  { id: "pagerduty", label: "PagerDuty", icon: "alertTri" as const, note: "Synthetic incident and on-call preview" },
];

type WizardStoryMode = "desktop" | "tablet" | "mobile";

function SourceTile({
  source,
  selected,
  onSelect,
}: {
  source: (typeof sources)[number];
  selected: boolean;
  onSelect: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className="metraly-focus-ring"
      style={{
        minHeight: 116,
        border: selected ? "1px solid var(--m-cyan-500)" : "1px solid var(--m-line-faint)",
        borderRadius: "var(--m-radius-md)",
        display: "grid",
        gridTemplateColumns: "minmax(0, 1fr) auto",
        alignItems: "start",
        gap: 10,
        padding: 14,
        color: "var(--m-fg-2)",
        background: selected
          ? "color-mix(in oklab, var(--m-cyan-500) 10%, var(--m-bg-2))"
          : "color-mix(in oklab, var(--m-bg-2) 70%, var(--m-bg-1))",
        boxShadow: selected ? "inset 0 0 0 1px color-mix(in oklab, var(--m-cyan-500) 35%, transparent)" : undefined,
        textAlign: "left",
      }}
      aria-pressed={selected}
    >
      <span style={{ display: "grid", gap: 8, minWidth: 0 }}>
        <span
          style={{
            width: 32,
            height: 32,
            borderRadius: "var(--m-radius-sm)",
            display: "inline-grid",
            placeItems: "center",
            color: selected ? "var(--m-cyan-500)" : "var(--m-fg-3)",
            background: selected
              ? "color-mix(in oklab, var(--m-cyan-500) 12%, var(--m-bg-2))"
              : "var(--m-bg-2)",
          }}
          aria-hidden="true"
        >
          <MetralyIcon name={source.icon} size="sm" />
        </span>
        <span style={{ display: "grid", gap: 3, minWidth: 0 }}>
          <strong style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)" }}>{source.label}</strong>
          <span style={{ color: "var(--m-fg-3)", fontSize: "var(--m-fs-10)", lineHeight: 1.35 }}>{source.note}</span>
        </span>
      </span>
      {selected ? (
        <span
          style={{
            width: 20,
            height: 20,
            borderRadius: 999,
            display: "inline-grid",
            placeItems: "center",
            color: "var(--m-bg-0)",
            background: "var(--m-cyan-500)",
          }}
          aria-hidden="true"
        >
          <MetralyIcon name="check" size="xs" />
        </span>
      ) : null}
    </button>
  );
}

function WizardLayoutStory({ mode = "desktop" }: { mode?: WizardStoryMode }) {
  const [selectedSources, setSelectedSources] = React.useState(["github"]);
  const selectedSourceLabel = sources.find((source) => source.id === selectedSources[0])?.label ?? "GitHub";
  const sourceColumns = mode === "mobile" ? "1fr" : "repeat(3, minmax(0, 1fr))";

  return (
    <WizardLayout
      steps={connectionSteps}
      eyebrow="Connector setup preview"
      title="Choose synthetic demo sources"
      description="Select mock sources for this synthetic preview. No real data source is contacted."
      contentWidth={760}
      currentStepBadge={<MetralyBadge variant="info">public demo</MetralyBadge>}
      footer={(
        <div style={{ display: "flex", justifyContent: "space-between", gap: 12, alignItems: "center" }}>
          <MetralyButton variant="ghost">Back</MetralyButton>
          <MetralyButton variant="primary">Continue →</MetralyButton>
        </div>
      )}
    >
      <div style={{ display: "grid", gap: 14 }}>
        <div
          style={{
            border: "1px solid color-mix(in oklab, var(--m-cyan-500) 40%, var(--m-line))",
            borderRadius: "var(--m-radius-md)",
            padding: 14,
            color: "var(--m-fg-2)",
            background: "color-mix(in oklab, var(--m-cyan-500) 10%, var(--m-bg-1))",
            fontSize: "var(--m-fs-10)",
            lineHeight: 1.45,
          }}
        >
          <strong style={{ color: "var(--m-cyan-500)" }}>Connector setup preview.</strong>{" "}
          This public demo does not connect to real services. Do not enter real credentials, secrets, repository names,
          customer data, or personal information.
        </div>

        <div style={{ display: "grid", gap: 10, gridTemplateColumns: sourceColumns }}>
          {sources.map((source) => {
            const selected = selectedSources.includes(source.id);
            return (
              <SourceTile
                key={source.id}
                source={source}
                selected={selected}
                onSelect={() => {
                  setSelectedSources((current) =>
                    current.includes(source.id)
                      ? current.filter((id) => id !== source.id)
                      : [...current, source.id],
                  );
                }}
              />
            );
          })}
        </div>

        <MetralyPanel padding="md">
          <div style={{ display: "grid", gap: 10, minWidth: 0 }}>
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
              <div style={{ color: "var(--m-fg-0)", fontSize: "var(--m-fs-12)", fontWeight: 700 }}>Preview command</div>
              <MetralyBadge variant="success">synthetic</MetralyBadge>
            </div>
            <MetralyCodeBlock accent="primary">
              {`metraly demo source ${selectedSourceLabel.toLowerCase()} --synthetic\n✓ Simulated connector preview. No external authorization request is sent.`}
            </MetralyCodeBlock>
          </div>
        </MetralyPanel>
      </div>
    </WizardLayout>
  );
}

function SideRailReferenceStory() {
  const [selectedSource, setSelectedSource] = React.useState("github");
  const selectedSourceLabel = sources.find((source) => source.id === selectedSource)?.label ?? "GitHub";

  return (
    <WizardLayout
      steps={sideRailSteps}
      eyebrow="Onboarding"
      title="Connect your delivery sources"
      description="Source selection and auth instructions assembled from current seams."
      progressPlacement="side"
      contentWidth={960}
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
        <div style={{ display: "flex", justifyContent: "space-between", gap: 10, flexWrap: "wrap" }}>
          <MetralyButton variant="ghost">Back</MetralyButton>
          <MetralyButton variant="primary">Continue</MetralyButton>
        </div>
      )}
    >
      <div style={{ display: "grid", gap: 10, gridTemplateColumns: "repeat(3, minmax(0, 1fr))", alignItems: "start" }}>
        {sources.slice(0, 3).map((source) => (
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

export const SideRailReference: Story = {
  render: () => <SideRailReferenceStory />,
};
