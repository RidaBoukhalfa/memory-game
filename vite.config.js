import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: '/memory-game/',
  server: {
    host: true,      // Enables access from other devices on your network
    port: 5173       // Optional (default is 5173)
  }
});
