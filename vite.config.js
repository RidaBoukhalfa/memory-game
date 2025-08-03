// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  base: '/memory-game/', // THIS IS CRUCIAL!
  plugins: [react()],
  server: {
    host: true,
    port: 5173
  }
})
