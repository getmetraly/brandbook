/**
 * Visual parity capture script.
 *
 * Captures screenshots from:
 *   1. Claude Design implementation-pack-viewer.html (opened via file:// URL)
 *   2. Brandbook Storybook static build (served at http://localhost:6007)
 *
 * Outputs to:
 *   .tmp/visual-parity/claude/   — Claude Design reference screenshots
 *   .tmp/visual-parity/storybook/ — Storybook story screenshots
 *   .tmp/visual-parity/diff/     — placeholder for manual diffing
 *
 * Usage:
 *   # 1. Build Storybook
 *   npm run build-storybook
 *   # 2. Serve static build
 *   npx http-server site/storybook-static -p 6007 --silent &
 *   # 3. Run this script
 *   npx tsx tests/visual-parity/capture.ts
 *   # 4. Kill server
 *   kill %1
 *
 * Requirements: @playwright/test installed (already present in the repo)
 */

import { chromium, type Page } from "@playwright/test";
import * as path from "path";
import * as fs from "fs";

const REPO_ROOT = path.resolve(import.meta.dirname, "../..");
const CLAUDE_ROOT = path.resolve(REPO_ROOT, "../claude");
const VIEWER_HTML = path.resolve(CLAUDE_ROOT, "implementation-pack-viewer.html");
const OUT_CLAUDE = path.resolve(REPO_ROOT, ".tmp/visual-parity/claude");
const OUT_STORYBOOK = path.resolve(REPO_ROOT, ".tmp/visual-parity/storybook");
const OUT_DIFF = path.resolve(REPO_ROOT, ".tmp/visual-parity/diff");
const STORYBOOK_URL = "http://localhost:6007";

// ── Storybook story targets ───────────────────────────────────────────────────
// Format: [filename-prefix, storybook-id]
// Storybook iframe URL: /iframe.html?id=<story-id>&viewMode=story
const STORYBOOK_TARGETS: [string, string][] = [
  ["01-metraly-gauge",                "charts-metralygauge--product-preview"],
  ["02-metraly-heatmap",              "charts-metralyheatmap--product-preview"],
  ["03-activity-feed",                "components-activityfeed--product-preview"],
  ["04-insight-card",                 "components-insightcard--product-preview"],
  ["05-state-board",                  "components-stateboard--product-preview"],
  ["06-widget-state-matrix",          "components-widgetstatematrix--product-preview"],
  ["07-token-input",                  "source-tokeninput--product-preview"],
  ["08-permission-explainer",         "source-permissionexplainer--product-preview"],
  ["09-backfill-range-picker",        "source-backfillrangepicker--product-preview"],
  ["10-connection-test-panel",        "source-connectiontestpanel--product-preview"],
  ["11-sync-progress-panel",          "source-syncprogresspanel--product-preview"],
  ["12-settings-section",             "settings-settingssection--product-preview"],
  ["13-ai-provider-connector-card",   "settings-aiproviderconnectorcard--product-preview"],
  ["14-byo-llm-connector-panel",      "settings-byollmconnectorpanel--product-preview"],
  ["15-dashboard-wizard-split-builder","dashboard-dashboardwizardsplitbuilder--product-preview"],
  ["16-move-menu-a11y-example",       "dashboard-movemenua11yexample--product-preview"],
  ["app-sidebar",                     "appkit-appsidebar--product-preview"],
  ["app-topbar",                      "appkit-apptopbar--product-preview"],
  ["app-widget",                      "appkit-appwidget--product-preview"],
  ["app-icon-library",                "appkit-appiconlibrary--product-preview"],
  ["app-dashboard-screen",            "appkit-appdashboardscreen--product-preview"],
  ["app-ai-workspace-screen",         "appkit-appaiworkspacescreen--product-preview"],
  ["app-plugins-screen",              "appkit-apppluginsscreen--product-preview"],
  ["app-connector-wizard-screen",     "appkit-appconnectorwizardscreen--product-preview"],
];

// ── Claude viewer component scroll targets ───────────────────────────────────
// Cards appear in a grid. Capture them by scrolling to each card heading.
// The implementation-pack-viewer.html uses section/h3 headings for each component.
const CLAUDE_CARD_TITLES: [string, string][] = [
  ["01-metraly-gauge",               "MetralyGauge"],
  ["02-metraly-heatmap",             "MetralyHeatmap"],
  ["03-activity-feed",               "ActivityFeed"],
  ["04-insight-card",                "InsightCard"],
  ["05-state-board",                 "StateBoard"],
  ["06-widget-state-matrix",         "WidgetStateMatrix"],
  ["07-token-input",                 "TokenInput"],
  ["08-permission-explainer",        "PermissionExplainer"],
  ["09-backfill-range-picker",       "BackfillRangePicker"],
  ["10-connection-test-panel",       "ConnectionTestPanel"],
  ["11-sync-progress-panel",         "SyncProgressPanel"],
  ["12-settings-section",            "SettingsSection"],
  ["13-settings-audit-row",          "SettingsAuditRow"],
  ["14-ai-provider-connector-card",  "AIProviderConnectorCard"],
  ["15-byo-llm-connector-panel",     "BYOLLMConnectorPanel"],
  ["16-dashboard-widget-examples",   "DashboardWidgetExamples"],
  ["17-move-menu-a11y-example",      "MoveMenuA11yExample"],
  ["18-dashboard-wizard-split-builder","DashboardWizardSplitBuilder"],
];

