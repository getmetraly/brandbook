import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardEmptyState, DashboardGrid, DashboardToolbar, DashboardWidget } from '@metraly/ui';

describe('dashboard components', () => {
  it('renders toolbar metadata and actions', () => {
    render(
      <DashboardToolbar
        title="Dashboard Editor"
        description="Arrange widgets"
        meta="Saved"
        actions={<button type="button">Save</button>}
      />
    );

    expect(screen.getByText('Dashboard Editor')).toBeInTheDocument();
    expect(screen.getByText('Saved')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Save' })).toBeInTheDocument();
  });

  it('renders empty grid state', () => {
    render(<DashboardGrid widgets={[]} renderWidget={() => null} emptyState={<DashboardEmptyState title="Nothing here" />} />);
    expect(screen.getByText('Nothing here')).toBeInTheDocument();
  });

  it('renders dashboard widget content', () => {
    render(<DashboardWidget id="w1" title="Flow efficiency">81%</DashboardWidget>);
    expect(screen.getByText('Flow efficiency')).toBeInTheDocument();
    expect(screen.getByText('81%')).toBeInTheDocument();
  });
});
