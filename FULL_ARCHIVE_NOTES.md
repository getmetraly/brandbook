# Metraly Brandbook Full Archive — Phase 10

This archive contains the full `brandbook-main` project tree.

## What changed in Phase 10

- `/components` was preserved as the baseline reference page.
- `/draft` was corrected after visual review screenshots.
- Hero and section telemetry lines were restored to calm thin lines.
- Circular selected/live indicators now keep a larger pulse-wave inside the circle.
- Sprint burndown now has a visible dashed ideal line and a readable actual line.
- Widget registry coverage now reflects the current `getmetraly/metraly` widget registry and widget type map.
- Drop zones were restored to dashed borders.
- Notification and timeline rows were aligned and given larger pulse-wave markers.
- DevOps and role icons were simplified and aligned to the Metraly line-icon style.
- Cursor behavior was corrected: static content uses default cursor, buttons/clickable items use pointer, text fields use text, disabled states use not-allowed.

## Replace instructions

```bash
cd brandbook-main/site
npm install
npm run build
npm run dev
```

## Files most relevant to this phase

```text
site/app/draft/page.tsx
site/app/components/draft/draft-components.css
site/app/components/draft/WidgetPickerCardDraft.tsx
site/app/components/draft/TelemetryIconGalleryDraft.tsx
brandbook/draft-page-phase-10-visual-review.md
reports/draft-page-phase-10-visual-review.md
```
