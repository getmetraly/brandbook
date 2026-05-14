import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import {
  DashboardGrid,
  DashboardWidget,
  DashboardDropZone,
  defaultDashboardWidgetRegistry,
  findDashboardWidgetDefinition,
} from '@metraly/ui';
import type { DashboardWidgetInstance } from '@metraly/ui';
import { isDashboardWidgetFullWidth } from '../../app/components/dashboard/DashboardCanvas';

const makeWidget = (overrides: Partial<DashboardWidgetInstance> = {}): DashboardWidgetInstance => ({
  id: 'w1',
  type: 'stat-card',
  title: 'Stat Card',
  state: 'live',
  position: { x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
  ...overrides,
});

describe('DashboardGrid (4.3)', () => {
  it('renders each widget via renderWidget callback', () => {
    const widgets = [makeWidget({ id: 'a', title: 'Alpha' }), makeWidget({ id: 'b', title: 'Beta' })];
    render(
      <DashboardGrid
        widgets={widgets}
        renderWidget={(w) => <div key={w.id}>{w.title}</div>}
      />,
    );
    expect(screen.getByText('Alpha')).toBeInTheDocument();
    expect(screen.getByText('Beta')).toBeInTheDocument();
  });

  it('passes the matching layout item to renderWidget', () => {
    const widget = makeWidget({ id: 'w1' });
    const layout = [{ i: 'w1', x: 2, y: 3, w: 6, h: 4 }];
    const received: unknown[] = [];
    render(
      <DashboardGrid
        widgets={[widget]}
        layout={layout}
        renderWidget={(_, layoutItem) => {
          received.push(layoutItem);
          return null;
        }}
      />,
    );
    expect(received[0]).toMatchObject({ i: 'w1', x: 2, y: 3, w: 6, h: 4 });
  });

  it('sets data-widget-count attribute on the grid container', () => {
    const widgets = [makeWidget({ id: 'a' }), makeWidget({ id: 'b' })];
    const { container } = render(
      <DashboardGrid widgets={widgets} renderWidget={() => null} />,
    );
    expect(container.querySelector('[data-widget-count="2"]')).toBeInTheDocument();
  });

  it('renders emptyState when widgets array is empty', () => {
    render(
      <DashboardGrid
        widgets={[]}
        renderWidget={() => null}
        emptyState={<p>No widgets</p>}
      />,
    );
    expect(screen.getByText('No widgets')).toBeInTheDocument();
  });
});

describe('DashboardWidget states (4.7)', () => {
  it('applies is-selected class when selected=true', () => {
    const { container } = render(
      <DashboardWidget id="w1" title="Widget" selected>Body</DashboardWidget>,
    );
    expect(container.querySelector('.metraly-dashboard-widget.is-selected')).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell.is-selected')).toBeInTheDocument();
  });

  it('does not apply is-selected when selected=false', () => {
    const { container } = render(
      <DashboardWidget id="w1" title="Widget" selected={false}>Body</DashboardWidget>,
    );
    expect(container.querySelector('.is-selected')).not.toBeInTheDocument();
  });

  it('applies is-dragging class when dragging=true', () => {
    const { container } = render(
      <DashboardWidget id="w1" title="Widget" dragging>Body</DashboardWidget>,
    );
    expect(container.querySelector('.metraly-widget-shell.is-dragging')).toBeInTheDocument();
  });

  it('applies is-fullwidth class when fullWidth=true', () => {
    const { container } = render(
      <DashboardWidget id="w1" title="Widget" fullWidth>Body</DashboardWidget>,
    );
    expect(container.querySelector('.metraly-widget-shell.is-fullwidth')).toBeInTheDocument();
  });

  it('applies is-resizable class when resizable=true', () => {
    const { container } = render(
      <DashboardWidget id="w1" title="Widget" resizable>Body</DashboardWidget>,
    );
    expect(container.querySelector('.metraly-widget-shell.is-resizable')).toBeInTheDocument();
  });
});

describe('widget registry body renders (4.5)', () => {
  it('stat-card body renders flow efficiency value and state badge', () => {
    const def = findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'stat-card');
    expect(def?.render).toBeDefined();
    render(<>{def!.render!()}</>);
    expect(screen.getByText('81%')).toBeInTheDocument();
    expect(screen.getByText('Flow efficiency')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('metric-chart body renders accessible placeholder', () => {
    const def = findDashboardWidgetDefinition(defaultDashboardWidgetRegistry, 'metric-chart');
    expect(def?.render).toBeDefined();
    const { container } = render(<>{def!.render!()}</>);
    const chart = container.querySelector('[aria-label="Metric trend placeholder"]');
    expect(chart).toBeInTheDocument();
  });

  it('all registry entries have type, title, description, tags and render', () => {
    for (const def of defaultDashboardWidgetRegistry) {
      expect(def.type).toBeTruthy();
      expect(def.title).toBeTruthy();
      expect(def.description).toBeTruthy();
      expect(Array.isArray(def.tags)).toBe(true);
      expect(def.render).toBeInstanceOf(Function);
    }
  });

  it('registry covers stat-card, metric-chart and data-table types', () => {
    const types = defaultDashboardWidgetRegistry.map((d) => d.type);
    expect(types).toContain('stat-card');
    expect(types).toContain('metric-chart');
    expect(types).toContain('data-table');
  });
});

describe('DashboardDropZone all states (4.3)', () => {
  it.each([
    ['idle', 'Drop widget here'],
    ['hover', 'Widget can land here'],
    ['active', 'Release to add widget'],
    ['rejected', 'Cannot drop here'],
    ['empty', 'Add the first widget'],
  ] as const)('renders state %s with label "%s"', (state, label) => {
    const { unmount } = render(<DashboardDropZone state={state} />);
    expect(screen.getByRole('status')).toHaveTextContent(label);
    unmount();
  });

  it('rejected state shows ! icon', () => {
    const { container } = render(<DashboardDropZone state="rejected" />);
    expect(container.querySelector('.metraly-dashboard-drop-zone-icon')).toHaveTextContent('×');
  });

  it('non-rejected states show + icon', () => {
    const { container } = render(<DashboardDropZone state="idle" />);
    expect(container.querySelector('.metraly-dashboard-drop-zone-icon')).toHaveTextContent('+');
  });

  it('custom label overrides default', () => {
    render(<DashboardDropZone state="idle" label="Custom label" />);
    expect(screen.getByRole('status')).toHaveTextContent('Custom label');
  });
});

describe('DashboardCanvas full-width adapter', () => {
  it('treats only widgets that span the full desktop grid as full width', () => {
    expect(isDashboardWidgetFullWidth(makeWidget({ position: { x: 0, y: 0, w: 12, h: 2 } }))).toBe(true);
    expect(isDashboardWidgetFullWidth(makeWidget({ position: { x: 1, y: 0, w: 12, h: 2 } }))).toBe(false);
    expect(isDashboardWidgetFullWidth(makeWidget({ position: { x: 0, y: 0, w: 11, h: 2 } }))).toBe(false);
  });
});
