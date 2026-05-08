import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { DashboardWidget } from '@metraly/ui';

describe('DashboardWidget', () => {
  it('renders title and badge', () => {
    render(<DashboardWidget title="My Widget" state="live">Body content</DashboardWidget>);
    expect(screen.getByText('My Widget')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
  });

  it('renders custom state label', () => {
    render(
      <DashboardWidget title="Widget" state="delayed" stateLabel="Waiting">
        Content
      </DashboardWidget>
    );
    expect(screen.getByText('Waiting')).toBeInTheDocument();
  });
});
