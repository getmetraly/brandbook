import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MetralyCard from '../implementation-pack/react/MetralyCard';

describe('MetralyCard', () => {
  it('renders title and children', () => {
    render(<MetralyCard title="Test Title">Hello world</MetralyCard>);
    expect(screen.getByText('Test Title')).toBeInTheDocument();
    expect(screen.getByText('Hello world')).toBeInTheDocument();
  });

  it('renders skeleton in loading state', () => {
    render(<MetralyCard title="Loading" state="loading" />);
    const skeletonBars = screen.getAllByRole('status');
    expect(skeletonBars.length).toBeGreaterThan(0);
  });
});