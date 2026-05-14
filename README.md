# Full-file replacement: fix dashboard e2e draft assertion

Commit name:

```bash
test(e2e): scope dashboard docs legacy assertions
```

Copy this file over the repository root:

```bash
cp -R e2e/* ./e2e/
```

Then run:

```bash
npm run test:e2e
npm run ui:check
npm run site:typecheck
npm run site:test
npm run build-storybook
```

Why:

`/components/dashboard` legitimately contains multiple `draft` labels in the current documentation/status UI, so the previous broad assertion `getByText(/draft/i).toHaveCount(0)` is no longer valid. The replacement keeps the useful regression guard by checking that old preview-hardening paths/copy are not exposed.
