import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import importPlugin from 'eslint-plugin-import';

export default [
	{ ignores: ['dist'] },
	{
		files: ['**/*.{js,jsx}'],
		plugins: { import: importPlugin },
		settings: {
			'import/resolver': {
				alias: {
					map: [
						['@config', './src/config'],
						['@classes', './src/classes'],
						['@components', './src/components'],
						['@context', './src/context'],
						['@services', './src/services'],
						['@shared', './src/shared'],
					],
					extensions: ['.js', '.jsx', '.ts', '.tsx'],
				},
			},
		},
		rules: {
			'import/no-unresolved': [
				'error',
				{ commonjs: true, caseSensitive: true },
			],
		},
	},
	{
		files: ['**/*.{js,jsx}'],
		languageOptions: {
			ecmaVersion: 2020,
			globals: globals.browser,
			parserOptions: {
				ecmaVersion: 'latest',
				ecmaFeatures: { jsx: true },
				sourceType: 'module',
			},
		},
		plugins: { 'react-hooks': reactHooks, 'react-refresh': reactRefresh },
		rules: {
			...js.configs.recommended.rules,
			...reactHooks.configs.recommended.rules,
			'no-unused-vars': ['error', { varsIgnorePattern: '^[A-Z_]' }],
			'react-refresh/only-export-components': [
				'off',
				{ allowConstantExport: true },
			],
		},
	},
];
