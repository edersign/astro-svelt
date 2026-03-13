// @ts-check

import svelte from "@astrojs/svelte";
import stylex from "@stylexjs/unplugin";
import { defineConfig } from "astro/config";
// https://astro.build/config
export default defineConfig({
	// Enable Svelte to support Svelte components.
	integrations: [svelte()],
	vite: {
		plugins: [stylex.vite()],
	},
});
