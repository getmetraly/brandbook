import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import DashboardCanvas from '../../app/components/dashboard/DashboardCanvas';
import { dashboardRepository } from '../../app/lib/dashboard';

describe('DashboardCanvas widget rendering (4.5)', () => {
  it('maps registry widgets to the expected canvas bodies', async () => {
    const widgets = [
      dashboardRepository.createWidget('stat-card', { id: 'stat', title: 'Flow efficiency' }),
      dashboardRepository.createWidget('metric-chart', { id: 'chart', title: 'Deploy trend' }),
      dashboardRepository.createWidget('data-table', { id: 'table', title: 'Repository health' }),
    ];

    const { container } = render(
      <DashboardCanvas
        widgets={widgets}
        selectedWidgetId='chart'
        onSelectWidget={() => undefined}
        onRemoveWidget={() => undefined}
        onLayoutChange={() => undefined}
      />,
    );

    expect(await screen.findByText('81%')).toBeInTheDocument();
    expect(screen.getByText('Flow efficiency', { selector: '.dashboard-widget-stat-body span' })).toBeInTheDocument();
    expect(screen.getByLabelText('Metric trend placeholder')).toBeInTheDocument();
    expect(screen.getByRole('table', { name: 'Data table' })).toBeInTheDocument();
    expect(screen.getByText('metraly/app')).toBeInTheDocument();
    expect(screen.getByText('metraly/website')).toBeInTheDocument();
    expect(screen.getAllByRole('button', { name: 'Remove' })).toHaveLength(3);
    expect(screen.getByText('Deploy trend')).toBeInTheDocument();
    expect(screen.getByText('Repository health')).toBeInTheDocument();
    expect(container.querySelector('.metraly-dashboard-widget.is-selected')).toBeInTheDocument();
  });
});
