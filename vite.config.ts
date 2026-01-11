import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    allowedHosts: ['vite.oldlai.com'],
    port: 5173,
    strictPort: true,
  },
  preview: {
    port: 5173,
  }

})
