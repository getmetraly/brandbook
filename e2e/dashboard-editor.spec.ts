import { test, expect } from '@playwright/test';

test('dashboard editor adds and removes widgets', async ({ page }) => {
  await page.goto('/editor');
  // Wait for editor to load
  await expect(page.getByText('Dashboard Editor')).toBeVisible();
  // Add a stat card
  await page.getByRole('button', { name: 'Stat Card' }).click();
  await expect(page.getByText('Stat Card')).toBeVisible();
  // Remove the widget
  await page.getByRole('button', { name: 'Remove' }).click();
  await expect(page.getByText('Stat Card')).not.toBeVisible();
});