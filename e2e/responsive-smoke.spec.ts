import { expect, test, type Locator, type Page } from '@playwright/test';

type ViewportCheck = {
  name: string;
  width: number;
  height: number;
};

type RouteCheck = {
  path: string;
  ready: (page: Page) => Promise<void>;
};

const responsiveRoutes: RouteCheck[] = [
  {
    path: '/components',
    ready: async (page) => {
      await expect(page.getByRole('heading', { name: /Components/i }).first()).toBeVisible();
    },
  },
  {
    path: '/components/forms',
    ready: async (page) => {
      await expect(page.getByRole('heading', { name: /Forms/i }).first()).toBeVisible();
    },
  },
  {
    path: '/components/dashboard',
    ready: async (page) => {
      await expect(page.getByRole('heading', { name: /Dashboard/i }).first()).toBeVisible();
    },
  },
  {
    path: '/editor',
    ready: async (page) => {
      await expect(page.getByText(/Dashboard editor/i).first()).toBeVisible();
      await expect(page.getByText(/Widget library/i).first()).toBeVisible();
    },
  },
  {
    path: '/patterns/widget-editor',
    ready: async (page) => {
      await expect(page.getByRole('heading', { name: /Widget Editor/i }).first()).toBeVisible();
    },
  },
];

const requiredViewports: ViewportCheck[] = [
  { name: '320', width: 320, height: 900 },
  { name: '375', width: 375, height: 900 },
  { name: '390', width: 390, height: 900 },
  { name: '430', width: 430, height: 932 },
  { name: '768', width: 768, height: 1024 },
  { name: '1024', width: 1024, height: 900 },
  { name: '1280', width: 1280, height: 960 },
  { name: '1440', width: 1440, height: 1000 },
  { name: '1920', width: 1920, height: 1080 },
];

async function expectNoHorizontalOverflow(page: Page, context: string) {
  const metrics = await page.evaluate(() => {
    const doc = document.documentElement;
    const body = document.body;

    return {
      clientWidth: doc.clientWidth,
      documentScrollWidth: doc.scrollWidth,
      bodyScrollWidth: body.scrollWidth,
      bodyClientWidth: body.clientWidth,
    };
  });

  expect(
    metrics.documentScrollWidth,
    `${context}: document scroll width ${metrics.documentScrollWidth} exceeded client width ${metrics.clientWidth}`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
  expect(
    metrics.bodyScrollWidth,
    `${context}: body scroll width ${metrics.bodyScrollWidth} exceeded client width ${metrics.clientWidth}`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
  expect(
    metrics.bodyClientWidth,
    `${context}: body client width ${metrics.bodyClientWidth} exceeded client width ${metrics.clientWidth}`,
  ).toBeLessThanOrEqual(metrics.clientWidth + 1);
}

async function gridColumnCount(locator: Locator) {
  const template = await locator.evaluate((element) => getComputedStyle(element).gridTemplateColumns);
  return template
    .split(' ')
    .map((value) => value.trim())
    .filter(Boolean).length;
}

test.describe('responsive documentation surfaces', () => {
  for (const viewport of requiredViewports) {
    test(`core routes stay within viewport at ${viewport.name}px`, async ({ page }) => {
      await page.setViewportSize({ width: viewport.width, height: viewport.height });

      for (const route of responsiveRoutes) {
        await page.goto(route.path);
        await route.ready(page);
        await expectNoHorizontalOverflow(page, `${route.path} @ ${viewport.width}px`);
      }
    });
  }

  test('forms surface uses 3/2/1 columns across breakpoints', async ({ page }) => {
    await page.goto('/components/forms');

    const firstGrid = page.locator('.component-state-grid').first();
    await expect(firstGrid).toBeVisible();

    await page.setViewportSize({ width: 1280, height: 960 });
    await expect.poll(() => gridColumnCount(firstGrid)).toBe(3);

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect.poll(() => gridColumnCount(firstGrid)).toBe(2);

    await page.setViewportSize({ width: 390, height: 900 });
    await expect.poll(() => gridColumnCount(firstGrid)).toBe(1);
  });

  test('editor stacks the widget picker below the canvas on tablet and mobile', async ({ page }) => {
    await page.goto('/editor');
    const layout = page.locator('.dashboard-editor-layout');
    await expect(layout).toBeVisible();

    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect.poll(() => gridColumnCount(layout)).toBe(2);

    await page.setViewportSize({ width: 768, height: 1024 });
    await expect.poll(() => gridColumnCount(layout)).toBe(1);

    await page.setViewportSize({ width: 390, height: 900 });
    await expect.poll(() => gridColumnCount(layout)).toBe(1);
  });

  test('chart wrappers reduce x-axis tick density on narrow screens', async ({ page }) => {
    await page.goto('/components/charts');

    const firstChart = page.locator('.recharts-responsive-container').first();
    await expect(firstChart).toBeVisible();

    const tickMarks = firstChart.locator('.recharts-cartesian-axis-tick');

    await page.setViewportSize({ width: 1440, height: 1000 });
    await expect.poll(async () => tickMarks.count(), { message: 'desktop chart ticks should render' }).toBeGreaterThanOrEqual(8);
    const desktopTicks = await tickMarks.count();

    await page.setViewportSize({ width: 320, height: 900 });
    await expect.poll(async () => tickMarks.count(), { message: 'mobile chart ticks should render' }).toBeLessThan(desktopTicks);
  });
});
