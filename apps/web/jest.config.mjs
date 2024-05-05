// eslint-disable-next-line import/extensions
import nextJest from 'next/jest.js';

const createJestConfig = nextJest({
  dir: './',
});

/** @type {import("jest").Config} */
const config = {
  testEnvironment: 'jsdom',

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  clearMocks: true,

  coverageDirectory: '../../coverage/apps/web',

  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'web app unit tests',
            outputDirectory: '../../reports/apps/web',
            outputName: 'unit-test-results.xml',
          },
        ],
      ]
    : undefined,

  coverageProvider: 'v8',
};

export default createJestConfig(config);
