import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  build: {
    // Apunta a navegadores modernos que manejan mejor JavaScript actual
    target: 'esnext',
    
    rollupOptions: {
      output: {
        // Fragmentación manual del código (Code Splitting)
        manualChunks: {
          // 1. Núcleo de React: Se descarga una vez y se cachea fuertemente
          'vendor-react': ['react', 'react-dom', 'react-router-dom'],
          
          // 2. Animaciones: Framer Motion es pesado, lo aislamos para no bloquear el hilo principal
          'vendor-motion': ['framer-motion'],
          
          // 3. Traducciones: Librerías de idioma
          'vendor-i18n': ['i18next', 'react-i18next']
        }
      }
    },
    // Límite de advertencia de tamaño de bloque aumentado para no generar alertas innecesarias
    chunkSizeWarningLimit: 800,
  },
  esbuild: {
    // Limpia el código final eliminando logs y debuggers automáticamente
    drop: ['console', 'debugger'],
  }
});