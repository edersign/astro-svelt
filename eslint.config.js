import eslint from "@eslint/js";
import eslintPluginAstro from "eslint-plugin-astro";
import eslintPluginImportX from "eslint-plugin-import-x";
import simpleImportSort from "eslint-plugin-simple-import-sort";
import eslintPluginSvelte from "eslint-plugin-svelte";
import globals from "globals";
import tseslint from "typescript-eslint";

export default tseslint.config(
	// Global ignores
	{
		ignores: ["dist/**", "node_modules/**", ".astro/**", ".idx/**", "*.d.ts"],
	},

	// Base JS/TS recommended rules
	eslint.configs.recommended,
	...tseslint.configs.recommended,

	// Astro plugin
	...eslintPluginAstro.configs.recommended,

	// Svelte plugin
	...eslintPluginSvelte.configs["flat/recommended"],

	// Import sorting & organization
	{
		plugins: {
			"simple-import-sort": simpleImportSort,
			"import-x": eslintPluginImportX,
		},
		rules: {
			"simple-import-sort/imports": "error",
			"simple-import-sort/exports": "error",
			"import-x/first": "error",
			"import-x/newline-after-import": "error",
			"import-x/no-duplicates": "error",
		},
	},

	// Global settings for all files
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node,
			},
		},
		rules: {
			"no-console": "warn",
			"no-debugger": "warn",
			"prefer-const": "error",
			"no-unused-vars": "off",
			"@typescript-eslint/no-unused-vars": [
				"warn",
				{
					argsIgnorePattern: "^_",
					varsIgnorePattern: "^_",
				},
			],
		},
	},

	// Type-aware rules only for TS/JS files (not Astro/Svelte)
	{
		files: ["**/*.ts", "**/*.tsx", "**/*.js", "**/*.mjs"],
		rules: {
			"@typescript-eslint/consistent-type-imports": [
				"error",
				{ prefer: "type-imports" },
			],
		},
	},

	// Astro-specific overrides
	{
		files: ["**/*.astro"],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
	},

	// Svelte-specific overrides
	{
		files: ["**/*.svelte"],
		languageOptions: {
			parserOptions: {
				parser: tseslint.parser,
			},
		},
		rules: {
			// Svelte 5 $props() requires `let` for destructured props
			"prefer-const": "off",
		},
	},
);
