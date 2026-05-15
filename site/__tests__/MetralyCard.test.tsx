import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyCard } from '@metraly/ui';

describe('MetralyCard', () => {
  it('renders title and children', () => {
    render(<MetralyCard title="Test Title">Hello world</MetralyCard>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders subtitle and footer', () => {
    render(<MetralyCard title="Card" subtitle="Sub" footer={<span>Footer</span>}>Body</MetralyCard>);
    expect(screen.getByText('Sub')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('renders skeleton in loading state and exposes busy metadata', () => {
    const { container } = render(<MetralyCard title="Loading" state="loading" />);
    const skeletonBars = screen.getAllByRole('status');
    const card = container.querySelector('.metraly-card');
    expect(skeletonBars.length).toBeGreaterThan(0);
    expect(card).toHaveAttribute('aria-busy', 'true');
    expect(card).toHaveAttribute('data-state', 'loading');
  });

  it('renders empty state without children', () => {
    render(<MetralyCard title="Empty card" state="empty" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.queryByText('children')).not.toBeInTheDocument();
  });

  it('supports custom empty state copy', () => {
    render(<MetralyCard title="Empty card" state="empty" emptyLabel="No incidents found" />);
    expect(screen.getByText('No incidents found')).toBeInTheDocument();
  });

  it('applies is-selected class when state is selected', () => {
    const { container } = render(<MetralyCard title="Selected" state="selected">Content</MetralyCard>);
    expect(container.querySelector('.metraly-card.is-selected')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('applies is-error class when state is error', () => {
    const { container } = render(<MetralyCard title="Error card" state="error">Content</MetralyCard>);
    expect(container.querySelector('.metraly-card.is-error')).toBeInTheDocument();
    expect(screen.getByText('Content')).toBeInTheDocument();
  });

  it('anchors the footer to the bottom for equal-height choice cards', () => {
    const css = readFileSync(
      join(__dirname, '../../packages/ui/src/styles/metraly-card.css'),
      'utf8',
    );

    expect(css).toMatch(/\.metraly-card\s*\{[^}]*height:\s*100%/s);
    expect(css).toMatch(/\.metraly-card-body\s*\{[^}]*flex:\s*1 1 auto/s);
    expect(css).toMatch(/\.metraly-card-footer\s*\{[^}]*margin-top:\s*auto/s);
  });

  it('supports compact density for dense dashboard surfaces', () => {
    const { container } = render(<MetralyCard title="Compact" density="compact">Content</MetralyCard>);
    const card = container.querySelector('.metraly-card');
    expect(card).toHaveClass('metraly-card-shell--compact');
    expect(card).toHaveAttribute('data-density', 'compact');
  });
});