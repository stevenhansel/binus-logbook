module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: [
    'eslint:recommended',
    'plugin:import/recommended',
    'plugin:jsx-a11y/recommended',
    'plugin:@typescript-eslint/recommended',
    'standard-with-typescript',
    'eslint-config-prettier'
  ],
  overrides: [
  ],
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
    allowImportExportEverywhere: true
  },
  rules: {
    '@typescript-eslint/no-floating-promises': 'off',
    '@typescript-eslint/no-misused-promises': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    '@typescript-eslint/promise-function-async': 'off',
    '@typescript-eslint/strict-boolean-expressions': 'off',
  },
  settings: {
    'import/resolver': {
      node: {
        paths: ['src'],
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
      },
    },
  }
}
