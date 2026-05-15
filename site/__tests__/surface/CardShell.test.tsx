import { readFileSync } from 'node:fs';
import { join } from 'node:path';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { CardShell, DashboardWidget, MetralyCard, MetralyMetricCard } from '@metraly/ui';

describe('CardShell foundation', () => {
  it('renders shared slots and state metadata', () => {
    const { container } = render(
      <CardShell
        state="selected"
        density="compact"
        tone="cyan"
        title="Foundation"
        subtitle="Shared layout"
        trailing={<span>Live</span>}
        footer={<span>Footer</span>}
      >
        Body
      </CardShell>,
    );

    const shell = container.querySelector('.metraly-card-shell');
    expect(shell).toBeInTheDocument();
    expect(shell).toHaveAttribute('data-card-shell', 'true');
    expect(shell).toHaveAttribute('data-state', 'selected');
    expect(shell).toHaveAttribute('data-density', 'compact');
    expect(shell).toHaveAttribute('data-tone', 'cyan');
    expect(screen.getByText('Foundation')).toBeInTheDocument();
    expect(screen.getByText('Shared layout')).toBeInTheDocument();
    expect(screen.getByText('Live')).toBeInTheDocument();
    expect(screen.getByText('Body')).toBeInTheDocument();
    expect(screen.getByText('Footer')).toBeInTheDocument();
  });

  it('keeps semantic card components on the shared foundation', () => {
    const { container } = render(
      <div>
        <MetralyCard title="Generic card">Generic body</MetralyCard>
        <MetralyMetricCard title="Deploys" value="24/day" />
        <DashboardWidget title="Widget shell">Widget body</DashboardWidget>
      </div>,
    );

    expect(container.querySelector('.metraly-card.metraly-card-shell')).toBeInTheDocument();
    expect(container.querySelector('.metraly-metric-card.metraly-card-shell')).toBeInTheDocument();
    expect(container.querySelector('.metraly-widget-shell.metraly-card-shell')).toBeInTheDocument();
  });

  it('defines the shared equal-height and footer-pinning contract in CSS', () => {
    const css = readFileSync(
      join(__dirname, '../../../packages/ui/src/styles/metraly-card.css'),
      'utf8',
    );

    expect(css).toMatch(/\.metraly-card-shell\s*\{[^}]*display:\s*flex/s);
    expect(css).toMatch(/\.metraly-card-shell\s*\{[^}]*flex-direction:\s*column/s);
    expect(css).toMatch(/\.metraly-card-shell\s*\{[^}]*height:\s*100%/s);
    expect(css).toMatch(/\.metraly-card-shell__body\s*\{[^}]*flex:\s*1 1 auto/s);
    expect(css).toMatch(/\.metraly-card-shell__footer\s*\{[^}]*margin-top:\s*auto/s);
  });
});
