# Metraly Brandbook Site

This is the Next.js site used to view and harden the Metraly brandbook.

## Pages

```text
/             Brandbook landing page
/components   Protected baseline component reference
/components/* Grouped canonical preview pages
site/app/components/previews/  Preview hardening surface
```

## Current workflow

- Use `/components` as the stable reference.
- Use `/components/*`, `/patterns/*`, `/examples/*` and `/editor` for canonical preview examples and product-like scenarios.
- Use `site/app/components/previews/` for temporary hardening surfaces while a component is still being promoted.
- Keep documentation in sync with UI changes.

## Local development

```bash
cd site
npm install
npm run dev
```

## Production check

```bash
cd site
npm run build
npm run start
```

## Design notes

The site reflects the current Metraly design:

- dark engineering dashboard canvas;
- cyan telemetry signal;
- purple secondary depth;
- pulse-wave as a controlled brand primitive;
- stable hover/focus states;
- no layout jumps;
- real dashboard scenarios over decorative mockups;
- grouped preview pages instead of a single oversized showcase.

## Agent note

Read `../AGENTS.md` before editing this site. `/components` must not be modified without explicit instruction.
