import globals from 'globals';
import pluginJs from '@eslint/js';
import eslintPluginPrettierRecommended from 'eslint-plugin-prettier/recommended';

export default [
    pluginJs.configs.recommended,
    {
        languageOptions: { globals: globals.node },
        ignores: ['node_modules/', 'public/', '.env', '**/*.json', '.sql'],
        rules: {
            'no-unused-vars': ['error', { argsIgnorePattern: '^_', varsIgnorePattern: '^_', caughtErrorsIgnorePattern: '^_' }],
            semi: ['error', 'always'],
            'prettier/prettier': ['error', { printWidth: 140 }],
        },
    },
    eslintPluginPrettierRecommended,
];
