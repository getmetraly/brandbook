/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: "jsdom",
  transform: {
    "^.+\\.(t|j)sx?$": ["babel-jest", { presets: ["next/babel"] }],
  },
  moduleNameMapper: {
    "\\.(css|less|scss|sass)$": "identity-obj-proxy",
    "^@metraly/ui$": "<rootDir>/packages/ui/src/index.ts",
    "^@metraly/ui/charts$": "<rootDir>/packages/ui/src/charts/index.ts",
    "^@metraly/ui/components/(.*)$": "<rootDir>/packages/ui/src/components/$1.tsx",
    "^@metraly/ui/styles/(.*)$": "<rootDir>/packages/ui/src/styles/$1"
  },
  setupFilesAfterEnv: ["<rootDir>/jest.setup.ts"],
  testPathIgnorePatterns: ["<rootDir>/node_modules/", "<rootDir>/site/node_modules/"],
};
