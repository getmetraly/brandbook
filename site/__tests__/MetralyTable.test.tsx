import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { MetralyTable } from '@metraly/ui';

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

  it('marks the table busy and renders loading skeleton rows', () => {
    const columns = [
      { key: 'name' as const, header: 'Name' },
      { key: 'status' as const, header: 'Status' },
    ];

    render(<MetralyTable columns={columns} data={[]} loading ariaLabel="Loading table" />);

    const table = screen.getByRole('table', { name: 'Loading table' });
    expect(table).toHaveAttribute('aria-busy', 'true');
    expect(screen.getAllByRole('row')).toHaveLength(4);
    expect(document.querySelectorAll('.metraly-table-row.is-loading')).toHaveLength(3);
  });

  it('marks selected rows using stable row keys', () => {
    const columns = [
      { key: 'name' as const, header: 'Name' },
      { key: 'status' as const, header: 'Status' },
    ];
    const data = [
      { id: 'a', name: 'Alice', status: 'Live' },
      { id: 'b', name: 'Bob', status: 'Delayed' },
    ];

    render(
      <MetralyTable
        columns={columns}
        data={data}
        rowKey={(row) => row.id}
        selectedRowKeys={['b']}
      />,
    );

    expect(screen.getByText('Alice').closest('tr')).not.toHaveAttribute('aria-selected');
    expect(screen.getByText('Bob').closest('tr')).toHaveAttribute('aria-selected', 'true');
    expect(screen.getByText('Bob').closest('tr')).toHaveClass('is-selected');
  });

  it('exposes mobile cards presentation through table metadata', () => {
    const columns = [
      { key: 'name' as const, header: 'Name' },
      { key: 'status' as const, header: 'Status' },
    ];
    const data = [{ name: 'Alice', status: 'Live' }];

    const { container } = render(
      <MetralyTable
        columns={columns}
        data={data}
        mobilePresentation="cards"
        ariaLabel="Mobile cards table"
      />,
    );

    const table = screen.getByRole('table', { name: 'Mobile cards table' });
    expect(table).toHaveAttribute('data-mobile-presentation', 'cards');
    expect(table).toHaveClass('is-mobile-cards');
    expect(container.querySelector('td')).toHaveAttribute('data-column-label', 'Name');
  });

  it('uses calmer card rhythm for mobile stacked presentation', () => {
    const css = readFileSync(
      join(__dirname, '../../packages/ui/src/styles/metraly-table.css'),
      'utf8',
    );

    expect(css).toMatch(/@media \(max-width: 640px\) \{[\s\S]*\.metraly-table-frame \{[\s\S]*background:\s*transparent/s);
    expect(css).toMatch(/\.metraly-table\.is-mobile-stacked \.metraly-table-row \{[\s\S]*border-radius:\s*var\(--m-r-4\)/s);
    expect(css).toMatch(/\.metraly-table\.is-mobile-stacked td \{[\s\S]*border-bottom:\s*1px solid var\(--m-line-faint\)/s);
  });

  it('exposes mobile stacked presentation through table metadata', () => {
    const columns = [
      { key: 'name' as const, header: 'Name' },
      { key: 'status' as const, header: 'Status' },
    ];
    const data = [{ name: 'Alice', status: 'Live' }];

    render(
      <MetralyTable
        columns={columns}
        data={data}
        mobilePresentation="stacked"
        ariaLabel="Mobile stacked table"
      />,
    );

    const table = screen.getByRole('table', { name: 'Mobile stacked table' });
    expect(table).toHaveAttribute('data-mobile-presentation', 'stacked');
    expect(table).toHaveClass('is-mobile-stacked');
  });
});
