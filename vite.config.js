import { defineConfig } from 'vite'
import tailwindcss from '@tailwindcss/vite'
import { resolve } from 'path'

export default defineConfig({
  plugins: [
    tailwindcss(),
  ],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        edition: resolve(__dirname, 'edition-limitee.html'),
        vision: resolve(__dirname, 'notre-vision.html'),
      },
    },
  },
})
