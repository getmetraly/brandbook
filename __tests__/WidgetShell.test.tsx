import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import WidgetShell from '../implementation-pack/react/WidgetShell';

describe('WidgetShell', () => {
  it('renders title and badge', () => {
    render(<WidgetShell title="My Widget" state="live">Body content</WidgetShell>);
    expect(screen.getByText('My Widget')).toBeInTheDocument();
    // The badge label defaults to capitalised state
    expect(screen.getByText('Live')).toBeInTheDocument();
  });
  it('renders custom state label', () => {
    render(
      <WidgetShell title="Widget" state="delayed" stateLabel="Waiting">
        Content
      </WidgetShell>
    );
    expect(screen.getByText('Waiting')).toBeInTheDocument();
  });
});