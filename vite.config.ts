import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { resolve } from 'path';
import dts from 'vite-plugin-dts';
import { copyFileSync, mkdirSync, readdirSync, statSync, readFileSync, writeFileSync } from 'fs';

// Plugin to copy and bundle styles
function copyStylesPlugin() {
  return {
    name: 'copy-styles',
    closeBundle() {
      const srcDir = resolve(__dirname, 'src/styles');
      const destDir = resolve(__dirname, 'dist/styles');

      // Create dest directory
      mkdirSync(destDir, { recursive: true });

      // Copy individual CSS files (tokens, base, atomic)
      const files = readdirSync(srcDir);
      for (const file of files) {
        const srcPath = resolve(srcDir, file);
        const destPath = resolve(destDir, file);
        if (statSync(srcPath).isFile() && file.endsWith('.css') && file !== 'index.css') {
          copyFileSync(srcPath, destPath);
        }
      }

      // Bundle all.css (design-tokens + base + atomic)
      const designTokens = readFileSync(resolve(srcDir, 'design-tokens.css'), 'utf-8');
      const base = readFileSync(resolve(srcDir, 'base.css'), 'utf-8');
      const atomic = readFileSync(resolve(srcDir, 'atomic.css'), 'utf-8');

      const bundledAll = `/* @gractor/ui - Bundled Styles (tokens + base + atomic) */\n${designTokens}\n${base}\n${atomic}`;
      writeFileSync(resolve(destDir, 'all.css'), bundledAll);

      console.log('✓ Styles copied and bundled to dist/styles/');
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
      external: ['react', 'react-dom', 'react/jsx-runtime', 'lucide-react', 'xlsx'],
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
