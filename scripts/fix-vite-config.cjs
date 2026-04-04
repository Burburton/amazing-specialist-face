const fs = require('fs');

const content = `import { defineConfig } from 'vite'
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
          'router': ['react-router-dom'],
        },
      },
    },
  },
})
`;

fs.writeFileSync('vite.config.ts', content);
console.log('Updated vite.config.ts (removed test config for build)');