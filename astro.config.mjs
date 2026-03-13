// @ts-check

import svelte from "@astrojs/svelte";
import { defineConfig } from "astro/config";
import stylex from "astro-stylex";
// https://astro.build/config
export default defineConfig({
	// Enable Svelte to support Svelte components.
	integrations: [svelte(), stylex()],
});
