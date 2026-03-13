import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  server: {
    port: 5173,
    proxy: {
      '/admin': { target: 'http://localhost:3333', changeOrigin: true },
      '/admin/': { target: 'http://localhost:3333', changeOrigin: true },
      '/api': { target: 'http://localhost:3333', changeOrigin: true },
      '/api/': { target: 'http://localhost:3333', changeOrigin: true },
      '/studio': { target: 'http://localhost:3333', changeOrigin: true },
      '/studio/': { target: 'http://localhost:3333', changeOrigin: true },
      '/_next': { target: 'http://localhost:3333', changeOrigin: true },
    },
  },
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        edition: resolve(__dirname, 'edition-limitee.html'),
        vision: resolve(__dirname, 'notre-vision.html'),
        collection: resolve(__dirname, 'la-collection.html'),
        contact: resolve(__dirname, 'contact.html'),
      },
    },
  },
})
