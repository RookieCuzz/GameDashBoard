import { fileURLToPath, URL } from 'node:url'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
  ],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8088', // 目标服务器
        changeOrigin: true, // 是否修改请求源
        rewrite: (path) => path.replace(/^\/api/, '') // 重写请求路径，去掉 /api
    }
  }
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url))
    }
  }
}
)
