import { fireEvent, render, screen } from '@testing-library/react';
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

  it('drag handle is presentation-only when no onDragStart is provided', () => {
    const { container } = render(<DashboardWidget title="Widget" state="live" />);
    const handle = container.querySelector('.metraly-widget-shell-drag-handle');
    expect(handle).toBeInTheDocument();
    expect(handle).not.toHaveAttribute('role', 'button');
    expect(handle?.getAttribute('tabindex')).not.toBe('0');
  });

  it('drag handle has role=button and fires onDragStart on Space key', () => {
    const onDrag = jest.fn();
    render(<DashboardWidget title="Widget" state="live" id="w1" onDragStart={onDrag} />);
    const handle = screen.getByRole('button', { name: 'Drag to move' });
    expect(handle).toHaveAttribute('tabindex', '0');
    fireEvent.keyDown(handle, { key: ' ' });
    expect(onDrag).toHaveBeenCalledWith('w1');
  });

  it('drag handle fires onDragStart on Enter key', () => {
    const onDrag = jest.fn();
    render(<DashboardWidget title="Widget" state="live" id="w1" onDragStart={onDrag} />);
    const handle = screen.getByRole('button', { name: 'Drag to move' });
    fireEvent.keyDown(handle, { key: 'Enter' });
    expect(onDrag).toHaveBeenCalledWith('w1');
  });

  it('grip dots are present inside drag handle', () => {
    const { container } = render(<DashboardWidget title="Widget" state="live" id="w1" onDragStart={() => undefined} />);
    const handle = screen.getByRole('button', { name: 'Drag to move' });
    expect(handle.querySelector('.metraly-widget-shell-grip-dots')).toBeInTheDocument();
  });
});
