import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
  },
  resolve: {
    alias: {
      '@': '/src',
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            if (
              id.includes('three') ||
              id.includes('@react-three') ||
              id.includes('postprocessing') ||
              id.includes('three-stdlib') ||
              id.includes('meshopt') ||
              id.includes('draco')
            ) return 'three';
            if (
              id.includes('gsap') ||
              id.includes('framer-motion') ||
              id.includes('lenis') ||
              id.includes('@studio-freight')
            ) return 'animation';
            return 'vendor';
          }
        },
      },
    },
    chunkSizeWarningLimit: 1500,
  },
});
