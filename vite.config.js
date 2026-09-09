import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import seoFallback from './vite-plugin-seo-fallback.js'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), seoFallback()],
})
