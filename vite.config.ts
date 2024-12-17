import { fileURLToPath, URL } from 'node:url'
import { VitePWA } from 'vite-plugin-pwa';

import vue from '@vitejs/plugin-vue'
import autoprefixer from 'autoprefixer'

import tailwind from 'tailwindcss'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()],
    },
  },
  plugins: [
    vue(),
    VitePWA({
      registerType: 'autoUpdate', // Enable auto-updating the service worker
      manifest: {
        name: 'SWIM SSP', // App name
        short_name: 'Swim SSP', // Short name for the app
        description: 'AWL INDIA',
        theme_color: '#42b983', // Theme color for the app
        background_color: '#ffffff', // Background color for the splash screen
        icons: [
          {
            src: '/icons/logo.png', // Path to the icon images
            sizes: '192x192',
            type: 'image/png',
          },
          {
            src: '/icons/logo.png',
            sizes: '512x512',
            type: 'image/png',
          },
        ],
      },
      workbox: {
        runtimeCaching: [
          {
            urlPattern: ({ request }) => request.destination === 'image', // Caching image files
            handler: 'CacheFirst', // Cache first strategy
            options: {
              cacheName: 'images',
              expiration: {
                maxEntries: 50,
                maxAgeSeconds: 60 * 60 * 24 * 30, // Cache images for 30 days
              },
            },
          },
          // Add more runtime caching strategies for other resources (e.g., API calls)
        ],
      },
    }),

  ],
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
})