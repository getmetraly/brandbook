# Responsive Contract

Metraly framework UI preserves a dense engineering workspace aesthetic while staying usable across common viewport sizes.

## Required viewport checks

- 320px
- 375px
- 390px
- 430px
- 768px
- 1024px
- 1280px
- 1440px
- 1920px

## Global rules

- No component should force body-level horizontal overflow.
- Compression happens before visual redesign.
- Prefer internal scroll regions over page overflow for tables, charts, and dense controls.
- Semantic structure must remain intact: tables stay tables, forms stay forms, charts remain accessible SVG output.
- Responsive behavior belongs in production components and CSS, not preview-only rescue wrappers.

## Layout rules

- Forms collapse from multi-column to single-column before shrinking controls into illegibility.
- Dashboard widgets should stack before content becomes unreadable.
- Shell, sidebar, and topbar should preserve the same product tone across breakpoints.
- Charts may reduce tick density and spacing before reducing typography below readable sizes.
