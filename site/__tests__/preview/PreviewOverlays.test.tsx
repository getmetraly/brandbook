import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import TelemetryDrawer from '../../app/components/previews/TelemetryDrawer';
import TelemetryModal from '../../app/components/previews/TelemetryModal';
import TelemetryCommandPalette from '../../app/components/previews/TelemetryCommandPalette';
import TelemetryPopover from '../../app/components/previews/TelemetryPopover';
import TelemetryTooltip from '../../app/components/previews/TelemetryTooltip';
import TelemetryToast from '../../app/components/previews/TelemetryToast';

describe('preview overlay surfaces', () => {
  it('renders the toast shell with state-specific classes and copy', () => {
    const { container } = render(
      <TelemetryToast
        title="Board refreshed"
        description="Layout saved and queued for sync."
        state="delayed"
      />
    );

    expect(container.firstChild).toHaveClass('telemetry-toast-draft', 'is-delayed');
    expect(screen.getByText('Board refreshed')).toBeInTheDocument();
    expect(screen.getByText('Layout saved and queued for sync.')).toBeInTheDocument();
  });

  it('renders the modal as a labelled dialog with actions', () => {
    render(<TelemetryModal />);

    expect(screen.getByRole('dialog', { name: 'Telemetry modal' })).toBeInTheDocument();
    expect(screen.getByText('Remove telemetry source?')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Cancel' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Review impact' })).toBeInTheDocument();
  });

  it('renders the drawer controls and drag guidance', () => {
    render(<TelemetryDrawer />);

    expect(screen.getByRole('dialog', { name: 'Telemetry drawer' })).toBeInTheDocument();
    expect(screen.getByText('Edit telemetry source')).toBeInTheDocument();
    expect(screen.getByText('Drawer shell draft for board/widget configuration.')).toBeInTheDocument();
    expect(screen.getByRole('combobox', { name: 'Metric source' })).toHaveValue('github');
    expect(screen.getByRole('switch', { name: 'Live sync' })).toHaveAttribute('aria-checked', 'true');
    expect(screen.getByText('Drag to move')).toBeInTheDocument();
  });

  it('renders the popover and tooltip shells with semantic roles', () => {
    render(
      <>
        <TelemetryPopover />
        <TelemetryTooltip />
      </>
    );

    expect(screen.getByRole('dialog', { name: 'Telemetry popover' })).toBeInTheDocument();
    expect(screen.getByRole('tooltip', { name: 'Telemetry tooltip' })).toBeInTheDocument();
    expect(screen.getByText('Telemetry details')).toBeInTheDocument();
    expect(screen.getByText('Live sync is enabled')).toBeInTheDocument();
  });

  it('renders the command palette as a labelled dialog', () => {
    render(<TelemetryCommandPalette />);

    expect(screen.getByRole('dialog', { name: 'Command palette' })).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Search commands, widgets or boards')).toBeInTheDocument();
    expect(screen.getByText('Create widget')).toBeInTheDocument();
  });
});
