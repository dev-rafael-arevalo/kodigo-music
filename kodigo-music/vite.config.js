import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
    plugins: [react()],
    base: '/', // Asegúrate de que la base sea correcta
    build: {
        outDir: 'dist', // Este debe ser el directorio de salida
    },
});
