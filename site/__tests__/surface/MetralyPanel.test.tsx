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
});
