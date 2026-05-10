/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["babel-jest", { presets: ["next/babel"] }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@metraly/ui$": "<rootDir>/../packages/ui/src/index.ts",
    "^@metraly/ui/charts$": "<rootDir>/../packages/ui/src/charts/index.ts",
    "^@metraly/ui/components/(.*)$": "<rootDir>/../packages/ui/src/components/$1.tsx",
    "^@metraly/ui/styles/(.*)$": "<rootDir>/../packages/ui/src/styles/$1",
    "^react$": "<rootDir>/../node_modules/react",
    "^react/jsx-runtime$": "<rootDir>/../node_modules/react/jsx-runtime",
    "^react-dom$": "<rootDir>/../node_modules/react-dom"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testMatch: ["<rootDir>/__tests__/**/*.test.ts", "<rootDir>/__tests__/**/*.test.tsx"],
};
