import { pathsToModuleNameMapper } from 'ts-jest';

import { compilerOptions } from '../tsconfig.json';

import type { Config } from 'jest';

const config: Config = {
  preset: 'ts-jest',

  rootDir: '../',

  modulePaths: [compilerOptions.baseUrl],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths),

  setupFilesAfterEnv: ['<rootDir>/jest.setup.ts'],

  clearMocks: true,

  testPathIgnorePatterns: [
    '<rootDir>/dist/',
    '<rootDir>/node_modules/',
    '<rootDir>/src/',
  ],

  reporters: process.env.CI
    ? [
        'default',
        [
          'jest-junit',
          {
            suiteName: 'game app integration tests',
            outputDirectory: '../../reports/apps/game',
            outputName: 'integration-test-results.xml',
          },
        ],
      ]
    : undefined,
};

export default config;
