# Editor build and Jest resolver fix

## Fixed

- Replaced the invalid named `WidthProvider` import from `react-grid-layout` with a local `ResizeObserver`-based width provider.
- Kept `DashboardCanvas` as a client component and passed measured width directly into `Responsive`.
- Removed the fragile Jest `@babel/runtime` mapper that pointed to `site/node_modules` while npm workspaces hoist dependencies to the root `node_modules`.
- Updated the Jest test matcher to include both `.test.ts` and `.test.tsx`.
- Confirmed that the root bundle keeps `clean:legacy` and `scripts/clean-legacy.sh` for stale local cleanup.

## Local validation commands

```bash
npm run clean:legacy
npm run clean:install
npm install --no-audit --no-fund
npm run ui:check
npm run site:typecheck
npm run site:test
npm run site:build
```
