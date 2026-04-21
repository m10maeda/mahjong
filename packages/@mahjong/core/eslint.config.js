import config from '@repo/eslint-config';
import vitest from '@repo/eslint-config/+vitest';

/** @type {import("eslint").Linter.Config[]} */
export default [...config, ...vitest];
