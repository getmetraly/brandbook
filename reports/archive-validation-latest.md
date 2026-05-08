# Archive Validation — Latest Iteration

## Expected structure

The archive should unpack directly into the project root:

```txt
brandbook/
design-system/
framework/
migration/
packages/ui/
reports/
site/
stories/
```

## Must not contain

- `unzipped/`
- `implementation-pack/`
- `node_modules/`
- `.next/`
- cache directories
- generated TypeScript build info

## Current status

The working tree for this archive was generated from the flat project root after the dashboard migration step. Dependency and generated directories were excluded during packaging.
