import { test, expect } from '@playwright/test';

test('dashboard editor adds and removes widgets', async ({ page }) => {
  await page.goto('/editor');
  // Wait for editor to load
  await expect(page.getByText('Dashboard Editor')).toBeVisible();
  // Add a stat card
  await page.getByRole('option', { name: /Stat Card/ }).click();
  const widgetInGrid = page.locator('[data-widget-id]').filter({ hasText: 'Stat Card' });
  await expect(widgetInGrid).toBeVisible();
  // Remove the widget
  await page.locator('.metraly-dashboard-widget-remove').click();
  await expect(widgetInGrid).not.toBeVisible();
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
