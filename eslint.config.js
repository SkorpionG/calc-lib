import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import jestPlugin from 'eslint-plugin-jest';
import prettier from 'eslint-config-prettier';

export default tseslint.config(
  // Global ignores
  {
    ignores: ['dist/**', 'node_modules/**', 'coverage/**'],
  },

  // Base JS recommended rules (applies everywhere)
  js.configs.recommended,

  // TypeScript source files
  {
    files: ['src/**/*.ts'],
    extends: [
      ...tseslint.configs.recommended,
      ...tseslint.configs.stylistic,
      // Type-aware rules — requires parserOptions.project
      ...tseslint.configs.recommendedTypeChecked,
    ],
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
        tsconfigRootDir: import.meta.dirname,
      },
    },
    rules: {
      // — Unused code —
      '@typescript-eslint/no-unused-vars': [
        'error',
        {
          vars: 'all',
          args: 'after-used',
          argsIgnorePattern: '^_',
          destructuredArrayIgnorePattern: '^_',
        },
      ],

      // — Public API surface —
      // Require explicit return types on exported/public functions
      '@typescript-eslint/explicit-module-boundary-types': 'error',

      // — Type safety —
      // No `any` allowed in source (use `unknown` instead)
      '@typescript-eslint/no-explicit-any': 'error',
      // Catch conditions that TypeScript already knows are always true/false
      '@typescript-eslint/no-unnecessary-condition': 'error',
      // Exhaustive switch/case on union types
      '@typescript-eslint/switch-exhaustiveness-check': 'error',
      // Disallow floating (unhandled) Promises
      '@typescript-eslint/no-floating-promises': 'error',
      // Disallow unnecessary type assertions like `x as string` when x is already string
      '@typescript-eslint/no-unnecessary-type-assertion': 'error',

      // — Style / consistency —
      // Enforce `import type` for type-only imports (keeps runtime bundle clean)
      '@typescript-eslint/consistent-type-imports': ['error', { prefer: 'type-imports' }],
      // Prefer `readonly` on class members that are never reassigned
      '@typescript-eslint/prefer-readonly': 'error',
      // Prefer nullish coalescing (??) over || for nullable checks
      '@typescript-eslint/prefer-nullish-coalescing': 'error',
      // Prefer optional chaining (?.) over manual &&-chains
      '@typescript-eslint/prefer-optional-chain': 'error',
    },
  },

  // Test files
  {
    files: ['tests/**/*.ts'],
    extends: [...tseslint.configs.recommended],
    plugins: {
      jest: jestPlugin,
    },
    languageOptions: {
      globals: jestPlugin.environments.globals.globals,
    },
    rules: {
      ...jestPlugin.configs.recommended.rules,
      // Tests intentionally use `any` for casting and mocking
      '@typescript-eslint/no-explicit-any': 'off',
      // Allow non-null assertions in tests (e.g. `result!.value`)
      '@typescript-eslint/no-non-null-assertion': 'off',
      // Unused vars still enforced in tests, but _ prefix allowed
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_', varsIgnorePattern: '^_' },
      ],
    },
  },

  // Example/config JS files (no TS project reference needed)
  {
    files: ['*.js', 'examples/**/*.js'],
    languageOptions: {
      ecmaVersion: 2020,
      sourceType: 'module',
      globals: {
        // Node.js built-ins (console, process, Buffer, etc.)
        console: 'readonly',
        process: 'readonly',
        Buffer: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
        setTimeout: 'readonly',
        clearTimeout: 'readonly',
        setInterval: 'readonly',
        clearInterval: 'readonly',
      },
    },
    rules: {
      // Allow _ prefix to mark intentionally unused vars/catch bindings
      'no-unused-vars': ['error', { varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
    },
  },

  // Prettier must be last — disables all formatting-related ESLint rules
  prettier,
);
