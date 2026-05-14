# Metraly final Storybook conformance full files

Commit name:

```bash
fix(storybook): finalize prototype conformance frames
```

This archive contains full files to overwrite in the repository.

Copy from the extracted archive root into `getmetraly/brandbook`:

```bash
cp -R stories/* ./stories/
git rm docs/superpowers/plans/2026-05-14-prototype-pixel-perfect-parity.md

npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
npm run test:e2e
```

Files included:

- stories/DashboardWidget.stories.tsx
- stories/MetralyCard.stories.tsx
- stories/DashboardDropZone.stories.tsx
- stories/DashboardToolbar.stories.tsx
- stories/MetralyTable.stories.tsx
- stories/WidgetPickerCard.stories.tsx
- DELETE_FILES.md

Why:

- DashboardWidget and Cards stories were rendering full-width strips instead of prototype-sized surfaces.
- DropZone and Toolbar stories lacked a constrained prototype frame.
- WidgetPickerCard was too wide for the right-rail/reference picker contract.
- MetralyTable stories were missing the footer/status row examples.
- The transient execution plan should not remain in the production branch.
