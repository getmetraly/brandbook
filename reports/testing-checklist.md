# Testing Checklist

- [x] `npm run site:typecheck`
- [x] `npm run site:build`
- [x] `./site/node_modules/.bin/jest --config site/jest.config.js --runInBand site/__tests__/preview/ClaudeDesignStateBoard.test.tsx site/__tests__/ui/Phase1PrototypeConformance.test.tsx site/__tests__/ui/Phase2DashboardPrimitives.test.tsx site/__tests__/ui/Phase3TableAndComposition.test.tsx site/__tests__/ui/Phase4Charts.test.tsx`
- [ ] Browser screenshot pass for `/components/previews`
- [ ] Browser screenshot pass for `/components/forms/prototype-conformance`
- [ ] Browser screenshot pass for `/components/data-display/prototype-conformance`
- [ ] Browser screenshot pass for `/components/dashboard/prototype-conformance`
- [ ] Browser screenshot pass for `/components/charts/prototype-conformance`
- [ ] Responsive screenshot pass at 1440×900, 1024×768 and 390×844