// ── Utilities ─────────────────────────────────────────────────────────────────

function ensureDirs(): void {
  for (const dir of [OUT_CLAUDE, OUT_STORYBOOK, OUT_DIFF]) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

async function waitForNetworkIdle(page: Page, timeout = 5000): Promise<void> {
  await page.waitForLoadState("networkidle", { timeout }).catch(() => {
    // Tolerate timeout — static pages may never reach networkidle
  });
}

async function captureStorybookStory(
  page: Page,
  storyId: string,
  outputPath: string,
  viewportWidth = 1280,
  viewportHeight = 900,
): Promise<void> {
  await page.setViewportSize({ width: viewportWidth, height: viewportHeight });
  const url = `${STORYBOOK_URL}/iframe.html?id=${storyId}&viewMode=story`;
  await page.goto(url);
  await waitForNetworkIdle(page);
  // Allow animations/fonts to settle
  await page.waitForTimeout(800);
  await page.screenshot({ path: outputPath, fullPage: false });
  console.log(`  ✓ storybook  ${path.basename(outputPath)}`);
}

async function captureClaudeCard(
  page: Page,
  cardTitle: string,
  outputPath: string,
  viewportWidth = 1280,
): Promise<void> {
  await page.setViewportSize({ width: viewportWidth, height: 900 });

  // Find the card element by heading text
  const heading = page.getByRole("heading", { name: cardTitle, exact: false }).first();
  const headingExists = await heading.count();

  if (!headingExists) {
    // Try h3 or any text match
    const fallback = page.locator(`text="${cardTitle}"`).first();
    const fallbackExists = await fallback.count();
    if (!fallbackExists) {
      console.warn(`  ⚠  Claude card not found: ${cardTitle}`);
      return;
    }
    await fallback.scrollIntoViewIfNeeded();
  } else {
    await heading.scrollIntoViewIfNeeded();
  }

  // Find the closest card ancestor
  const card = heading.locator("xpath=ancestor::*[contains(@class,'card') or contains(@class,'component')][1]").first();
  const cardExists = await card.count();

  if (cardExists) {
    await card.screenshot({ path: outputPath });
  } else {
    // Fallback: screenshot the viewport after scrolling
    await page.screenshot({ path: outputPath, fullPage: false });
  }
  console.log(`  ✓ claude     ${path.basename(outputPath)}`);
}

// ── Main ──────────────────────────────────────────────────────────────────────

async function main(): Promise<void> {
  ensureDirs();

  const viewerUrl = `file://${VIEWER_HTML}`;
  const viewerExists = fs.existsSync(VIEWER_HTML);

  if (!viewerExists) {
    console.error(`ERROR: Claude viewer not found at ${VIEWER_HTML}`);
    console.error("Expected: ../claude/implementation-pack-viewer.html");
    process.exit(1);
  }

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();

  try {
    // ── Claude Design viewer ────────────────────────────────────────────────
    console.log("\n── Claude Design viewer screenshots ──");
    const claudePage = await context.newPage();
    await claudePage.goto(viewerUrl);
    await waitForNetworkIdle(claudePage, 8000);
    await claudePage.waitForTimeout(1500); // let scripts render cards

    for (const [prefix, title] of CLAUDE_CARD_TITLES) {
      const outPath = path.join(OUT_CLAUDE, `${prefix}.png`);
      await captureClaudeCard(claudePage, title, outPath);
    }
    await claudePage.close();

    // ── Storybook ──────────────────────────────────────────────────────────
    console.log("\n── Storybook story screenshots ──");
    const storybookPage = await context.newPage();

    // Verify Storybook is running
    try {
      await storybookPage.goto(STORYBOOK_URL, { timeout: 10000 });
    } catch {
      console.error(`ERROR: Storybook not reachable at ${STORYBOOK_URL}`);
      console.error("Run: npm run build-storybook && npx http-server site/storybook-static -p 6007");
      process.exit(1);
    }

    for (const [prefix, storyId] of STORYBOOK_TARGETS) {
      const outPath = path.join(OUT_STORYBOOK, `${prefix}.png`);
      try {
        await captureStorybookStory(storybookPage, storyId, outPath);
      } catch (err) {
        console.warn(`  ⚠  Failed to capture ${prefix}: ${err instanceof Error ? err.message : String(err)}`);
      }
    }
    await storybookPage.close();

    console.log(`\n── Done ──`);
    console.log(`Claude screenshots:    ${OUT_CLAUDE}`);
    console.log(`Storybook screenshots: ${OUT_STORYBOOK}`);
    console.log(`Diff folder (manual):  ${OUT_DIFF}`);
  } finally {
    await browser.close();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
