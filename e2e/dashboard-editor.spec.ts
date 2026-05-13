import { test, expect } from '@playwright/test';

test('dashboard editor adds and removes widgets', async ({ page }) => {
  await page.goto('/editor');
  await expect(page.getByText('Dashboard Editor')).toBeVisible();

  await page.getByRole('option', { name: /Stat Card/ }).click();
  const widgetInGrid = page.locator('[data-widget-id]').filter({ hasText: 'Stat Card' });
  await expect(widgetInGrid).toBeVisible();

  await page.locator('.metraly-dashboard-widget-remove').click();
  await expect(widgetInGrid).not.toBeVisible();
});

test('dashboard editor saves and reloads the added widget', async ({ page }) => {
  await page.goto('/editor');
  await expect(page.getByText('Dashboard Editor')).toBeVisible();

  await page.getByRole('option', { name: /Stat Card/ }).click();
  const widgetInGrid = page.locator('[data-widget-id]').filter({ hasText: 'Stat Card' });
  await expect(widgetInGrid).toBeVisible();
  await expect(widgetInGrid.locator('.metraly-widget-shell-drag-handle')).toBeVisible();
  await expect(widgetInGrid.locator('.metraly-dashboard-resize-handle')).toBeVisible();

  const dashboardId = new URL(page.url()).searchParams.get('dashboard');
  await page.getByRole('button', { name: 'Save' }).click();
  await page.reload();

  await expect(page.getByText('Dashboard Editor')).toBeVisible();
  await expect(page.locator('[data-widget-id]').filter({ hasText: 'Stat Card' })).toBeVisible();
  expect(new URL(page.url()).searchParams.get('dashboard')).toBe(dashboardId);
});

test('protected baseline and preview hardening pages load', async ({ page }) => {
  await page.goto('/components');
  await expect(page.getByRole('heading', { name: /Components/i })).toBeVisible();

  await page.goto('/components/previews');
  await expect(page.getByRole('heading', { name: 'Preview Hardening' })).toBeVisible();
  await expect(page.getByRole('heading', { name: 'Engineering Dashboard Editor' })).toBeVisible();
  await expect(page.getByText('Release to add widget').first()).toBeVisible();
  await expect(page.getByText(/draft/i)).toHaveCount(0);
});

test('preview hardening page stays navigable at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/components/previews');

  await expect(page.getByRole('heading', { name: 'Preview Hardening' })).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');
});
