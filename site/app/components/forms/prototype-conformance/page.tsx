import {
  MetralyCheckbox,
  MetralyRadio,
  MetralySelect,
  MetralySwitch,
  MetralyTabs,
  StateBadge,
} from "@metraly/ui";

const sourceOptions = [
  { value: "github", label: "GitHub pull requests" },
  { value: "ci", label: "CI pipelines" },
  { value: "deployments", label: "Deployments" },
  { value: "blocked", label: "Blocked work", disabled: true },
];

const tabs = [
  { value: "dora", label: "DORA", count: 4 },
  { value: "ci", label: "CI", disabled: true },
  { value: "flow", label: "Flow", count: 6 },
];

function StateGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="claude-state-group" aria-label={title}>
      <header className="claude-state-group-head">
        <strong>{title}</strong>
        <span className="claude-readiness">Phase 1</span>
      </header>
      <div className="claude-state-grid">{children}</div>
    </section>
  );
}

function StateCell({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="claude-state-cell">
      <span className="claude-state-cell-label">{label}</span>
      <div>{children}</div>
    </div>
  );
}

export default function FormsPrototypeConformancePage() {
  return (
    <main className="claude-state-board" aria-label="Phase 1 prototype conformance examples">
      <header className="claude-preview-section-head">
        <span className="draft-kicker">Prototype conformance · Phase 1</span>
        <h1>Core primitives and form controls</h1>
        <p>
          Final visual examples for the Phase 1 state vocabulary. These examples intentionally keep the
          production `@metraly/ui` implementation while aligning states with the prototype contract.
        </p>
      </header>

      <StateGroup title="StateBadge prototype aliases">
        <StateCell label="live · pulse on"><StateBadge state="live" /></StateCell>
        <StateCell label="ok · static"><StateBadge state="ok" /></StateCell>
        <StateCell label="new · pulse on"><StateBadge state="new" label="3 new" /></StateCell>
        <StateCell label="purple · static"><StateBadge state="purple" /></StateCell>
        <StateCell label="disabled · static"><StateBadge state="disabled" label="N/A" /></StateCell>
        <StateCell label="live opt-out"><StateBadge state="live" label="Static live" pulse={false} /></StateCell>
      </StateGroup>

      <StateGroup title="MetralyCheckbox">
        <StateCell label="default"><MetralyCheckbox label="Include review queue" /></StateCell>
        <StateCell label="checked"><MetralyCheckbox label="Telemetry on" checked /></StateCell>
        <StateCell label="indeterminate"><MetralyCheckbox label="Some sources" indeterminate /></StateCell>
        <StateCell label="loading"><MetralyCheckbox label="Saving policy" checked loading hint="Applying source policy" /></StateCell>
        <StateCell label="error"><MetralyCheckbox label="Token expired" error hint="Re-authenticate to continue" /></StateCell>
        <StateCell label="disabled"><MetralyCheckbox label="Locked policy" checked disabled /></StateCell>
      </StateGroup>

      <StateGroup title="MetralyRadio">
        <StateCell label="default"><MetralyRadio name="phase-radio" label="p50" /></StateCell>
        <StateCell label="selected"><MetralyRadio name="phase-radio-selected" label="p99" checked /></StateCell>
        <StateCell label="hint"><MetralyRadio name="phase-radio-hint" label="max" hint="Choose a supported quantile" /></StateCell>
        <StateCell label="error"><MetralyRadio name="phase-radio-error" label="invalid" error hint="Metric unavailable" /></StateCell>
        <StateCell label="disabled"><MetralyRadio name="phase-radio-disabled" label="locked" disabled /></StateCell>
      </StateGroup>

      <StateGroup title="MetralySwitch">
        <StateCell label="off"><MetralySwitch label="Live sync" /></StateCell>
        <StateCell label="on"><MetralySwitch label="Live sync" checked /></StateCell>
        <StateCell label="loading"><MetralySwitch label="Applying…" checked loading hint="Saving setting" /></StateCell>
        <StateCell label="purple accent"><MetralySwitch label="Beta channel" checked accent="purple" /></StateCell>
        <StateCell label="disabled off"><MetralySwitch label="Offline mode" disabled /></StateCell>
        <StateCell label="disabled on"><MetralySwitch label="Read-only board" checked disabled /></StateCell>
      </StateGroup>

      <StateGroup title="MetralySelect">
        <StateCell label="placeholder">
          <MetralySelect label="Signal source" placeholder="Select source…" options={sourceOptions} />
        </StateCell>
        <StateCell label="selected">
          <MetralySelect label="Signal source" defaultValue="github" options={sourceOptions} />
        </StateCell>
        <StateCell label="loading">
          <MetralySelect label="Signal source" defaultValue="ci" options={sourceOptions} loading hint="Refreshing sources" />
        </StateCell>
        <StateCell label="error">
          <MetralySelect label="Signal source" defaultValue="github" options={sourceOptions} error hint="Range exceeds retention" />
        </StateCell>
        <StateCell label="empty">
          <MetralySelect label="Empty source" options={[]} hint="No sources connected" />
        </StateCell>
        <StateCell label="disabled">
          <MetralySelect label="Signal source" defaultValue="deployments" options={sourceOptions} disabled />
        </StateCell>
      </StateGroup>

      <StateGroup title="MetralyTabs">
        <StateCell label="selected + counts">
          <MetralyTabs ariaLabel="Phase 1 tabs" defaultValue="dora" items={tabs} />
        </StateCell>
        <StateCell label="live pulse">
          <MetralyTabs ariaLabel="Phase 1 live tabs" defaultValue="dora" items={tabs} livePulse />
        </StateCell>
        <StateCell label="disabled tab">
          <MetralyTabs ariaLabel="Phase 1 disabled tabs" defaultValue="flow" items={tabs} />
        </StateCell>
      </StateGroup>
    </main>
  );
}
