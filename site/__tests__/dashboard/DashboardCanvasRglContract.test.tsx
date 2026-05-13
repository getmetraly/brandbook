import { render } from '@testing-library/react';
import '@testing-library/jest-dom';
import type { DashboardLayoutItem, DashboardWidgetInstance } from '@metraly/ui';

const mockResponsive = jest.fn(({ children }: { children?: React.ReactNode }) => <div data-testid='mock-responsive'>{children}</div>);

jest.mock('react-grid-layout', () => ({
  Responsive: (props: { children?: React.ReactNode }) => mockResponsive(props),
}));

import DashboardCanvas from '../../app/components/dashboard/DashboardCanvas';

describe('DashboardCanvas react-grid-layout contract (4.8)', () => {
  beforeEach(() => {
    mockResponsive.mockClear();
  });

  const widget: DashboardWidgetInstance = {
    id: 'flow',
    type: 'stat-card',
    title: 'Flow efficiency',
    description: 'Current sprint',
    state: 'live',
    position: { x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 },
  };

  it('passes the expected adapter props and layout snapshot into react-grid-layout', () => {
    const onLayoutChange = jest.fn();

    const { container } = render(
      <DashboardCanvas
        widgets={[widget]}
        selectedWidgetId='flow'
        onSelectWidget={() => undefined}
        onRemoveWidget={() => undefined}
        onLayoutChange={onLayoutChange}
      />,
    );

    expect(container.querySelector('.metraly-widget-shell-title')).toHaveTextContent('Flow efficiency');
    expect(mockResponsive).toHaveBeenCalled();

    const props = mockResponsive.mock.calls.at(-1)?.[0] as {
      className?: string;
      layouts: Record<string, DashboardLayoutItem[]>;
      breakpoints: Record<string, number>;
      cols: Record<string, number>;
      rowHeight: number;
      margin?: [number, number];
      containerPadding?: [number, number];
      draggableHandle?: string;
      resizeHandles?: string[];
      compactType?: string | null;
      preventCollision?: boolean;
      onLayoutChange?: (currentLayout: readonly DashboardLayoutItem[]) => void;
    };

    expect(props.className).toContain('dashboard-grid');
    expect(props.className).toContain('dashboard-grid-rgl');
    expect(props.layouts.lg).toMatchObject([{ i: 'flow', x: 0, y: 0, w: 4, h: 2, minW: 3, minH: 2 }]);
    expect(props.breakpoints).toEqual({ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 });
    expect(props.cols).toEqual({ lg: 12, md: 10, sm: 6, xs: 4, xxs: 2 });
    expect(props.rowHeight).toBe(112);
    expect(props.margin).toEqual([16, 16]);
    expect(props.containerPadding).toEqual([0, 0]);
    expect(props.draggableHandle).toBe('.metraly-widget-shell-drag-handle');
    expect(props.resizeHandles).toEqual(['se']);
    expect(props.compactType).toBe('vertical');
    expect(props.preventCollision).toBe(false);

    props.onLayoutChange?.([
      { i: 'flow', x: 1, y: 2, w: 5, h: 3, minW: 3, minH: 2, maxW: 6, maxH: 7, static: true },
    ]);

    expect(onLayoutChange).toHaveBeenCalledWith([
      { i: 'flow', x: 1, y: 2, w: 5, h: 3, minW: 3, minH: 2, maxW: 6, maxH: 7, static: true },
    ]);
  });
});
