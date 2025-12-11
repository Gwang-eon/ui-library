import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    outDir: 'demo-dist',
    rollupOptions: {
      // xlsx is an optional dependency for Excel export
      external: ['xlsx'],
      output: {
        globals: {
          xlsx: 'XLSX',
        },
      },
    },
  },
  server: {
    port: 3000,
    open: true,
  },
  root: '.',
});
