import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

function GripDotsPreview() {
  return (
    <span aria-hidden="true" style={gripStyle}>
      {Array.from({ length: 6 }, (_, index) => (
        <span key={index} style={gripDotStyle} />
      ))}
    </span>
  );
}

function OverlayPrimitivesShowcase() {
  return (
    <div style={stageStyle}>
      <section aria-label="Command palette" style={panelStyle}>
        <strong>Command palette</strong>
        <input aria-label="Search commands" placeholder="Search commands, widgets or boards" style={inputStyle} />
        <div style={stackStyle}>
          <button type="button" style={buttonStyle}>Create widget</button>
          <button type="button" style={buttonStyle}>Open incident board</button>
          <button type="button" style={buttonStyle}>Toggle live sync</button>
        </div>
      </section>

      <section aria-label="Drawer" style={panelStyle} role="dialog">
        <strong>Telemetry drawer</strong>
        <p style={copyStyle}>Drawer shell for board and widget configuration.</p>
        <div style={stackStyle}>
          <label style={labelStyle}>
            Metric source
            <select defaultValue="github" style={inputStyle}>
              <option value="github">GitHub</option>
              <option value="ci">CI/CD</option>
              <option value="incidents">Incidents</option>
            </select>
          </label>
          <label style={labelStyle}>
            <span>Live sync</span>
            <button type="button" role="switch" aria-checked="true" aria-label="Live sync" style={switchStyle}>
              <span aria-hidden="true" style={switchTrackStyle} />
            </button>
          </label>
        </div>
      </section>

      <section aria-label="Modal" style={panelStyle} role="dialog">
        <strong>Telemetry modal</strong>
        <p style={copyStyle}>Destructive actions should remain calm, explicit and reversible in copy.</p>
        <div style={stackStyle}>
          <button type="button" style={buttonStyle}>Cancel</button>
          <button type="button" style={buttonStyle}>Review impact</button>
        </div>
      </section>

      <section aria-label="Popover" style={panelStyle} role="dialog">
        <strong>Telemetry popover</strong>
        <p style={copyStyle}>Compact contextual summary for telemetry actions.</p>
      </section>

      <div aria-label="Telemetry tooltip" role="tooltip" style={tooltipStyle}>
        Live sync is enabled
      </div>

      <div aria-label="Drag overlay" style={dragOverlayStyle}>
        <GripDotsPreview />
        <strong>Review latency</strong>
      </div>
    </div>
  );
}

const meta: Meta<typeof OverlayPrimitivesShowcase> = {
  title: 'Metraly/Overlay Primitives',
  component: OverlayPrimitivesShowcase,
};

export default meta;
type Story = StoryObj<typeof OverlayPrimitivesShowcase>;

export const Default: Story = {};

const stageStyle: CSSProperties = {
  display: 'grid',
  gap: 20,
  width: '100%',
  padding: 24,
  background: '#0b0f14',
  color: '#f0f4f8',
};

const panelStyle: CSSProperties = {
  display: 'grid',
  gap: 12,
  padding: 16,
  borderRadius: 16,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(17,23,34,0.96)',
  boxShadow: '0 18px 60px rgba(0,0,0,0.28)',
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: 'rgba(240,244,248,0.72)',
  lineHeight: 1.5,
  fontSize: 14,
};

const stackStyle: CSSProperties = {
  display: 'grid',
  gap: 10,
};

const inputStyle: CSSProperties = {
  width: '100%',
  minHeight: 44,
  borderRadius: 12,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(8,12,18,0.82)',
  color: '#f0f4f8',
  padding: '0 14px',
  font: 'inherit',
  outline: 'none',
};

const labelStyle: CSSProperties = {
  display: 'grid',
  gap: 8,
  color: 'rgba(240,244,248,0.8)',
  fontSize: 13,
};

const buttonStyle: CSSProperties = {
  width: '100%',
  minHeight: 40,
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.12)',
  background: 'rgba(255,255,255,0.04)',
  color: '#f0f4f8',
  padding: '0 14px',
  textAlign: 'left',
  cursor: 'pointer',
  font: 'inherit',
};

const switchStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  minHeight: 40,
  minWidth: 72,
  padding: 4,
  borderRadius: 999,
  border: '1px solid rgba(0,229,204,0.36)',
  background: 'rgba(0,229,204,0.12)',
  color: '#f0f4f8',
  cursor: 'pointer',
};

const switchTrackStyle: CSSProperties = {
  display: 'block',
  width: 24,
  height: 24,
  borderRadius: 999,
  background: '#00e5cc',
  marginLeft: 'auto',
  boxShadow: '0 0 18px rgba(0,229,204,0.28)',
};

const tooltipStyle: CSSProperties = {
  width: 'fit-content',
  display: 'inline-flex',
  alignItems: 'center',
  gap: 8,
  padding: '10px 12px',
  borderRadius: 999,
  border: '1px solid rgba(0,229,204,0.28)',
  background: 'rgba(0,229,204,0.08)',
  color: '#f0f4f8',
  fontSize: 13,
};

const dragOverlayStyle: CSSProperties = {
  display: 'inline-flex',
  alignItems: 'center',
  gap: 10,
  padding: '12px 16px',
  borderRadius: 16,
  border: '1px solid rgba(168,85,247,0.3)',
  background: 'rgba(168,85,247,0.08)',
  color: '#f0f4f8',
  width: 'fit-content',
  boxShadow: '0 16px 32px rgba(0,0,0,0.24)',
};

const gripStyle: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: 'repeat(2, 4px)',
  gap: '2px 3px',
  width: 14,
  color: 'rgba(240,244,248,0.72)',
};

const gripDotStyle: CSSProperties = {
  width: 4,
  height: 4,
  borderRadius: 999,
  background: 'currentColor',
};
