# Runtime Fix Report

## Error

Next.js runtime error:

```text
Event handlers cannot be passed to Client Component props.
<tr role="row" className=... onClick={function onClick}>
```

## Root cause

`MetralyTable` was rendered from the draft page as a Server Component path, but it created an `onClick` handler for every table row even when the caller did not need row interactivity. In React Server Components, event handlers cannot be emitted from server-rendered trees.

## Fix

- Removed `onClick` support from the server-safe `MetralyTable` primitive.
- Kept `MetralyTable` as a presentational, server-safe table.
- Removed mouse event props from `WidgetShell` so draft components can render it safely from server contexts.
- Moved `react-grid-layout` global CSS imports to `site/app/layout.tsx`.
- Corrected `DashboardEditor` import path for `fakeDashboardApi`.

## Result

The draft page can render table rows without server-to-client event handler serialization errors. Interactive dashboard editing remains isolated in the `DashboardEditor` Client Component.
