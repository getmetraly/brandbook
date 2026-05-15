# Metraly PluginCatalog Storybook filter refinement

Commit message:

```bash
fix(storybook): align plugin catalog filters with app preview
```

Copy from the extracted archive root into `getmetraly/brandbook` on branch `docs/metraly-ui-ux-migration-plan`:

```bash
cp -R stories/* ./stories/

npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
```

Files included:

- `stories/PluginCatalog.stories.tsx`
- `DELETE_FILES.md`

What changed:

- Removed the FilterBar/Category/Search wrapper from the PluginCatalog scenario.
- Replaced it with an app-like toolbar: long search input first, compact category chips after it.
- Removed visible `Search` and `Category` labels.
- Removed the heavy outer catalog border/container so the story feels like the app preview surface.
- Constrained the scenario width to keep fullscreen Storybook compact.
- Kept mobile behavior readable: search stacks above horizontally scrollable category chips.
