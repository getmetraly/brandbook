# Metraly Brandbook Site

This is the Next.js site used to view and harden the Metraly brandbook.

## Pages

```text
/             Brandbook landing page
/components   Protected baseline component reference
/draft        Active component hardening lab
```

## Current workflow

- Use `/components` as the stable reference.
- Use `/draft` for new component examples, visual corrections and product-like scenarios.
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
- real dashboard scenarios over decorative mockups.

## Agent note

Read `../AGENTS.md` before editing this site. `/components` must not be modified without explicit instruction.
