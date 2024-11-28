import {defineConfig} from 'vite';

export default defineConfig({
    server: {
      proxy: {
        '/api': {
          target: 'https://bored-api.appbrewery.com', // Asegúrate de que la URL sea correcta
          changeOrigin: true,  // Cambia el origen de la solicitud
          rewrite: (path) => path.replace(/^\/api/, ''), // Elimina '/api' del path
        },
      },
    },
  });