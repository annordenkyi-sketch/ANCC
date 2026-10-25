import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: { port: 5174, strictPort: true, open: true },
  build: {
    target: 'es2019',
    cssMinify: true,
    rollupOptions: {
      output: {
        manualChunks: {
          router: ['react-router-dom']
        }
      }
    }
  }
})
