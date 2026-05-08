# Archive Validation — Docs Portal Bundle

## Structure

The archive should expand directly into the project root. It should not create an extra wrapper such as `unzipped/` or `brandbook-main/`.

Expected root folders include:

```text
brandbook/
design-system/
framework/
migration/
packages/
reports/
site/
stories/
```

## Must not be present

```text
implementation-pack/
unzipped/
node_modules/
.next/
```

## Important changes

- `/editor` build error fixed via a Client wrapper.
- `@metraly/ui` remains the canonical UI package.
- grouped docs portal pages added.
- `/draft` is marked as legacy.
