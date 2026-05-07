import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import MetralyTable from '../implementation-pack/react/MetralyTable';

describe('MetralyTable', () => {
  it('renders headers and data correctly', () => {
    const columns = [
      { key: 'name' as const, header: 'Name' },
      { key: 'age' as const, header: 'Age', align: 'right' as const },
    ];
    const data = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
    ];
    render(<MetralyTable columns={columns} data={data} />);
    // Check headers
    expect(screen.getByText('Name')).toBeInTheDocument();
    expect(screen.getByText('Age')).toBeInTheDocument();
    // Check row values
    expect(screen.getByText('Alice')).toBeInTheDocument();
    expect(screen.getByText('30')).toBeInTheDocument();
    expect(screen.getByText('Bob')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();
  });

  it('shows empty state when no data', () => {
    const columns = [ { key: 'col' as const, header: 'Column' } ];
    render(<MetralyTable columns={columns} data={[]} emptyText="No rows" />);
    expect(screen.getByText('No rows')).toBeInTheDocument();
  });
});