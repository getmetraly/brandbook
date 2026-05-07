/** @type {import('jest').Config} */
module.exports = {
  testEnvironment: 'jsdom',
  transform: {
    '^.+\\.(t|j)sx?$': 'babel-jest',
  },
  moduleNameMapper: {
    // Map CSS modules to identity proxy to ignore during tests
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
    // Alias for implementation pack
    '^@/implementation-pack/(.*)$': '<rootDir>/unzipped/implementation-pack/$1',
  },
  setupFilesAfterEnv: ['<rootDir>/unzipped/jest.setup.ts'],
};