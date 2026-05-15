import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DashboardResizeHandle,
  FieldShell,
  MetralyBottomSheet,
  MetralyCheckbox,
  MetralyDrawer,
  MetralySegmentedControl,
  MetralyTabs,
  NavigationItemFrame,
  StateBlock,
} from '@metraly/ui';

describe('shared foundation primitives', () => {
  it('keeps form controls on FieldShell', () => {
    const { container } = render(<MetralyCheckbox checked label="Enable telemetry" />);
    expect(screen.getByRole('checkbox', { name: 'Enable telemetry' })).toBeChecked();
    expect(container.querySelector('.metraly-field-shell.metraly-checkbox')).toBeInTheDocument();
  });

  it('renders FieldShell context directly for custom control composition', () => {
    const { container } = render(
      <FieldShell label="Range" description="Last 14d">
        {({ controlId, descriptionId }) => (
          <input id={controlId} aria-describedby={descriptionId} aria-label="Range" />
        )}
      </FieldShell>,
    );

    expect(container.querySelector('.metraly-field-shell')).toHaveAttribute('data-layout', 'field');
    expect(screen.getByLabelText('Range')).toHaveAttribute('aria-describedby');
  });

  it('uses OverlayShell through drawer and bottom sheet semantics', () => {
    const { container, rerender } = render(
      <MetralyDrawer open title="Navigation" onOpenChange={() => undefined}>Menu</MetralyDrawer>,
    );
    expect(screen.getByRole('dialog', { name: 'Navigation' })).toHaveClass('metraly-overlay-shell');
    expect(container.querySelector('.metraly-drawer-root')).toBeInTheDocument();

    rerender(<MetralyBottomSheet open title="Steps" onOpenChange={() => undefined}>Step list</MetralyBottomSheet>);
    expect(screen.getByRole('dialog', { name: 'Steps' })).toHaveClass('metraly-overlay-shell--bottom');
  });

  it('centralizes empty/error content in StateBlock', () => {
    render(<StateBlock variant="error" title="Unable to load" description="Retry the source" />);
    expect(screen.getByRole('region', { name: 'Unable to load' })).toBeInTheDocument();
    expect(screen.getByText('Retry the source')).toBeInTheDocument();
  });

  it('keeps nav item frame separate from semantic nav components', () => {
    render(<NavigationItemFrame as="button" active label="Dashboard" meta="Live" />);
    expect(screen.getByRole('button', { name: /Dashboard/ })).toHaveClass('metraly-navigation-item-frame');
  });

  it('shares roving selection behavior across tabs and segmented controls', () => {
    render(
      <>
        <MetralyTabs
          ariaLabel="Sections"
          defaultValue="a"
          items={[{ value: 'a', label: 'A' }, { value: 'b', label: 'B' }]}
        />
        <MetralySegmentedControl
          ariaLabel="Mode"
          defaultValue="view"
          options={[{ value: 'view', label: 'View' }, { value: 'edit', label: 'Edit' }]}
        />
      </>,
    );

    fireEvent.keyDown(screen.getByRole('tab', { name: 'A' }), { key: 'ArrowRight' });
    expect(screen.getByRole('tab', { name: 'B' })).toHaveAttribute('aria-selected', 'true');

    fireEvent.keyDown(screen.getByRole('radio', { name: 'View' }), { key: 'ArrowRight' });
    expect(screen.getByRole('radio', { name: 'Edit' })).toHaveAttribute('aria-checked', 'true');
  });

  it('uses HandlePrimitive through dashboard handles', () => {
    const { container } = render(<DashboardResizeHandle active direction="southeast" />);
    expect(container.querySelector('.metraly-handle-primitive--resize')).toBeInTheDocument();
  });

  it('documents the foundation CSS contracts', () => {
    const formsCss = readFileSync(join(__dirname, '../../../packages/ui/src/styles/metraly-forms.css'), 'utf8');
    const shellCss = readFileSync(join(__dirname, '../../../packages/ui/src/styles/metraly-shell.css'), 'utf8');
    const stateCss = readFileSync(join(__dirname, '../../../packages/ui/src/styles/metraly-empty-state.css'), 'utf8');
    const navCss = readFileSync(join(__dirname, '../../../packages/ui/src/styles/metraly-navigation-tree.css'), 'utf8');
    const dashboardCss = readFileSync(join(__dirname, '../../../packages/ui/src/styles/metraly-dashboard.css'), 'utf8');

    expect(formsCss).toMatch(/\.metraly-field-shell--control-row/);
    expect(shellCss).toMatch(/\.metraly-overlay-shell\s*\{/);
    expect(stateCss).toMatch(/\.metraly-state-block\s*\{/);
    expect(navCss).toMatch(/\.metraly-navigation-item-frame\s*\{/);
    expect(dashboardCss).toMatch(/\.metraly-handle-primitive\s*\{/);
  });
});
