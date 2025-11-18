import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import * as path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default defineConfig({
	plugins: [react()],
	server: { watch: { usePolling: true }, historyApiFallback: true },
	resolve: {
		alias: {
			'@classes': path.resolve(__dirname, './src/classes'),
			'@components': path.resolve(__dirname, './src/components'),
			'@config': path.resolve(__dirname, './src/config'),
			'@context': path.resolve(__dirname, './src/context'),
			'@hooks': path.resolve(__dirname, './src/hooks'),
			'@services': path.resolve(__dirname, './src/services'),
			'@shared': path.resolve(__dirname, './src/shared'),
		},
	},
});
