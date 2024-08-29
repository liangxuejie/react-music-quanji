import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 2409,
    proxy: {
        '/use': {
          target: 'http://localhost:9002',
          changeOrigin: true,
          rewrite: (path) => path.replace(/^\/use/, ''),
        },
    }
  },
  css: {
    preprocessorOptions: {
      // 全局样式引入
      scss: {
        // 全局引入变量和 mixin
        additionalData: `
          @import "@/assets/scss/variable.scss";
          @import "@/assets/scss/mixin.scss";
        `
      }
    }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  },
})
