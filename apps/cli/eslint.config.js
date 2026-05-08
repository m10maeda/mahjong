import vitest from '@repo/eslint-config/+vitest';
import config from '@repo/eslint-config/react-internal';

/** @type {import("eslint").Linter.Config[]} */
export default [...config, ...vitest];
