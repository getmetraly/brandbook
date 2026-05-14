import { expect, test, type Page } from '@playwright/test';

async function openDashboardEditor(page: Page) {
  await page.goto('/editor');
  await expect(page.getByText(/Dashboard editor/i).first()).toBeVisible();
  await expect(page.getByText(/Widget library/i).first()).toBeVisible();
}

async function addStatCard(page: Page) {
  await page.getByRole('option', { name: /Stat Card/i }).click();
  const widgetInGrid = page.locator('[data-widget-id]').filter({ hasText: 'Stat Card' }).first();
  await expect(widgetInGrid).toBeVisible();
  return widgetInGrid;
}

test('dashboard editor adds and removes widgets', async ({ page }) => {
  await openDashboardEditor(page);

  const widgetInGrid = await addStatCard(page);

  await widgetInGrid.locator('.metraly-dashboard-widget-remove').click();
  await expect(widgetInGrid).not.toBeVisible();
});

test('dashboard editor saves and reloads the added widget', async ({ page }) => {
  await openDashboardEditor(page);

  const widgetInGrid = await addStatCard(page);
  await expect(widgetInGrid.locator('.metraly-widget-shell-drag-handle')).toBeVisible();
  await expect(widgetInGrid.locator('.metraly-dashboard-resize-handle')).toHaveCount(8);
  await expect(widgetInGrid.locator('.metraly-dashboard-resize-handle').first()).toBeVisible();

  const dashboardId = new URL(page.url()).searchParams.get('dashboard');

  await page.getByRole('button', { name: 'Save' }).click();
  await page.reload();

  await expect(page.getByText(/Dashboard editor/i).first()).toBeVisible();
  await expect(page.locator('[data-widget-id]').filter({ hasText: 'Stat Card' }).first()).toBeVisible();
  expect(new URL(page.url()).searchParams.get('dashboard')).toBe(dashboardId);
});

test('components and dashboard surfaces load', async ({ page }) => {
  await page.goto('/components');
  await expect(page.getByRole('heading', { name: /Components/i })).toBeVisible();

  await page.goto('/components/dashboard');
  await expect(page.getByRole('heading', { name: /Dashboard/i }).first()).toBeVisible();
  await expect(page.getByText(/Release to add a delivery widget/i).first()).toBeVisible();
  await expect(page.getByText(/Default drop zones stay pulse-free/i).first()).toBeVisible();
  await expect(page.getByText(/draft/i)).toHaveCount(0);
});

test('dashboard surface stays navigable at mobile width', async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 900 });
  await page.goto('/components/dashboard');

  await expect(page.getByRole('heading', { name: /Dashboard/i }).first()).toBeVisible();
  await page.keyboard.press('Tab');
  await expect(page.locator(':focus')).toBeVisible();
  await expect(page.locator('body')).not.toHaveCSS('overflow-x', 'scroll');
});
