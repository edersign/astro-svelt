// @ts-check

import svelte from '@astrojs/svelte';
import { defineConfig } from 'astro/config';
import stylex from '@stylexjs/unplugin';
// https://astro.build/config
export default defineConfig({
	// Enable Svelte to support Svelte components.
	integrations: [stylex.vite(), svelte()],
});
