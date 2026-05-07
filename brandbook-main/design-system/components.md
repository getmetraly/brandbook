# Component guidelines

Metraly’s user interface is composed of many reusable parts.  To avoid duplication and ensure a coherent look and feel, components should follow a set of common rules regardless of where they live (product app, marketing site or documentation).  This document summarises high‑level guidance for typical component categories.

## Buttons and interactive controls

- **Primary vs. secondary**: There should be a clear primary action per view.  Primary buttons use the `--color‑primary` token for backgrounds and white text; secondary actions use transparent or neutral backgrounds with a coloured border.  Destructive actions (e.g. delete) map to `--color‑error`.
- **Sizes**: Define small, medium and large sizes using spacing tokens.  Small buttons (height `--space‑lg`) are used in toolbars; medium (height `--space‑xl`) are default; large buttons (height `--space‑xl` with extra horizontal padding) appear on empty states or wizards.
- **States**: All states—hover, focus, active and disabled—must be visually distinct.  Hover should alter border or background without shifting the button vertically; focus should show a visible outline for keyboard users; disabled states decrease opacity and remove pointer events.

## Cards and panels

Cards group related information such as metrics, alerts or plugin descriptions.  When designing new cards:

- **Structure**: Use a title area (heading or statistic), an optional icon on the left, body content with metrics or text, and an optional footer with actions.  Components such as `AIInsightCard` and `StatCard` are good references.
- **Spacing**: Apply `--space‑md` padding around content and `--space‑sm` gaps between internal elements.  Do not nest cards inside cards; instead, separate them with `--space‑md` margin.
- **Hover behaviour**: Follow the UI design note from the Metraly agent guidelines—card hover should affect only border/background, avoid vertical motion【849328462375381†L71-L79】.  When cards are selectable (e.g. in wizard steps), include a subtle checkmark indicator on the right【849328462375381†L73-L76】.

## Charts and data visualisations

Metraly provides chart components such as AreaChart, BarChart, Gauge, Heatmap and Sparkline.  Use them to represent time‑series metrics and categorical comparisons.  Guidelines:

- **Colours**: Use the semantic palette defined in the token table.  Avoid combining more than four distinct hues; instead, rely on shade variations or patterns for differentiation.  Provide patterns or textures when colour alone could be ambiguous for users with colour‑vision deficiencies.
- **Legends and labels**: Always include axis labels and legends; ensure they are legible at small sizes by using `--font‑size‑sm` or larger.  For gauges or single‑value widgets, display the numeric value prominently and include context (e.g. units or time period).
- **Accessibility**: Charts should include `aria‑label` attributes summarising the data for screen readers and provide interactive tooltips with the underlying values.

## Tables and lists

Data tables (see `DataTable.tsx`) and leaderboards present structured data.  Guidance:

- **Consistent rows**: Use alternating row backgrounds for readability.  Row heights should align with the medium spacing scale and not collapse below 32 px.
- **Sortable & filterable**: Provide sort indicators and filter controls where appropriate.  Use icons from the shared icon library for actions like sorting and exporting.
- **Empty and error states**: Include a friendly placeholder (`PlaceholderScreen.tsx`) when there is no data or when an error occurs.  These states should be aligned to the centre of the table region with supportive copy.

## Navigation patterns

The application shell comprises a top bar, sidebar and optional tweak panel.  Follow these rules:

- **Top bar**: Contains the product logo, primary navigation links and secondary actions (e.g. account avatar).  Keep it fixed at the top; drop shadows differentiate it from the content area.
- **Sidebar**: Houses secondary navigation such as dashboards, plugins and settings.  Use the `Sidebar.tsx` component as a base.  On narrow screens, collapse the sidebar behind a hamburger menu.
- **Tweak panel**: The `DraggableTweaksPanel.tsx` floats above the content and allows users to change preferences like accent colour and density.  Its drag handle must be accessible via keyboard; icons and labels should be properly described.

## Forms and inputs

- **Label association**: Every input requires a visible label.  Use the `label` element with `for`/`id` attributes so screen readers can announce them.
- **Validation**: Show real‑time validation feedback.  Use the warning and error semantic tokens for messages and input outlines.  Do not rely solely on colour; include icons and assistive text.
- **Grouping**: Group related inputs with a fieldset and legend or a card container.  Provide sufficient spacing (`--space‑md`) between fields.

## Responsiveness

All components must adapt to different screen sizes.  Use flexbox or CSS grid to stack content on smaller screens.  Text sizes may scale down to `--font‑size‑sm` while maintaining minimum touch target sizes (48 × 48 px).  Avoid horizontal scrolling except for data tables where a responsive table pattern is required.

## Contribution checklist

When adding a new component or editing an existing one:

1. **Re‑use** before inventing: verify whether a similar component exists in the shared library.
2. **Use tokens**: do not hard‑code colours, sizes or fonts—pull them from the token system.
3. **Document**: provide usage examples and edge‑cases in the Storybook or documentation.
4. **Test**: write unit tests and visual regression tests.  Ensure keyboard accessibility and screen reader announcements.
