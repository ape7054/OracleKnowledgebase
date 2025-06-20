import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import svgr from 'vite-plugin-svgr'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    svgr()
  ],
  resolve: {
    alias: {
      // 如果有需要的话可以添加路径别名
    }
  },
  server: {
    host: '0.0.0.0'
  },
  build: {
    sourcemap: true,
  },
  css: {
    devSourcemap: true,
  }
})
