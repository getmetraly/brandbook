import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyPanel } from '@metraly/ui';

describe('MetralyPanel', () => {
  it('renders children inside a panel container', () => {
    render(<MetralyPanel>Panel content</MetralyPanel>);
    expect(screen.getByText('Panel content')).toBeInTheDocument();
  });

  it('applies metraly-panel class', () => {
    const { container } = render(<MetralyPanel>Content</MetralyPanel>);
    expect(container.querySelector('.metraly-panel')).toBeInTheDocument();
  });

  it('appends custom className', () => {
    const { container } = render(<MetralyPanel className="custom-panel">Content</MetralyPanel>);
    const panel = container.querySelector('.metraly-panel');
    expect(panel).toHaveClass('custom-panel');
  });

  it('supports padding presets with class and metadata', () => {
    const { container } = render(<MetralyPanel padding="md">Content</MetralyPanel>);
    const panel = container.querySelector('.metraly-panel');
    expect(panel).toHaveClass('metraly-panel--padding-md');
    expect(panel).toHaveAttribute('data-padding', 'md');
  });

  it('can be focusable for interactive panel compositions', () => {
    const { container } = render(<MetralyPanel focusable>Content</MetralyPanel>);
    const panel = container.querySelector('.metraly-panel');
    expect(panel).toHaveClass('metraly-focus-ring');
    expect(panel).toHaveAttribute('tabindex', '0');
    expect(panel).toHaveAttribute('data-focusable', 'true');
  });

  it('marks non-focusable panels in metadata without adding tabindex', () => {
    const { container } = render(<MetralyPanel>Content</MetralyPanel>);
    const panel = container.querySelector('.metraly-panel');
    expect(panel).toHaveAttribute('data-focusable', 'false');
    expect(panel).not.toHaveAttribute('tabindex');
  });
});
