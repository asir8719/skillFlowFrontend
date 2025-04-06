import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  base: "./",
  plugins: [react()],
  optimizeDeps: {
    include: ['gsap', 'gsap/ScrollTrigger'],
    force: true,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          gsap: ['gsap'], // Ensure GSAP is bundled correctly
        },
      },
    },
  },
})