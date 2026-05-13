import { render, screen, within } from '@testing-library/react';
import '@testing-library/jest-dom';
import { WidgetPickerCard } from '@metraly/ui';

describe('Phase 2 dashboard primitive conformance', () => {
  it('renders WidgetPickerCard kind metadata and new state', () => {
    render(
      <WidgetPickerCard
        title="DORA overview"
        description="All four DORA metrics on one card."
        iconLabel="dora"
        kind="dora/overview"
        visualState="new"
        tags={['dora', 'exec']}
      />,
    );

    const card = screen.getByRole('option', { name: /DORA overview/i });

    expect(card).toHaveAttribute('data-state', 'new');
    expect(card).toHaveAttribute('data-kind', 'dora/overview');
    expect(screen.getByText('dora/overview')).toBeInTheDocument();
    expect(screen.getByRole('status', { name: 'New' })).toHaveAttribute('data-state', 'new');
    expect(screen.getByRole('status', { name: 'New' })).toHaveAttribute('data-pulse', 'on');
    expect(screen.getByText('dora')).toHaveAttribute('data-variant', 'primary');
    expect(screen.getByText('exec')).toHaveAttribute('data-variant', 'success');
  });

  it('renders WidgetPickerCard selected, loading, dragging and disabled states', () => {
    const { rerender } = render(
      <WidgetPickerCard title="Deploy frequency" kind="dora/deploy-freq" selected onSelect={() => undefined} />,
    );

    let card = screen.getByRole('option', { name: /Deploy frequency/i });
    expect(card).toHaveAttribute('data-state', 'selected');
    expect(card).toHaveAttribute('aria-selected', 'true');

    rerender(<WidgetPickerCard title="CI failure rate" kind="ci/fail" loading onSelect={() => undefined} />);
    card = screen.getByRole('option', { name: /CI failure rate/i });
    expect(card).toBeDisabled();
    expect(card).toHaveAttribute('data-state', 'loading');
    expect(within(card).getByText('…')).toBeInTheDocument();

    rerender(<WidgetPickerCard title="Blocked work" kind="flow/blocked" dragging />);
    card = screen.getByRole('option', { name: /Blocked work/i });
    expect(card).toHaveAttribute('data-state', 'dragging');
    expect(card).toHaveClass('is-dragging');

    rerender(<WidgetPickerCard title="WIP per engineer" kind="flow/wip" disabled />);
    card = screen.getByRole('option', { name: /WIP per engineer/i });
    expect(card).toHaveAttribute('data-state', 'disabled');
    expect(card).toHaveAttribute('aria-disabled', 'true');
    expect(screen.getByRole('status', { name: /disabled/i })).toHaveAttribute('data-state', 'disabled');
  });
});
