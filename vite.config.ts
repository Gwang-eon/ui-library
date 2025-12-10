import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { copyFileSync, mkdirSync, readdirSync, statSync } from 'fs';

// Plugin to copy styles folder to dist
function copyStylesPlugin() {
  return {
    name: 'copy-styles',
    closeBundle() {
      const srcDir = resolve(__dirname, 'src/styles');
      const destDir = resolve(__dirname, 'dist/styles');

      // Create dest directory
      mkdirSync(destDir, { recursive: true });

      // Copy all CSS files
      const files = readdirSync(srcDir);
      for (const file of files) {
        const srcPath = resolve(srcDir, file);
        const destPath = resolve(destDir, file);
        if (statSync(srcPath).isFile() && file.endsWith('.css')) {
          copyFileSync(srcPath, destPath);
        }
      }
      console.log('✓ Styles copied to dist/styles/');
    }
  };
}

export default defineConfig({
  plugins: [
    react(),
    dts({
      insertTypesEntry: true,
    }),
    copyStylesPlugin(),
  ],
  server: {
    open: true,
  },
  preview: {
    open: true,
  },
  resolve: {
    alias: {
      '@': resolve(__dirname, './src'),
    },
  },
  build: {
    lib: {
      entry: {
        index: resolve(__dirname, 'src/index.ts'),
        tokens: resolve(__dirname, 'src/tokens/index.ts'),
      },
      formats: ['es', 'cjs'],
      fileName: (format, entryName) => {
        const ext = format === 'es' ? 'js' : 'cjs';
        return `${entryName}.${ext}`;
      },
    },
    rollupOptions: {
      external: ['react', 'react-dom', 'react/jsx-runtime', 'react-datepicker', 'lucide-react'],
      output: {
        preserveModules: false,
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') {
            return 'styles/gractor-ui.css';
          }
          return assetInfo.name || 'assets/[name][extname]';
        },
      },
    },
    cssCodeSplit: false,
    sourcemap: true,
  },
});
