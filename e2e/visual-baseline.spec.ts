import { expect, test } from '@playwright/test';

const coreRoutes = [
  {
    path: '/components',
    heading: /Components/i,
    label: 'component catalog surface',
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

  test('dashboard editor surface loads', async ({ page }) => {
    await page.goto('/editor');

    await expect(page.getByText(/Dashboard editor/i).first()).toBeVisible();
    await expect(page.getByText(/Widget library/i).first()).toBeVisible();
    await expect(page.locator('.dashboard-editor-layout')).toBeVisible();
  });

  for (const viewport of viewports) {
    test(`/editor remains usable at ${viewport.name} width`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });
      await page.goto('/editor');

      await expect(page.getByText(/Dashboard editor/i).first()).toBeVisible();
      await expect(page.getByText(/Widget library/i).first()).toBeVisible();
      await expect(page.getByText(/Drag widgets with grip dots/i).first()).toBeVisible();

      const bodyBox = await page.locator('body').boundingBox();
      expect(bodyBox?.width).toBeLessThanOrEqual(viewport.width + 1);
    });
  }

  test('dashboard editor route keeps drag and drop visual rules visible', async ({ page }) => {
    await page.goto('/editor');

    await expect(page.getByText(/Drag widgets with grip dots/i).first()).toBeVisible();
    await expect(page.getByLabel(/Filter widgets/i).first()).toBeVisible();
    await expect(page.getByText(/Edit mode/i).first()).toBeVisible();
    await expect(page.getByText(/draft/i)).toHaveCount(0);
  });
});
