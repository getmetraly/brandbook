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

  it('renders skeleton in loading state', () => {
    render(<MetralyCard title="Loading" state="loading" />);
    const skeletonBars = screen.getAllByRole('status');
    expect(skeletonBars.length).toBeGreaterThan(0);
  });

  it('renders empty state without children', () => {
    render(<MetralyCard title="Empty card" state="empty" />);
    expect(screen.getByText('No data')).toBeInTheDocument();
    expect(screen.queryByText('children')).not.toBeInTheDocument();
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
});