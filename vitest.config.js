import { defineConfig } from 'vitest/config';
import { svelte } from '@sveltejs/vite-plugin-svelte';

export default defineConfig({
	plugins: [
		svelte({
			compilerOptions: { runes: true }
		})
	],
	test: {
		environment: 'jsdom',
		exclude: ['**/node_modules/**', '**/.git/**', '**/dist/**', '**/.next/**', '**/e2e/**'],
		globals: true,
		setupFiles: ['./tests/setup.js']
	},
	resolve: {
		conditions: ['browser']
	}
});
