import js from '@eslint/js';
import nextCoreWebVitals from 'eslint-config-next/core-web-vitals';
import nextTypescript from 'eslint-config-next/typescript';
import prettier from 'eslint-config-prettier';

/**
 * ESLint flat config.
 *
 * `eslint-config-next` v16 ships native flat configs as array exports, so the
 * `FlatCompat` shim that older setups need is not used here — routing v16's
 * flat config through `@eslint/eslintrc` throws a circular-structure error
 * while validating the legacy schema.
 *
 * `eslint-config-prettier` must come last: its only job is to switch off
 * stylistic rules that would fight the formatter.
 */
const eslintConfig = [
  {
    ignores: ['.next/**', 'node_modules/**', 'next-env.d.ts', 'public/**', '*.tsbuildinfo'],
  },

  js.configs.recommended,
  ...nextCoreWebVitals,
  ...nextTypescript,
  prettier,

  {
    rules: {
      // Unused vars are errors, but a leading underscore is an explicit
      // "yes, this is intentional" escape hatch.
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/consistent-type-imports': [
        'error',
        { prefer: 'type-imports', fixStyle: 'inline-type-imports' },
      ],
      'no-console': ['warn', { allow: ['warn', 'error'] }],
    },
  },
];

export default eslintConfig;
