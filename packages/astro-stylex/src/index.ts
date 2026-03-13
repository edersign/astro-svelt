import stylexUnplugin from "@stylexjs/unplugin";
import type { AstroIntegration } from "astro";

/**
 * Options forwarded to `@stylexjs/unplugin`.
 *
 * All fields are optional — sensible defaults are applied automatically.
 * See https://stylexjs.com/docs/api/configuration/ for the full list.
 */
export interface StyleXIntegrationOptions {
	/**
	 * Wrap generated CSS inside `@layer` blocks.
	 * @default false
	 */
	useCSSLayers?: boolean;

	/**
	 * Module resolution strategy used by the StyleX compiler.
	 * @default { type: "commonJS", rootDir: process.cwd() }
	 */
	unstable_moduleResolution?: {
		type: "commonJS" | "haste";
		rootDir: string;
	};

	/**
	 * Extra import sources that should be treated as StyleX.
	 * @default ["stylex", "@stylexjs/stylex"]
	 */
	importSources?: string[];

	/**
	 * Dev-mode behaviour.
	 *  - `"full"`     – injects a virtual CSS module + HMR runtime (default)
	 *  - `"css-only"` – lighter-weight, no module HMR
	 *  - `"off"`      – plugin disabled in dev
	 * @default "full"
	 */
	devMode?: "full" | "css-only" | "off";

	/**
	 * LightningCSS transform options for the generated CSS.
	 */
	lightningcssOptions?: Record<string, unknown>;

	/**
	 * Any additional options accepted by `@stylexjs/unplugin`.
	 * These are spread last and override every other field.
	 */
	[key: string]: unknown;
}

/**
 * Astro integration for **StyleX** — no PostCSS or Babel config needed.
 *
 * Internally delegates to `@stylexjs/unplugin` (Vite flavour) so that
 * `.astro`, `.tsx`, `.ts`, `.jsx`, and `.svelte` files that import
 * `@stylexjs/stylex` are compiled at build time.
 *
 * **Usage**
 * ```js
 * // astro.config.mjs
 * import stylex from "astro-stylex";
 *
 * export default defineConfig({
 *   integrations: [stylex()],
 * });
 * ```
 *
 * > In development mode you still need to add `<StyleXHead />` to your
 * > layout's `<head>` so the virtual CSS file is loaded. Import it with:
 * > ```astro
 * > import StyleXHead from "astro-stylex/StyleXHead.astro";
 * > ```
 */
export default function stylexIntegration(
	options: Partial<StyleXIntegrationOptions> = {},
): AstroIntegration {
	return {
		name: "astro-stylex",
		hooks: {
			"astro:config:setup": ({ updateConfig }) => {
				updateConfig({
					vite: {
						plugins: [stylexUnplugin.vite(options)],
					},
				});
			},
		},
	};
}
