import { expect, test } from '@playwright/test';

const coreRoutes = [
  {
    path: '/components',
    heading: /Components/i,
    label: 'protected components baseline',
  },
  {
    path: '/components/previews',
    heading: /Preview Hardening/i,
    label: 'preview hardening surface',
  },
  {
    path: '/components/forms',
    heading: /Forms/i,
    label: 'forms component surface',
  },
  {
    path: '/components/data-display',
    heading: /Data Display/i,
    label: 'data display surface',
  },
  {
    path: '/components/charts',
    heading: /Charts/i,
    label: 'chart wrapper surface',
  },
  {
    path: '/components/dashboard',
    heading: /Dashboard/i,
    label: 'dashboard primitive surface',
  },
  {
    path: '/patterns/widget-editor',
    heading: /Widget Editor/i,
    label: 'widget editor pattern surface',
  },
  {
    path: '/examples/engineering-dashboard',
    heading: /Engineering Dashboard/i,
    label: 'engineering dashboard example surface',
  },
];

const viewports = [
  { name: 'desktop', width: 1440, height: 1000 },
  { name: 'tablet', width: 768, height: 1000 },
  { name: 'mobile', width: 390, height: 900 },
];

test.describe('visual baseline route smoke checks', () => {
  for (const route of coreRoutes) {
    test(`${route.label} loads`, async ({ page }) => {
      await page.goto(route.path);
      await expect(page.getByRole('heading', { name: route.heading }).first()).toBeVisible();
      await expect(page.locator('body')).toBeVisible();
    });
  }

  for (const viewport of viewports) {
    test(`/components/previews remains usable at ${viewport.name} width`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/components/previews');

      await expect(page.getByRole('heading', { name: /Preview Hardening/i })).toBeVisible();
      await expect(page.getByRole('heading', { name: /Engineering Dashboard Editor/i })).toBeVisible();
      await expect(page.getByText(/Release to add widget/i)).toBeVisible();

      const bodyBox = await page.locator('body').boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(viewport.width + 1);
    });
  }

  test('preview hardening route keeps drag and drop visual rules visible', async ({ page }) => {
    await page.goto('/components/previews');

    await expect(page.getByText(/neutral grip dots/i)).toBeVisible();
    await expect(page.getByText(/No pulse-wave in default drop zones/i)).toBeVisible();
    await expect(page.getByText(/Dashed cyan border/i)).toBeVisible();
    await expect(page.getByText(/draft/i)).toHaveCount(0);
  });
});
