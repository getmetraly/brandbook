import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { ThemeProvider } from '@metraly/ui';

describe('ThemeProvider', () => {
  it('applies the shared theme contract', () => {
    render(
      <ThemeProvider theme="light">
        <div>Content</div>
      </ThemeProvider>
    );

    const wrapper = screen.getByText('Content').parentElement;
    expect(wrapper).toHaveAttribute('data-theme', 'light');
    expect(wrapper).toHaveClass('metraly-theme');
  });
});
