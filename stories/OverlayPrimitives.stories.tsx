import type { Meta, StoryObj } from '@storybook/react';
import type { CSSProperties } from 'react';

function OverlayPrimitivesShowcase() {
  return (
    <div style={{ display: 'grid', gap: 20, maxWidth: 720 }}>
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
        <span aria-hidden="true" style={gripStyle}>⋮⋮</span>
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

const panelStyle: CSSProperties = {
  display: 'grid',
  gap: 12,
  padding: 20,
  borderRadius: 20,
  border: '1px solid rgba(255,255,255,0.08)',
  background: 'rgba(17,23,34,0.92)',
};

const copyStyle: CSSProperties = {
  margin: 0,
  color: 'rgba(240,244,248,0.72)',
  lineHeight: 1.6,
};

const stackStyle: CSSProperties = {
  display: 'grid',
  gap: 10,
};

const inputStyle: CSSProperties = {
  minHeight: 44,
  borderRadius: 14,
  border: '1px solid rgba(255,255,255,0.13)',
  background: 'rgba(11,15,20,0.72)',
  color: '#f0f4f8',
  padding: '0 14px',
  font: 'inherit',
};

const labelStyle: CSSProperties = {
  display: 'grid',
  gap: 8,
  color: 'rgba(240,244,248,0.8)',
  fontSize: 13,
};

const buttonStyle: CSSProperties = {
  minHeight: 40,
  borderRadius: 999,
  border: '1px solid rgba(255,255,255,0.13)',
  background: 'rgba(255,255,255,0.04)',
  color: '#f0f4f8',
  padding: '0 14px',
  textAlign: 'left',
};

const switchStyle: CSSProperties = {
  minHeight: 40,
  minWidth: 72,
  borderRadius: 999,
  border: '1px solid rgba(0,229,204,0.36)',
  background: 'rgba(0,229,204,0.12)',
  color: '#f0f4f8',
  padding: 4,
};

const switchTrackStyle: CSSProperties = {
  display: 'block',
  width: 24,
  height: 24,
  borderRadius: 999,
  background: '#00e5cc',
  marginLeft: 'auto',
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
};

const gripStyle: CSSProperties = {
  letterSpacing: '-4px',
  color: 'rgba(240,244,248,0.8)',
};
