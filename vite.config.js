import { sveltekit } from '@sveltejs/kit/vite';
import { defineConfig } from 'vite';
import { analyzer } from 'vite-bundle-analyzer';
import path from 'path';

export default defineConfig({
	plugins: [sveltekit(), analyzer()],
	resolve: {
		alias: {
			$lib: path.resolve('./src/lib')
		}
	}
});
