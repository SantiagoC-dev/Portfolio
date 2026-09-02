import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    target: 'esnext',
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('node_modules')) {
            // 1. Núcleo de React
            if (id.includes('react') || id.includes('react-dom') || id.includes('react-router-dom')) {
              return 'vendor-react';
            }
            // 2. Animaciones (Framer Motion)
            if (id.includes('framer-motion')) {
              return 'vendor-motion';
            }
            // 3. Traducciones
            if (id.includes('i18next') || id.includes('react-i18next')) {
              return 'vendor-i18n';
            }
            // Agrupa cualquier otra dependencia en un paquete genérico
            return 'vendor-core';
          }
        }
      }
    },
    chunkSizeWarningLimit: 800,
  }
});