import * as React from 'react';
import { render, screen } from '@testing-library/react';
import { WidgetCatalogCard, WidgetCatalogList } from '@metraly/ui';

describe('WidgetCatalogCard — ARIA contract', () => {
  it('renders with role=option and aria-selected=false when not selected', () => {
    render(
      <WidgetCatalogList>
        <WidgetCatalogCard title="Deploy Frequency" description="Deploys per day" />
      </WidgetCatalogList>
    );
    const card = screen.getByRole('option', { name: /Deploy Frequency/i });
    expect(card).toBeInTheDocument();
    expect(card).toHaveAttribute('aria-selected', 'false');
  });

  it('renders with aria-selected=true when selected', () => {
    render(
      <WidgetCatalogList>
        <WidgetCatalogCard title="Lead Time" description="Time to prod" selected />
      </WidgetCatalogList>
    );
    const card = screen.getByRole('option', { name: /Lead Time/i });
    expect(card).toHaveAttribute('aria-selected', 'true');
  });

  it('renders with aria-disabled when disabled', () => {
    render(
      <WidgetCatalogList>
        <WidgetCatalogCard title="MTTR" description="Mean time to recover" disabled />
      </WidgetCatalogList>
    );
    const card = screen.getByRole('option', { name: /MTTR/i });
    expect(card).toHaveAttribute('aria-disabled', 'true');
  });

  it('WidgetCatalogList wraps with role=listbox', () => {
    render(
      <WidgetCatalogList ariaLabel="Widget catalog">
        <WidgetCatalogCard title="Velocity" description="Sprint velocity" />
      </WidgetCatalogList>
    );
    expect(screen.getByRole('listbox', { name: 'Widget catalog' })).toBeInTheDocument();
  });

  it('button variant with onSelect has correct role and is clickable', () => {
    const onSelect = jest.fn();
    render(
      <WidgetCatalogList>
        <WidgetCatalogCard title="CFR" description="Change failure rate" onSelect={onSelect} />
      </WidgetCatalogList>
    );
    const btn = screen.getByRole('option', { name: /CFR/i });
    expect(btn.tagName).toBe('BUTTON');
    btn.click();
    expect(onSelect).toHaveBeenCalledTimes(1);
  });
});
