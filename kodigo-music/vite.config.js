import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/kodigo-music/', // Asegúrate de que esta línea esté presente
  build: {
    outDir: 'dist', // La carpeta donde se generará la build
  },
});
