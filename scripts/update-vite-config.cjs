const fs = require('fs');

const viteConfig = `/// <reference types="vitest" />
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base: '/amazing-specialist-face/',
  build: {
    outDir: 'dist',
    sourcemap: false,
    rollupOptions: {
      output: {
        manualChunks: {
          'react-vendor': ['react', 'react-dom'],
          'router': ['react-router-dom'],
        },
      },
    },
  },
  test: {
    environment: 'node',
    globals: true,
  },
})
`;

fs.writeFileSync('vite.config.ts', viteConfig);
console.log('vite.config.ts updated');