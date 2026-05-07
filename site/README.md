# Metraly Brandbook Site

A small Next.js app for browsing the Metraly brandbook locally and publishing it as a standalone site.

## Local development

```bash
cd site
npm install
npm run dev
```

Open the local URL printed by Next.js, usually `http://localhost:3000`.

## Production check

```bash
cd site
npm run build
npm run start
```

## Deployment

This app can be deployed as a normal Next.js project.

Recommended options:

1. **Vercel**
   - Project root: `site`
   - Build command: `npm run build`
   - Install command: `npm install`

2. **Static/Node host**
   - Build with `npm run build`.
   - Run with `npm run start`.

## Structure

```text
site/
  app/
    globals.css
    layout.tsx
    page.tsx
  next.config.mjs
  package.json
  tsconfig.json
```

## Design notes

The site intentionally mirrors the implementation pack tokens and visual direction:

- dark observability-first UI;
- cyan primary telemetry accent;
- purple secondary depth;
- stable hover behavior without layout jumps;
- logo mark based on an angular telemetry `M`.

Next step: wire the site to MDX/content files from `brandbook/`, `design-system/`, `framework/` and `migration/` so the website becomes a full documentation browser instead of a landing-style overview.
