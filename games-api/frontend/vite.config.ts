import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      '/sales': 'http://localhost:3000',
      '/oauth': 'http://localhost:3000',
    },
  },
})
