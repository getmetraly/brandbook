# Next.js Documentation Portal Migration

## Status

Done in this bundle.

## Main fixes

- Fixed the `/editor` build error reported in Next.js 16.2.6:
  - `ssr: false` is no longer used directly in `site/app/editor/page.tsx`.
  - Dynamic client-only loading moved into `site/app/editor/EditorClient.tsx`.
  - The page remains a Server Component and renders the Client wrapper.

## Site architecture added

The site is now structured as a documentation portal instead of one oversized draft page.

New documentation infrastructure:

```text
site/app/lib/docs/navigation.ts
site/app/components/docs/DocsShell.tsx
site/app/components/docs/DocsBlocks.tsx
site/app/components/docs/docs.css
```

New grouped routes:

```text
/foundations
/foundations/colors
/foundations/typography
/foundations/spacing
/foundations/motion
/foundations/accessibility

/components
/components/primitives
/components/forms
/components/data-display
/components/dashboard
/components/feedback
/components/navigation
/components/charts

/patterns
/patterns/dashboard-layout
/patterns/widget-editor
/patterns/filters
/patterns/empty-states
/patterns/loading-states

/examples
/examples/engineering-dashboard
/examples/delivery-health
/examples/incident-review
/examples/team-performance

/editor
/draft
```

## Navigation model

All primary links are registry-driven from:

```text
site/app/lib/docs/navigation.ts
```

Every docs page uses a consistent layout with:

- top navigation;
- sidebar navigation;
- breadcrumbs;
- optional local table of contents;
- related links;
- previous/next links.

## Draft cleanup direction

`/draft` is now explicitly marked as a legacy sandbox. It is retained only to compare migration candidates. Canonical component previews should be moved to grouped pages under `/components`, `/patterns`, and `/examples`.

Next cleanup pass should:

1. remove migrated sections from `/draft`;
2. delete draft-only CSS that no longer has consumers;
3. move remaining good patterns into `@metraly/ui`;
4. keep `/draft` only until all useful examples have canonical homes.

## Validation notes

Static checks performed in this sandbox:

- no `implementation-pack/` directory;
- no `unzipped/` directory;
- no `node_modules/` directory;
- no `.next/` directory;
- no `next/dynamic` + `ssr: false` usage in `page.tsx`;
- no source imports from the old implementation package.

Full Next.js validation still needs to run locally after dependency installation:

```bash
npm install
npm run ui:check
npm run site:typecheck
npm run site:test
npm run site:build
```
